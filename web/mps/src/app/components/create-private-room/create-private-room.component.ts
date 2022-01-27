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
    this.message = '';
    if (this.privateRoomForm.value.id === '') {
      this.message = 'All fields must be completed!';
    }
    if (this.privateRoomForm.value.password === '') {
      this.message = 'All fields must be completed!';
    }

    let room = new Room();
    room.name = this.privateRoomForm.value.name;
    room.pass = this.privateRoomForm.value.password;
    this.service.getRoom(room).subscribe((res: any) => {
      let room2 = res.body;
      room2.players?.push(JSON.parse(localStorage.getItem("user")!)._id);
      room2.score?.push(0);
      room2.currentNo =   room2.currentNo + 1;
      this.service.updateRoom(room2).subscribe(()=> {
        localStorage.setItem("room", JSON.stringify(room2));
        this.router.navigate(['/room', room2.name]);
      });


    });
  }

  onClickPassive(): void {
    this.message = '';
    if (this.privateRoomForm.value.id === '') {
      this.message = 'All fields must be completed!';
    }
    if (this.privateRoomForm.value.password === '') {
      this.message = 'All fields must be completed!';
    }

    let room = new Room();
    room.name = this.privateRoomForm.value.name;
    room.pass = this.privateRoomForm.value.password;
    this.service.getRoom(room).subscribe((res: any) => {
      let room2 = res.body;
      let user = JSON.parse(localStorage.getItem('user')!);
      user.type = "spectator";
      this.service.updateUser(user).subscribe((data:any)=> {
        room2.players?.push(JSON.parse(localStorage.getItem("user")!)._id);

        room2.score?.push(0);
        room2.audienceNo  = room2.audienceNo! + 1;
        this.service.updateRoom(room2).subscribe(()=> {
          localStorage.setItem("room", JSON.stringify(room2));
          this.router.navigate(['/room', room2.name])
        });
      });


    });
  }



}
