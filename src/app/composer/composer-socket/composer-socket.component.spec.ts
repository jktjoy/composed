import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComposerSocketComponent } from './composer-socket.component';

describe('ComposerSocketComponent', () => {
  let component: ComposerSocketComponent;
  let fixture: ComponentFixture<ComposerSocketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComposerSocketComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ComposerSocketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
