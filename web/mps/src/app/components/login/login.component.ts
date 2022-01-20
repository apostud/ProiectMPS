import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  message: string|undefined;

  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onClick(): void {
    this.message = '';
    console.log(this.loginForm.value);
    if (this.loginForm.value.email === '') {
      this.message = 'All fields must be completed!';
    }
    if (this.loginForm.value.password === '') {
      this.message = 'All fields must be completed!';
    }
  }

  clickCreate(): void {
    this.router.navigate(['/register']);
  }

}
