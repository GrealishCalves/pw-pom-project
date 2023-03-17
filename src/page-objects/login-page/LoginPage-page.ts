import { OptionsType } from '../../common/interface/common-types';
import { LoginPageFrameLocatorsType, LoginPageLocatorsType } from './LoginPage-constants';
import { BasePage } from '../abstract-page/base-page';
import { LoginPageDataApi, PageData } from '../../data/data';
import { expect } from '@playwright/test';

export class LoginPage extends BasePage<LoginPageLocatorsType, LoginPageFrameLocatorsType> {
  constructor(options: OptionsType) {
    super(options);
  }

  public async visit(url: string): Promise<void> {
    await this.page.goto(url);
  }

  public async fillUserNameAndPassword(request: PageData<LoginPageDataApi>): Promise<void> {
    await this.frameLocators.USERNAME_INPUT.fill(request.username || '');
    await this.frameLocators.PASSWORD_INPUT.fill(request.password || '');
    await this.frameLocators.LOGIN_BUTTON.click();
  }

  public async sendOtp(): Promise<void> {
    await this.frameLocators.SEND_BUTTON.click();
  }

  public async checkForPopup(): Promise<void> {
    const popup = this.locators.POPUP;
    const visible = await this.locators.POPUP.isVisible();
    await expect(popup).toBeVisible({ timeout: 5000, visible: true });
  }
}
