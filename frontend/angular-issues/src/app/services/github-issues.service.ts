import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';

import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/concat';

import { Issue } from '../models';

@Injectable()
export class GithubIssuesService {
  private BASE_URL = 'https://api.github.com/repos';
  private ISSUES_PER_PAGE_100 = 'issues?per_page=100';
  private PAGE_QUERY = 'page=';
  private SINCE_QUERY = 'since=';

  constructor(private http: Http) { }

  private getIssuesFromRepo(owner: string, repo: string): Observable<Issue[]> {
    let sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    let url = `${this.BASE_URL}/${owner}/${repo}/${this.ISSUES_PER_PAGE_100}&${this.SINCE_QUERY}${sevenDaysAgo.toISOString()}&${this.PAGE_QUERY}`;
    return this.callRepository(1, url);
  }

  private callRepository(pageNum: number, baseUrl: string): Observable<Issue[]> {
    let url = baseUrl + String(pageNum);
    return this.http.get(url)
      .map((res: Response) => {
        if (res.ok) {
          let link = res.headers.get('Link');
          if (link && link.indexOf("rel=\"next\"") !== -1) {
            pageNum++;
          } else {
            pageNum = 0;
          }
          return {
            pageNum: pageNum,
            issues: (<any>res.json()).map(issue => {
              return {
                title: issue.title,
                body: issue.body,
                user_login: issue.user.login,
                assignee_login: issue.assignee.login
              };
            })
          };
        } else {
          return {
            pageNum: 0,
            issues: []
          };
        }
      })
      .concatMap((data) => {
        if (data.pageNum > 0) {
          return this.callRepository(pageNum, baseUrl)
            .map((results) => [...data.issues, ...results]);
        } else {
          return Observable.of(data.issues);
        }
      });
  }
}
