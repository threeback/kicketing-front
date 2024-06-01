import { writable } from 'svelte/store';
import { endpoints } from '$lib/api';

export const name = writable('');
export const performances = writable([]);
export const genres = writable(new Set());
export const activeGenres = writable({
    '클래식': false,
    '뮤지컬': false,
    '콘서트': false,
    '연극': false,
});

export const genreMap = {
    '클래식': 'CLASSIC',
    '뮤지컬': 'MUSICAL',
    '콘서트': 'CONCERT',
    '연극': 'THEATER',
};

export async function fetchPerformances() {
    let currentName;
    let currentGenres;

    name.subscribe(value => {
        currentName = value;
    });

    genres.subscribe(value => {
        currentGenres = value;
    });

    if (!currentName) {
        alert('검색할 공연 이름이 없습니다.');
        return;
    }

    try {
        const encodedName = encodeURIComponent(currentName);
        let query = `name=${encodedName}`;
        if (currentGenres.size > 0) {
            const encodedGenres = Array.from(currentGenres).map(g => `genres=${encodeURIComponent(g)}`).join('&');
            query += `&${encodedGenres}`;
        }
        const response = await fetch(`${endpoints.searchPerformance}?${query}`, {
            method: "GET",
        });

        if (!response.ok) {
            console.log('Fetch error:', response);
        } else {
            const data = await response.json();
            performances.set(data.performances);
        }
    } catch (err) {
        console.log('Fetch error:', err.message);
    }
}