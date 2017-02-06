import { Seventhsea2ChargenPage } from './app.po';

describe('seventhsea2-chargen App', function() {
  let page: Seventhsea2ChargenPage;

  beforeEach(() => {
    page = new Seventhsea2ChargenPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
