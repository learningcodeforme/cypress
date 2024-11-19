const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "7o3tsz",
  defaultCommandTimeout: 6000,
  reporter: 'cypress-mochawesome-reporter',
  env: {
    url: "https://rahulshettyacademy.com"
  },
  retries: {
    runMode: 1,
    openMode: 0,
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      require('cypress-mochawesome-reporter/plugin')(on);
    },

    specPattern: 'cypress/Integration/examples/*.js',
  },
});
