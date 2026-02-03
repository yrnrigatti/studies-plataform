import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RegisterForm } from '../register-form';
import { createClient } from '@supabase/supabase-js';

// Mock Next.js router
const mockPush = vi.fn();
vi.mock('next/navigation', () => ({
    useRouter: () => ({
        push: mockPush,
    }),
}));

// Mock toast
const mockToast = vi.fn();
vi.mock('@repo/ui/components/ui/use-toast', () => ({
    useToast: () => ({
        toast: mockToast,
    }),
}));

// Mock UI components
vi.mock('@repo/ui/components/ui/button', () => ({
    Button: (props: any) => <button {...props} />,
}));

vi.mock('@repo/ui/components/ui/form', () => ({
    Form: ({ children }: any) => <>{children}</>,
    FormControl: ({ children }: any) => <>{children}</>,
    FormField: ({ render, name }: any) => render({
        field: {
            name,
            onChange: vi.fn(),
            onBlur: vi.fn(),
            value: '',
            ref: vi.fn()
        }
    }),
    FormItem: ({ children }: any) => <div>{children}</div>,
    FormLabel: ({ children }: any) => <label>{children}</label>,
    FormMessage: () => <span>Message</span>,
}));

vi.mock('@repo/ui/components/ui/input', () => ({
    Input: (props: any) => <input {...props} />,
}));

// Mock database client
vi.mock('@repo/database/client/web', () => ({
    createClient: vi.fn(),
}));

// Initialize Supabase with actual connection
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'http://localhost:54321';
const supabaseAnonKey =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'your-anon-key';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

describe('RegisterForm Integration Tests (Real Supabase)', () => {
    const testEmail = `test-${Date.now()}@example.com`;
    const testPassword = 'testPassword123';

    beforeEach(() => {
        mockPush.mockClear();
        mockToast.mockClear();
    });

    afterEach(async () => {
        // Cleanup: Delete test user after each test
        try {
            // Note: In a real scenario, you'd need admin access to delete users
            // For local testing, you might need to manually cleanup or use Supabase admin API
            // This is a placeholder - actual implementation depends on your setup
        } catch (error) {
            console.warn('Failed to cleanup test user:', error);
        }
    });

    it('renders email and password input fields', () => {
        const { container } = render(<RegisterForm />);

        expect(container.querySelector('input[name="email"]')).toBeInTheDocument();
        expect(container.querySelector('input[name="password"]')).toBeInTheDocument();
        expect(
            screen.getByRole('button', { name: /sign up/i })
        ).toBeInTheDocument();
    });

    it('shows client-side validation errors before submission', async () => {
        const user = userEvent.setup();
        const { container } = render(<RegisterForm />);

        const emailInput = container.querySelector('input[name="email"]') as HTMLInputElement;
        const passwordInput = container.querySelector('input[name="password"]') as HTMLInputElement;
        const submitButton = screen.getByRole('button', { name: /sign up/i });

        // Enter invalid email
        await user.type(emailInput, 'invalidemail');
        await user.type(passwordInput, 'short');
        await user.click(submitButton);

        await waitFor(() => {
            expect(
                screen.getByText(/please enter a valid email address/i)
            ).toBeInTheDocument();
            expect(
                screen.getByText(/password must be at least 8 characters/i)
            ).toBeInTheDocument();
        });
    });

    it('successfully registers a new user with valid credentials', async () => {
        const user = userEvent.setup();
        const { container } = render(<RegisterForm />);

        const emailInput = container.querySelector('input[name="email"]') as HTMLInputElement;
        const passwordInput = container.querySelector('input[name="password"]') as HTMLInputElement;
        const submitButton = screen.getByRole('button', { name: /sign up/i });

        await user.type(emailInput, testEmail);
        await user.type(passwordInput, testPassword);
        await user.click(submitButton);

        await waitFor(
            () => {
                expect(mockToast).toHaveBeenCalledWith(
                    expect.objectContaining({
                        title: 'Success',
                        description: expect.stringContaining('Account created'),
                    })
                );
                expect(mockPush).toHaveBeenCalledWith('/library');
            },
            { timeout: 5000 }
        );
    });

    it('shows error when email already exists', async () => {
        const user = userEvent.setup();
        const existingEmail = `existing-${Date.now()}@example.com`;

        // First, create a user
        await supabase.auth.signUp({
            email: existingEmail,
            password: testPassword,
        });

        const { container } = render(<RegisterForm />);

        const emailInput = container.querySelector('input[name="email"]') as HTMLInputElement;
        const passwordInput = container.querySelector('input[name="password"]') as HTMLInputElement;
        const submitButton = screen.getByRole('button', { name: /sign up/i });

        // Try to register with the same email
        await user.type(emailInput, existingEmail);
        await user.type(passwordInput, testPassword);
        await user.click(submitButton);

        await waitFor(
            () => {
                expect(screen.getByText(/email already registered/i)).toBeInTheDocument();
            },
            { timeout: 5000 }
        );
    });

    it('disables submit button during API call', async () => {
        const user = userEvent.setup();
        const { container } = render(<RegisterForm />);

        const emailInput = container.querySelector('input[name="email"]') as HTMLInputElement;
        const passwordInput = container.querySelector('input[name="password"]') as HTMLInputElement;
        const submitButton = screen.getByRole('button', { name: /sign up/i });

        await user.type(emailInput, testEmail);
        await user.type(passwordInput, testPassword);

        expect(submitButton).not.toBeDisabled();

        await user.click(submitButton);

        // Button should be disabled immediately after click
        expect(submitButton).toBeDisabled();
    });

    it('handles Supabase unavailable error gracefully', async () => {
        const user = userEvent.setup();

        // Mock environment
        const originalEnv = process.env.NEXT_PUBLIC_SUPABASE_URL;
        process.env.NEXT_PUBLIC_SUPABASE_URL = 'http://invalid-url:12345';

        const { container } = render(<RegisterForm />);

        const emailInput = container.querySelector('input[name="email"]') as HTMLInputElement;
        const passwordInput = container.querySelector('input[name="password"]') as HTMLInputElement;
        const submitButton = screen.getByRole('button', { name: /sign up/i });

        await user.type(emailInput, testEmail);
        await user.type(passwordInput, testPassword);
        await user.click(submitButton);

        await waitFor(
            () => {
                expect(mockToast).toHaveBeenCalledWith(
                    expect.objectContaining({
                        variant: 'destructive',
                        title: expect.stringContaining('Error'),
                    })
                );
            },
            { timeout: 5000 }
        );

        // Restore environment
        process.env.NEXT_PUBLIC_SUPABASE_URL = originalEnv;
    });
});
