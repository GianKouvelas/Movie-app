import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

// Component that displays a dialog for adding selected movies to a collection
@Component({
  selector: 'app-add-to-collection',
  imports: [CommonModule, MatDialogModule],
  templateUrl: './add-to-collection.html',
  styleUrl: './add-to-collection.css'
})
export class AddToCollection {
  collections: any[] = []; // All available collections loaded from localStorage

  constructor(
    public dialogRef: MatDialogRef<AddToCollection>, // Reference to close the dialog
    @Inject(MAT_DIALOG_DATA) public data: { movies: any[] } // Selected movies passed from Search page
  ) {
    // Load all existing collections when dialog opens
    this.collections = JSON.parse(localStorage.getItem('collections') || '[]');
  }

  // Adds the selected movies to the chosen collection, avoiding duplicates
  addToCollection(collection: any) {
    // Get IDs of movies already in the collection to prevent duplicates
    const existing = collection.movies.map((m: any) => m.id);
    this.data.movies.forEach(movie => {
      if (!existing.includes(movie.id)) {
        collection.movies.push(movie);
      }
    });

    // Update the collection in localStorage
    const collections = JSON.parse(localStorage.getItem('collections') || '[]');
    const index = collections.findIndex((c: any) => c.id === collection.id);
    collections[index] = collection;
    localStorage.setItem('collections', JSON.stringify(collections));

    this.dialogRef.close();
  }

  // Closes the dialog without making any changes
  close() {
    this.dialogRef.close();
  }
}