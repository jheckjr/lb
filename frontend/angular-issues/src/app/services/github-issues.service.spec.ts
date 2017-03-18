/* tslint:disable:no-unused-variable */

import { TestBed, fakeAsync, inject, tick } from '@angular/core/testing';
import { MockBackend } from '@angular/http/testing';
import { Http, ConnectionBackend, BaseRequestOptions, Response,
  ResponseOptions, Headers } from '@angular/http';

import { GithubIssuesService } from './github-issues.service';
import { TEST_BODY, TEST_ISSUE } from '../test';
import { Issue } from '../models';

describe('GithubIssuesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BaseRequestOptions,
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
  });

  it('should get a list of issues for a repository with one page',
    inject([GithubIssuesService, MockBackend], fakeAsync((svc, backend) => {
      let issues: Issue[];
      let sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      backend.connections.subscribe(c => {
        expect(c.request.url.slice(0, 71)).toBe('https://api.github.com/repos/angular/angular/issues?per_page=100&since=');
        expect(c.request.url.slice(-7)).toBe('&page=1');
        let resp = new ResponseOptions({
          headers: new Headers({}),
          status: 200,
          body: TEST_BODY
        });
        c.mockRespond(new Response(resp));
      });

      svc.getIssuesFromRepo('angular', 'angular').subscribe((res) => {
        issues = res;
      });
      tick();
      expect(issues.length).toEqual(1);
      expect(issues[0]).toEqual(TEST_ISSUE);
    })));

  it('should get a list of issues for a repository with two pages',
    inject([GithubIssuesService, MockBackend], fakeAsync((svc, backend) => {
      let issues: Issue[];
      let linkHeaders = [];
      linkHeaders.push({ 'Link': '<https://api.github.com/repositories/24195339/issues?since=2017-03-11T100900Z&per_page=100>; rel=\"next\",' });
      linkHeaders.push({ 'Link': '<https://api.github.com/repositories/24195339/issues?since=2017-03-11T100900Z&per_page=100>; rel=\"prev\",' });

      backend.connections.subscribe(c => {
        let linkHeader = linkHeaders.shift();
        let resp = new ResponseOptions({
          headers: new Headers(linkHeader),
          status: 200,
          body: TEST_BODY
        });
        c.mockRespond(new Response(resp));
      });

      svc.getIssuesFromRepo('angular', 'angular').subscribe((res) => {
        issues = res;
      });
      tick();
      expect(issues.length).toEqual(2);
      expect(issues[0]).toEqual(TEST_ISSUE);
      expect(issues[1]).toEqual(TEST_ISSUE);
    })));

  it('should work with a bad request',
    inject([GithubIssuesService, MockBackend], fakeAsync((svc, backend) => {
      let issues;
      backend.connections.subscribe(c => {
        let resp = new ResponseOptions({
          status: 404,
          statusText: 'URL not found'
        });
        c.mockRespond(new Response(resp));
      });

      svc.getIssuesFromRepo('angular', 'angular').subscribe((res) => {
        issues = res;
      });
      tick();
      expect(issues).toEqual([]);
    })));
});
