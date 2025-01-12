import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditContestantPointsDialogComponent } from './edit-contestant-points-dialog.component';

describe('EditContestantPointsDialogComponent', () => {
  let component: EditContestantPointsDialogComponent;
  let fixture: ComponentFixture<EditContestantPointsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditContestantPointsDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditContestantPointsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
