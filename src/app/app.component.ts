import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MovieListComponent } from "./movie-list/movie-list.component";
import { MovieModel } from './models/movieModel';
import { MovieService } from './service/movies.service';

@Component({
  selector: 'app-root',
  imports: [MovieListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  movies: MovieModel[];

  constructor(private movie:MovieService) {
    this.movies = movie.movies;
  }

  ngOnInit() {
    this.movie.getContent().subscribe({
      next: (result) => {
        console.log('Data loaded: ', result);
        this.movies = result;
        console.log(this.movies);
      },
      error: (err) => {
        console.error('Error loading data: ', err);
      },
    });
  }

  selectedMovie = '';

  onSelected(movieName: string): void {
    this.selectedMovie = movieName;
  }
}
