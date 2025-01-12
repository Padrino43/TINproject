import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AlertComponent} from "../../../shared/components/alert/alert.component";
import {MatButton} from "@angular/material/button";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatError, MatFormField, MatFormFieldModule, MatLabel} from "@angular/material/form-field";
import {MatInput, MatInputModule} from "@angular/material/input";
import {NgIf} from "@angular/common";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {Observer} from "rxjs";
import {FormsService} from "../../../core/services/forms.service";
import {Router} from "@angular/router";
import {ContestantService} from "../../../core/services/contestant.service";
import {Contestant, PostContestantForm} from "../../../core/models/contestant.model";
import {MatNativeDateModule} from "@angular/material/core";

@Component({
  selector: 'app-contestant-form',
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatInput,
    NgIf,
    MatError,
    MatButton,
    AlertComponent,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    FormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  providers: [
    MatDatepickerModule,
  ],
  standalone: true,
  templateUrl: './contestant-form.component.html',
  styleUrl: './contestant-form.component.css'
})
export class ContestantFormComponent implements OnInit {
  contestantForm!: FormGroup<PostContestantForm>;
  errorMessage = '';
  @Input() editMode = false;
  @Input() contestant!: Contestant;
  @Output() closeDialog = new EventEmitter<void>();
  observer: Observer<unknown> = {
    next: () => {
      if (this.editMode) {
        this.emitCloseDialog();
      }
      this.errorMessage = '';
      this.router.navigate(['/contestants']);
    },
    error: () => {
      this.errorMessage = 'Wystąpił błąd.';
    },
    complete: () => {},
  };

  constructor(
    private formsService: FormsService,
    private contestantService: ContestantService,
    private router: Router,
  ) {}

  get controls() {
    return this.contestantForm.controls;
  }
  ngOnInit(): void {
    this.initForm();
  }

  private initForm() {
    this.contestantForm = new FormGroup({
      name: new FormControl(this.editMode ? this.contestant.name : '', {
        nonNullable: true,
        validators: [
          Validators.minLength(5),
          Validators.maxLength(20),
          Validators.required],
      }),
      surname: new FormControl(this.editMode ? this.contestant.surname : '', {
        nonNullable: true,
        validators: [
          Validators.minLength(5),
          Validators.maxLength(20),
          Validators.required],
      }),
      startingDate: new FormControl(this.editMode ? this.contestant.startingDate : '', {
        nonNullable: true,
        validators: [Validators.required],
      })
    });
  }

  onAddContest() {
    if (this.editMode) {
      this.contestantService
        .putContestant(this.contestantForm.getRawValue(), this.contestant.id)
        .subscribe(this.observer);
      return;
    }

    this.contestantService
      .postContestant(this.contestantForm.getRawValue())
      .subscribe(this.observer);
  }

  getErrorMessage(control: FormControl) {
    return this.formsService.getErrorMessage(control);
  }

  emitCloseDialog() {
    this.closeDialog.emit();
  }
}
