import { Component } from '@angular/core';
import { MovieCardComponent } from "../movie-card/movie-card.component";
import { MovieModel } from '../models/movieModel';
import { MovieService } from '../service/movies.service';
import { MovieEditComponent } from "../movie-edit/movie-edit.component";

@Component({
  selector: 'app-movie-list',
  imports: [MovieCardComponent, MovieEditComponent],
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.css'
})
export class MovieListComponent {
  movies: MovieModel[];
  selectedMovie: MovieModel | undefined;

  constructor(private movie: MovieService) {
    this.movies = movie.movies;
    console.log(this.movies);

  }


  ngOnInit() {
    this.movie.getContent().subscribe({
      next: (result) => {
        console.log('Data loaded: ', result);
        this.movies = result;
      },
      error: (err) => {
        console.error('Error loading data: ', err);
      },
    });
  }

  edit(movie: MovieModel | undefined): void {
    this.selectedMovie = movie;
  }

  delete(movie: MovieModel | undefined): void {
    if(movie !== undefined){
      this.movies = this.movies.filter(m => m !== movie);
      this.movie.deleteMovie(movie);
    }
  }

  add(){
    this.selectedMovie = {title: '', year: 0, genre: '', director: '', actors: ''};

  }

  save(movie: MovieModel | undefined): void {
    console.log('Save');

    console.log(movie);
    if (movie != undefined) {
      console.log( movie.id);
      if (movie.id == undefined) {
        this.movie.addMovie(movie);
        location.reload();
      } else {
        this.movie.editMovie(movie);
        this.movies = this.movies.map((item) =>
          item.id === movie.id ? movie : item
        );
      }
      this.selectedMovie = undefined;
    }
  }

  cancel(): void {
    console.log('Cancel');
    this.selectedMovie = undefined;
  }
}
