import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Movie } from '../../services/movie';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MovieDetails } from '../movie-details/movie-details';
import { AddToCollection } from '../add-to-collection/add-to-collection';
import { RouterModule } from '@angular/router';
import { SearchValidator } from '../../directives/search-validator';

@Component({
  selector: 'app-search',
  imports: [CommonModule, FormsModule, MatDialogModule, RouterModule, SearchValidator],
  templateUrl: './search.html',
  styleUrl: './search.css'
})
export class Search {
  searchQuery = '';
  movies: any[] = [];
  currentPage = 1;
  totalPages = 1;
  loading = false;
  selectedMovies: any[] = [];

  constructor(private movieService: Movie, private dialog: MatDialog) {}

  onSearch() {
    if (this.searchQuery.length < 3) return;
    if (!/^[a-zA-Z0-9 ]*$/.test(this.searchQuery)) return;
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

  toggleSelect(movie: any) {
    const index = this.selectedMovies.findIndex(m => m.id === movie.id);
    if (index === -1) {
      this.selectedMovies.push(movie);
    } else {
      this.selectedMovies.splice(index, 1);
    }
  }

  isSelected(movie: any): boolean {
    return this.selectedMovies.some(m => m.id === movie.id);
  }

  openMovieDetails(movieId: number) {
    this.dialog.open(MovieDetails, {
      data: { movieId },
      width: '600px'
    });
  }

  openAddToCollection() {
    this.dialog.open(AddToCollection, {
      data: { movies: this.selectedMovies },
      width: '400px'
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