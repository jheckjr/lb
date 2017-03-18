import { Component, OnInit } from '@angular/core';

import { GithubIssuesService } from './services';
import { Issue } from './models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private repoOwner = 'angular';
  private repository = 'angular';
  title = 'Angular Issues from Github';
  issues: Issue[];

  constructor(private githubIssuesService: GithubIssuesService) { }

  ngOnInit() {
    this.githubIssuesService.getIssuesFromRepo(this.repoOwner, this.repository)
      .subscribe(
      (issues: Issue[]) => {
        this.issues = issues;
      },
      (err: any) => {
        console.log(err);
      },
      () => { }
      );
  }
}
