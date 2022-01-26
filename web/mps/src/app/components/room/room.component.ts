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
  minutes: string | number = 0;
  seconds: string | number | undefined;
  name? : string
  types: string[] = ['Paris', 'Bucuresti', 'Polovragi', 'Cernisoara'];
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
        // this.timer = 14;
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

}
