import {DecoderJwt} from "@utilities/decoder-jwt/decoder-jwt";
import {jwtDecode, JwtPayload} from "jwt-decode";
import {Injectable} from "@angular/core";
import {LocalStorage} from "@utilities/local-storage/local-storage";
import {AuthenticationService} from "@authentication/services/authentication/authentication.service";
import {JwtToken} from "@authentication/models/jwt-token";
import {JwtPayloadCustom} from "@utilities/decoder-jwt/imp/jwt-payload-custom";

@Injectable({
  providedIn: 'root'
})
export class DecoderJwtImp implements DecoderJwt {
  constructor(
    private localStorage: LocalStorage,
    private authentication: AuthenticationService
  ) {}
  public getAuthority(): string | undefined {
    const payload = this.getPayload()
    return payload?.authority
  }

  public getIssuer(): string | undefined {
    const payload = this.getPayload()
    return payload?.iss;
  }

  public getSubject(): string | undefined {
    const payload = this.getPayload()
    console.log(payload)
    return payload?.sub;
  }

  private getPayload(): JwtPayloadCustom | undefined {
    const token = this.localStorage.getValueLocalStorage<JwtToken>(this.authentication.getKeyJwtObject());
    if (token === null) {
      return;
    }
    if (token.refreshToken === undefined || token.tokenAccess === undefined || token.type === undefined) {
      return;
    }
    return jwtDecode<JwtPayloadCustom>(token?.tokenAccess);
  }
}
