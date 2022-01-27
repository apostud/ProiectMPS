import {Component, ElementRef, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Room} from "../../entities/room";
import {RoomService} from "../../services/room.service";
import {User} from "../../entities/user";
import {BehaviorSubject, Observable, Subscription, timer} from 'rxjs';
import {FormControl, FormGroup} from "@angular/forms";

import { interval } from 'rxjs';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit, OnDestroy {
  static timer = 10;
  static round = 0;
  minutes: string | number = 0;
  seconds: string | number | undefined;
  name? : string
  question1 = 'Care este capitala Romaniei?';
  question2 = 'Cate picioare au 2 gaini + 3 vaci?';
  question3 = 'Ce nota o sa am la MPS?';
  selectedQuestion: string | undefined;
  types1: string[] = ['Paris', 'Bucuresti', 'Polovragi', 'Cernisoara'];
  types2: string[] = ['14', '5', '16', '20'];
  types3: string[] = ['10', '9', '5', '4'];
  selectedTypes: string[] | undefined;
  correctAnswer1 = 'Bucuresti';
  correctAnswer2 = '16';
  correctAnswer3 = '10';
  selectedAnswer: string | undefined;
  room = new Room();
  intervalSubscription: Subscription | undefined;
  typesForm = new FormGroup({
    type: new FormControl('')
  });
  timeLeft = 50;

  constructor(private router: Router,
              private roomService: RoomService,
              private elementRef: ElementRef) {
  }


  ngOnInit(): void {
    console.log('ceva');
    RoomComponent.timer = 10;
    RoomComponent.round = RoomComponent.round + 1;
    console.log('round= ' + RoomComponent.round);
    if (RoomComponent.round === 1) {
      this.selectedQuestion = this.question1;
      this.selectedTypes = this.types1;
      this.selectedAnswer = this.correctAnswer1;
    } else if (RoomComponent.round === 2) {
      this.selectedQuestion = this.question2;
      this.selectedTypes = this.types2;
      this.selectedAnswer = this.correctAnswer2;
    } else if (RoomComponent.round === 3) {
      this.selectedQuestion = this.question3;
      this.selectedTypes = this.types3;
      this.selectedAnswer = this.correctAnswer3;
    }
    this.seconds = 0;
    this.minutes = 0;
    this.timeLeft = 50;
    this.name = this.router.url.split('/')[2];
    this.roomService.getRoomByName(this.name).subscribe((data:any)=> {
      this.room = data.body;
    });
    var callDuration = this.elementRef.nativeElement.querySelector('#time');
    console.log(typeof(callDuration));
    this.startTimer(callDuration);
  }

  startTimer(display: { textContent: string; }) {

    this.intervalSubscription = interval(1000).subscribe((x : any) => {
      this.minutes = Math.floor(RoomComponent.timer / 60);
      this.seconds = Math.floor(RoomComponent.timer % 60);

      this.minutes = this.minutes < 10 ? "0" + this.minutes : this.minutes;
      this.seconds = RoomComponent.timer < 10 ? "0" + RoomComponent.timer : RoomComponent.timer;

      display.textContent = this.minutes + ":" + this.seconds;
      console.log(RoomComponent.timer);
      --RoomComponent.timer;
      if (RoomComponent.timer < 0) {
        this.router.navigate(['/round', this.name]);
      }
    })
  }

  clickCheck(): void {
    console.log(this.typesForm.value.type);
  }

  ngOnDestroy(): void {
    this.intervalSubscription?.unsubscribe();
  }
  exit() : void {
    let room;
    if(!localStorage.getItem("room")) {
      this.roomService.getRoomByName(this.router.url.split('/')[2]).subscribe((data:any) => {
        room = data.body;
        let user = JSON.parse(localStorage.getItem("user")!)._id;
        if(room.admin == user) {
          this.roomService.getRoomByName(room.name).subscribe((data:any) => {
            let room2 = data.body;
            console.log(data.body);
            console.log(room2.players)
            for(let player of room2.players) {
              if(user != player) {
                 room2.admin = player;
                 this.roomService.updateRoom(room2).subscribe();
              }
            }
          })
        }
        localStorage.removeItem("room");
        this.router.navigate(['/start']);
      })
    } else {
      console.log(localStorage.getItem("room"))
      room = JSON.parse(localStorage.getItem("room")!);
      let user = JSON.parse(localStorage.getItem("user")!)._id;
      if(room.admin == user) {
        this.roomService.getRoomByName(room.name).subscribe((data:any) => {
          let room2 = data.body;
          console.log(data.body);
          console.log(room2.players)
          for(let player of room2.players) {
            if(user != player) {
               room2.admin = player;
               this.roomService.updateRoom(room2).subscribe();
            }
          }
        })
      }
      localStorage.removeItem("room");
      this.router.navigate(['/start']);
    }

  }
  settings() : void {
    if (!localStorage.getItem("room")) {
      this.roomService.getRoomByName(this.router.url.split('/')[2]).subscribe((data: any) => {
        localStorage.setItem("room", data.body)
        this.router.navigate([`/roomSettings/` + data.body.name])
      })

    } else {
      this.router.navigate([`/roomSettings/` + JSON.parse(localStorage.getItem("room")!).name]);
    }
  }
}
