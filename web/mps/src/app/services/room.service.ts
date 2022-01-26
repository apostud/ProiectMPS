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
    return this.http.get<Room[]>('http://localhost:5000/api/rooms/', { observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => res));
  }
  public getPrivateRooms() : Observable<EntityArrayResponseType> {
    return this.http.get<Room[]>('http://localhost:5000/api/rooms/private', { observe: 'response' })
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
  }
    public addRoom(room:  Room) : any {
    return this.http.post<Room>('http://localhost:5000/api/rooms/', room, {observe:"response"} )
      .pipe(map((res:HttpResponse<Room>) => res));
  }
  public getUsers() : Observable<HttpResponse<User[]>> {
    return this.http.get<User[]>('http://localhost:5000/api/players/', { observe:'response'})
      .pipe(map((res: any) => res));
  }
  public getUsersByEmail(email: string) : Observable<HttpResponse<User>> {
    const params = new HttpParams().set('email', email);
    return this.http.get<User>('http://localhost:5000/api/players/' + email, {observe:'response'})
      .pipe(map((res: HttpResponse<User>) => res));
  }

  public getRoomById(id: string) : Observable<HttpResponse<Room>> {
    const params = new HttpParams().set('id', id);
    return this.http.get<Room>('http://localhost:5000/api/rooms/' + id, {observe:'response'})
      .pipe(map((res: HttpResponse<Room>) => res));
  }

  public getRoom(room:  Room) : any {
    return this.http.post<Room>('http://localhost:5000/api/rooms/room', room, {observe:"response"} )
      .pipe(map((res:HttpResponse<Room>) => res));
  }
}
