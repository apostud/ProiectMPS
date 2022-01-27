import { Component, OnInit } from '@angular/core';
import {User} from "../../entities/user";
import {Room} from "../../entities/room";
import {RoomService} from "../../services/room.service";
import {Router} from "@angular/router";
import {J} from "@angular/cdk/keycodes";


@Component({
  selector: 'app-start-page',
  templateUrl: './start-page.component.html',
  styleUrls: ['./start-page.component.css']
})
export class StartPageComponent implements OnInit {

  public user?: User
  public rooms? : Room[] = []
  private roomService: RoomService
  constructor(roomService: RoomService,
              private router: Router) {
    this.roomService = roomService;
  }

  ngOnInit(): void {

    if(!localStorage.getItem('user')) {
      // user.email = this.registerForm.value.email;
      // user.fullName = this.registerForm.value.name;
      // console.log(this.registerForm.value.name)
      // user.password = this.registerForm.value.password;
      // user.role = "PLAYER";
      // user.isAdmin = false;
      // user.isActive = false;
      // this.roomService.addUser(user).subscribe((data:any) => console.log(data.body));
      let current = new Date();
      this.user = new User()
      this.user.fullName = 'user' + current.getTime();
      this.user.password ="-";
      this.user.isActive = false;
      this.user.isAdmin = false;
      this.user.role = "PLAYER";
      this.user.email = this.user.fullName;

      console.log(this.user)
      this.roomService.addUser(this.user).subscribe((data:any)=> {
        localStorage.setItem('user',JSON.stringify(data.body.user))
      });
    }

    //decomenteaza dupa ce rezolvi url
    this.roomService.getPublicRooms().subscribe((data:any) => {
      this.rooms = data.body;
    })

  }

  clickPrivateRoom(): void {
    this.router.navigate(['/create-private-room']);
  }

  clickPlaySpectator(room: Room): void {

     let user = JSON.parse(localStorage.getItem('user')!);
      user.type = "SPECTATOR";
    this.roomService.updateUser(user).subscribe((data:any)=> {
        room.players?.push(JSON.parse(localStorage.getItem("user")!)._id);

        room.score?.push(0);
        room.audienceNo  = room.audienceNo! + 1;
        this.roomService.updateRoom(room).subscribe(()=> {
          localStorage.setItem("room", JSON.stringify(room));
          this.router.navigate(['/room', room.name]);
        });
      });


  }

  clickPlayer(room: Room): void {
        room.players?.push(JSON.parse(localStorage.getItem("user")!)._id);
        room.score?.push(0);
    room.currentNo =   room.currentNo! + 1;
       console.log(JSON.parse(localStorage.getItem("user")!)._id)
        this.roomService.updateRoom(room).subscribe(()=> {
          localStorage.setItem("room", JSON.stringify(room));
          this.router.navigate(['/room', room.name]);
        });
  }

  clickNewRoom(): void {
    this.router.navigate(['/new-room']);
  }

  clickLogOut(): void {
    localStorage.removeItem('user');
    this.router.navigate(['/']);
  }
}
