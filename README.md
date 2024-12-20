# README #

### What is this repository for? ###

* In this repo I have added the usage of Playwright. Playwright is a tool for WebAutomation
* Version: 1.49.1
* [Learn Playwright](https://playwright.dev/)

### How do I get set up? ###

* npm i -D @playwright/test
* npx playwright install

### How do you run your tests? ###

* npx playwright test :to run test cases in headless mode (by default)
* npx playwright test --headed :to run test cases in headed mode
* npx playwright test --browser=firefox :to run test cases in a particular browser
* npx playwright test —headed --browser=firefox :to run test cases in a particular browser with headed mode
* npx playwright test /pathToTestCasesFile :to run test cases of an particular file
* npx playwright test —reporter=html :to run test cases with specific playwright report, run following command
* npx playwright test —grep @runThroughTaggName :to run test cases through tag name
* npx playwright test —grep—invert @runThroughTaggName :to you want to exclude test cases of an particular tagg name run this command
* npx playwright test --workers 1 :if you want to run test cases on custom number of workers
npx playwright test tests/Task4.test.ts --headed

### How do you See the reports of tests? ###

* If you have enabled HTML reporting then need to run "npx playwright show-report" this command after test execution which will redirect you to WebPage.
* If you are using the Allure reporting then need to run "npx allure generate ./allure-results  --clean" after that "npx allure open ./allure-report"

### Contribution guidelines ###

* Add your page objects under pages/pageobjects folder
* Add your page classes under pages folder. 
* Add your tests under tests folder

### Design Pattern ###
## Page Object model ##
* We have PageObjects and Pages clasess under Pages folder. 
* Under tests folder we have written all my tests for any page
* Under Util folder we have Couple of files included WebAction.ts which have different interactions of WebPage. Other one is enviornment.ts file which include necessary data.
* Under Basic folder we have a file BaseTest.ts which is actually a Fixture class [What is fixture?](https://playwright.dev/docs/test-fixtures) in which I have initialize all Page objects and than used them in any test class.
* In allure-results folder there is the report for Test Executions




npx playwright test tests --headed
npx playwright test tests/loginTest.spec.ts --headed
npx playwright test tests/dbTest.spec.ts
