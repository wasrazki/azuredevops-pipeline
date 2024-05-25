import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { LoginModel } from './loginModel';


@Injectable({
  providedIn: 'root'
})

export class LoginService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  private readonly TOKEN_KEY = 'jwtToken';
  private readonly AUTH_API = 'http://localhost:3000/auth/login';

   isLoggedIn = false;

  constructor(private http: HttpClient) {
    // Check if a token is already stored 
    this.isAuthenticatedSubject.next(!!localStorage.getItem(this.TOKEN_KEY));
  }

  login(loginData: LoginModel): Observable<any> {
    return this.http.post(this.AUTH_API, loginData).pipe(
      tap((response: any) => {
        if (response && response.token) {
          // Store the JWT token in local storage
          localStorage.setItem(this.TOKEN_KEY, response.token);
          this.isLoggedIn=true; 

          // Set isAuthenticated to true
          this.isAuthenticatedSubject.next(true);
        }
      })
    );
  }

  logout(): void {
    // Remove the JWT token from local storage
    localStorage.removeItem(this.TOKEN_KEY);

    // Set isAuthenticated to false
    this.isAuthenticatedSubject.next(false);
  }

  getJwtToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }


  isLoggedInUser() {
    let token = localStorage.getItem('jwtToken');
    if (token) {
      return true;
    } else {
      return false;
    }
  }
}