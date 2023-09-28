import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComposerNodeComponent } from './composer-node.component';

describe('ComposerNodeComponent', () => {
  let component: ComposerNodeComponent;
  let fixture: ComponentFixture<ComposerNodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComposerNodeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ComposerNodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
