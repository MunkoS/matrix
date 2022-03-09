import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopulationGenerationComponent } from './population-generation.component';

describe('PopulationGenerationComponent', () => {
  let component: PopulationGenerationComponent;
  let fixture: ComponentFixture<PopulationGenerationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopulationGenerationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopulationGenerationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
