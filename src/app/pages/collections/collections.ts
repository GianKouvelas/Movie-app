import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

// Component that displays and manages all user-created movie collections
@Component({
  selector: 'app-collections',
  imports: [CommonModule, FormsModule],
  templateUrl: './collections.html',
  styleUrl: './collections.css'
})
export class Collections {
  collections: any[] = [];  // List of all collections loaded from localStorage
  showCreateForm = false;   // Controls visibility of the create collection form
  newTitle = '';            // Title input for new collection
  newDescription = '';      // Description input for new collection

  constructor(private router: Router) {
    // Load existing collections when component initializes
    this.loadCollections();
  }

  // Loads collections from localStorage and parses them
  loadCollections() {
    const data = localStorage.getItem('collections');
    this.collections = data ? JSON.parse(data) : [];
  }

  // Saves the current collections array to localStorage
  saveCollections() {
    localStorage.setItem('collections', JSON.stringify(this.collections));
  }

  // Navigates back to the Search page
  goBack() {
    this.router.navigate(['/']);
  }

  // Creates a new collection with a unique ID based on timestamp
  createCollection() {
    if (!this.newTitle) return;
    this.collections.push({
      id: Date.now(),       // Unique ID using current timestamp
      title: this.newTitle,
      description: this.newDescription,
      movies: []            // Empty movies array initially
    });
    this.saveCollections();
    // Reset form fields after creation
    this.newTitle = '';
    this.newDescription = '';
    this.showCreateForm = false;
  }

  // Navigates to the detail page of a specific collection
  goToCollection(id: number) {
    this.router.navigate(['/collections', id]);
  }

  // Deletes a collection
  deleteCollection(id: number) {
  this.collections = this.collections.filter((c: any) => c.id !== id);
  this.saveCollections();
}
}