/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MarkdownService } from '../services';
import { IssueRowComponent } from './issue-row.component';
import { TEST_ISSUE } from '../test';

describe('IssueRowComponent', () => {
  let component: IssueRowComponent;
  let fixture: ComponentFixture<IssueRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [IssueRowComponent],
      providers: [MarkdownService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IssueRowComponent);
    component = fixture.componentInstance;
    component.issue = TEST_ISSUE;
    fixture.detectChanges();
  });

  it('should initialize the data', () => {
    expect(component.issue).toEqual(TEST_ISSUE);
  });

  it('should toggle the view of the body text', () => {
    let bodyEl = fixture.debugElement.query(By.css('.body'));
    expect(bodyEl).toBeFalsy();

    component.opened = true;
    fixture.detectChanges();

    bodyEl = fixture.debugElement.query(By.css('.body')).nativeElement;
    expect(bodyEl).toBeTruthy();
  });

  it('should show the issue data', () => {
    component.opened = true;
    fixture.detectChanges();

    let titleEl = fixture.debugElement.query(By.css('.title')).nativeElement;
    let bodyEl = fixture.debugElement.query(By.css('.body')).nativeElement;
    let usersEl = fixture.debugElement.query(By.css('.users')).nativeElement;

    expect(titleEl.textContent).toContain(TEST_ISSUE.title);
    expect(bodyEl.innerHTML).toContain(component.issue.body);
    expect(usersEl.textContent).toContain(TEST_ISSUE.user_login);
    expect(usersEl.textContent).toContain(TEST_ISSUE.assignee_login);
  });
});
