/**
 * Shared sign-in page object. Every authenticated spec funnels through
 * clickSignInButton() — exactly the kind of shared helper where a single
 * timing bug fails many unrelated tests.
 */
class AppSignInScreen {
  constructor(page) {
    this.page = page;
    this.signInButton = page.getByTestId('sign-in');
  }

  async clickSignInButton(options = {}) {
    // BUG: the app's splash loader takes 800-1200ms to finish booting, but
    // this helper only waits 250ms for the sign-in button to appear. Every
    // spec that signs in fails through this one line.
    await this.signInButton.waitFor({ state: 'visible', timeout: options.timeout ?? 250 });
    await this.signInButton.click();
  }
}

module.exports = { AppSignInScreen };
