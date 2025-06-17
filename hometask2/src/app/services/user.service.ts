import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, tap } from 'rxjs';
import { User } from '../models/user.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/users`;

  // Signal to store users for reactive state management
  private usersSignal = signal<User[]>([]);

  // Expose users as a readonly signal
  public users = this.usersSignal.asReadonly();

  /**
   * Fetches all users from the API and updates the users signal
   */
  fetchUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl).pipe(
      tap(users => this.usersSignal.set(users))
    );
  }

  /**
   * Gets a specific user by ID
   */
  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }

  /**
   * Deletes a user (client-side only)
   */
  deleteUser(id: number): void {
    // Update the users signal by filtering out the deleted user
    this.usersSignal.update(users => users.filter(user => user.id !== id));
  }
}
