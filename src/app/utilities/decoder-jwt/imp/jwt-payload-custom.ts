import {JwtPayload} from "jwt-decode";

export interface JwtPayloadCustom extends JwtPayload{
  authority?: string
}
