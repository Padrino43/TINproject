import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContestantFormComponent } from './contestant-form.component';

describe('ContestantFormComponent', () => {
  let component: ContestantFormComponent;
  let fixture: ComponentFixture<ContestantFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContestantFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContestantFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
