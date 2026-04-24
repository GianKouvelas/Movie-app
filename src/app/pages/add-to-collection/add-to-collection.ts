import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-to-collection',
  imports: [CommonModule, MatDialogModule],
  templateUrl: './add-to-collection.html',
  styleUrl: './add-to-collection.css'
})
export class AddToCollection {
  collections: any[] = [];

  constructor(
    public dialogRef: MatDialogRef<AddToCollection>,
    @Inject(MAT_DIALOG_DATA) public data: { movies: any[] }
  ) {
    this.collections = JSON.parse(localStorage.getItem('collections') || '[]');
  }

  addToCollection(collection: any) {
    const existing = collection.movies.map((m: any) => m.id);
    this.data.movies.forEach(movie => {
      if (!existing.includes(movie.id)) {
        collection.movies.push(movie);
      }
    });
    const collections = JSON.parse(localStorage.getItem('collections') || '[]');
    const index = collections.findIndex((c: any) => c.id === collection.id);
    collections[index] = collection;
    localStorage.setItem('collections', JSON.stringify(collections));
    this.dialogRef.close();
  }

  close() {
    this.dialogRef.close();
  }
}