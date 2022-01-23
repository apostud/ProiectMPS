import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {FormControl, FormGroup} from "@angular/forms";

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


  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  clickBackButton(): void {
    this.router.navigate(['/start']);
  }

  onClick(): void {
    console.log(this.createRoomForm.value.type);
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
