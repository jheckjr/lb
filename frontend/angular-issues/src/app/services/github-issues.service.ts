import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class GithubIssuesService {
  private BASE_URL = 'https://api.github.com/repos/';

  constructor(private http: Http) { }

  private getIssuesFromRepo(): Observable<string> {
    let url = this.BASE_URL + 'angular/angular/' + 'issues';

    return this.http.get(url).map((res: Response) => res.text());
  }
}
