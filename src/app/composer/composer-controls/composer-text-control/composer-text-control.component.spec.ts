import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComposerTextControlComponent } from './composer-text-control.component';

describe('ComposerTextControlComponent', () => {
  let component: ComposerTextControlComponent;
  let fixture: ComponentFixture<ComposerTextControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComposerTextControlComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ComposerTextControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
