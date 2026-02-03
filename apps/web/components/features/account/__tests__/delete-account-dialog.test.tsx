import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { DeleteAccountDialog } from '../delete-account-dialog';
import * as userActions from '@/lib/actions/user';

// Mock dependencies
vi.mock('@/lib/actions/user', () => ({
    deleteAccount: vi.fn(),
}));

vi.mock('next/navigation', () => ({
    useRouter: () => ({
        push: vi.fn(),
    }),
}));

vi.mock('@repo/ui/use-toast', () => ({
    toast: vi.fn(),
}));

describe('DeleteAccountDialog', () => {
    const mockUserEmail = '[email protected]';

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders delete account button', () => {
        render(<DeleteAccountDialog userEmail={mockUserEmail} />);
        expect(screen.getByRole('button', { name: /delete account/i })).toBeInTheDocument();
    });

    it('shows confirmation dialog when button is clicked', async () => {
        render(<DeleteAccountDialog userEmail={mockUserEmail} />);

        const button = screen.getByRole('button', { name: /delete account/i });
        fireEvent.click(button);

        await waitFor(() => {
            expect(screen.getByText(/are you absolutely sure/i)).toBeInTheDocument();
            expect(screen.getByText(/this action cannot be undone/i)).toBeInTheDocument();
        });
    });

    it('shows confirmation input field with instructions', async () => {
        render(<DeleteAccountDialog userEmail={mockUserEmail} />);

        const button = screen.getByRole('button', { name: /delete account/i });
        fireEvent.click(button);

        await waitFor(() => {
            expect(screen.getByLabelText(/type delete or your email/i)).toBeInTheDocument();
            expect(screen.getByText(mockUserEmail)).toBeInTheDocument();
        });
    });

    it('disables delete button when confirmation is empty', async () => {
        render(<DeleteAccountDialog userEmail={mockUserEmail} />);

        const openButton = screen.getByRole('button', { name: /^delete account$/i });
        fireEvent.click(openButton);

        await waitFor(() => {
            const deleteButton = screen.getByRole('button', { name: /^delete account$/i });
            expect(deleteButton).toBeDisabled();
        });
    });

    it('enables delete button when "DELETE" is typed', async () => {
        render(<DeleteAccountDialog userEmail={mockUserEmail} />);

        const openButton = screen.getByRole('button', { name: /^delete account$/i });
        fireEvent.click(openButton);

        await waitFor(() => {
            const input = screen.getByLabelText(/type delete or your email/i);
            fireEvent.change(input, { target: { value: 'DELETE' } });
        });

        await waitFor(() => {
            const deleteButton = screen.getAllByRole('button', { name: /delete account/i })[1];
            expect(deleteButton).not.toBeDisabled();
        });
    });

    it('enables delete button when user email is typed', async () => {
        render(<DeleteAccountDialog userEmail={mockUserEmail} />);

        const openButton = screen.getByRole('button', { name: /^delete account$/i });
        fireEvent.click(openButton);

        await waitFor(() => {
            const input = screen.getByLabelText(/type delete or your email/i);
            fireEvent.change(input, { target: { value: mockUserEmail } });
        });

        await waitFor(() => {
            const deleteButton = screen.getAllByRole('button', { name: /delete account/i })[1];
            expect(deleteButton).not.toBeDisabled();
        });
    });

    it('calls deleteAccount action with correct confirmation on submit', async () => {
        const mockDeleteAccount = vi.mocked(userActions.deleteAccount);
        mockDeleteAccount.mockResolvedValue({ success: true });

        render(<DeleteAccountDialog userEmail={mockUserEmail} />);

        const openButton = screen.getByRole('button', { name: /^delete account$/i });
        fireEvent.click(openButton);

        await waitFor(() => {
            const input = screen.getByLabelText(/type delete or your email/i);
            fireEvent.change(input, { target: { value: 'DELETE' } });
        });

        const deleteButton = screen.getAllByRole('button', { name: /delete account/i })[1];
        fireEvent.click(deleteButton);

        await waitFor(() => {
            expect(mockDeleteAccount).toHaveBeenCalledWith('DELETE');
        });
    });

    it('shows loading state during deletion', async () => {
        const mockDeleteAccount = vi.mocked(userActions.deleteAccount);
        mockDeleteAccount.mockImplementation(() => new Promise(() => { })); // Never resolves

        render(<DeleteAccountDialog userEmail={mockUserEmail} />);

        const openButton = screen.getByRole('button', { name: /^delete account$/i });
        fireEvent.click(openButton);

        await waitFor(() => {
            const input = screen.getByLabelText(/type delete or your email/i);
            fireEvent.change(input, { target: { value: 'DELETE' } });
        });

        const deleteButton = screen.getAllByRole('button', { name: /delete account/i })[1];
        fireEvent.click(deleteButton);

        await waitFor(() => {
            expect(screen.getByText(/deleting/i)).toBeInTheDocument();
        });
    });

    it('handles deletion error gracefully', async () => {
        const mockDeleteAccount = vi.mocked(userActions.deleteAccount);
        mockDeleteAccount.mockResolvedValue({ error: 'Deletion failed' });

        render(<DeleteAccountDialog userEmail={mockUserEmail} />);

        const openButton = screen.getByRole('button', { name: /^delete account$/i });
        fireEvent.click(openButton);

        await waitFor(() => {
            const input = screen.getByLabelText(/type delete or your email/i);
            fireEvent.change(input, { target: { value: 'DELETE' } });
        });

        const deleteButton = screen.getAllByRole('button', { name: /delete account/i })[1];
        fireEvent.click(deleteButton);

        await waitFor(() => {
            expect(mockDeleteAccount).toHaveBeenCalled();
        });
    });

    it('closes dialog on cancel', async () => {
        render(<DeleteAccountDialog userEmail={mockUserEmail} />);

        const openButton = screen.getByRole('button', { name: /^delete account$/i });
        fireEvent.click(openButton);

        await waitFor(() => {
            expect(screen.getByText(/are you absolutely sure/i)).toBeInTheDocument();
        });

        const cancelButton = screen.getByRole('button', { name: /cancel/i });
        fireEvent.click(cancelButton);

        await waitFor(() => {
            expect(screen.queryByText(/are you absolutely sure/i)).not.toBeInTheDocument();
        });
    });
});
