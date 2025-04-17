import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Amplify, Auth } from 'aws-amplify';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';

import { environment } from '../../environments/environment';
import { ISignUpResult } from 'amazon-cognito-identity-js';

export interface IUser {
  email: string;
  password: string;
  showPassword: boolean;
  code: string;
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class CognitoService implements CanActivate {
  private authenticationSubject: BehaviorSubject<any>;
  authUsrEmail: string = ''; // Current Authenticated user
  constructor(private router: Router) {
    Amplify.configure({
      Auth: environment.cognito,
    });

    this.authenticationSubject = new BehaviorSubject<boolean>(false);
  }

  public signUp(user: IUser): Promise<any> {
    let response: Promise<any> = Promise.resolve(100);

    try {
      response = Auth.signUp({
        username: user.email,
        password: user.password,
      });
      console.log(`In cognito service try block - ${response}`);
    } catch (e) {
      console.log(
        `Error occured in cognito service signUp call - ` + (e as Error).message
      );
    }
    console.log(
      `About to return response from cognito signUp service - ${response}`
    );
    return response;
  }

  public confirmSignUp(user: IUser): Promise<any> {
    return Auth.confirmSignUp(user.email, user.code);
  }

  public signIn(user: IUser): Promise<any> {
    let response: Promise<any> = Promise.resolve(100);
    //let authorized: boolean = false;
    response = Auth.signIn(user.email, user.password);

    if (!this.isAuthenticated()) {
      throw new Error('User is not Authorized...');
    }

    return response.then((result) => {
      this.authenticationSubject.next(this.isAuthenticated());
    });
  }

  public signOut(): Promise<any> {
    this.authUsrEmail = '';
    return Auth.signOut().then(() => {
      this.authenticationSubject.next(false);
    });
  }

  public canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    //this.router.navigate(['/'])
    if (!this.isAuthenticated()) {
      this.router.navigate(['/signIn']);
    }
    return this.isAuthenticated();
    //end of canActivate
  }

  public isAuthenticated(): Promise<boolean> {
    return this.getUser()
      .then((authenticatedUser) => {
        console.log(
          `CognitoService.isAuthenticated: ${authenticatedUser}, setting authorized to true!`
        );
        return true;
      })
      .catch((err) => {
        console.log(
          `CognitoService.isAuthenticated: ${err}, setting authorized to false!`
        );
        return false;
      });
  }

  /*
  public isAuthenticated(): Promise<boolean> {
    if (this.authenticationSubject.value) {
      return Promise.resolve(true);
    } else {
      return this.getUser()
        .then((user: any) => {
          if (user) {
            return true;
          } else {
            return false;
          }
        })
        .catch(() => {
          return false;
        });
    }
  }
  */

  public getUser(): Promise<any> {
    return Auth.currentAuthenticatedUser();
  }

  public getAuthenticateUserEmail(): string {
    this.getUser().then((user) => {
      this.authUsrEmail = user.attributes.email;
      console.log(
        'CognitoService.getAuthenticateUserEmail(): user email = ' +
          this.authUsrEmail
      );
    });
    console.log(
      'CognitoService.getAuthenticateUserEmail(): Returning user email = ' +
        this.authUsrEmail
    );
    return this.authUsrEmail;
  }

  public updateUser(user: IUser): Promise<any> {
    return Auth.currentUserPoolUser().then((cognitoUser: any) => {
      return Auth.updateUserAttributes(cognitoUser, user);
    });
  }
}
