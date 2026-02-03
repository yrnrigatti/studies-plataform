import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { vi, describe, it, expect, beforeEach } from 'vitest'
import { ProfileForm } from '../profile-form'

// Mock dependencies
const mockRefresh = vi.fn()
const mockUpdate = vi.fn()
const mockEq = vi.fn()
const mockFrom = vi.fn()

const mockUser = { id: 'user-123', email: 'test@example.com', user_metadata: { full_name: 'Test User' }, app_metadata: {}, aud: 'authenticated', created_at: new Date().toISOString() }
const mockInitialData = { name: 'Initial Name' }

vi.mock('next/navigation', () => ({
    useRouter: () => ({
        refresh: mockRefresh,
    }),
}))

vi.mock('@/lib/supabase/client', () => ({
    createClient: () => ({
        from: mockFrom,
    }),
}))

vi.mock('@repo/ui/use-toast', () => ({
    useToast: () => ({
        toast: vi.fn(),
    }),
}))

describe('ProfileForm', () => {
    beforeEach(() => {
        vi.clearAllMocks()
        // Setup chaining mocks
        mockFrom.mockReturnValue({ update: mockUpdate })
        mockUpdate.mockReturnValue({ eq: mockEq })
        mockEq.mockResolvedValue({ error: null })
    })

    it('renders profile form with initial data', () => {
        render(<ProfileForm user={mockUser} initialData={mockInitialData} />)
        expect(screen.getByText('Profile')).toBeInTheDocument()
        expect(screen.getByLabelText('Email')).toBeDisabled()
        expect(screen.getByDisplayValue('test@example.com')).toBeInTheDocument()
        expect(screen.getByDisplayValue('Initial Name')).toBeInTheDocument()
        expect(screen.getByRole('button', { name: /save changes/i })).toBeInTheDocument()
    })

    it('validates display name requirements', async () => {
        render(<ProfileForm user={mockUser} />)

        const input = screen.getByLabelText('Display Name')
        fireEvent.change(input, { target: { value: 'A' } })
        fireEvent.click(screen.getByRole('button', { name: /save changes/i }))

        await waitFor(() => {
            expect(screen.getByText('Display name must be at least 2 characters long.')).toBeInTheDocument()
        })
    })

    it('submits valid updates successfully', async () => {
        render(<ProfileForm user={mockUser} />)

        const input = screen.getByLabelText('Display Name')
        fireEvent.change(input, { target: { value: 'Updated Name' } })

        fireEvent.click(screen.getByRole('button', { name: /save changes/i }))

        await waitFor(() => {
            expect(mockFrom).toHaveBeenCalledWith('users')
            expect(mockUpdate).toHaveBeenCalledWith({ name: 'Updated Name' })
            expect(mockEq).toHaveBeenCalledWith('id', 'user-123')
            expect(mockRefresh).toHaveBeenCalled()
        })
    })

    it('handles update error', async () => {
        mockEq.mockResolvedValueOnce({
            error: { message: 'Update failed' }
        })

        render(<ProfileForm user={mockUser} />)

        const input = screen.getByLabelText('Display Name')
        fireEvent.change(input, { target: { value: 'Updated Name' } })

        fireEvent.click(screen.getByRole('button', { name: /save changes/i }))

        await waitFor(() => {
            expect(mockFrom).toHaveBeenCalled()
            expect(mockRefresh).not.toHaveBeenCalled()
        })
    })
})
