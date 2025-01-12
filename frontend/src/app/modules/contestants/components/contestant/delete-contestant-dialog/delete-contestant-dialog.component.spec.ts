import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteContestantDialogComponent } from './delete-contestant-dialog.component';

describe('DeleteContestantDialogComponent', () => {
  let component: DeleteContestantDialogComponent;
  let fixture: ComponentFixture<DeleteContestantDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteContestantDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteContestantDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
