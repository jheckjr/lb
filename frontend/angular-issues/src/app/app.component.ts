import { Component, OnInit } from '@angular/core';

import { GithubIssuesService } from './services';
import { Issue } from './models';
import { TEST_ISSUE } from './test';

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

  constructor(private githubIssuesService: GithubIssuesService) {
    this.issues = [
      TEST_ISSUE,
      {
        title: "FormGroup and FormControl - values / valueChanges?",
        body: "[X] feature request\r\n\r\nThis is a feature I am proposing for a future Angular.\r\n\r\n**Current behavior**\r\n\r\nBoth FormGroup and FormControl provide `.valueChanges`, and observable stream of changes to the control or group of controls' value. This is very helpful, but it seems to omit the first value (before the first \"change\") for no particularly good reason other than consistency with the name.\r\n\r\nThis is easily worked around by with something like this:\r\n\r\n```\r\nconst x$ = this.aControl.valueChanges.startWith(this.aControl.value);\r\n```\r\n\r\n... which is effective, but verbose and repetitive.\r\n\r\n**Expected behavior**\r\n\r\nProgrammatically, very often when handling a control or group as an observable stream, one wants access to the entire stream from the beginning.\r\n\r\nTherefore, I request that `.valueChanges` be supplemented with `.values`, which would be an Observable that emits both the initial value and changes.\r\n\r\n**Minimal reproduction of the problem with instructions**\r\n\r\nA search of Github yields numerous cases and published Angular code where something similar to the above pattern appears.\r\n\r\nhttps://github.com/search?q=valueChanges.startWith&ref=simplesearch&type=Code&utf8=%E2%9C%93\r\n\r\nAll of these, as well as similar code behind countless corporate firewalls, could be tightened up by this API improvement.\r\n\r\n\r\n\r\n\r\n",
        user_login: "kylecordes",
        assignee_login: null
      }
    ];
  }

  ngOnInit() {
    /*this.githubIssuesService.getIssuesFromRepo(this.repoOwner, this.repository)
      .subscribe(
      (issues: Issue[]) => {
        this.issues = issues;
      },
      (err: any) => {
        console.log(err);
      },
      () => {
        console.log('Done');
      }
    );*/
  }
}
