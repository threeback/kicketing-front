<!-- Tabs.svelte -->
<script>
    import {onDestroy, onMount} from 'svelte';
    import {writable} from 'svelte/store';

    export let items = [];

    let activeTab = writable(1);

    function setActiveTab(value) {
        activeTab.set(value);
    }

    $: $activeTab = $activeTab;

    function handleTabChange(tabValue) {
        setActiveTab(tabValue);
    }

    let unsubscribeActiveTab;

    onMount(() => {
        unsubscribeActiveTab = activeTab.subscribe(value => {
            handleTabChange(value);
        });

        return () => {
            unsubscribeActiveTab();
        };
    });

    onDestroy(() => {
        unsubscribeActiveTab();
    });
</script>

<div class="tabs">
    {#each items as item (item.value)}
        <button
                class="{item.value === $activeTab ? 'active' : ''}"
                on:click={() => setActiveTab(item.value)}>
            {item.label}
        </button>
    {/each}
</div>

<div class="tab-content">
    {#each items as item (item.value)}
        {#if item.value === $activeTab}
            <svelte:component this={item.component}/>
        {/if}
    {/each}
</div>

<style>
    .tabs {
        display: flex;
        justify-content: space-around;
        margin-bottom: 20px;
    }

    .tabs button {
        background-color: transparent;
        border: none;
        cursor: pointer;
        padding: 10px;
    }

    .tabs button.active {
        border-bottom: 2px solid #007bff;
    }

    .tab-content > div {
        display: none;
    }

    .tab-content > div:first-child {
        display: block;
    }
</style>
