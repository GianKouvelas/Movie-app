import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MovieDetails } from '../movie-details/movie-details';

@Component({
  selector: 'app-collection-detail',
  imports: [CommonModule, MatDialogModule],
  templateUrl: './collection-detail.html',
  styleUrl: './collection-detail.css'
})
export class CollectionDetail {
  collection: any = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog
  ) {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    const collections = JSON.parse(localStorage.getItem('collections') || '[]');
    this.collection = collections.find((c: any) => c.id === id);
  }

  removeMovie(movieId: number) {
    this.collection.movies = this.collection.movies.filter((m: any) => m.id !== movieId);
    this.saveCollection();
  }

  saveCollection() {
    const collections = JSON.parse(localStorage.getItem('collections') || '[]');
    const index = collections.findIndex((c: any) => c.id === this.collection.id);
    collections[index] = this.collection;
    localStorage.setItem('collections', JSON.stringify(collections));
  }

  openMovieDetails(movieId: number) {
    this.dialog.open(MovieDetails, {
      data: { movieId },
      width: '600px'
    });
  }

  goBack() {
    this.router.navigate(['/collections']);
  }
}