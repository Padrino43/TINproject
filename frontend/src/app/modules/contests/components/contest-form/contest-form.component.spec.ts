import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContestFormComponent } from './contest-form.component';

describe('ContestFormComponent', () => {
  let component: ContestFormComponent;
  let fixture: ComponentFixture<ContestFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [ContestFormComponent]
})
    .compileComponents();

    fixture = TestBed.createComponent(ContestFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
