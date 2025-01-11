import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../../environments/environment.development';
import { map, Observable } from 'rxjs';
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
    value = '',
  ): Observable<GetContestResponse> {
    // let params = new HttpParams()
    //   .append('_page', pageIndex)
    //   .append('_limit', itemsPerPage);
    //
    // if (sortColumnName) {
    //   params = params
    //     .append('_sort', sortColumnName)
    //     .append('_order', sortDirection);
    // }
    //
    // if (value) {
    //   params = params.append('firstname_like', value);
    // }

    return this.http
      .get<ContestResponse[]>(`${this.apiUrl}/contests`, {
        observe: 'response',
        // params,
      })
      .pipe(
        map((response) => {
          if (!response.body) return { contests: [], totalCount: 0 };

          const contestsArr: Contest[] = response.body.map(
            ({ id, name, start, finish }) => {
              let [date, fromTime] = start.split('T');
              let [hours, minutes, _] = fromTime.split(':');
              start = `${hours}:${minutes}`;
              finish = finish.split(' ')[1];
              return new Contest(
                id,
                name,
                start,
                finish
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
          ({ id, name, start, finish }) => {
            let [date, fromTime] = start.split('T');
            let [hours, minutes, _] = fromTime.split(':');
            start = `${hours}:${minutes}`;
            finish = finish.split(' ')[1];
            return new Contest(
              id,
              name,
              start,
              finish
            );
          }
        ),
      );
  }

  postClient(clientData: PostContest): Observable<Contest> {
    return this.http
      .post<ContestResponse>(`${this.apiUrl}/contests`, clientData)
      .pipe(
        map(
          ({ id, name, start, finish }) => {
            let [date, fromTime] = start.split('T');
            let [hours, minutes, _] = fromTime.split(':');
            start = `${hours}:${minutes}`;
            finish = finish.split(' ')[1];
            return new Contest(
              id,
              name,
              start,
              finish
            );
          }
        ),
      );
  }

  deleteClient(id: number): Observable<Record<string, never>> {
    return this.http.delete<Record<string, never>>(
      `${this.apiUrl}/contests/${id}`,
    );
  }

  putClient(clientData: PostContest, id: number): Observable<Contest> {
    return this.http
      .put<ContestResponse>(`${this.apiUrl}/contests/${id}`, clientData)
      .pipe(
        map(
          ({ id, name, start, finish }) => {
            let [date, fromTime] = start.split(' ');
            let [hours, minutes, _] = fromTime.split(':');
            start = `${hours}:${minutes}`;
            finish = finish.split(' ')[1];
            return new Contest(
              id,
              name,
              start,
              finish
            );
          }
        ),
      );
  }
}
