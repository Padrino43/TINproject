import { FormControl } from '@angular/forms';

export interface ContestResponse {
  id: number;
  name: string;
  start: string;
  finish: string;
}
export interface PostResponse {
  id: number;
  name: string;
  date: string;
  timeStart: string;
  timeFinish: string;
}

export type PostContest = Omit<PostResponse, 'id'>;

export class Contest implements ContestResponse {
  constructor(
    public id: number,
    public name: string,
    public date: string,
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
  date: FormControl<string>;
  timeStart: FormControl<string>;
  timeFinish: FormControl<string>;
}
