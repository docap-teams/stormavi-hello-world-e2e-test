const { client } = require('nightwatch-api');
const { Given, Then, When } = require('cucumber');

const host = 'http://roy-hello-world-test.docap-kurs-test-bx2-4x16-16fc47728e8aae593a5208221954defe-0000.eu-gb.containers.appdomain.cloud'

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

Given(/^I open the posts-app application$/, async function () {
    await client.url(host).waitForElementVisible('body', 1000);
  });
  
  Then(/^the title is "([^"]*)"$/, async function (title) {
      await client.assert.title(title);
    });
  
  Then(/^the PING API button exists$/, async function () {
      await client.assert.visible('button[id="pingapi"]');
  });
  
  When(/^I press the PING API button$/, async function(){
      await client.click('#pingapi');
      client.pause(2000);
  });
  
  Then(/^The message "([^"]*)" is presented$/, async function (message) {
      await client.expect.element('#pingdata').text.to.contain(message);
  });
  
  Given(/^I open the form in the posts-app application$/, async function () {
      await client.url(`${host}/form`).waitForElementVisible('body', 1000);
      client.pause(2000);
    });
  
  Then(/^The form is presented$/, async function () {
      await client.assert.visible('#field_post-id');
      await client.assert.visible('#field_post-text');
      await client.assert.visible('#field_post-comment');
  });
  
  Then(/^The form buttons are present$/, async function () {
      await client.assert.visible('#btn_save-post');
      await client.assert.visible('#btn_clear-form');
      await client.assert.visible('#btn_delete-post');
  });
  
  // And the "HOME" button menu exists
  // And the "FORM" button menu exists
  Then(/^the "([^"]*)" menu button exists$/, async function (button) {
      if(button=="HOME")
          await client.assert.visible('a[id="home"]');
      if(button=="FORM")
          await client.assert.visible('a[id="form"]');
  });
  
  // And the menu title is "Posts-app"
  Then(/^the menu title is "([^"]*)"$/, async function (title) {
      await client.expect.element('#toolbar-title').text.to.contain(title);
  });
  
  
  // not used
  
  
  When(/^I enter "([^"]*)" in the wish text field$/, async function (queryValue) {
      await client.setValue('input[id="wish-field"]', queryValue);
      client.pause(2000);
  });
  
  When(/^I enter "([^"]*)" in the wish link field$/, async function (queryValue) {
      await client.setValue('input[id="wish-link"]', queryValue);
      client.pause(2000);
  });
  
  When(/^I press the Add Wish button$/, async function(){
      await client.click('#addWishBtn');
  });
  
  Then('{string} has been added to the wishlist as item {string}', async function (wishValue, item_id) {
      await client.assert.containsText('#'+item_id, wishValue);
      client.pause(2000);
  });
  
  When(/^I press the Remove button on wish Airpods pro$/, async function(){
      await client.click('#btn-0');
  });
  
  Then('wishlist does not contain {string} entry', async function (entry) {
      await browser.expect.element('#wishlist').
      client.pause(2000);
  });
  
  
  Then('{string} is in the wishlist as item {string}', async function (wishValue, item_id) {
      await client.assert.containsText('#'+item_id, wishValue);
      client.pause(2000);
  });
  