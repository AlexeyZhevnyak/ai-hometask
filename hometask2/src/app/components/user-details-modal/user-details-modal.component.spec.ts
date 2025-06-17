import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserDetailsModalComponent } from './user-details-modal.component';
import { User } from '../../models/user.model';

describe('UserDetailsModalComponent', () => {
  let component: UserDetailsModalComponent;
  let fixture: ComponentFixture<UserDetailsModalComponent>;

  const mockUser: User = {
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
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserDetailsModalComponent] // Import the standalone component
    }).compileComponents();

    fixture = TestBed.createComponent(UserDetailsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display user details when modal is open and user is provided', () => {
    component.user = mockUser;
    component.open = true;
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.modal-title').textContent).toContain(mockUser.name);
    expect(compiled.querySelector('.modal-email').textContent).toContain(mockUser.email);
    expect(compiled.innerHTML).toContain(mockUser.address.street);
    expect(compiled.innerHTML).toContain(mockUser.company.name);
    expect(compiled.querySelector('.map-link').getAttribute('href')).toContain(`${mockUser.address.geo.lat},${mockUser.address.geo.lng}`);
  });

  it('should not display modal when it is closed', () => {
    component.user = mockUser;
    component.open = false;
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.modal-backdrop')).toBeNull();
  });

  it('should emit close event when onClose is called', () => {
    spyOn(component.close, 'emit');
    component.onClose();
    expect(component.close.emit).toHaveBeenCalled();
  });

  it('should emit close event when close button is clicked', () => {
    spyOn(component.close, 'emit');
    component.user = mockUser;
    component.open = true;
    fixture.detectChanges();

    const closeButton = fixture.nativeElement.querySelector('.close-btn');
    closeButton.click();
    expect(component.close.emit).toHaveBeenCalled();
  });
}); 