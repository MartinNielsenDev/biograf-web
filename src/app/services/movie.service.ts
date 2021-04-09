import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {environment} from '../../environments/environment';
import {catchError, map} from 'rxjs/operators';
import {Movie} from '../models/movie';
import {Show} from '../models/show';
import {Ticket} from '../models/ticket';
import {MovieTicket} from '../models/movieticket';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private http: HttpClient) {
  }

  // tslint:disable-next-line:typedef
  private handleError(error: HttpErrorResponse) {
    return throwError(error.message);
  }

  fetchMovies(): Observable<Movie[]> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('jwt')}`);
    return this.http.get(`${environment.apiUrl}/movies`, {headers}).pipe(
      map((response: Movie[]) => {
        return response;
      }),
      catchError(this.handleError)
    );
  }

  fetchMovie(id: number): Observable<Movie> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('jwt')}`);
    return this.http.get(`${environment.apiUrl}/movies/${id}`, {headers}).pipe(
      map((response: Movie) => {
        return response;
      }),
      catchError(this.handleError)
    );
  }

  fetchShows(movieId: number): Observable<Show[]> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('jwt')}`);
    return this.http.get(`${environment.apiUrl}/shows?movie_id=${movieId}`, {headers}).pipe(
      map((response: Show[]) => {
        return response;
      }),
      catchError(this.handleError)
    );
  }

  fetchShow(id: number): Observable<Show> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('jwt')}`);
    return this.http.get(`${environment.apiUrl}/shows/${id}`, {headers}).pipe(
      map((response: Show) => {
        return response;
      }),
      catchError(this.handleError)
    );
  }

  fetchTickets(): Observable<MovieTicket[]> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('jwt')}`);
    return this.http.get(`${environment.apiUrl}/tickets`, {headers}).pipe(
      map((response: MovieTicket[]) => {
        return response;
      }),
      catchError(this.handleError)
    );
  }

  createTicket(ticket: Ticket): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('jwt')}`);
    return this.http.post<Ticket>(`${environment.apiUrl}/tickets`, ticket, {headers}).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(this.handleError)
    );
  }
}
