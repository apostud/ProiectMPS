import { Component, OnInit } from '@angular/core';
import {User} from "../../entities/user";
import {Room} from "../../entities/room";
import {RoomService} from "../../services/room.service";
import {Router} from "@angular/router";


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
      let current = new Date();
      this.user = new User()
      this.user.fullName = 'user' + current.getTime();
      localStorage.setItem('user', JSON.stringify(this.user))
    }
    //decomenteaza dupa ce rezolvi url
    // this.roomService.getPublicRooms().subscribe((data:any) => {
    //   this.rooms = data.body;
    // })
    let user1 = new User()
    let user2 = new User()
    let room1 = new Room();
    let room2 = new Room();
    room1.name = "ceva"
    room1.type ='ceva'
    room1.admin = user1
    room1.currentNo = 11111
    room1.maxNo = 4
    // room1.state = 'nustiuceeasta'
    room1.isExtended = false
    room1.players = [user1, user2]
    room1.score = [1,2]
    room1.audienceNo = 3
    room2.name = "ceva"
    room2.type ='ceva'
    room2.admin = user1
    room2.currentNo = 22222
    room2.maxNo = 4
    // room2.state = 'nustiuceeasta'
    room2.isExtended = false
    room2.players = [user1, user2]
    room2.score = [1,2]
    room2.audienceNo = 3
    this.rooms = [room1, room2]
    console.log(this.rooms);
  }

  clickPrivateRoom(): void {
    this.router.navigate(['/create-private-room']);
  }

  clickPlay(room: Room): void {
    // let r = '/room:' + room.currentNo;
    // console.log(r);
    this.router.navigate(['/room', room.currentNo]);
  }

  clickNewRoom(): void {
    this.router.navigate(['/new-room']);
  }
}
