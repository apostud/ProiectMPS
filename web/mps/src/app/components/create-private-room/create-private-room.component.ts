import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {FormControl, FormGroup} from "@angular/forms";
import {RoomService} from "../../services/room.service";
import {Room} from "../../entities/room";

@Component({
  selector: 'app-create-private-room',
  templateUrl: './create-private-room.component.html',
  styleUrls: ['./create-private-room.component.css']
})
export class CreatePrivateRoomComponent implements OnInit {

  message: string|undefined;

  privateRoomForm = new FormGroup({
    name: new FormControl(''),
    password: new FormControl('')
  });

  constructor(private router: Router,
              private service: RoomService) { }

  ngOnInit(): void {
  }

  clickBackButton(): void {
    this.router.navigate(['/start']);
  }

  onClickActive(): void {
    this.onClick();
  }

  onClickPassive(): void {
    this.onClick();
  }

  onClick(): void {
    this.message = '';
    if (this.privateRoomForm.value.id === '') {
      this.message = 'All fields must be completed!';
    }
    if (this.privateRoomForm.value.password === '') {
      this.message = 'All fields must be completed!';
    }
    // this.service.getRoomById(this.privateRoomForm.value.id).subscribe(res => {
    //   console.log(res.body);
    //   console.log(this.privateRoomForm.value);
    // })
    let room = new Room();
    room.name = this.privateRoomForm.value.name;
    room.pass = this.privateRoomForm.value.password;
    this.service.getRoom(room).subscribe((res: any) => {
      if (res.body.name === room.name && res.body.pass === room.pass) {
        this.router.navigate(['/room', room.name]);
      }
      //this.router.navigate(['/room'], this.privateRoomForm.value.name);
    });
  }

}
