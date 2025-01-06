import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MovieModel } from '../models/movieModel';

@Injectable({
  providedIn: 'root',
})

export class MovieService {
  jsonUrl = 'http://localhost:3000/movies';
  movies: MovieModel[] = [];
  constructor(private http: HttpClient) {}
  getContent(): Observable<MovieModel[]> {
    return this.http.get<MovieModel[]>(this.jsonUrl);
  }
  addMovie(movie: MovieModel): void {
    this.movies.push(movie);
    this.http.post(this.jsonUrl, movie).subscribe();
  }
  deleteMovie(movie: MovieModel ): void {
    this.movies = this.movies.filter((item) => item !== movie);
    this.http.delete(`${this.jsonUrl}/${movie.id}`).subscribe();
  }
  editMovie(movie: MovieModel): void {
    this.movies = this.movies.map((item) =>
      item.id === movie.id ? movie : item
    );
    this.http.put(`${this.jsonUrl}/${movie.id}`, movie).subscribe();
  }
}