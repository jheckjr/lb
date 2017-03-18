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
    let usersEl = fixture.debugElement.query(By.css('.users')).nativeElement;

    expect(titleEl.textContent).toContain(TEST_ISSUE.title);
    expect(bodyEl.textContent).toContain(TEST_ISSUE.body);
    expect(usersEl.textContent).toContain(TEST_ISSUE.user_login);
    expect(usersEl.textContent).toContain(TEST_ISSUE.assignee_login);
  });
});
