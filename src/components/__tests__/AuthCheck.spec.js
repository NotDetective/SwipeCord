// AuthCheck.spec.js
import { describe, it, vi, expect } from 'vitest';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { shallowMount } from '@vue/test-utils';
import { useRouter } from 'vue-router';
import Chat from '../../views/Chat.vue';

vi.mock('firebase/auth');
vi.mock('vue-router', () => ({
    useRouter: vi.fn(() => ({ push: vi.fn() })),
    useRoute: vi.fn(() => ({ params: { id: 'test-chat-id' } })),
    createRouter: vi.fn(),
    createWebHistory: vi.fn(),
    router: {
        push: vi.fn(),
    },
}));

describe('Authentication Check', () => {
    it('redirects to home if user is not signed in', async () => {
        const mockPush = vi.fn();
        vi.mocked(useRouter).mockReturnValue({ push: mockPush });

        const auth = { currentUser: null };
        getAuth.mockReturnValue(auth);

        onAuthStateChanged.mockImplementation((auth, callback) => {
            callback(null);
        });

        shallowMount(Chat);

        expect(mockPush).toHaveBeenCalledWith('/');
    });
});
