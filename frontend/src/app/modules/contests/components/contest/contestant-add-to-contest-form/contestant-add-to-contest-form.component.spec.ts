import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContestantAddToContestFormComponent } from './contestant-add-to-contest-form.component';

describe('ContestantAddToContestFormComponent', () => {
  let component: ContestantAddToContestFormComponent;
  let fixture: ComponentFixture<ContestantAddToContestFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContestantAddToContestFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContestantAddToContestFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
