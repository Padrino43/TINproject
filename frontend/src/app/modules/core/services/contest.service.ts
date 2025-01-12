import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { environment } from '../../../../environments/environment.development';
import {map, Observable, tap} from 'rxjs';
import {
  Contest,
  ContestResponse,
  GetContestResponse, PostContest
} from '../models/contest.model';

@Injectable({
  providedIn: 'root',
})
export class ContestService {
  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getContests(
    pageIndex: number,
    itemsPerPage: number,
    sortDirection: string,
    sortColumnName: string,
    scores: boolean,
    fromContestant: number = 0,
    value = '',
  ): Observable<GetContestResponse> {
    let params = new HttpParams()
      .append('_page', pageIndex)
      .append('_limit', itemsPerPage);

    if (sortColumnName) {
      params = params
        .append('_sort', sortColumnName)
        .append('_order', sortDirection);
    } else if (scores && !sortColumnName){
      params = params
        .append('_sort', "score")
        .append('_order', "desc");
    }

    if (value) {
      params = params.append('name_like', value);
    }

    let header = scores
      ? new HttpHeaders({ 'With-Scores': 'yes', 'FromContestant':`'${fromContestant}'` })
      : new HttpHeaders({ 'With-Scores': 'no' });

    return this.http
      .get<ContestResponse[]>(`${this.apiUrl}/contests`, {
        observe: 'response',
        params,
        headers: header
      })
      .pipe(
        map((response) => {
          if (!response.body) return { contests: [], totalCount: 0 };

          const contestsArr: Contest[] = response.body.map(
            ({ id, name, startAt, finishAt, score }) => {
              let [date, fromTime] = startAt.split('T');
              let [fromHours, fromMinutes] = fromTime.split(':');
              startAt = `${fromHours}:${fromMinutes}`;
              let [_, toTime] = finishAt.split('T');
              let [toHours, toMinutes] = toTime.split(':');
              finishAt = `${toHours}:${toMinutes}`;
              return new Contest(
                id,
                name,
                date,
                startAt,
                finishAt,
                (scores)? score : 0,
              );
            }
          );

          const totalCount = Number(response.headers.get('X-Total-Count'));

          return { contests: contestsArr, totalCount: totalCount };
        }),
      );
  }

  getContest(id: number): Observable<Contest> {
    return this.http
      .get<ContestResponse>(`${this.apiUrl}/contests/${id}`)
      .pipe(
        map(
          ({ id, name, startAt, finishAt }) => {
            let [date, fromTime] = startAt.split('T');
            let [fromHours, fromMinutes] = fromTime.split(':');
            startAt = `${fromHours}:${fromMinutes}`;
            let [_, toTime] = finishAt.split('T');
            let [toHours, toMinutes] = toTime.split(':');
            finishAt = `${toHours}:${toMinutes}`;
            return new Contest(
              id,
              name,
              date,
              startAt,
              finishAt,
              0
            );
          }
        ),
      );
  }

  postContest(contestData: PostContest): Observable<Contest> {
    const s = new Date(contestData.startAt);
    const f = new Date(contestData.finishAt);
    const oldDate = new Date(contestData.date);
    const date = oldDate.getFullYear() + '-' + (oldDate.getMonth() + 1) + '-' + s.getDate();
    let startAt = date + ' ' + s.getHours() + ':' + s.getMinutes();
    let finishAt = date + ' ' + f.getHours() + ':' + f.getMinutes();
    const modifiedData = {
      name: contestData.name,
      startAt: startAt,
      finishAt: finishAt
    }
    return this.http
      .post<ContestResponse>(`${this.apiUrl}/contests`, modifiedData)
      .pipe(
        map(
          ({ id, name, startAt, finishAt }) => {
            return new Contest(
              id,
              name,
              date,
              startAt,
              finishAt,
              0
            );
          }
        ),
      );
  }



  deleteContest(id: number): Observable<Record<string, never>> {
    return this.http.delete<Record<string, never>>(
      `${this.apiUrl}/contests/${id}`,
    );
  }

  putContest(contestData: PostContest, id: number): Observable<Contest> {
    const s = new Date(contestData.startAt);
    const f = new Date(contestData.finishAt);
    const oldDate = new Date(contestData.date);
    const date = oldDate.getFullYear() + '-' + (oldDate.getMonth() + 1) + '-' + s.getDate();
    let startAt = date + ' ' + s.getHours() + ':' + s.getMinutes();
    let finishAt = date + ' ' + f.getHours() + ':' + f.getMinutes();
    const modifiedData = {
      name: contestData.name,
      startAt: startAt,
      finishAt: finishAt
    }
    return this.http
      .put<ContestResponse>(`${this.apiUrl}/contests/${id}`, modifiedData)
      .pipe(
        map(
          ({ id, name, startAt, finishAt, score }) => {
            let [date, fromTime] = startAt.split('T');
            let [fromHours, fromMinutes] = fromTime.split(':');
            startAt = `${fromHours}:${fromMinutes}`;
            let [_, toTime] = finishAt.split('T');
            let [toHours, toMinutes] = toTime.split(':');
            finishAt = `${toHours}:${toMinutes}`;
            return new Contest(
              id,
              name,
              date,
              startAt,
              finishAt,
              score
            );
          }
        ),
      );
  }
}
