import { FormControl } from '@angular/forms';

export interface ContestResponse {
  id: number;
  name: string;
  start: string;
  finish: string;
}

export type PostContest = Omit<ContestResponse, 'id'>;

export class Contest implements ContestResponse {
  constructor(
    public id: number,
    public name: string,
    public start: string,
    public finish: string
  ) {}
}

export interface GetContestResponse {
  contests: Contest[];
  totalCount: number;
}

export interface PostContestForm {
  name: FormControl<string>;
  start: FormControl<any>;
  finish: FormControl<any>;
}
