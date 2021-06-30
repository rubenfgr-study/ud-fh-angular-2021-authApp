import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthResponse, User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _apiUrl = environment.api_url + '/auth';
  private _user!: User;

  get user() {
    return { ...this._user };
  }

  constructor(private http: HttpClient) {}

  register(name: string, email: string, password: string): Observable<any> {
    const url = `${this._apiUrl}/new`;
    const body = { name, email, password };
    return this.http.post<AuthResponse>(url, body).pipe(
      tap(({ ok, token }) => {
        if (ok) {
          localStorage.setItem('token', token);
        }
      }),
      map((resp) => resp.ok),
      catchError((err) => of(err.error.msg))
    );
  }

  login(email: string, password: string): Observable<any> {
    const url = `${this._apiUrl}/login`;
    const body = { email, password };
    return this.http.post<AuthResponse>(url, body).pipe(
      tap((resp) => {
        if (resp.ok) {
          localStorage.setItem('token', resp.token);
        }
      }),
      map((resp) => resp.ok),
      catchError((err) => of(err.error.msg))
    );
  }

  validateToken(): Observable<boolean> {
    const url = `${this._apiUrl}/renew`;
    const token = localStorage.getItem('token') || '';
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    };
    return this.http.get<AuthResponse>(url, httpOptions).pipe(
      map((resp) => {
        console.log(resp);
        localStorage.setItem('token', resp.token);
        this._user = {
          name: resp.user.name,
          uid: resp.user.uid,
          email: resp.user.email,
        };
        return resp.ok;
      }),
      catchError(() => of(false))
    );
  }

  logout() {
    localStorage.clear();
  }
}
