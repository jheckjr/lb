import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { IssueRowComponent } from './issue-row/issue-row.component';
import { GithubIssuesService, MarkdownService } from './services';

@NgModule({
  declarations: [
    AppComponent,
    IssueRowComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [GithubIssuesService, MarkdownService],
  bootstrap: [AppComponent]
})
export class AppModule { }
