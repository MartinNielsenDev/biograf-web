import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {HomePageComponent} from './home-page/home-page.component';
import {BrowseComponent} from './browse/browse.component';
import {HttpClientModule} from '@angular/common/http';
import {MovieDetailsComponent} from './movie-details/movie-details.component';
import {BookTicketComponent} from './book-ticket/book-ticket.component';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    BrowseComponent,
    MovieDetailsComponent,
    BookTicketComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
