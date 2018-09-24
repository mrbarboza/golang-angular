import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Router } from "@angular/router";

import * as auth0 from "auth0-js";

(window as any).global = window;

@Injectable()
export class AuthService {
  constructor(public router: Router) {}

  access_token: string;
  id_token: string;
  expires_at: string;

  auth0 = new auth0.WebAuth({
    clientID: environment.clientId,
    domain: environment.domain,
    responseType: "token id_token",
    audience: environment.audience,
    redirectUri: environment.callback,
    scope: "openid"
  });

  /**
   * login
   */
  public login(): void {
    this.auth0.authorize();
  }

  /**
   * handleAuthorization
   */
  public handleAuthorization(): void {
    this.auth0.parseHash((err, authResult) => {
      if (err) console.log(err);
      if (!err && authResult && authResult.accessToken && authResult.idToken) {
        window.location.hash = "";
        this.setSession(authResult);
      }
      this.router.navigate(["/home"]);
    });
  }

  /**
   * setSession
   */
  private setSession(authResult): void {
    const expiresAt = JSON.stringify(
      authResult.expiresId * 1000 + new Date().getTime()
    );
    this.access_token = authResult.accessToken;
    this.id_token = authResult.idToken;
    this.expires_at = expiresAt;
  }

  /**
   * logout
   */
  public logout(): void {
    this.access_token = null;
    this.id_token = null;
    this.expires_at = null;

    this.router.navigate(["/"]);
  }

  /**
   * isAuthenticated
   */
  public isAuthenticated(): boolean {
    const expiresAt = JSON.parse(this.expires_at || "{}");
    return new Date().getTime() < expiresAt;
  }

  /**
   * createAuthHeaderValue
   */
  public createAuthHeaderValue(): string {
    return "Bearer " + this.access_token;
  }
}
