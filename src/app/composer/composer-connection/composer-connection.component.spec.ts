import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComposerConnectionComponent } from './composer-connection.component';

describe('ComposerConnectionComponent', () => {
  let component: ComposerConnectionComponent;
  let fixture: ComponentFixture<ComposerConnectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComposerConnectionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ComposerConnectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
