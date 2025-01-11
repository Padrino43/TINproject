import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteContestDialogComponent } from './delete-contest-dialog.component';

describe('DeleteClientDialogComponent', () => {
  let component: DeleteContestDialogComponent;
  let fixture: ComponentFixture<DeleteContestDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [DeleteContestDialogComponent]
})
    .compileComponents();

    fixture = TestBed.createComponent(DeleteContestDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
