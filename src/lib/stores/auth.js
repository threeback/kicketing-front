import {writable} from 'svelte/store';
import {endpoints} from "$lib/api";

export const refreshToken = writable(null);
export const isLoggedIn = writable(false);

if (typeof window !== 'undefined') {
    const storedValue = localStorage.getItem('isLoggedIn');
    if (storedValue !== null) {
        isLoggedIn.set(storedValue === '1');
    }

    isLoggedIn.subscribe(value => {
        localStorage.setItem('isLoggedIn', value ? '1' : '0');
    });
}

export function setLogin() {
    isLoggedIn.set(true);
}

export function setLogout() {
    isLoggedIn.set(false);
}


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

export async function refreshAccessToken() {
    let token;
    refreshToken.subscribe(value => {
        token = value;
    })();

    if (!token) {
        return null;
    }

    try {
        const response = await fetch(endpoints.refresh, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({refreshToken: token})
        });

        if (!response.ok) {
            return null;
        }
    } catch (error) {
        console.error('Failed to refresh access token:', error);
        return null;
    }
}
