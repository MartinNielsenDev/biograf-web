import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loggedIn: boolean;
  username: string;

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    if (localStorage.getItem('username') && localStorage.getItem('jwt')) {
      this.loggedIn = true;
      this.username = localStorage.getItem('username');
    }
  }

  logout(): void {
    localStorage.clear();
    alert('Logging out...');
    location.reload();
  }
}
