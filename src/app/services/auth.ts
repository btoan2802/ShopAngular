import { Injectable, computed, effect, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { LoginRequest, LoginResponse, RegisterRequest } from '../models/auth.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private readonly http = inject(HttpClient);
    private readonly apiUrl = 'https://localhost:7241/api/User';
    private readonly storageKey = 'auth';

    readonly currentUser = signal<LoginResponse | null>(this.loadFromStorage());
    readonly isLoggedIn = computed(() => this.currentUser() !== null);
    readonly isAdmin = computed(() => this.currentUser()?.role === 'Admin');

    constructor() {
        effect(() => {
            const user = this.currentUser();
            if (user) {
                localStorage.setItem(this.storageKey, JSON.stringify(user));
            } else {
                localStorage.removeItem(this.storageKey);
            }
        });
    }

    login(request: LoginRequest): Observable<LoginResponse> {
        return this.http.post<LoginResponse>(`${this.apiUrl}/login`, request).pipe(
            tap(response => this.currentUser.set(response))
        );
    }

    register(request: RegisterRequest): Observable<unknown> {
        return this.http.post(`${this.apiUrl}/register`, request);
    }

    logout(): void {
        this.currentUser.set(null);
    }

    getToken(): string | null {
        return this.currentUser()?.token ?? null;
    }

    private loadFromStorage(): LoginResponse | null {
        const saved = localStorage.getItem(this.storageKey);
        return saved ? JSON.parse(saved) : null;
    }
}