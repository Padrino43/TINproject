import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditContestDialogComponent } from './edit-contest-dialog.component';

describe('EditContestDialogComponent', () => {
  let component: EditContestDialogComponent;
  let fixture: ComponentFixture<EditContestDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [EditContestDialogComponent]
})
    .compileComponents();

    fixture = TestBed.createComponent(EditContestDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
