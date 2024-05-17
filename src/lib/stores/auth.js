import { writable } from 'svelte/store';

export const refreshToken = writable(null);

export function setRefreshToken(value) {
    if (typeof localStorage !== 'undefined') {
        localStorage.setItem('refreshToken', value);
    }
    refreshToken.set(value);
}

export function removeRefreshToken() {
    if (typeof localStorage !== 'undefined') {
        localStorage.removeItem('refreshToken');
    }
    refreshToken.set(null);
}

if (typeof localStorage !== 'undefined' && localStorage.getItem('refreshToken')) {
    refreshToken.set(localStorage.getItem('refreshToken'));
}
