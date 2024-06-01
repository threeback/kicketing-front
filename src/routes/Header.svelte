<script>
    import Search_box from "./search/box/search_box.svelte";
    import {fetchPerformances, name} from "$lib/stores/performance.js";

    function handleSearch(event) {
        name.set(event.detail.searchTerm);
        fetchPerformances();
    }
</script>

<div align="center">
    <a href="/">
        <img class="logo" src="/logo.png" alt="로고"/>
    </a>
    <Search_box on:search={handleSearch}/>
</div>

<style>
    .logo {
        margin: 30px;
        width: 200px;
        height: auto;
    }
</style>
