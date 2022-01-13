import {User} from "./user";

export class Room {
  name?: string;
  type?: string;
  admin?: User;
  currentNo?: number;
  maxNo?: number;
  state?: string;
  isExtended?: boolean;
  players?: [User];
  score?: [number];
  audienceNo?: number;

}
