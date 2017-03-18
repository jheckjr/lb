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

  constructor(private mdService: MarkdownService) { }

  ngOnInit() {
    this.parsedBody = this.mdService.parse(this.issue.body);
  }
}
