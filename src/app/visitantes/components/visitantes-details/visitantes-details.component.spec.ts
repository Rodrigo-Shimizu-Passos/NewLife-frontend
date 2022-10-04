import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitantesDetailsComponent } from './visitantes-details.component';

describe('VisitantesDetailsComponent', () => {
  let component: VisitantesDetailsComponent;
  let fixture: ComponentFixture<VisitantesDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisitantesDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisitantesDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
