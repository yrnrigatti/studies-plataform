import { test, expect } from '@playwright/test';
import {
    cleanupTestUser,
    getUserFromDB,
    generateTestEmail,
} from '../helpers/supabase-test-helpers';

test.describe('User Registration E2E Tests', () => {
    test.beforeEach(async ({ page }) => {
        // Navigate to registration page before each test
        await page.goto('/register');
    });

    test('AC1: Complete successful registration flow', async ({ page }) => {
        const testEmail = generateTestEmail();
        const testPassword = 'securePassword123';

        // Fill in registration form
        await page.getByLabel(/email/i).fill(testEmail);
        await page.getByLabel(/password/i).fill(testPassword);

        // Submit form
        await page.getByRole('button', { name: /sign up/i }).click();

        // Wait for redirect to /library
        await expect(page).toHaveURL('/library', { timeout: 10000 });

        // Verify user was created in database
        const user = await getUserFromDB(testEmail);
        expect(user).not.toBeNull();
        expect(user?.email).toBe(testEmail);

        // Cleanup
        await cleanupTestUser(testEmail);
    });

    test('AC2: Duplicate email error', async ({ page }) => {
        const testEmail = generateTestEmail();
        const testPassword = 'securePassword123';

        // First registration
        await page.getByLabel(/email/i).fill(testEmail);
        await page.getByLabel(/password/i).fill(testPassword);
        await page.getByRole('button', { name: /sign up/i }).click();

        // Wait for success (redirect or toast)
        await page.waitForTimeout(2000);

        // Navigate back to register page
        await page.goto('/register');

        // Try to register with same email
        await page.getByLabel(/email/i).fill(testEmail);
        await page.getByLabel(/password/i).fill(testPassword);
        await page.getByRole('button', { name: /sign up/i }).click();

        // Verify error message appears
        await expect(page.getByText(/email already registered/i)).toBeVisible({
            timeout: 5000,
        });

        // Cleanup
        await cleanupTestUser(testEmail);
    });

    test('AC3: Client validation for invalid email', async ({ page }) => {
        // Enter invalid email
        await page.getByLabel(/email/i).fill('invalidemail');
        await page.getByLabel(/password/i).fill('validPassword123');
        await page.getByRole('button', { name: /sign up/i }).click();

        // Verify validation error appears
        await expect(
            page.getByText(/please enter a valid email address/i)
        ).toBeVisible();

        // Verify form does not submit (still on register page)
        await expect(page).toHaveURL(/\/register/);
    });

    test('AC3: Client validation for short password', async ({ page }) => {
        // Enter short password
        await page.getByLabel(/email/i).fill('test@example.com');
        await page.getByLabel(/password/i).fill('short');
        await page.getByRole('button', { name: /sign up/i }).click();

        // Verify validation error appears
        await expect(
            page.getByText(/password must be at least 8 characters/i)
        ).toBeVisible();

        // Verify form does not submit (still on register page)
        await expect(page).toHaveURL(/\/register/);
    });

    test('AC4: Error recovery - can retry after error', async ({ page }) => {
        const testEmail = generateTestEmail();

        // First attempt with short password (will fail validation)
        await page.getByLabel(/email/i).fill(testEmail);
        await page.getByLabel(/password/i).fill('short');
        await page.getByRole('button', { name: /sign up/i }).click();

        // See error
        await expect(
            page.getByText(/password must be at least 8 characters/i)
        ).toBeVisible();

        // Retry with valid password
        await page.getByLabel(/password/i).clear();
        await page.getByLabel(/password/i).fill('validPassword123');
        await page.getByRole('button', { name: /sign up/i }).click();

        // Should succeed
        await expect(page).toHaveURL('/library', { timeout: 10000 });

        // Cleanup
        await cleanupTestUser(testEmail);
    });

    test('Navigate to register page from login page link', async ({ page }) => {
        // Assuming there's a login page with a link to register
        // This test might need adjustment based on actual login page implementation
        await page.goto('/login');

        // Look for "Sign up" or "Create account" link
        const signUpLink = page.getByRole('link', { name: /sign up|create account|register/i });

        if (await signUpLink.isVisible()) {
            await signUpLink.click();
            await expect(page).toHaveURL(/\/register/);
        } else {
            // If login page doesn't exist yet, skip this test
            test.skip();
        }
    });

    test('Form fields are accessible and labeled correctly', async ({ page }) => {
        // Verify email input is accessible
        const emailInput = page.getByLabel(/email/i);
        await expect(emailInput).toBeVisible();
        await expect(emailInput).toHaveAttribute('type', 'email');

        // Verify password input is accessible
        const passwordInput = page.getByLabel(/password/i);
        await expect(passwordInput).toBeVisible();
        await expect(passwordInput).toHaveAttribute('type', 'password');

        // Verify submit button is accessible
        const submitButton = page.getByRole('button', { name: /sign up/i });
        await expect(submitButton).toBeVisible();
        await expect(submitButton).toBeEnabled();
    });

    test('Password field masks input', async ({ page }) => {
        const passwordInput = page.getByLabel(/password/i);

        // Verify password type
        await expect(passwordInput).toHaveAttribute('type', 'password');

        // Type password and verify it's masked (characters should not be visible as plain text)
        await passwordInput.fill('mySecretPassword');

        // The input should still have type="password"
        await expect(passwordInput).toHaveAttribute('type', 'password');
    });

    test('Loading state shows during submission', async ({ page }) => {
        const testEmail = generateTestEmail();
        const testPassword = 'validPassword123';

        await page.getByLabel(/email/i).fill(testEmail);
        await page.getByLabel(/password/i).fill(testPassword);

        const submitButton = page.getByRole('button', { name: /sign up/i });

        // Verify button is enabled before click
        await expect(submitButton).toBeEnabled();

        // Click submit
        await submitButton.click();

        // Button should be disabled during submission (loading state)
        await expect(submitButton).toBeDisabled();

        // Wait for completion
        await page.waitForTimeout(3000);

        // Cleanup
        await cleanupTestUser(testEmail);
    });

    test('Page has correct title and description', async ({ page }) => {
        // Verify page heading
        await expect(page.getByRole('heading', { name: /create an account/i })).toBeVisible();

        // Verify description text
        await expect(
            page.getByText(/enter your email below to create your account/i)
        ).toBeVisible();
    });

    test('Links to Terms of Service and Privacy Policy exist', async ({ page }) => {
        // Verify Terms of Service link
        const termsLink = page.getByRole('link', { name: /terms of service/i });
        await expect(termsLink).toBeVisible();
        await expect(termsLink).toHaveAttribute('href', '/terms');

        // Verify Privacy Policy link
        const privacyLink = page.getByRole('link', { name: /privacy policy/i });
        await expect(privacyLink).toBeVisible();
        await expect(privacyLink).toHaveAttribute('href', '/privacy');
    });

    test('Link to login page exists for existing users', async ({ page }) => {
        // Verify "Already have an account?" link
        const signInLink = page.getByRole('link', { name: /sign in/i });
        await expect(signInLink).toBeVisible();
        await expect(signInLink).toHaveAttribute('href', '/login');
    });
});
