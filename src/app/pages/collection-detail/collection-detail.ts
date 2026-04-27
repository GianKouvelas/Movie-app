import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MovieDetails } from '../movie-details/movie-details';

// Component that displays the movies inside a specific collection
@Component({
  selector: 'app-collection-detail',
  imports: [CommonModule, MatDialogModule],
  templateUrl: './collection-detail.html',
  styleUrl: './collection-detail.css'
})
export class CollectionDetail {
  collection: any = null; // The current collection loaded from localStorage

  constructor(
    private route: ActivatedRoute, // Used to read the collection ID from the URL
    private router: Router,
    private dialog: MatDialog
  ) {
    // Get the collection ID from the URL and find the matching collection
    const id = Number(this.route.snapshot.paramMap.get('id'));
    const collections = JSON.parse(localStorage.getItem('collections') || '[]');
    this.collection = collections.find((c: any) => c.id === id);
  }

  // Removes a movie from the collection by filtering it out by ID
  removeMovie(movieId: number) {
    this.collection.movies = this.collection.movies.filter((m: any) => m.id !== movieId);
    this.saveCollection();
  }

  // Updates the collection in localStorage after any changes
  saveCollection() {
    const collections = JSON.parse(localStorage.getItem('collections') || '[]');
    const index = collections.findIndex((c: any) => c.id === this.collection.id);
    collections[index] = this.collection;
    localStorage.setItem('collections', JSON.stringify(collections));
  }

  // Opens the Movie Details dialog popup for a given movie ID
  openMovieDetails(movieId: number) {
    this.dialog.open(MovieDetails, {
      data: { movieId },
      width: '600px'
    });
  }

  // Navigates back to the Collections list page
  goBack() {
    this.router.navigate(['/collections']);
  }
}