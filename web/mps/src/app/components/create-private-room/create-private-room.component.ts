import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-create-private-room',
  templateUrl: './create-private-room.component.html',
  styleUrls: ['./create-private-room.component.css']
})
export class CreatePrivateRoomComponent implements OnInit {

  message: string|undefined;

  privateRoomForm = new FormGroup({
    id: new FormControl(''),
    password: new FormControl('')
  });

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  clickBackButton(): void {
    this.router.navigate(['/start']);
  }

  onClick(): void {
    this.message = '';
    if (this.privateRoomForm.value.id === '') {
      this.message = 'All fields must be completed!';
    }
    if (this.privateRoomForm.value.password === '') {
      this.message = 'All fields must be completed!';
    }
  }

}
