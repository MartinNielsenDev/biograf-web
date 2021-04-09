import {Component, OnInit} from '@angular/core';
import {SeatsService} from '../services/seats.service';
import {Seat} from '../models/seat';
import {Movie} from '../models/movie';
import {ActivatedRoute, Router} from '@angular/router';
import {MovieService} from '../services/movie.service';
import {Show} from '../models/show';
import {Ticket} from '../models/ticket';

@Component({
  selector: 'app-book-ticket',
  templateUrl: './book-ticket.component.html',
  styleUrls: ['./book-ticket.component.css']
})
export class BookTicketComponent implements OnInit {
  amountOfSeats = 1;
  selectedTicketOptions = [1, 2, 3, 4, 5];
  show: Show;
  movie: Movie;
  seats: Seat[];
  organizedSeats: Seat[][];
  selectedSeats: Seat[] = [];

  constructor(private fetchSeatsService: SeatsService, private movieService: MovieService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    if (localStorage.getItem('username') === null || localStorage.getItem('jwt') === null) {
      this.router.navigate(['/']);
      return;
    }
    const showId = parseInt(this.route.snapshot.paramMap.get('showId'), 0);
    if (showId === 0) {
      this.movie = new Movie();
    }
    this.movieService.fetchShow(showId).subscribe(
      (show: Show) => {
        this.fetchSeats(show.id, show.theaterId);
        this.fetchMovie(show.movieId);
        this.show = show;
        this.show.datetime = new Date(show.time * 1000);
      },
      (error: string) => {
        // error handling here
        this.movie = new Movie();
      });
  }

  selectSeat(seat: Seat): void {
    if (seat.isReserved) {
      return;
    }
    this.selectedSeats.forEach((selectedSeat: Seat) => {
      selectedSeat.isSelected = false;
    });
    this.selectedSeats = [];
    let offset = 1;

    while (this.selectedSeats.length + 1 < this.amountOfSeats) {
      if (seat.x - offset < 1 && seat.x + offset > 10) {
        this.selectedSeats = [];
        return;
      }
      if (seat.x - offset >= 1 && !this.organizedSeats[seat.y - 1][seat.x - offset - 1].isReserved) {
        this.selectedSeats.push(this.organizedSeats[seat.y - 1][seat.x - offset - 1]);
        if (this.selectedSeats.length + 1 >= this.amountOfSeats) {
          break;
        }
      }
      if (seat.x + offset <= 10 && !this.organizedSeats[seat.y - 1][seat.x + offset - 1].isReserved) {
        this.selectedSeats.push(this.organizedSeats[seat.y - 1][seat.x + offset - 1]);
        if (this.selectedSeats.length + 1 >= this.amountOfSeats) {
          break;
        }
      }
      offset++;
    }
    this.selectedSeats.push(seat);
    this.selectedSeats.forEach((s: Seat) => {
      s.isSelected = true;
    });
  }

  fetchMovie(movieId: number): void {
    this.movieService.fetchMovie(movieId).subscribe(
      (movie: Movie) => {
        this.movie = movie;
      }
    );
  }

  fetchSeats(showId: number, theaterId: number): void {
    this.fetchSeatsService.fetchSeats(showId, theaterId).subscribe(
      (seats: Seat[]) => {
        this.seats = seats;
        this.organizedSeats = [];
        for (let y = 1; y <= Math.max.apply(Math, this.seats.map((seat: Seat) => seat.y)); y++) {
          this.organizedSeats[y - 1] = [];
        }
        seats.forEach((seat: Seat) => {
          this.organizedSeats[seat.y - 1][seat.x - 1] = seat;
        });
      },
      (error: string) => {
        // error handling here
      });
  }

  seatClasses(seat: Seat): string {
    if (seat.isSelected) {
      return 'selected seat';
    } else if (seat.isReserved) {
      return 'reserved seat';
    }
    return 'empty seat';
  }

  changeTicketAmount(selectedOption: number): void {
    this.amountOfSeats = selectedOption;
  }

  reserveTickets(): void {
    if (this.selectedSeats.length === 0) {
      return;
    }
    const ticket = new Ticket();
    ticket.id = 0;
    ticket.isPaid = false;
    ticket.userId = 0;
    ticket.show = this.show.id;
    ticket.seats = this.selectedSeats.map((seat) => seat.id);
    this.movieService.createTicket(ticket).subscribe(
      (t: Ticket) => {
        this.selectedSeats.forEach((seat: Seat) => {
          seat.isReserved = true;
          seat.isSelected = false;
        });
        this.selectedSeats = [];
      },
      (error: string) => {
        // error handling here
      }
    );
  }
}
