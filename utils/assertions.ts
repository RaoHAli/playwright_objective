// utils/assertions.ts

import { expect, Page } from '@playwright/test';

// Helper function to wait for the element to be attached
async function waitForElementAttached(page: Page, locator: string) {
    await page.locator(locator).waitFor({ state: 'attached' });
}

// Function to check if an element is disabled
export async function verifyElementIsDisabled(page: Page, locator: string) {
    await waitForElementAttached(page, locator);
    await expect(page.locator(locator)).toBeDisabled();
}

// Function to check if an element contains specific text
export async function verifyElementContainsText(page: Page, locator: string, text: string) {
    await waitForElementAttached(page, locator);
    await expect(page.locator(locator)).toContainText(text);
}

// Function to check if an element is empty
export async function verifyElementIsEmpty(page: Page, locator: string) {
    await waitForElementAttached(page, locator);
    await expect(page.locator(locator)).toBeEmpty();
}

// Function to check if an element is visible
export async function verifyElementIsVisible(page: Page, locator: string) {
    await waitForElementAttached(page, locator);
    await expect(page.locator(locator)).toBeVisible();
}

export async function expectToBeValue(expectedValue: string, actualValue: string, errorMessage: string) {
  expect(expectedValue.trim(), errorMessage).toBe(actualValue);
}

// Default export the functions
export default {
    verifyElementIsDisabled,
    verifyElementContainsText,
    verifyElementIsEmpty,
    verifyElementIsVisible,
    expectToBeValue
};
