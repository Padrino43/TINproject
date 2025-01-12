import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {BehaviorSubject, catchError, map, Observable, tap, throwError} from 'rxjs';
import {
  GetUserResponse,
  PostUser,
  PostUserResponse,
  User,
  UserLoginData,
} from '../models/user.model';
import { Router } from '@angular/router';
import { Md5 } from 'ts-md5';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl = environment.apiUrl;
  user = new BehaviorSubject<User | null>(null);
  private md5: any;
  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

  login(userData: UserLoginData): Observable<User[]> {
    return this.http.get<GetUserResponse[]>(`${this.apiUrl}/users`).pipe(
      map((userArr) =>{
        return userArr.filter(
          (user) =>
            user.email === userData.email
        )},
      ),
      map((userArr) => {
        const hashedPassword =
            this.getHash(userData.password,userArr[0].salt);
        return userArr.filter(
            (user) =>
                user.email === userData.email &&
                user.password === hashedPassword
        )
      }),
      map((userArr) =>
        userArr.map((user) => new User(user.email)),
      ),
      tap((userArr) => this.handleAuthentication(userArr)),
    );
  }

  isLoggedIn(): boolean {
    return !!this.user.getValue();
  }

  register(userData: PostUser): Observable<PostUserResponse> {
    return this.http.post<PostUserResponse>(`${this.apiUrl}/users`, userData)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 409) {
            return throwError(() => new Error('Email already exists'));
          }
          return throwError(() => error);
        })
      );
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/login']);

    localStorage.removeItem('user');
  }

  autoLogin() {
    const userData: { email: string; username: string } = JSON.parse(
      localStorage.getItem('user') as string,
    );
    if (!userData) {
      return;
    }

    const user = new User(userData.email);
    this.user.next(user);
  }

  private handleAuthentication(userArr: User[]) {
    if (userArr.length === 0) return;

    const user: User = userArr[0];
    this.user.next(user);
    localStorage.setItem('user', JSON.stringify(user));

    this.router.navigate(['/contests']);
  }
getHash(password: string, salt: string): string{
    this.md5 = new Md5();
    this.md5
        .appendStr(password)
        .appendStr(salt);
    return this.md5.end();
  }
}
