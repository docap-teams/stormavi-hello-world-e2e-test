const chromedriver = require('chromedriver');

module.exports = {
  test_settings: {
    default: {
      selenium : {
        start_process : false,
        host : "selenium-hub-pipeline.docap-kurs-test-bx2-4x16-16fc47728e8aae593a5208221954defe-0000.eu-gb.containers.appdomain.cloud",
        port : 80
      },
/*
      webdriver: {
        start_process: true,
        server_path: "node_modules/chromedriver/bin/chromedriver",
        port: 9515,
        cli_args: ['--port=9515']
      },
*/ 
      desiredCapabilities: {
        browserName: 'chrome',
        javascriptEnabled: true,
        acceptSslCerts: true,
        chromeOptions: {
          w3c: false,
          args: ["--headless", "--no-sandbox", "--disable-gpu", "--whitelisted-ips"]
        }
      },
      screenshots: {
        enabled: true,
        path: 'report/screenshots'
      }
    }
  }
};
