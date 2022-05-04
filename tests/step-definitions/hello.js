const { client } = require('nightwatch-api');
const { Given, Then, When } = require('cucumber');

const host = '<url to hello application from lab 2>'

Given(/^I open the hello application$/, async function () {
  await client.url(`${host}`).waitForElementVisible('body', 1000);
});

Given(/^I open the hello application with parameter "([^"]*)"$/, async function (parameter) {
  await client.url(`${host}/${parameter}`).waitForElementVisible('body', 1000);
});
  
Then(/^Hello and Welcome is presented$/, async function () {
    await client.expect.element('div.container').text.to.contain("Hello and Welcome World!");
});

Then(/^Hello and Welcome "([^"]*)" is presented$/, async function (name) {
    await client.expect.element('div.container').text.to.contain("Hello and Welcome " + name);
});
