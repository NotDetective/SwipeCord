import { mount } from '@vue/test-utils';
import Home from '../views/home.vue';
import { describe, it, expect, vi } from 'vitest';
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import router from '../router';

vi.mock('firebase/auth', () => ({
    getAuth: vi.fn(),
    signInWithEmailAndPassword: vi.fn(),
    signInWithPopup: vi.fn(),
    GoogleAuthProvider: vi.fn(),
}));

vi.mock('../router', () => ({
    replace: vi.fn(),
}));

describe('Home.vue', () => {
    it('renders de component goed', () => {
        const wrapper = mount(Home);
        expect(wrapper.exists()).toBe(true);
    });

    it('roept loginWithEmail method bij drukken op submit', async () => {
        const wrapper = mount(Home);
        const loginWithEmailSpy = vi.spyOn(wrapper.vm, 'loginWithEmail');
        await wrapper.find('form').trigger('submit.prevent');
        expect(loginWithEmailSpy).toHaveBeenCalled();
    });

    it('roept loginWithGoogle method bij klik op knop', async () => {
        const wrapper = mount(Home);
        const loginWithGoogleSpy = vi.spyOn(wrapper.vm, 'loginWithGoogle');
        await wrapper.find('.login-with-google-btn').trigger('click');
        expect(loginWithGoogleSpy).toHaveBeenCalled();
    });
});
