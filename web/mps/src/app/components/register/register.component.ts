import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  message: string|undefined;

  registerForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    retypePassword: new FormControl('')
  });

  constructor() { }

  ngOnInit(): void {
  }

  onClick(): void {
    this.message = '';
    console.log(this.registerForm.value);
    if (this.registerForm.value.password !== this.registerForm.value.retypePassword) {
      this.message = 'Passwords do not match!';
    }
    if (this.registerForm.value.name === '') {
      this.message = 'All fields must be completed!';
    }
    if (this.registerForm.value.email === '') {
      this.message = 'All fields must be completed!';
    }
    if (this.registerForm.value.password === '') {
      this.message = 'All fields must be completed!';
    }
    if (this.registerForm.value.retypePassword === '') {
      this.message = 'All fields must be completed!';
    }

  }

}
