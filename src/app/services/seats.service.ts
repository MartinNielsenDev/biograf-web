import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {environment} from '../../environments/environment';
import {catchError, map} from 'rxjs/operators';
import {Seat} from '../models/seat';

@Injectable({
  providedIn: 'root'
})
export class SeatsService {

  constructor(private http: HttpClient) {
  }

  // tslint:disable-next-line:typedef
  private handleError(error: HttpErrorResponse) {
    return throwError(error.message);
  }

  fetchSeats(showId: number, theaterId: number): Observable<Seat[]> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('jwt')}`);
    return this.http.get(`${environment.apiUrl}/seats?show=${showId}&theater=${theaterId}`, {headers}).pipe(
      map((response: Seat[]) => {
        return response;
      }),
      catchError(this.handleError)
    );
  }
}
