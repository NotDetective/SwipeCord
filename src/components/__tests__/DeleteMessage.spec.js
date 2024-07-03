// DeleteMessage.spec.js
import { describe, it, vi, expect } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import Chat from '../../views/Chat.vue';
import { doc, deleteDoc } from 'firebase/firestore';

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

describe('Delete Message', () => {
    it('deletes a message', async () => {
        const deleteDocMock = vi.fn();
        deleteDoc.mockImplementation(deleteDocMock);

        const wrapper = shallowMount(Chat);

        await wrapper.vm.deleteMessage('1');
        expect(deleteDocMock).toHaveBeenCalled();
    });
});
