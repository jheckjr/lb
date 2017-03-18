import { AngularIssuesPage } from './app.po';

describe('angular-issues App', function() {
  let page: AngularIssuesPage;

  beforeEach(() => {
    page = new AngularIssuesPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
