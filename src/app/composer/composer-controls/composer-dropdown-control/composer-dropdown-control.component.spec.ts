import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComposerDropdownControlComponent } from './composer-dropdown-control.component';

describe('ComposerDropdownControlComponent', () => {
  let component: ComposerDropdownControlComponent;
  let fixture: ComponentFixture<ComposerDropdownControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComposerDropdownControlComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ComposerDropdownControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
