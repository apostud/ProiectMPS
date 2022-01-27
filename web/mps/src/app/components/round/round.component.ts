import { Component, OnInit } from '@angular/core';
import {Room} from "../../entities/room";
import {RoomService} from "../../services/room.service";
import {Router} from "@angular/router";
import {RoomComponent} from "../room/room.component";
import {User} from "../../entities/user";

@Component({
  selector: 'app-round',
  templateUrl: './round.component.html',
  styleUrls: ['./round.component.css']
})
export class RoundComponent implements OnInit {

  room? : Room;
  name? : string

  answer: string | undefined;
  question: string | undefined;

  backToMenu: boolean = false;
  round: number | undefined;
  players: User[] = []
  score: number[] = []
  backUsers: User[] | null = [];
  scoreSpec = 0;

  constructor(private router: Router, private roomService: RoomService) { }

  ngOnInit(): void {
    this.question = RoomComponent.selectedQuestion;
    this.answer = RoomComponent.selectedAnswer;
    this.round = RoomComponent.round;
    if (RoomComponent.round === 3) {
      this.backToMenu = true;
    }
    this.name = this.router.url.split('/')[2];
   this.roomService.getRoomByName(this.router.url.split('/')[2]).subscribe((data:any) => {
     this.room = data.body;
     let ok = 0;
     let ok2= 0;
     this.roomService.getUsers().subscribe(res => {
       this.backUsers = res.body;
       for(let user of this.backUsers!) {
         for (let player of this.room?.players!) {
           if (JSON.parse(JSON.stringify(user))._id === player){
             if(user.role === "PLAYER") {
               this.players.push(user);
               this.score.push(this.room?.score![ok]!);
             } else if (user.role === "SPECTATOR"){
               this.scoreSpec += this.room?.score![ok]!;
               ok2++;
             }
             ok++;
           }
         }
        }
     });
     console.log(this.players);
     if (ok2 > 0) {
       this.score.push(Math.floor(this.scoreSpec/ok2));
     }
      this.startTimer();
   })
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
