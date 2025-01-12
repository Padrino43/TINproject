import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AlertComponent} from "../../../../shared/components/alert/alert.component";
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule, NgForm,
  ReactiveFormsModule,
  Validators
} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from "@angular/material/datepicker";
import {MatError, MatFormField, MatFormFieldModule, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatTimepicker, MatTimepickerInput, MatTimepickerToggle} from "@angular/material/timepicker";
import {CommonModule, NgIf} from "@angular/common";
import {Contest, PostContestForm} from "../../../../core/models/contest.model";
import {Observer, switchMap} from "rxjs";
import {FormsService} from "../../../../core/services/forms.service";
import {ContestService} from "../../../../core/services/contest.service";
import {ActivatedRoute, Router} from "@angular/router";
import {
  Contestant, ContestantResponse,
} from "../../../../core/models/contestant.model";
import {MatOption, MatSelect, MatSelectModule} from "@angular/material/select";
import {ContestantService} from "../../../../core/services/contestant.service";

@Component({
  selector: 'app-contestant-add-to-contest-form',
  imports: [
    AlertComponent,
    FormsModule,
    MatButton,
    MatFormField,
    MatInput,
    MatLabel,
    NgIf,
    ReactiveFormsModule,
    MatSelect,
    MatOption,
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
  ],
  templateUrl: './contestant-add-to-contest-form.component.html',
  styleUrl: './contestant-add-to-contest-form.component.css'
})
export class ContestantAddToContestFormComponent implements OnInit{
  myForm = new FormGroup({
    contestant: new FormControl<any>(''),
    score: new FormControl<number>(0),
  });
  errorMessage = '';
  @Input() editMode = false;
  @Input() contest!: Contest;
  @Input() contestant!: Contestant;
  contestants!: Contestant[];
  @Output() closeDialog = new EventEmitter<void>();
  observer: Observer<unknown> = {
    next: () => {
      if (this.editMode) {
        this.emitCloseDialog();
      }
      this.errorMessage = '';
      this.router.navigate([`/contests/${this.contest.id}`]);
    },
    error: () => {
      this.errorMessage = 'Wystąpił błąd.';
    },
    complete: () => {},
  };

  constructor(
    private contestService: ContestService,
    private contestantService: ContestantService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.route.params
      .pipe(switchMap((params) => {
        return this.contestService.getContest(+params['id']);
      })).subscribe({
      next: (contest) => {
        this.contest = contest;
        },
      });
    this.contestantService.getContestantsForForm().subscribe({
      next: (contestants) => {
        this.contestants = contestants;
      },
      error: () => {
        console.error();
      },
    });
  }

  onAddContest() {
    let temp = this.myForm.getRawValue();
    if (this.editMode) {
      console.log("DUADUAUDA")
      const personDetails = {
        score: temp.score
      }
      console.log(personDetails)

      this.contestantService
          .putContestantForForm(personDetails, this.contest.id)
          .subscribe(this.observer);
        return;
      }

    const personDetails = {
      id: temp.contestant,
      contest: this.contest.id,
      score: temp.score
    }

      this.contestantService
        .postContestantForForm(personDetails)
        .subscribe(this.observer);
  }
  emitCloseDialog() {
    this.closeDialog.emit();
  }
}
