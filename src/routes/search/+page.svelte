<script>
    import { onMount } from "svelte";
    import { page } from "$app/stores";
    import Performance_box from './box/performance_box.svelte';
    import { name, performances, genres, activeGenres, genreMap, fetchPerformances } from '$lib/stores/performance';

    $: (function() {
        const genreParams = $page.url.searchParams.get('genres');
        if (genreParams) {
            const genreSet = new Set(genreParams.split(','));
            genres.set(genreSet);
        }
    })();

    $: $page.url.search, updateFromURL();

    function updateFromURL() {
        const urlParams = new URLSearchParams($page.url.search);
        const urlName = urlParams.get('name');
        const urlGenres = urlParams.get('genres');

        if (urlName) {
            name.set(urlName);
        }

        if (urlGenres) {
            const genreSet = new Set(urlGenres.split(','));
            genres.set(genreSet);
        }

        fetchPerformances();
    }

    onMount(() => {
        updateFromURL();
    });

    const MoveToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    function toggleGenre(selectedGenre) {
        activeGenres.update(currentGenres => {
            const genreKey = genreMap[selectedGenre];
            currentGenres[selectedGenre] = !currentGenres[selectedGenre];

            genres.update(currentGenresSet => {
                if (currentGenresSet.has(genreKey)) {
                    currentGenresSet.delete(genreKey);
                    if (currentGenresSet.size === 0) {
                        currentGenresSet.add('NONE');
                    }
                } else {
                    currentGenresSet.delete('NONE');
                    currentGenresSet.add(genreKey);
                }
                return currentGenresSet;
            });
            return currentGenres;
        });
        fetchPerformances();
    }


</script>

<title>검색</title>
<div class="container">
    <div class="filter">
        <div class="filter-section">
            <menu class="filter-options">
                <button on:click={() => toggleGenre('클래식')} class:active={$activeGenres['클래식']}>클래식</button>
                <button on:click={() => toggleGenre('뮤지컬')} class:active={$activeGenres['뮤지컬']}>뮤지컬</button>
                <button on:click={() => toggleGenre('콘서트')} class:active={$activeGenres['콘서트']}>콘서트</button>
                <button on:click={() => toggleGenre('연극')} class:active={$activeGenres['연극']}>연극</button>
            </menu>
            <button class="move_to_top_button" on:click={() => MoveToTop()}>↑</button>
        </div>
    </div>

    <div class="main-content">
        {#if $performances.length > 0}
            <div class="performance-container">
                {#each $performances as performance}
                    <Performance_box {performance} />
                {/each}
            </div>
        {:else}
            <p class="not_search_result">검색 결과가 없습니다.</p>
        {/if}
    </div>
</div>

<style>
    .container {
        display: flex;
        width: 100%;
    }

    .filter-section {
        box-sizing: border-box;
        width: 170px;
        height: 300px;
        background: rgba(217, 217, 217, 0.58);
        border: 1px solid white;
        box-shadow: 12px 17px 51px rgba(0, 0, 0, 0.22);
        backdrop-filter: blur(6px);
        border-radius: 17px;
        text-align: center;
        transition: transform 0.5s ease-in-out, margin 0.5s ease-in-out;
        display: flex;
        align-items: center;
        justify-content: center;
        user-select: none;
        font-weight: bolder;
        position: sticky;
        top: 250px;
        margin-top: 110px;
        margin-right: -70px;
    }

    .filter-options {
        display: flex;
        margin-right: 30px;
        flex-direction: column;
        gap: 10px;
    }

    .filter-options button {
        width: 9em;
        height: 3em;
        border-radius: 30em;
        font-size: 15px;
        font-family: inherit;
        border: none;
        position: relative;
        overflow: hidden;
        z-index: 1;
        box-shadow: 6px 6px 12px #c5c5c5,
        -6px -6px 12px #ffffff;
        transition: .5s ease;
        background-color: transparent;
    }

    .filter-options button::before {
        content: '';
        width: 0;
        height: 3em;
        border-radius: 30em;
        position: absolute;
        top: 0;
        left: 0;
        background-image: linear-gradient(to right, #103d97 0%, #4c80f1 100%);
        transition: .5s ease;
        display: block;
        z-index: -1;
        opacity: 0;
    }

    .move_to_top_button {
        position: fixed;
        bottom: -100px;
        right: 55px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        box-shadow: 6px 6px 12px #c5c5c5,
        -6px -6px 12px #ffffff;
        color: #000;
        font-size: 30px;
        font-weight: bold;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
    }

    .filter-options button.active::before {
        width: 100%;
        opacity: 1;
    }

    .filter-options button.active {
        color: #FFFFFF;
    }

    button:hover::before {
        width: 9em;
    }

    .performance-container {
        margin-left: 150px;
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        padding: 20px;
        box-sizing: border-box;
        width: 80%;
    }

    .not_search_result {
        margin-left: 500px;
        margin-top: 250px;
        font-size: 1.5rem;
        font-weight: bold;
    }
</style>
