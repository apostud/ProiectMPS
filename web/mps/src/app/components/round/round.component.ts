import { Component, OnInit } from '@angular/core';
import {Room} from "../../entities/room";
import {RoomService} from "../../services/room.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-round',
  templateUrl: './round.component.html',
  styleUrls: ['./round.component.css']
})
export class RoundComponent implements OnInit {

  room? : Room;
  name? : string

  constructor(private router: Router, private roomService: RoomService) { }

  ngOnInit(): void {
    this.name = this.router.url.split('/')[2];
   // this.roomService.getRoomByName(this.router.url.split('/')[2]).subscribe((data:any) => {
   //   this.room = data.body;
      this.startTimer();
   // })
  }

  timeLeft: number = 4;
  interval: any;

  startTimer() {
    setTimeout(()=> {
      this.router.navigate(["/room", this.name]);
    }, 2000)
    // this.interval = setInterval(() => {
    //   if (this.timeLeft > 0) {
    //     this.timeLeft--;
    //   } else {
    //    this.router.navigate(["/room"])
    //   }
    // }, 800)
  }

}
