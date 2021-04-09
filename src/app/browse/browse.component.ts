import {Component, OnInit} from '@angular/core';
import {MovieService} from '../services/movie.service';
import {Movie} from '../models/movie';
import {Router} from '@angular/router';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.css']
})
export class BrowseComponent implements OnInit {
  movies: Movie[];

  constructor(private fetchMovieService: MovieService, private router: Router) {
  }

  ngOnInit(): void {
    if (localStorage.getItem('username') === null || localStorage.getItem('jwt') === null) {
      this.router.navigate(['/']);
      return;
    }
    this.fetchMovies();
  }

  fetchMovies(): void {
    this.fetchMovieService.fetchMovies().subscribe(
      (movies: Movie[]) => {
        this.movies = movies;
      },
      (error: string) => {
        // error handling here
      });
  }
}
