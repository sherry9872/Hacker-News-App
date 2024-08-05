import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, catchError, map  } from 'rxjs';

interface Story {
  id: number;
  title: string;
  url?: string;
}

@Injectable({
  providedIn: 'root'
})
export class HackerNewsService {
  private apiUrl = 'https://localhost:7074/api/HackerNews';  // Adjust API URL

  constructor(private http: HttpClient) { }

  getNewestStories(): Observable<Story[]> {
    return this.http.get<any>(`${this.apiUrl}/stories`).pipe(
      catchError(this.handleError)
    );
  }

  searchStories(query: string): Observable<Story[]> {
    return this.getNewestStories().pipe(
      map((stories: any[]) => stories.filter((story: { title: string; }) => story.title.toLowerCase().includes(query.toLowerCase())))
    );
  }

  private handleError(error: HttpErrorResponse) {
    // Log the error or send it to a monitoring service
    console.error('An error occurred:', error.message);

    // Return a user-friendly error message
    return throwError('Something went wrong; please try again later.');
  }
}
