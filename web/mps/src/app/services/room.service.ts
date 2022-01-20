import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Room} from "../entities/room";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

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
}
