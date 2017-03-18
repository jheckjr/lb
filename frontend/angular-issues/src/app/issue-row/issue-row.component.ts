import { Component, Input, OnInit } from '@angular/core';

import { Issue } from '../models';
import { MarkdownService } from '../services';

@Component({
  selector: 'app-issue-row',
  templateUrl: './issue-row.component.html',
  styleUrls: ['./issue-row.component.css']
})
export class IssueRowComponent implements OnInit {
  @Input() issue: Issue;
  parsedBody: string;
  opened: boolean;

  constructor(private mdService: MarkdownService) { }

  ngOnInit() {
    this.parsedBody = this.mdService.parse(this.issue.body);
    this.issue.user_login = this.issue.user_login || 'no one';
    this.issue.assignee_login = this.issue.assignee_login || 'no one';
    this.opened = false;
  }
}
