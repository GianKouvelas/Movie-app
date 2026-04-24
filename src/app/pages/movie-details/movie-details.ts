import { Component, Inject, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Movie } from '../../services/movie';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-movie-details',
  imports: [CommonModule, MatDialogModule, FormsModule],
  templateUrl: './movie-details.html',
  styleUrl: './movie-details.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovieDetails {
  movie: any = null;
  rating: number = 5;
  guestSessionId: string = '';
  ratingSubmitted = false;

  constructor(
    private movieService: Movie,
    public dialogRef: MatDialogRef<MovieDetails>,
    @Inject(MAT_DIALOG_DATA) public data: { movieId: number },
    private cdr: ChangeDetectorRef
  ) {
    this.loadDetails();
    this.createGuestSession();
  }

  loadDetails() {
    this.movieService.getMovieDetails(this.data.movieId).subscribe({
      next: (data) => {
        this.movie = data;
        this.cdr.markForCheck();
      },
      error: (err) => console.error(err)
    });
  }

  createGuestSession() {
    this.movieService.getGuestSession().subscribe({
      next: (data) => {
        this.guestSessionId = data.guest_session_id;
        this.cdr.markForCheck();
      },
      error: (err) => console.error(err)
    });
  }

  submitRating() {
    this.movieService.rateMovie(this.data.movieId, this.rating, this.guestSessionId).subscribe({
      next: () => {
        this.ratingSubmitted = true;
        this.cdr.markForCheck();
      },
      error: (err) => console.error(err)
    });
  }

  close() {
    this.dialogRef.close();
  }
}