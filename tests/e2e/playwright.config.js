const { defineConfig } = require('@playwright/test');
const path = require('path');

module.exports = defineConfig({
  testDir: path.join(__dirname, 'specs'),
  timeout: 30000,
  retries: 0,
  workers: 1,
  reporter: process.env.CI
    ? [['list'], ['junit', { outputFile: 'test-results/junit/results.xml' }]]
    : [['list']],
  use: {
    baseURL: 'http://localhost:4100',
    headless: true,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  webServer: {
    command: 'node server.js',
    cwd: path.join(__dirname, '..', '..'),
    port: 4100,
    reuseExistingServer: !process.env.CI,
  },
  projects: [{ name: 'chromium', use: { browserName: 'chromium' } }],
});
