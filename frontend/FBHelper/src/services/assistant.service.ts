import { HttpClient } from "@angular/common/http";
import { Inject, Injectable, signal } from '@angular/core';
import { catchError, delay, EMPTY, finalize, map, Observable, of } from "rxjs";
import { TransformResponse } from "../interfaces/transform-response.interface";
import { API_URL } from "../tokens";

const HEADERS = {
  'Content-Type': 'application/json'
}

@Injectable({
  providedIn: 'root'
})
export class AssistantService {
  private isLoading = signal(false);
  isDataLoading = this.isLoading.asReadonly();

  constructor(
    private http: HttpClient,
    @Inject(API_URL) private apiUrl: string
  ) { }

  transformTranscript(transcript: string): Observable<string> {
    this.isLoading.set(true);
    const url = `${this.apiUrl}/assistant/transcript-to-post`

    return this.http.post<TransformResponse>(url, {transcript}, {headers: HEADERS} )
      .pipe(
        delay(2000),
        map(resp => resp.message),
        finalize(() => this.isLoading.set(false)),
        catchError(({error}) => {
          alert(error.message);

          return EMPTY
        })
      )
  }
}
