import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {Room} from "../../entities/room";

@Component({
  selector: 'app-room-settings',
  templateUrl: './room-settings.component.html',
  styleUrls: ['./room-settings.component.css']
})
export class RoomSettingsComponent implements OnInit {

  constructor(private router:Router) { }

  room? : Room;
  static bool : boolean = false;
  ngOnInit(): void {
    this.room = JSON.parse(localStorage.getItem("room")!);
  }
  exit() : void {
    this.router.navigate(['/room', this.room!.name]);
  }
  more(): void {
    RoomSettingsComponent.bool = !RoomSettingsComponent.bool;

  }

}
