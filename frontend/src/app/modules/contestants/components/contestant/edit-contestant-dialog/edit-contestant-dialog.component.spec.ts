import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditContestantDialogComponent } from './edit-contestant-dialog.component';

describe('EditContestantDialogComponent', () => {
  let component: EditContestantDialogComponent;
  let fixture: ComponentFixture<EditContestantDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditContestantDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditContestantDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
