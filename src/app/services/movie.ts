import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class Movie {
  private apiKey = '85204a8cc33baf447559fb6d51b18313';
  private baseUrl = 'https://api.themoviedb.org/3';

  constructor(private http: HttpClient) {}

  searchMovies(query: string, page: number = 1): Observable<any> {
    return this.http.get(`${this.baseUrl}/search/movie`, {
      params: { api_key: this.apiKey, query, page: page.toString() }
    });
  }

  getMovieDetails(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/movie/${id}`, {
      params: { api_key: this.apiKey }
    });
  }

  getGuestSession(): Observable<any> {
    return this.http.get(`${this.baseUrl}/authentication/guest_session/new`, {
      params: { api_key: this.apiKey }
    });
  }

  rateMovie(movieId: number, rating: number, sessionId: string): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/movie/${movieId}/rating`,
      { value: rating },
      { params: { api_key: this.apiKey, guest_session_id: sessionId } }
    );
  }
}
