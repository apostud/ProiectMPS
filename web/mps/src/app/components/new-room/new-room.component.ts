import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {FormControl, FormGroup} from "@angular/forms";
import {Room} from "../../entities/room";
import {RoomService} from "../../services/room.service";

@Component({
  selector: 'app-new-room',
  templateUrl: './new-room.component.html',
  styleUrls: ['./new-room.component.css']
})
export class NewRoomComponent implements OnInit {

  readonly = true;
  types: string[] = ['private', 'public'];
  message: string|undefined;
  createRoomForm = new FormGroup({
    maxNo: new FormControl(''),
    type: new FormControl(''),
    password: new FormControl('')
  });


  constructor(private router: Router, private roomService: RoomService) { }

  ngOnInit(): void {
  }

  clickBackButton(): void {
    this.router.navigate(['/start']);
  }

  onClick(): void {
    console.log(this.createRoomForm.value.type);
    let room = new Room();
    let current = new Date();
    room.name = "room" + current.getTime();
    room.type = this.createRoomForm.value.type;
    room.admin = JSON.parse(localStorage.getItem("user")!);
    room.currentNo = 1;
    room.maxNo = this.createRoomForm.value.maxNo;
    room.players = [room.admin!];
    room.score = [0];
    room.audienceNo = 0;
    room.isExtended = false;
    // room.round = 1;
    if(room.type === 'private') {
      room.pass = this.createRoomForm.value.password;
    }else {
      room.pass='-';
    }
    console.log(room.type)
    this.roomService.addRoom(room).subscribe(() => {
      this.router.navigate(['/room', room.name]);
    });
  }

  async clickCheck(): Promise<void> {
    if (this.createRoomForm.value.type === 'public') {
      this.readonly = true;
      console.log(this.readonly);
    } else if (this.createRoomForm.value.type === 'private') {
      this.readonly = false;
      console.log(this.readonly);
    }
   await(10);
  }
}
