// __mocks__/vue-router.js
import { vi } from 'vitest';

const mockPush = vi.fn();

export const useRouter = vi.fn(() => ({
    push: mockPush,
}));

export const useRoute = vi.fn(() => ({
    params: {
        id: 'test-chat-id',
    },
}));

export const createRouter = vi.fn();
export const createWebHistory = vi.fn();

export const router = {
    push: mockPush,
};
