import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";


@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  clickBackButton(): void {
    this.router.navigate(['/start']);
  }

}
