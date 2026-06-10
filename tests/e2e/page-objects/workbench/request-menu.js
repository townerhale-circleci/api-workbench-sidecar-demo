class RequestMenu {
  constructor(page) {
    this.page = page;
    this.newButton = page.getByTestId('new-request-button');
    this.menu = page.getByTestId('new-request-menu');
    this.editorTitle = page.getByTestId('request-editor-title');
    this.emptyStateMessage = page.getByTestId('empty-state-message');
    this.urlInput = page.getByTestId('request-url-input');
    this.urlValidation = page.getByTestId('url-validation-message');
  }

  async openNewRequestMenu() {
    await this.newButton.click();
    await this.menu.waitFor({ state: 'visible' });
  }

  async selectRequestType(kind) {
    await this.page.getByTestId(`new-${kind}-request`).click();
  }
}

module.exports = { RequestMenu };
