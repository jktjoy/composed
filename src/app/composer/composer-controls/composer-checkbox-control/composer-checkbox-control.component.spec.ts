import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComposerCheckboxControlComponent } from './composer-checkbox-control.component';

describe('ComposerCheckboxControlComponent', () => {
  let component: ComposerCheckboxControlComponent;
  let fixture: ComponentFixture<ComposerCheckboxControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComposerCheckboxControlComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ComposerCheckboxControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
