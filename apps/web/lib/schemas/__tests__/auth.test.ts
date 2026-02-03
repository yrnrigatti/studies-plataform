import { describe, it, expect } from 'vitest';
import { registerSchema } from '@/lib/schemas/auth';

describe('registerSchema', () => {
    describe('email validation', () => {
        it('accepts valid email addresses', () => {
            const validEmails = [
                'test@example.com',
                'user.name@domain.com',
                'user+tag@example.co.uk',
            ];

            validEmails.forEach((email) => {
                const result = registerSchema.safeParse({
                    email,
                    password: 'password123',
                });
                expect(result.success).toBe(true);
            });
        });

        it('rejects invalid email formats', () => {
            const invalidEmails = [
                'notanemail',
                'missing@domain',
                '@nodomain.com',
                'no@.com',
            ];

            invalidEmails.forEach((email) => {
                const result = registerSchema.safeParse({
                    email,
                    password: 'password123',
                });
                expect(result.success).toBe(false);
                if (!result.success) {
                    expect(result.error.issues[0].message).toContain('valid email');
                }
            });
        });

        it('provides correct error message for invalid email', () => {
            const result = registerSchema.safeParse({
                email: 'invalid',
                password: 'password123',
            });

            expect(result.success).toBe(false);
            if (!result.success) {
                expect(result.error.issues[0].message).toBe(
                    'Please enter a valid email address.'
                );
            }
        });
    });

    describe('password validation', () => {
        it('accepts passwords with 8 or more characters', () => {
            const validPasswords = ['password', '12345678', 'abcdefgh', 'P@ssw0rd!'];

            validPasswords.forEach((password) => {
                const result = registerSchema.safeParse({
                    email: 'test@example.com',
                    password,
                });
                expect(result.success).toBe(true);
            });
        });

        it('rejects passwords with less than 8 characters', () => {
            const shortPasswords = ['pass', '1234567', 'abc'];

            shortPasswords.forEach((password) => {
                const result = registerSchema.safeParse({
                    email: 'test@example.com',
                    password,
                });
                expect(result.success).toBe(false);
                if (!result.success) {
                    expect(result.error.issues[0].message).toContain('at least 8');
                }
            });
        });

        it('provides correct error message for short password', () => {
            const result = registerSchema.safeParse({
                email: 'test@example.com',
                password: 'short',
            });

            expect(result.success).toBe(false);
            if (!result.success) {
                expect(result.error.issues[0].message).toBe(
                    'Password must be at least 8 characters long.'
                );
            }
        });
    });

    describe('complete form validation', () => {
        it('accepts valid email and password combination', () => {
            const result = registerSchema.safeParse({
                email: 'user@example.com',
                password: 'securePassword123',
            });

            expect(result.success).toBe(true);
            if (result.success) {
                expect(result.data).toEqual({
                    email: 'user@example.com',
                    password: 'securePassword123',
                });
            }
        });

        it('rejects when both email and password are invalid', () => {
            const result = registerSchema.safeParse({
                email: 'invalid',
                password: 'short',
            });

            expect(result.success).toBe(false);
            if (!result.success) {
                expect(result.error.issues).toHaveLength(2);
            }
        });
    });
});
