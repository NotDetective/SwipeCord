// EditMessage.spec.js
import { describe, it, vi, expect } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import Chat from '../../views/Chat.vue';
import { doc, updateDoc } from 'firebase/firestore';

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

describe('Edit Message', () => {
    it('edits a message', async () => {
        const updateDocMock = vi.fn();
        updateDoc.mockImplementation(updateDocMock);

        const wrapper = shallowMount(Chat);
        wrapper.vm.editingMessageId = '1';
        wrapper.vm.editingMessageText = 'Edited message';

        await wrapper.vm.updateMessage();
        expect(updateDocMock).toHaveBeenCalled();
    });
});
