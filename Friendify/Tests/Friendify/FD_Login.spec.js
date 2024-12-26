import { test } from '@playwright/test';
import { LoginPage } from '../../Pages/Friendify/FD_Login';

// Test case 1: Login with Account
test('Login with Account', async ({ page }) => {
  const login = new LoginPage(page);
  await login.loginWithAccount();
});

// Test case 2: Login with Google 
test('Login with Google', async ({ page }) => {
  const login = new LoginPage(page);
  await login.loginWithGoogle(true);  // Skip Referral Code
});

