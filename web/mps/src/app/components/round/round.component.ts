import { Component, OnInit } from '@angular/core';
import {Room} from "../../entities/room";
import {RoomService} from "../../services/room.service";
import {Router} from "@angular/router";
import {RoomComponent} from "../room/room.component";

@Component({
  selector: 'app-round',
  templateUrl: './round.component.html',
  styleUrls: ['./round.component.css']
})
export class RoundComponent implements OnInit {

  room? : Room;
  name? : string

  backToMenu: boolean = false;

  constructor(private router: Router, private roomService: RoomService) { }

  ngOnInit(): void {
    if (RoomComponent.round === 3) {
      this.backToMenu = true;
    }
    this.name = this.router.url.split('/')[2];
      this.startTimer();
  }

  timeLeft: number = 10;
  interval: any;

  startTimer() {
    if (RoomComponent.round < 3) {
      setTimeout(() => {
        this.router.navigate(["/room", this.name]);
      }, 6000)
    }
  }

  clickBackToMenu(): void {
    RoomComponent.round = 0;
    this.router.navigate(['/start']);
  }

}
