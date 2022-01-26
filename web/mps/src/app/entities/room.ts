import {User} from "./user";

export class Room {
  name?: string;
  pass? : string;
  type?: string;
  admin?: User;
  currentNo?: number;
  maxNo?: number;
  isExtended?: boolean;
  players?: User[];
  score?: number[];
  audienceNo?: number;
  round? : number;


}
