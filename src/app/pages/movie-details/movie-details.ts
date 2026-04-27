import { Component, Inject, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Movie } from '../../services/movie';
import { FormsModule } from '@angular/forms';

// Component that displays detailed information about a movie in a dialog popup
@Component({
  selector: 'app-movie-details',
  imports: [CommonModule, MatDialogModule, FormsModule],
  templateUrl: './movie-details.html',
  styleUrl: './movie-details.css',
  // OnPush strategy means change detection only runs when inputs change or markForCheck() is called
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovieDetails {
  movie: any = null;          // Full movie details fetched from the API
  rating: number = 5;         // Default rating value (1-10)
  guestSessionId: string = ''; // Session ID required to submit ratings
  ratingSubmitted = false;    // Tracks whether the user has submitted a rating

  constructor(
    private movieService: Movie,
    public dialogRef: MatDialogRef<MovieDetails>,  // Reference to close the dialog
    @Inject(MAT_DIALOG_DATA) public data: { movieId: number }, // Movie ID passed from parent
    private cdr: ChangeDetectorRef  // Needed to manually trigger UI updates with OnPush
  ) {
    this.loadDetails();
    this.createGuestSession();
  }

  // Fetches full movie details from the API using the movie ID
  loadDetails() {
    this.movieService.getMovieDetails(this.data.movieId).subscribe({
      next: (data) => {
        this.movie = data;
        this.cdr.markForCheck(); // Notify Angular to re-render the component
      },
      error: (err) => console.error(err)
    });
  }

  // Creates a guest session to allow rating without user authentication
  createGuestSession() {
    this.movieService.getGuestSession().subscribe({
      next: (data) => {
        this.guestSessionId = data.guest_session_id;
        this.cdr.markForCheck();
      },
      error: (err) => console.error(err)
    });
  }

  // Submits the user's rating for the movie using the guest session
  submitRating() {
    this.movieService.rateMovie(this.data.movieId, this.rating, this.guestSessionId).subscribe({
      next: () => {
        this.ratingSubmitted = true;
        this.cdr.markForCheck();
      },
      error: (err) => console.error(err)
    });
  }

  // Closes the dialog popup
  close() {
    this.dialogRef.close();
  }
}