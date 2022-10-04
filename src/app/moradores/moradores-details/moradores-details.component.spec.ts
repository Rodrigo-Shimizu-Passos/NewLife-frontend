import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoradoresDetailsComponent } from './moradores-details.component';

describe('MoradoresDetailsComponent', () => {
  let component: MoradoresDetailsComponent;
  let fixture: ComponentFixture<MoradoresDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoradoresDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoradoresDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
