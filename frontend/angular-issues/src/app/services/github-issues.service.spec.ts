/* tslint:disable:no-unused-variable */

import { TestBed, fakeAsync, inject, tick } from '@angular/core/testing';
import { MockBackend } from '@angular/http/testing';
import { Http, ConnectionBackend, BaseRequestOptions, Response,
  ResponseOptions } from '@angular/http';

import { GithubIssuesService } from './github-issues.service';
import { TEST_BODY } from './test-helper-github-issues';

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

  describe('getIssuesFromRepo', () => {
    it('should get a list of issues for a repository',
      inject([GithubIssuesService, MockBackend], fakeAsync((svc, backend) => {
        var issues;
        backend.connections.subscribe(c => {
          expect(c.request.url).toBe('https://api.github.com/repos/angular/angular/issues');
          let resp = new ResponseOptions({
            body: TEST_BODY
          });
          c.mockRespond(new Response(resp));
        });

        svc.getIssuesFromRepo().subscribe((res) => {
          issues = res;
        });
        tick();
        expect(issues).toContain(TEST_BODY);
      })));
  });
});
