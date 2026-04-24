import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Movie } from '../../services/movie';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MovieDetails } from '../movie-details/movie-details';

@Component({
  selector: 'app-search',
  imports: [CommonModule, FormsModule, MatDialogModule],
  templateUrl: './search.html',
  styleUrl: './search.css'
})
export class Search {
  searchQuery = '';
  movies: any[] = [];
  currentPage = 1;
  totalPages = 1;
  loading = false;

  constructor(private movieService: Movie, private dialog: MatDialog) {}

  onSearch() {
    if (this.searchQuery.length < 3) return;
    this.currentPage = 1;
    this.fetchMovies();
  }

  fetchMovies() {
    this.loading = true;
    this.movieService.searchMovies(this.searchQuery, this.currentPage).subscribe({
      next: (data) => {
        this.movies = data.results;
        this.totalPages = data.total_pages;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      }
    });
  }

  openMovieDetails(movieId: number) {
    this.dialog.open(MovieDetails, {
      data: { movieId },
      width: '600px'
    });
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.fetchMovies();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.fetchMovies();
    }
  }
}