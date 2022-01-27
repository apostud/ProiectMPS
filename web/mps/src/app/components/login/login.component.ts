import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {RoomService} from "../../services/room.service";
import {User} from "../../entities/user";

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

  constructor(private router: Router, private roomService: RoomService) { }

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
    if(this.message === '') {
      // this.roomService.getUsers().subscribe((data:any) => {
      //   for(let user of data.body) {
      //     console.log(user.email , this.loginForm.value.email, user.password ,this.loginForm.value.password )
      //     if(user.email === this.loginForm.value.email) {
      //         localStorage.setItem('user', JSON.stringify(user))
      //         this.router.navigate(['/start']);
      //     }
      //   }
      // });

      this.roomService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe((data:any) => {
        console.log(data.body.user)
        localStorage.setItem('user', JSON.stringify(data.body.user));
        // localStorage.removeItem("room");
        this.router.navigate(['/start'])
      })
    }
  }

  clickCreate(): void {
    this.router.navigate(['/register']);
  }

}
