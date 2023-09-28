import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComposerNumberControlComponent } from './composer-text-control.component';

describe('ComposerNumberControlComponent', () => {
  let component: ComposerNumberControlComponent;
  let fixture: ComponentFixture<ComposerNumberControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComposerNumberControlComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ComposerNumberControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
