/* eslint no-process-exit:0 */
'use strict';

module.exports = function(config) {

  if (!process.env.SAUCE_USERNAME || !process.env.SAUCE_ACCESS_KEY) {
    /* eslint no-console: 0 */
    console.log('Make sure the SAUCE_USERNAME and SAUCE_ACCESS_KEY environment variables are set.');
    process.exit(1);
  }

  // Browsers to run on Sauce Labs
  // Check out https://saucelabs.com/platforms for all browser/OS combos
  const customLaunchers = {

    sl_ms_edge: {
      base: 'SauceLabs',
      browserName: 'microsoftedge',
      platform: 'Windows 10'
    },

    sl_ie_11: {
      base: 'SauceLabs',
      browserName: 'Internet Explorer',
      platform: 'Windows 8.1',
      version: '11'
    },

    sl_ie_10: {
      base: 'SauceLabs',
      browserName: 'Internet Explorer',
      platform: 'Windows 8',
      version: '10'
    },

    sl_ie_9: {
      base: 'SauceLabs',
      browserName: 'internet explorer',
      platform: 'Windows 7',
      version: '9'
    }
  };

  const sauceLabs = {
    startConnect: false,
    testName: 'availity-angular',
    recordScreenshots: false
  };

  if (process.env.TRAVIS_JOB_NUMBER) {
    sauceLabs.tunnelIdentifier = process.env.TRAVIS_JOB_NUMBER;
  } else {
    sauceLabs.startConnect = true;
  }

  config.set({
    basePath: '',
    files: ['./lib/spec.js'],
    autoWatch: false,
    browsers: Object.keys(customLaunchers),
    customLaunchers,
    frameworks: ['jasmine'],
    reporters: ['mocha', 'saucelabs'],
    port: 9876,
    colors: true,
    sauceLabs,
    logLevel: config.LOG_INFO,
    captureTimeout: 120000,
    browserDisconnectTimeout: 10000,
    browserDisconnectTolerance: 2,
    browserNoActivityTimeout: 20000,
    singleRun: true
  });
};