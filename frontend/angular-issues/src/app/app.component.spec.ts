/* tslint:disable:no-unused-variable */

import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { MockBackend } from '@angular/http/testing';
import { Http, ConnectionBackend, BaseRequestOptions } from '@angular/http';
import { Observable } from 'rxjs';

import { AppComponent } from './app.component';
import { IssueRowComponent } from './issue-row/issue-row.component';
import { GithubIssuesService } from './services';
import { TEST_OBSERVABLE } from './test';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let githubIssuesService: GithubIssuesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        IssueRowComponent
      ], providers: [
        BaseRequestOptions,
        MockBackend,
        GithubIssuesService,
        {
          provide: Http,
          useFactory: (backend: ConnectionBackend,
            defaultOptions: BaseRequestOptions) => {
            return new Http(backend, defaultOptions);
          },
          deps: [MockBackend, BaseRequestOptions]
        }
      ]
    });
    TestBed.compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    githubIssuesService = fixture.debugElement.injector.get(GithubIssuesService);
    spyOn(githubIssuesService, 'getIssuesFromRepo')
      .and.returnValue(TEST_OBSERVABLE);
  });

  it('should create the app', async(() => {
    let app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have as title 'Angular Issues from Github'`, async(() => {
    let app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Angular Issues from Github');
  }));

  it('should render title in a h1 tag', async(() => {
    fixture.detectChanges();
    let compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Angular Issues from Github');
  }));

  it('should display a list of issues', async(() => {
    let component = fixture.componentInstance;
    fixture.detectChanges();

    let rowEl = fixture.debugElement.nativeElement.querySelector('app-issue-row');
    expect(component.issues.length).toBe(1);
    expect(rowEl).toBeTruthy();
  }));
});
