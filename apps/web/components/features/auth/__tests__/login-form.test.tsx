import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { vi, describe, it, expect, beforeEach } from 'vitest'
import { LoginForm } from '../login-form'

// Mock dependencies
const mockPush = vi.fn()
const mockRefresh = vi.fn()
const mockSignInWithPassword = vi.fn()

vi.mock('next/navigation', () => ({
    useRouter: () => ({
        push: mockPush,
        refresh: mockRefresh,
    }),
}))

vi.mock('@/lib/supabase/client', () => ({
    createClient: () => ({
        auth: {
            signInWithPassword: mockSignInWithPassword,
        },
    }),
}))

vi.mock('@repo/ui/use-toast', () => ({
    useToast: () => ({
        toast: vi.fn(),
    }),
}))

describe('LoginForm', () => {
    beforeEach(() => {
        vi.clearAllMocks()
        mockSignInWithPassword.mockResolvedValue({ error: null })
    })

    it('renders login form correctly', () => {
        render(<LoginForm />)
        expect(screen.getByText('Login')).toBeInTheDocument()
        expect(screen.getByLabelText('Email')).toBeInTheDocument()
        expect(screen.getByLabelText('Password')).toBeInTheDocument()
        expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument()
    })

    it('validates required fields', async () => {
        render(<LoginForm />)

        fireEvent.click(screen.getByRole('button', { name: /sign in/i }))

        await waitFor(() => {
            expect(screen.getByText('Please enter a valid email address.')).toBeInTheDocument()
            expect(screen.getByText('Password must be at least 8 characters long.')).toBeInTheDocument()
        })
    })

    it('submits form with valid data', async () => {
        render(<LoginForm />)

        fireEvent.change(screen.getByLabelText('Email'), {
            target: { value: 'test@example.com' },
        })
        fireEvent.change(screen.getByLabelText('Password'), {
            target: { value: 'password123' },
        })

        fireEvent.click(screen.getByRole('button', { name: /sign in/i }))

        await waitFor(() => {
            expect(mockSignInWithPassword).toHaveBeenCalledWith({
                email: 'test@example.com',
                password: 'password123',
            })
            expect(mockPush).toHaveBeenCalledWith('/dashboard')
        })
    })

    it('handles submission error', async () => {
        mockSignInWithPassword.mockResolvedValueOnce({
            error: { message: 'Invalid credentials' },
        })

        render(<LoginForm />)

        fireEvent.change(screen.getByLabelText('Email'), {
            target: { value: 'test@example.com' },
        })
        fireEvent.change(screen.getByLabelText('Password'), {
            target: { value: 'password123' },
        })

        fireEvent.click(screen.getByRole('button', { name: /sign in/i }))

        await waitFor(() => {
            expect(mockSignInWithPassword).toHaveBeenCalled()
            expect(mockPush).not.toHaveBeenCalled()
        })
    })
})
