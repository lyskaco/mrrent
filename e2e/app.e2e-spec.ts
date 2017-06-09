import { HouseRentalProjectPage } from './app.po';

describe('house-rental-project App', () => {
  let page: HouseRentalProjectPage;

  beforeEach(() => {
    page = new HouseRentalProjectPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
