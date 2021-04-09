import {Component, OnInit} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {MovieTicket} from '../models/movieticket';
import {MovieService} from '../services/movie.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  movieTickets: MovieTicket[];
  username: string;
  password: string;
  error: string;
  loggedIn = false;

  constructor(private authService: AuthService, private movieService: MovieService) {
  }

  ngOnInit(): void {
    if (localStorage.getItem('username') && localStorage.getItem('jwt')) {
      this.username = localStorage.getItem('username');
      this.loggedIn = true;
      this.movieService.fetchTickets().subscribe(
        (movieTickets: MovieTicket[]) => {
          this.movieTickets = movieTickets;
          console.log(this.movieTickets);
        }
      );
    }
  }

  login(): void {
    if (this.username === undefined || this.password === undefined || this.username.length <= 0 || this.password.length <= 0) {
      return;
    }
    this.authService.fetchToken(this.username, this.password).subscribe(
      (token: string) => {
        localStorage.setItem('username', this.username);
        localStorage.setItem('jwt', token);
        alert('Successfully logged in!');
        location.reload();
      },
      (error: string) => {
        // error handling here
        this.error = error;
      }
    );
  }
}
