import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContestantTableComponent } from './contestant-table.component';

describe('ContestantTableComponent', () => {
  let component: ContestantTableComponent;
  let fixture: ComponentFixture<ContestantTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContestantTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContestantTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
