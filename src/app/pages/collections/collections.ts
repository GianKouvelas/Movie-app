import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-collections',
  imports: [CommonModule, FormsModule],
  templateUrl: './collections.html',
  styleUrl: './collections.css'
})
export class Collections {
  collections: any[] = [];
  showCreateForm = false;
  newTitle = '';
  newDescription = '';

  constructor(private router: Router) {
    this.loadCollections();
  }

  loadCollections() {
    const data = localStorage.getItem('collections');
    this.collections = data ? JSON.parse(data) : [];
  }

  saveCollections() {
    localStorage.setItem('collections', JSON.stringify(this.collections));
  }

  goBack() {
    this.router.navigate(['/']);
  } 

  createCollection() {
    if (!this.newTitle) return;
    this.collections.push({
      id: Date.now(),
      title: this.newTitle,
      description: this.newDescription,
      movies: []
    });
    this.saveCollections();
    this.newTitle = '';
    this.newDescription = '';
    this.showCreateForm = false;
  }

  goToCollection(id: number) {
    this.router.navigate(['/collections', id]);
  }
}