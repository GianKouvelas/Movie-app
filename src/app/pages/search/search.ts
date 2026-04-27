import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Movie } from '../../services/movie';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MovieDetails } from '../movie-details/movie-details';
import { AddToCollection } from '../add-to-collection/add-to-collection';
import { RouterModule } from '@angular/router';
import { SearchValidator } from '../../directives/search-validator';

// Component responsible for searching movies and managing selections
@Component({
  selector: 'app-search',
  imports: [CommonModule, FormsModule, MatDialogModule, RouterModule, SearchValidator],
  templateUrl: './search.html',
  styleUrl: './search.css'
})
export class Search {
  searchQuery = '';           // Current search input value
  movies: any[] = [];         // List of movies returned from the API
  currentPage = 1;            // Current pagination page
  totalPages = 1;             // Total pages returned by the API
  loading = false;            // Loading state indicator
  selectedMovies: any[] = []; // Movies selected to add to a collection

  constructor(private movieService: Movie, private dialog: MatDialog, private cdr: ChangeDetectorRef) {}

  // Triggered on search button click or Enter key
  // Validates input before fetching movies
  onSearch() {
    if (this.searchQuery.length < 3) return;
    if (!/^[a-zA-Z0-9 ]*$/.test(this.searchQuery)) return;
    this.currentPage = 1;
    this.fetchMovies();
  }

  // Fetches movies from TMDB API based on current query and page
  fetchMovies() {
    this.loading = true;
    this.movieService.searchMovies(this.searchQuery, this.currentPage).subscribe({
      next: (data) => {
        this.movies = data.results;
        this.totalPages = data.total_pages;
        this.loading = false;
        this.cdr.detectChanges(); // Manually trigger change detection
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  // Toggles movie selection — adds if not selected, removes if already selected
  toggleSelect(movie: any) {
    const index = this.selectedMovies.findIndex(m => m.id === movie.id);
    if (index === -1) {
      this.selectedMovies.push(movie);
    } else {
      this.selectedMovies.splice(index, 1);
    }
  }

  // Returns true if the given movie is currently selected
  isSelected(movie: any): boolean {
    return this.selectedMovies.some(m => m.id === movie.id);
  }

  // Opens the Movie Details dialog popup for a given movie ID
  openMovieDetails(movieId: number) {
    this.dialog.open(MovieDetails, {
      data: { movieId },
      width: '600px'
    });
  }

  // Opens the Add to Collection dialog with the selected movies
  openAddToCollection() {
    this.dialog.open(AddToCollection, {
      data: { movies: this.selectedMovies },
      width: '400px'
    });
  }

  // Navigates to the next page of search results
  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.fetchMovies();
    }
  }

  // Navigates to the previous page of search results
  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.fetchMovies();
    }
  }
}