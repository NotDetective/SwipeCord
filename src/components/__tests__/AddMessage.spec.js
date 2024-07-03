// AddMessage.spec.js
import { describe, it, vi, expect } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import Chat from '../../views/Chat.vue';
import { collection, addDoc, getDoc } from 'firebase/firestore';

vi.mock('firebase/firestore');
vi.mock('vue-router', () => ({
    useRouter: vi.fn(() => ({ push: vi.fn() })),
    useRoute: vi.fn(() => ({ params: { id: 'test-chat-id' } })),
    createRouter: vi.fn(),
    createWebHistory: vi.fn(),
    router: {
        push: vi.fn(),
    },
}));

describe('Add Message', () => {
    it('adds a new message', async () => {
        const addDocMock = vi.fn();
        addDoc.mockImplementation(addDocMock);

        const getDocMock = vi.fn().mockResolvedValue({
            exists: () => true,
            data: () => ({ Coins: 0 }),
        });
        getDoc.mockImplementation(getDocMock);

        const wrapper = shallowMount(Chat);
        wrapper.vm.newMessage = 'New message';

        await wrapper.vm.addMessage();
        expect(addDocMock).toHaveBeenCalled();
    });
});
