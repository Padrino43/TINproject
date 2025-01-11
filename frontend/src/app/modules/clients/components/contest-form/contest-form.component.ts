import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators,} from '@angular/forms';
import {Contest, PostContestForm} from '../../../core/models/contest.model';
import {FormsService} from '../../../core/services/forms.service';
import {ContestService} from '../../../core/services/contest.service';
import {Router} from '@angular/router';
import {Observer} from 'rxjs';
import {AlertComponent} from '../../../shared/components/alert/alert.component';
import {MatButton} from '@angular/material/button';
import {NgIf} from '@angular/common';
import {MatInput, MatInputModule} from '@angular/material/input';
import {MatError, MatFormField, MatFormFieldModule, MatLabel} from '@angular/material/form-field';
import {MatDatepickerModule} from "@angular/material/datepicker";

@Component({
  selector: 'app-contest-form',
  templateUrl: './contest-form.component.html',
  styleUrl: './contest-form.component.css',
  standalone: true,
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
  ],
})
export class ContestFormComponent implements OnInit {
  contestForm!: FormGroup<PostContestForm>;
  errorMessage = '';
  value: any;
  @Input() editMode = false;
  @Input() contest!: Contest;
  @Output() closeDialog = new EventEmitter<void>();
  observer: Observer<unknown> = {
    next: () => {
      if (this.editMode) {
        this.emitCloseDialog();
      }
      this.errorMessage = '';
      this.router.navigate(['/contests']);
    },
    error: () => {
      this.errorMessage = 'Wystąpił błąd.';
    },
    complete: () => {},
  };

  constructor(
    private formsService: FormsService,
    private contestService: ContestService,
    private router: Router,
  ) {}

  get controls() {
    return this.contestForm.controls;
  }
  ngOnInit(): void {
    this.initForm();
  }

  private initForm() {
    this.contestForm = new FormGroup({
      name: new FormControl(this.editMode ? this.contest.name : '', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      start: new FormControl(this.editMode ? this.contest.start : '', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      finish: new FormControl(this.editMode ? this.contest.finish : '', {
        nonNullable: true,
        validators: [Validators.required],
      }),
    });

  }

  onAddContest() {
    if (this.editMode) {
      this.contestService
        .putClient(this.contestForm.getRawValue(), this.contest.id)
        .subscribe(this.observer);
      return;
    }

    this.contestService
      .postClient(this.contestForm.getRawValue())
      .subscribe(this.observer);
  }

  getErrorMessage(control: FormControl) {
    return this.formsService.getErrorMessage(control);
  }

  emitCloseDialog() {
    this.closeDialog.emit();
  }
}
