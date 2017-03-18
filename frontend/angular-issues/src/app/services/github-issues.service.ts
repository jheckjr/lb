import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';

import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/concat';

import { Issue } from '../models';

@Injectable()
export class GithubIssuesService {
  private BASE_URL = 'https://api.github.com/repos/';
  private ISSUES_PER_PAGE_100 = 'issues?per_page=100';
  private hasNext = false;
  //YYYY-MM-DDTHH:MM:SSZ (iso 8601)

  constructor(private http: Http) { }

  private getIssuesFromRepo(): Observable<Issue[]> {
    let url = this.BASE_URL + 'angular/angular/' + this.ISSUES_PER_PAGE_100;
    this.hasNext = true;
    let pageNum = 2;

    let observable = this.http.get(url).map((res: Response) => {
      if (res.ok) {
        let link = res.headers.get('Link');
        if (!link || link.indexOf("rel=\"next\"") === -1) {
          this.hasNext = false;
        }

        return (<any>res.json()).map(issue => {
          return {
            title: issue.title,
            body: issue.body,
            user_login: issue.user.login,
            assignee_login: issue.assignee.login
          };
        });
      } else {
        this.hasNext = false;
        return [];
      }
    });

    observable.subscribe((res) => {
      while (this.hasNext) {
        url += `&page=${pageNum}`;
        observable.concat(this.http.get(url).map((res: Response) => {
          if (res.ok) {
            let link = res.headers.get('Link');
            if (!link || link.indexOf("rel=\"next\"") === -1) {
              this.hasNext = false;
            }

            return (<any>res.json()).map(issue => {
              return {
                title: issue.title,
                body: issue.body,
                user_login: issue.user.login,
                assignee_login: issue.assignee.login
              };
            });
          } else {
            this.hasNext = false;
            return [];
          }
        }));
        pageNum++;
      }
    });

    return observable;
  }

  private callRepository(pageNum: number): Observable<Issue[]> {
    return this.http.get('url')
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
          return this.callRepository(pageNum)
            .map((results) => [...data.issues, ...results]);
        } else {
          return Observable.of(data.issues);
        }
      });
  }
}
/*
[obj1, obj2,...]
Title "obj.title"
Body "obj.body"
User Login "obj.user.login"
Assignee Login "obj.assignee.login"
*/
