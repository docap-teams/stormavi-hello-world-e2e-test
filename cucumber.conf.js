const fs = require('fs');
const path = require('path');
const { setDefaultTimeout, After, AfterAll, BeforeAll } = require('cucumber');
const {
  createSession,
  closeSession,
  startWebDriver,
  stopWebDriver,
  getNewScreenshots
} = require('nightwatch-api');
const reporter = require('cucumber-html-reporter');

setDefaultTimeout(60000);

BeforeAll(async () => {
  await startWebDriver({ env: process.env.NIGHTWATCH_ENV || 'default' });
  await createSession();
});

AfterAll(async () => {
  await closeSession();
  await stopWebDriver();
  setTimeout(() => {
    reporter.generate({
      theme: 'bootstrap',
      jsonFile: 'report/cucumber_report.json',
      output: 'report/cucumber_report.html',
      screenshotsDirectory: 'report/screenshots/',
      storeScreenshots: true,
      reportSuiteAsScenarios: true,
      launchReport: true,
      metadata: {
        'App Version': '1.0',
        'Test Environment': 'Test'
      }
    });
  }, 1000);
});

After(function() {
  getNewScreenshots().forEach(file => this.attach(fs.readFileSync(file), 'image/png'));
});