// LoadMessages.spec.js
import { describe, it, vi, expect } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import Chat from '../../views/Chat.vue';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'vue-router';

vi.mock('firebase/firestore');
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

describe('Load Messages', () => {
    it('loads messages on mount and redirects if not authenticated', async () => {
        const mockPush = vi.fn();
        useRouter.mockReturnValue({ push: mockPush });

        const messages = [
            { id: '1', text: 'First message', createdAt: { seconds: 1618300800, nanoseconds: 0 }, userId: 'user1', displayName: 'User One' },
            { id: '2', text: 'Second message', createdAt: { seconds: 1618300900, nanoseconds: 0 }, userId: 'user2', displayName: 'User Two' }
        ];

        onSnapshot.mockImplementation((q, callback) => {
            callback({ docs: messages.map(msg => ({ id: msg.id, data: () => msg })) });
        });

        const auth = { currentUser: null };
        getAuth.mockReturnValue(auth);

        onAuthStateChanged.mockImplementation((auth, callback) => {
            callback(null);
        });

        const wrapper = shallowMount(Chat);
        await wrapper.vm.$nextTick();

        expect(wrapper.vm.messages).toHaveLength(2);
        expect(wrapper.vm.messages[0].text).toBe('First message');

        expect(mockPush).toHaveBeenCalledWith('/');
    });
});
