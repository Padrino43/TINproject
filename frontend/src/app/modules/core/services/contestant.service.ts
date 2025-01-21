import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {environment} from "../../../../environments/environment.development";
import {Contestant, ContestantResponse, GetContestantResponse, PostContestant} from "../models/contestant.model";

@Injectable({
  providedIn: 'root'
})
export class ContestantService {
  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}


  getContestantsForForm(): Observable<Contestant[]> {
    let header = new HttpHeaders({ 'To-Form': 'yes'});

    return this.http
      .get<ContestantResponse[]>(`${this.apiUrl}/contestants`, {
        observe: 'response',
        headers: header,
      })
      .pipe(
        map((response) => {
          if (!response.body) return  [];

          return response.body.map(
            ({id, name, surname, score, startingDate}) => {
              let date = startingDate + '';
              date = date.split('T')[0];
              return new Contestant(
                id,
                name,
                surname,
                score,
                date
              );
            }
          );
        }),
      );
  }


  getContestant(id: number): Observable<Contestant> {
    return this.http
      .get<ContestantResponse>(`${this.apiUrl}/contestants/${id}`)
      .pipe(
        map(
          ({ id, name, surname, score, startingDate }) => {
            let [date, _] = startingDate.split('T');
            return new Contestant(
              id,
              name,
              surname,
              score,
              date
            );
          }
        ),
      );
  }
  getContestants(
    pageIndex: number,
    itemsPerPage: number,
    sortDirection: string,
    sortColumnName: string,
    scores: boolean,
    fromContest: number = 0,
    value = '',
  ): Observable<GetContestantResponse> {
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
      ? new HttpHeaders({ 'With-Scores': 'yes', 'FromContest':`'${fromContest}'` })
      : new HttpHeaders({ 'With-Scores': 'no' });

    return this.http
      .get<ContestantResponse[]>(`${this.apiUrl}/contestants`, {
        observe: 'response',
        params,
        headers: header,
      })
      .pipe(
        map((response) => {
          if (!response.body) return { contestants: [], totalCount: 0 };

          const contestantsArr: Contestant[] = response.body.map(
            ({ id, name, surname, score, startingDate }) => {
              let date = startingDate + '';
              if(!scores) {
                date = date.split('T')[0];
              }
              return new Contestant(
                id,
                name,
                surname,
                (scores)? score : 0,
                date
              );
            }
          );

          const totalCount = Number(response.headers.get('X-Total-Count'));
          return { contestants: contestantsArr, totalCount: totalCount };
        }),
      );
  }

  postContestant(contestantData: PostContestant): Observable<Contestant> {
    const oldDate = new Date(contestantData.startingDate);
    const date = oldDate.getFullYear() + '-' + (oldDate.getMonth() + 1) + '-' + oldDate.getDate();
    contestantData = {
      name: contestantData.name,
      surname: contestantData.surname,
      startingDate: date,
    }
    return this.http
      .post<ContestantResponse>(`${this.apiUrl}/contestants`, contestantData)
      .pipe(
        map(
          ({ id, name, surname, score, startingDate }) => {
            return new Contestant(
              id,
              name,
              surname,
              score,
              startingDate
            );
          }
        ),
      );
  }

  postContestantForForm(contestantData: any): Observable<Contestant> {
    return this.http
      .post<ContestantResponse>(`${this.apiUrl}/contestant`, contestantData)
      .pipe(
        map(
          ({ id, name, surname, score, startingDate }) => {
            return new Contestant(
              id,
              name,
              surname,
              score,
              startingDate
            );
          }
        ),
      );
  }

  deleteContestant(id: number): Observable<Record<string, never>> {
    return this.http.delete<Record<string, never>>(
      `${this.apiUrl}/contestants/${id}`,
    );
  }

  putContestant(contestantData: PostContestant, id: number): Observable<Contestant> {
    const oldDate = new Date(contestantData.startingDate);
    const date = oldDate.getFullYear() + '-' + (oldDate.getMonth() + 1) + '-' + oldDate.getDate();
    const modifiedContestant = {
      name: contestantData.name,
      surname: contestantData.surname,
      startingDate: date,
    }
    return this.http
      .put<ContestantResponse>(`${this.apiUrl}/contestants/${id}`, modifiedContestant)
      .pipe(
        map(
          ({ id, name, surname, startingDate }) => {
            return new Contestant(
              id,
              name,
              surname,
              0,
              startingDate
            );
          }
        ),
      );
  }

  putContestantForForm(contestantData: any, id: number): Observable<Contestant> {
    return this.http
      .put<ContestantResponse>(`${this.apiUrl}/contestant/${id}`, contestantData)
      .pipe(
        map(
          ({ id, name, surname, score, startingDate }) => {
            return new Contestant(
              id,
              name,
              surname,
              score,
              startingDate
            );
          }
        ),
      );
  }

  deleteContestantFromContest(id: number, contestId: number): Observable<Record<string, never>> {
    const data = {
      contestId: contestId,
    }
    return this.http.delete<Record<string, never>>(
      `${this.apiUrl}/contestant/${id}`,
      {
        body: data,
      }
    );
  }
}
