import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomePageComponent} from './home-page/home-page.component';
import {BrowseComponent} from './browse/browse.component';
import {MovieDetailsComponent} from './movie-details/movie-details.component';
import {BookTicketComponent} from './book-ticket/book-ticket.component';

const routes: Routes = [
  {path: '', component: HomePageComponent},
  {
    path: 'browse',
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: BrowseComponent
      },
      {
        path: ':movieId',
        component: MovieDetailsComponent
      }
    ]
  },
  {
    path: 'book',
    children: [
      {
        path: ':showId',
        component: BookTicketComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
