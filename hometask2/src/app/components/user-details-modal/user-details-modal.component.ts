import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-user-details-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-details-modal.component.html',
  styleUrls: ['./user-details-modal.component.css']
})
export class UserDetailsModalComponent {
  @Input() user: User | null = null;
  @Input() open = false;
  @Output() close = new EventEmitter<void>();

  onClose(): void {
    this.close.emit();
  }
} 