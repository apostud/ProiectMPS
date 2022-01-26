import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {Room} from "../../entities/room";
import {RoomService} from "../../services/room.service";
import {User} from "../../entities/user";
import {BehaviorSubject, Observable, timer} from 'rxjs';



@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {
  id? : string
  words = ["masa", "casa", `floare`, `dificil`, `tema`, `laptop`, `facultate`]
  room = new Room();
  idx = 0;
  timeLeft = 50;
  private userSubject: BehaviorSubject<User | null>;
  public player: Observable<User | null>;
  currentUser:User;


  // getPlayer() : Observable<User> {
  //   if(this.idx == this.room.players?.length) {
  //     this.idx = 0
  //   }
  //   let player = this.room.players![this.idx];
  //   this.idx +=1;
  //   return ;
  // }
  nextRound() : boolean{
      setInterval(() => {
        if(this.timeLeft > 0) {
          this.timeLeft-=1;
        }
      }, 1000)
    if(this.timeLeft > 0) {
      return true;
    } else {
      return false;
    }
  }
  constructor(private router: Router, private roomService: RoomService) {
    this.currentUser = JSON.parse(localStorage.getItem('user')!);
      if(this.idx == this.room.players?.length) {
        this.idx = 0
      }
      let player = this.room.players![this.idx];
      this.idx +=1;
    this.userSubject = new BehaviorSubject<User | null>(player ? JSON.parse(JSON.stringify(player)) : null);
    this.player = this.userSubject.asObservable();
  }
  // timeLeft: number = 60;
  // interval: any;
  //
  // startTimer() {
  //   this.interval = setInterval(() => {
  //     if(this.timeLeft > 0) {
  //       this.timeLeft--;
  //     } else {
  //       this.timeLeft = 60;
  //     }
  //   },1000)
  // }
  //
  // pauseTimer() {
  //   clearInterval(this.interval);
  // }


  ngOnInit(): void {
    this.id = this.router.url.split('/')[2];
    // this.roomService.getRoomByName(this.id).subscribe((data:any)=>
    // this.room = data.body);
    let user1 = new User()
    let user2 = new User()
    user1.email = 'jkn';
    user1.fullName='jhnkkp';
    user1.password ='jkl';
    user1.isActive = true;
    user1.role ='kl';
    user1.isActive = true;
    user2.email = 'jkn';
    user2.fullName='jhnkkp';
    user2.password ='jkl';
    user2.isActive = true;
    user2.role ='kl';
    user2.isActive = true;
    this.room.players = [user1, user2];
    this.room.score=[8, 9]

    for( let player of this.room.players) {
      // if(player.isActive) {
      //   if(this.room.players.indexOf(player))
      // }
    }
  }

  clickBackButton(): void {
    this.router.navigate(['/start']);
  }

}
