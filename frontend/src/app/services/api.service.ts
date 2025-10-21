import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';

export interface ApiResponse<T> {
  count?: number;
  next?: string;
  previous?: string;
  results?: T[];
  data?: T;
}

export interface AuthTokens {
  access: string;
  refresh: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = environment.apiUrl || 'http://localhost:8000/api';
  private authTokens = new BehaviorSubject<AuthTokens | null>(null);

  constructor(private http: HttpClient) {
    // Load tokens from localStorage on init
    const savedTokens = localStorage.getItem('authTokens');
    if (savedTokens) {
      this.authTokens.next(JSON.parse(savedTokens));
    }
  }

  private getHeaders(): HttpHeaders {
    const tokens = this.authTokens.value;
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    if (tokens?.access) {
      headers = headers.set('Authorization', `Bearer ${tokens.access}`);
    }

    return headers;
  }

  // Authentication methods
  login(username: string, password: string): Observable<AuthTokens> {
    return this.http.post<AuthTokens>(`${this.baseUrl.replace('/api', '')}/api/token/`, {
      username,
      password
    });
  }

  refreshToken(): Observable<{ access: string }> {
    const tokens = this.authTokens.value;
    return this.http.post<{ access: string }>(`${this.baseUrl.replace('/api', '')}/api/token/refresh/`, {
      refresh: tokens?.refresh
    });
  }

  setAuthTokens(tokens: AuthTokens): void {
    this.authTokens.next(tokens);
    localStorage.setItem('authTokens', JSON.stringify(tokens));
  }

  clearAuthTokens(): void {
    this.authTokens.next(null);
    localStorage.removeItem('authTokens');
  }

  getAuthTokens(): AuthTokens | null {
    return this.authTokens.value;
  }

  isAuthenticated(): boolean {
    return !!this.authTokens.value?.access;
  }

  // Generic HTTP methods
  get<T>(endpoint: string, params?: HttpParams): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}/${endpoint}`, {
      headers: this.getHeaders(),
      params
    });
  }

  post<T>(endpoint: string, data: any): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}/${endpoint}`, data, {
      headers: this.getHeaders()
    });
  }

  put<T>(endpoint: string, data: any): Observable<T> {
    return this.http.put<T>(`${this.baseUrl}/${endpoint}`, data, {
      headers: this.getHeaders()
    });
  }

  patch<T>(endpoint: string, data: any): Observable<T> {
    return this.http.patch<T>(`${this.baseUrl}/${endpoint}`, data, {
      headers: this.getHeaders()
    });
  }

  delete<T>(endpoint: string): Observable<T> {
    return this.http.delete<T>(`${this.baseUrl}/${endpoint}`, {
      headers: this.getHeaders()
    });
  }

  // List method with pagination support
  list<T>(endpoint: string, params?: any): Observable<ApiResponse<T>> {
    let httpParams = new HttpParams();
    if (params) {
      Object.keys(params).forEach(key => {
        if (params[key] !== null && params[key] !== undefined) {
          httpParams = httpParams.set(key, params[key].toString());
        }
      });
    }

    return this.get<ApiResponse<T>>(endpoint, httpParams);
  }
}