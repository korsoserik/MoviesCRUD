import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MovieModel } from '../models/movieModel';

@Component({
  selector: 'app-movie-card',
  imports: [],
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.css'
})
export class MovieCardComponent {
  @Input() movie: MovieModel | undefined;
  @Output()Edit = new EventEmitter<MovieModel>();
  @Output()Delete = new EventEmitter<MovieModel>();

  edit(movie: MovieModel | undefined): void {
    this.Edit.emit(movie);
  }

  delete(movie: MovieModel | undefined): void {
    this.Delete.emit(movie);
  }
}
