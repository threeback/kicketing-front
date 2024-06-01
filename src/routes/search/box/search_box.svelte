<script>
    import { name } from '$lib/stores/performance';
    import { endpoints } from "$lib/api";
    import {goto} from "$app/navigation";
    let searchTerm = '';
    let timeoutId;
    let options = [];

    async function getAutoComplete(encodedName) {
        try {
            let query = `name=${encodedName}`;
            const response = await fetch(`${endpoints.getAutoComplete}?${query}`, {
                method: "GET",
            });
            const data = await response.json();
            options = data.performances.map(performance => performance.name);
        } catch (error) {
            console.error('자동완성 API 요청 중 오류 발생:', error);
        }
    }

    function handleKeyPress(event) {
        if (event.key === 'Enter') {
            name.set('');
            gotoSearch();
        }
    }

    function handleInput(event) {
        const inputValue = event.target.value;
        searchTerm = inputValue;
        name.set(inputValue);
        const inputArray = inputValue.split(' ');

        const lastInput = inputArray[inputArray.length - 1];
        clearTimeout(timeoutId);

        if (lastInput.trim() !== '') {
            const encodedName = encodeURIComponent(lastInput);

            timeoutId = setTimeout(() => {
                getAutoComplete(encodedName);
            }, 300);
        } else {
            options = [];
        }
    }

    function selectOption(event) {
        searchTerm = event.target.textContent;
        name.set(searchTerm);
        options = [];
        gotoSearch();
    }

    function gotoSearch() {
        if (searchTerm.length < 2) {
            alert('검색어는 2글자 이상 입력해주세요.');
            return;
        }
        goto(`/search?name=${encodeURIComponent(searchTerm)}&genres=NONE`);
        searchTerm = '';
    }

</script>

<div class="search-box">
    <input type="text" placeholder="검색할 공연 정보를 입력해주세요." class="search-input" on:keypress={handleKeyPress} on:input={handleInput} bind:value={searchTerm}>
    {#if searchTerm.trim() !== ''}
        <div id="search-list">
            {#each options as option}
                <div class="option" on:click={selectOption}>{option}</div>
            {/each}
        </div>
    {/if}
    <button class="search-button" on:click={gotoSearch}>
        <img src="src/lib/images/main/search.png" alt="검색"/>
    </button>
</div>

<style>
    .search-box {
        position: relative;
        display: flex;
        flex-direction: column;
    }
    .search-input {
        padding: 10px;
        font-size: 16px;
    }
    .search-button {
        margin-top: 10px;
    }
    #search-list {
        background-color: #f5f5f5;
        border-radius: 10px;
        padding: 10px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        position: absolute;
        z-index: 1;
        width: 100%;
        margin-top: 60px;
        margin-left: 310px;
        max-height: 200px;
        max-width: 550px;
        overflow-y: auto;
    }
    .option {
        padding: 10px;
        cursor: pointer;
    }

    .search-box {
        display: flex;
        margin-bottom: 20px;
        margin-right: 150px;
        position: relative;
        width: 1000px;
    }

    .search-box input[type="text"] {
        flex-grow: 1;
        margin-left: 300px;
        margin-right: 90px;
        padding: 16px;
        font-size: 19px;
        border: 1px solid #ccc;
        border-radius: 25px;

    }

    .search-button {
        margin-left: auto;
        position: absolute;
        top: 40%;
        left: 840px;
        transform: translateY(-50%);
        background-color: #00ff0000;
        border: none;
        border-radius: 50%;
        width: 53px;
        height: 53px;
        cursor: pointer;
    }

    .search-button img {
        width: 30px;
        height: 30px;
    }
</style>