import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { UserDetailsModalComponent } from '../user-details-modal/user-details-modal.component';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, UserDetailsModalComponent],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  private userService = inject(UserService);

  // Track selected user for modal
  selectedUser: User | null = null;

  // Flag to control modal visibility
  showModal = false;

  // Public getter for users data
  get users() {
    return this.userService.users();
  }

  ngOnInit(): void {
    // Fetch users when component initializes
    this.userService.fetchUsers().subscribe();
  }

  /**
   * Opens the user detail modal for the selected user
   */
  openUserDetail(user: User): void {
    this.selectedUser = user;
    this.showModal = true;
  }

  /**
   * Closes the user detail modal
   */
  closeModal(): void {
    this.showModal = false;
    this.selectedUser = null;
  }

  /**
   * Deletes a user from the list (client-side only)
   */
  deleteUser(event: Event, userId: number): void {
    // Stop event propagation to prevent opening the modal when clicking delete
    event.stopPropagation();

    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(userId);
    }
  }

  /**
   * Track function for ngFor to improve performance
   */
  trackByUserId(index: number, user: User): number {
    return user.id;
  }
}
