import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EntityIconComponent } from './entity-icon.component';

describe('EntityIconComponent', () => {
  let component: EntityIconComponent;
  let fixture: ComponentFixture<EntityIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EntityIconComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EntityIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
