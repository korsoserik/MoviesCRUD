import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MovieModel } from '../models/movieModel';

@Component({
  selector: 'app-movie-edit',
  imports: [],
  templateUrl: './movie-edit.component.html',
  styleUrl: './movie-edit.component.css'
})
export class MovieEditComponent {
  @Input() movie: MovieModel | undefined;
  @Output() save = new EventEmitter<MovieModel>();
  @Output() cancel = new EventEmitter<MovieModel>();

  errorMessage = '';
  

  saveEdit(event: any): void {
    event.preventDefault();
    let form = event.target;

    let newMovie: MovieModel = {
      title: form.title.value,
      year: form.year.value,
      genre: form.genre.value,
      director: form.director.value,
      actors: form.actors.value,
    };
    console.log('New Processor: ', newMovie);
    let isValid = true;

    if (
      !newMovie.title || !newMovie.year || !newMovie.genre || !newMovie.director || !newMovie.actors
    ) 
    {
      this.errorMessage = 'All fields are required.';
      isValid = false;
    } 
    else if (isNaN(newMovie.year) || +newMovie.year <= 0) 
    {
      this.errorMessage = 'Year must be a positive number.';
      isValid = false;
    } else if (newMovie.title.length > 100) 
    {
      this.errorMessage = 'Title can be a maximum of 100 characters.';
      isValid = false;
    } else if (newMovie.genre.length > 50) 
    {
      this.errorMessage = 'Genre can be a maximum of 50 characters.';
      isValid = false;
    } else if (newMovie.director.length > 50) 
    {
      this.errorMessage = 'Director can be a maximum of 50 characters.';
      isValid = false;
    } else if (newMovie.actors.length > 200) 
    {
      this.errorMessage = 'Actors can be a maximum of 200 characters.';
      isValid = false;
    }

    if (isValid) {
      if (this.movie?.id) {
        newMovie.id = this.movie.id;
      }
      this.errorMessage = '';
      this.save.emit(newMovie);
    }

  }
  cancelEdit(): void {
    this.cancel.emit(this.movie);
  }
}
