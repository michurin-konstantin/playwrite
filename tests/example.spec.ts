import { test, expect } from '@playwright/test';
import { allure, LabelName } from "allure-playwright";



test('homepage has Playwright in title and get started link linking to the intro page', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);

  // create a locator
  const getStarted = page.locator('text=Get Started');

  // Expect an attribute "to be strictly equal" to the value.
  await expect(getStarted).toHaveAttribute('href', '/docs/intro');

  // Click the get started link.
  await getStarted.click();

  // Expects the URL to contain intro.
  await expect(page).toHaveURL(/.*intro/);
});


test("basic test", async ({ page }, testInfo) => {
    allure.label({ name: LabelName.LANGUAGE, value: "typescript" });
});



test("basic test", async ({ page }, testInfo) => {
  allure.link({ url: "https://playwright.dev", name: "playwright-site" });
  allure.issue({
    url: "https://github.com/allure-framework/allure-js/issues/352",
    name: "Target issue",
  });
});


test("basic test", async ({ page }, testInfo) => {
    allure.id("Some id");
});


test("basic test", async ({ page }, testInfo) => {
  allure.epic("Some Epic");
});


test("basic test", async ({ page }, testInfo) => {
  allure.story("Some Story");
});



test("basic test", async ({ page }, testInfo) => {
  await testInfo.attach("basic-page-screen", {
    body: await page.screenshot(),
    contentType: "image/png",
  });
});



export const TODO_ITEMS = [
  "buy some cheese",
  "feed the cat",
  "book a doctors appointment",
];

test("basic test", async ({ page }, testInfo) => {
   await testInfo.attach("TODO_ITEMS", {
      body: JSON.stringify(TODO_ITEMS),
      contentType: "application/json",
    });
});



test("basic test", async ({ page }, testInfo) => {
  await test.step("Visit todolist page", async () => {
    await page.goto("https://demo.playwright.dev/todomvc");
  });

  await test.step("Create 1st todo.", async () => {
    await page.locator(".new-todo").fill(TODO_ITEMS[0]);
    await page.locator(".new-todo").press("Enter");
  });

  await expect(
    page.locator(".view label"),
    "Make sure the list only has one todo item.",
  ).toHaveText([TODO_ITEMS[0]]);
});


test.only('focus this test', async ({ page }) => {
  // Run only focused tests in the entire project.
});


test.skip('skip this test', async ({ page }) => {
  // This test is not run
});


test('skip this test', async ({ page, browserName }) => {
  test.skip(browserName === 'firefox', 'Still working on it');
});


test.describe('two tests', () => {
  test('one', async ({ page }) => {
  });

  test('two', async ({ page }) => {
   
  });
});


test('Test login page @fast', async ({ page }) => {
  // ...
});

test('Test full report @slow', async ({ page }) => {
  // ...
});


test.describe('chromium only', () => {
  test.skip(({ browserName }) => browserName !== 'chromium', 'Chromium only!');

  test.beforeAll(async () => {
    // This hook is only run in Chromium.
  });

  test('test 1', async ({ page }) => {
    // This test is only run in Chromium.
  });

  test('test 2', async ({ page }) => {
    // This test is only run in Chromium.
  });
});


const REPO = 'playwrite';
const USER = 'michurin-konstantin';

// Request context is reused by all tests in the file.
let apiContext;

test.beforeAll(async ({ playwright }) => {
  apiContext = await playwright.request.newContext({
    // All requests we send go to this API endpoint.
    baseURL: 'https://api.github.com',
    extraHTTPHeaders: {
      // We set this header per GitHub guidelines.
      'Accept': 'application/vnd.github.v3+json',
      // Add authorization token to all requests.
      // Assuming personal access token available in the environment.
      'Authorization': `token ${process.env.API_TOKEN}`,
    },
  });
})

test.afterAll(async ({ }) => {
  // Dispose all responses.
  await apiContext.dispose();
});

test('last created issue should be first in the list', async ({ page }) => {
  const newIssue = await apiContext.post(`/repos/${USER}/${REPO}/issues`, {
    data: {
      title: '[Feature] request 1',
    }
  });
  expect(newIssue.ok()).toBeTruthy();

  await page.goto(`https://github.com/${USER}/${REPO}/issues`);
  const firstIssue = page.locator(`a[data-hovercard-type='issue']`).first();
  await expect(firstIssue).toHaveText('[Feature] request 1');
});




