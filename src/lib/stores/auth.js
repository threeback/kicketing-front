import {writable} from 'svelte/store';
import {endpoints} from "$lib/api";
import {goto} from "$app/navigation";

export const refreshToken = writable(null);
export const isLoggedIn = writable(false);

const createUserStore = () => {
    let initialUser = null;

    if (typeof window !== 'undefined') {
        const storedUser = localStorage.getItem('user');
        initialUser = storedUser ? JSON.parse(storedUser) : null;
    }

    const { subscribe, set, update } = writable(initialUser);

    return {
        subscribe,
        set: (value) => {
            if (typeof window !== 'undefined') {
                if (value) {
                    localStorage.setItem('user', JSON.stringify(value));
                } else {
                    localStorage.removeItem('user');
                }
            }
            set(value);
        },
        update
    };
};

export const user = createUserStore();

export async function getUser() {
    try {
        const response = await fetch(endpoints.user, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Failed to get user data');
        }

        const data = await response.json();
        user.set(data);
    } catch (error) {
        console.error('Failed to get user data:', error);
    }
}

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

export async function refreshAccessToken(redirectUrl) {
    let token;
    refreshToken.subscribe(value => {
        token = value;
    })();

    try {
        const response = await fetch(endpoints.refresh, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({refreshToken: token})
        });

        if (!response.ok) {
            removeRefreshToken();
            setLogout();
            alert("로그인 세션이 만료되었습니다. 다시 로그인 해주세요.")
            window.location.href = "/";
        } else {
            setLogin();
            window.location.href = redirectUrl;
        }

    } catch (error) {
        console.error('Failed to refresh access token:', error);
        return null;
    }
}

export async function handleRefreshAccessToken(response, redirectUrl) {
    try {
        const errorData = await response.text();
        if (errorData === "[ACCESS_TOKEN] 토큰 추출 실패" || errorData === "[ACCESS_TOKEN] JWT 토큰 만료") {
            await refreshAccessToken(redirectUrl);
        }
    } catch (error) {
        throw new Error('Network response was not ok');
    }
}
