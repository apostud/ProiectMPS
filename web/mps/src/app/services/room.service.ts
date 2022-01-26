import { Injectable } from '@angular/core';
import {HttpClient, HttpParams, HttpResponse} from "@angular/common/http";
import {Room} from "../entities/room";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {User} from "../entities/user";

type EntityResponseType = HttpResponse<Room>;
type EntityArrayResponseType = HttpResponse<Room[]>;

@Injectable({
  providedIn: 'root'
})

export class RoomService {

  constructor(private http: HttpClient) { }

  public getPublicRooms() : Observable<EntityArrayResponseType> {
    return this.http.get<Room[]>('url', { observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => res));
  }
  public getRoomByName(name :string) : Observable<EntityResponseType> {
    const params = new HttpParams().set('name', name);
    return this.http.get<Room>('url', {params, observe:'response'})
      .pipe(map((res: EntityResponseType) => res));
  }
  public addUser(user: User) : any {
    console.log(user)
    return this.http.post<User>('http://localhost:5000/api/players/', user, {observe:"response"} )
      .pipe(map((res:HttpResponse<User>) => res));
    // let xml = new XMLHttpRequest();
    // xml.open("POST", 'http://localhost:5000/api/players', true);
    // xml.send(JSON.parse(JSON.stringify(user)));
  }
}
