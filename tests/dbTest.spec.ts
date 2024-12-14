import { test, expect } from '@playwright/test';
import DbConnection from '../utils/database';

const dbTest = new DbConnection();

test.describe("test database", () => {
  test.beforeAll(async () => {
    await dbTest.startDbConnection(); 
  });

  test.afterAll(async () => {
    if (dbTest.connected) {
      await dbTest.stopDbConnection();
    }
  });

  test('database is connected', async () => {
    expect(dbTest.connected).toBe(true); // Verify connection is established
  });

  test('database connection closed', async () => {
    const isClosed = await dbTest.stopDbConnection();
    expect(isClosed).toBe("true");

    expect(dbTest.connected).toBe(false);
  });
});
