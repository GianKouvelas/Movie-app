import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Movie } from '../../services/movie';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-movie-details',
  imports: [CommonModule, MatDialogModule, FormsModule],
  templateUrl: './movie-details.html',
  styleUrl: './movie-details.css'
})
export class MovieDetails {
  movie: any = null;
  rating: number = 5;
  guestSessionId: string = '';
  ratingSubmitted = false;

  constructor(
    private movieService: Movie,
    public dialogRef: MatDialogRef<MovieDetails>,
    @Inject(MAT_DIALOG_DATA) public data: { movieId: number }
  ) {
    this.loadDetails();
    this.createGuestSession();
  }

  loadDetails() {
    this.movieService.getMovieDetails(this.data.movieId).subscribe({
      next: (data) => this.movie = data,
      error: (err) => console.error(err)
    });
  }

  createGuestSession() {
    this.movieService.getGuestSession().subscribe({
      next: (data) => this.guestSessionId = data.guest_session_id,
      error: (err) => console.error(err)
    });
  }

  submitRating() {
    this.movieService.rateMovie(this.data.movieId, this.rating, this.guestSessionId).subscribe({
      next: () => this.ratingSubmitted = true,
      error: (err) => console.error(err)
    });
  }

  close() {
    this.dialogRef.close();
  }
}