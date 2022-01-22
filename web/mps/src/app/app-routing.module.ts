import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {HomeComponent} from "./components/home/home.component";
import {RegisterComponent} from "./components/register/register.component";
import {RoomComponent} from "./components/room/room.component";
import {StartPageComponent} from "./components/start-page/start-page.component";
import {CreatePrivateRoomComponent} from "./components/create-private-room/create-private-room.component";
const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'room/:id',
    component: RoomComponent
  },
  {
    path: 'start',
    component: StartPageComponent,
    // children: [
    //   {
    //     path: 'room',
    //     component: RoomComponent
    //   }
    // ]
  },
  {
    path: 'create-private-room',
    component: CreatePrivateRoomComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
