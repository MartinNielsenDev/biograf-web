import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {environment} from '../../environments/environment';
import {catchError, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
  }

  // tslint:disable-next-line:typedef
  private handleError(error: HttpErrorResponse) {
    return throwError(error.message);
  }

  fetchToken(username: string, password: string): Observable<string> {
    const body = JSON.stringify({username, password});
    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    return this.http.post<string>(`${environment.apiUrl}/auth`, body, {headers}).pipe(
      map((response: string) => {
        return response;
      }),
      catchError(this.handleError)
    );
  }
}
