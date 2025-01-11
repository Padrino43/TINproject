import { FormControl } from '@angular/forms';

export interface ContestResponse {
  id: number;
  name: string;
  startAt: string;
  finishAt: string;
}
export interface PostResponse {
  id: number;
  name: string;
  date: string;
  startAt: string;
  finishAt: string;
}

export type PostContest = Omit<PostResponse, 'id'>;

export class Contest implements ContestResponse {
  constructor(
    public id: number,
    public name: string,
    public date: string,
    public startAt: string,
    public finishAt: string
  ) {}
}

export interface GetContestResponse {
  contests: Contest[];
  totalCount: number;
}

export interface PostContestForm {
  name: FormControl<string>;
  date: FormControl<string>;
  startAt: FormControl<string>;
  finishAt: FormControl<string>;
}
