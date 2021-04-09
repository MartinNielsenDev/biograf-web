import {Component, OnInit} from '@angular/core';
import {MovieService} from '../services/movie.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Movie} from '../models/movie';
import {Show} from '../models/show';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {
  movieId: number;
  movie: Movie;
  shows: Show[];

  constructor(private fetchMovieService: MovieService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    if (localStorage.getItem('username') === null || localStorage.getItem('jwt') === null) {
      this.router.navigate(['/']);
      return;
    }
    this.movieId = parseInt(this.route.snapshot.paramMap.get('movieId'), 0);

    this.fetchMovieService.fetchMovie(this.movieId).subscribe(
      (movie: Movie) => {
        this.movie = movie;
        this.fetchMovieService.fetchShows(this.movieId).subscribe(
          (shows: Show[]) => {
            this.shows = shows;
            this.shows.forEach((show: Show) => {
              show.datetime = new Date(show.time * 1000);
            });
            this.shows.sort((a: Show, b: Show) => (a.time > b.time) ? 1 : -1);
          }
        );
      }
    );
  }
}
