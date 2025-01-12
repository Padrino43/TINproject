import { FormControl } from '@angular/forms';

export interface ContestantResponse {
  id: number;
  name: string;
  surname: string;
  score: number
  startingDate: string;
}
export interface PostResponse {
  id: number;
  name: string;
  surname: string;
  startingDate: string;
}

export type PostContestant = Omit<PostResponse, 'id'>;

export class Contestant implements ContestantResponse {
  constructor(
    public id: number,
    public name: string,
    public surname: string,
    public score: number,
    public startingDate: string,
  ) {}
}

export interface GetContestantResponse {
  contestants: Contestant[];
  totalCount: number;
}

export interface PostContestantForm {
  name: FormControl<string>;
  surname: FormControl<string>;
  startingDate: FormControl<string>;
}
