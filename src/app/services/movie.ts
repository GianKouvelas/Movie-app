import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Service that handles all API calls to The Movie Database (TMDB)
@Injectable({ providedIn: 'root' })
export class Movie {
  // TMDB API credentials and base URL
  private apiKey = '85204a8cc33baf447559fb6d51b18313';
  private baseUrl = 'https://api.themoviedb.org/3';

  // HttpClient is injected to make HTTP requests
  constructor(private http: HttpClient) {}

  // Search movies by keyword with pagination support
  searchMovies(query: string, page: number = 1): Observable<any> {
    return this.http.get(`${this.baseUrl}/search/movie`, {
      params: { api_key: this.apiKey, query, page: page.toString() }
    });
  }

  // Fetch full details for a specific movie by ID
  getMovieDetails(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/movie/${id}`, {
      params: { api_key: this.apiKey }
    });
  }

  // Create a guest session to allow movie ratings without login
  getGuestSession(): Observable<any> {
    return this.http.get(`${this.baseUrl}/authentication/guest_session/new`, {
      params: { api_key: this.apiKey }
    });
  }

  // Submit a rating (1-10) for a movie using a guest session
  rateMovie(movieId: number, rating: number, sessionId: string): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/movie/${movieId}/rating`,
      { value: rating },
      { params: { api_key: this.apiKey, guest_session_id: sessionId } }
    );
  }
}