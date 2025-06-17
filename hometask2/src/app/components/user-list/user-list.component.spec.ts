import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserListComponent } from './user-list.component';
import { UserService } from '../../services/user.service';
import { of } from 'rxjs';
import { signal, WritableSignal } from '@angular/core';
import { User } from '../../models/user.model';

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;
  let mockUserService: Partial<UserService> & { users: WritableSignal<User[]> };
  let _internalUsersSignal: WritableSignal<User[]>;

  const mockUsers: User[] = [
    {
      id: 1,
      name: 'Leanne Graham',
      username: 'Bret',
      email: 'Sincere@april.biz',
      address: {
        street: 'Kulas Light',
        suite: 'Apt. 556',
        city: 'Gwenborough',
        zipcode: '92998-3874',
        geo: { lat: '-37.3159', lng: '81.1496' }
      },
      phone: '1-770-736-8031 x56442',
      website: 'hildegard.org',
      company: {
        name: 'Romaguera-Crona',
        catchPhrase: 'Multi-layered client-server neural-net',
        bs: 'harness real-time e-markets'
      }
    },
    {
      id: 2,
      name: 'Ervin Howell',
      username: 'Antonette',
      email: 'Shanna@melissa.tv',
      address: {
        street: 'Victor Plains',
        suite: 'Suite 879',
        city: 'Wisokyburgh',
        zipcode: '90566-7771',
        geo: { lat: '-43.9509', lng: '-34.4618' }
      },
      phone: '010-692-6593 x09125',
      website: 'anastasia.net',
      company: {
        name: 'Deckow-Crist',
        catchPhrase: 'Proactive didactic contingency',
        bs: 'synergize scalable supply-chains'
      }
    }
  ];

  beforeEach(async () => {
    const initialUsers = JSON.parse(JSON.stringify(mockUsers)); // Deep copy to prevent modification issues
    _internalUsersSignal = signal(initialUsers);

    mockUserService = {
      users: _internalUsersSignal.asReadonly() as WritableSignal<User[]>,
      fetchUsers: jasmine.createSpy('fetchUsers').and.returnValue(of(initialUsers)),
      deleteUser: jasmine.createSpy('deleteUser').and.callFake((id: number) => {
        _internalUsersSignal.update(users => users.filter(user => user.id !== id));
      })
    };

    await TestBed.configureTestingModule({
      imports: [UserListComponent], // Import the standalone component
      providers: [
        { provide: UserService, useValue: mockUserService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch users on ngOnInit', () => {
    expect(mockUserService.fetchUsers).toHaveBeenCalled();
    expect(component.users).toEqual(mockUsers); // Access getter as a property
  });

  it('should open user detail modal', () => {
    const userToOpen = mockUsers[0];
    component.openUserDetail(userToOpen);
    expect(component.selectedUser).toEqual(userToOpen);
    expect(component.showModal).toBe(true);
  });

  it('should close user detail modal', () => {
    component.selectedUser = mockUsers[0];
    component.showModal = true;
    component.closeModal();
    expect(component.selectedUser).toBeNull();
    expect(component.showModal).toBe(false);
  });

  it('should delete user', () => {
    const userToDelete = mockUsers[0];
    // Mock window.confirm using spyOn
    spyOn(window, 'confirm').and.returnValue(true);
    // Mock event.stopPropagation using jasmine.createSpy
    const mockEvent = { stopPropagation: jasmine.createSpy('stopPropagation') } as unknown as Event;

    component.deleteUser(mockEvent, userToDelete.id);

    expect(mockEvent.stopPropagation).toHaveBeenCalled();
    expect(window.confirm).toHaveBeenCalledWith('Are you sure you want to delete this user?');
    expect(mockUserService.deleteUser).toHaveBeenCalledWith(userToDelete.id);
    expect(component.users.length).toBe(mockUsers.length - 1); // Check the length of the array returned by the getter
    expect(component.users).not.toContain(userToDelete); // Check if the user is removed
  });

  it('should not delete user if confirmation is cancelled', () => {
    const userToDelete = mockUsers[0];
    spyOn(window, 'confirm').and.returnValue(false);
    const mockEvent = { stopPropagation: jasmine.createSpy('stopPropagation') } as unknown as Event;

    component.deleteUser(mockEvent, userToDelete.id);

    expect(mockEvent.stopPropagation).toHaveBeenCalled();
    expect(window.confirm).toHaveBeenCalledWith('Are you sure you want to delete this user?');
    expect(mockUserService.deleteUser).not.toHaveBeenCalled();
    expect(component.users.length).toBe(mockUsers.length); // Ensure length is unchanged
    expect(component.users).toContain(userToDelete); // Ensure user is still present
  });

  it('should return user id for trackByUserId', () => {
    const user = mockUsers[0];
    const index = 0;
    expect(component.trackByUserId(index, user)).toBe(user.id);
  });
}); 