/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { IssueRowComponent } from './issue-row.component';
import { TEST_ISSUE } from '../test';

describe('IssueRowComponent', () => {
  let component: IssueRowComponent;
  let fixture: ComponentFixture<IssueRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [IssueRowComponent]
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

  it('should show the issue data', () => {
    let titleEl = fixture.debugElement.query(By.css('.title')).nativeElement;
    let bodyEl = fixture.debugElement.query(By.css('.body')).nativeElement;
    let users = fixture.debugElement.queryAll(By.css('.user'));
    let userEl = users[0].nativeElement;
    let assigneeEl = users[1].nativeElement;

    expect(titleEl.textContent).toContain(TEST_ISSUE.title);
    expect(bodyEl.textContent).toContain(TEST_ISSUE.body);
    expect(userEl.textContent).toContain(TEST_ISSUE.user_login);
    expect(assigneeEl.textContent).toContain(TEST_ISSUE.assignee_login);
  });
});