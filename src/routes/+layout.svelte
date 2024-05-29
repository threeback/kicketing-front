<script>
    import Header from "./Header.svelte";
    import "./styles.css";
    import UserState from "./UserState.svelte";
</script>

<div class="app">
    <Header/>
    <UserState/>

    <main>
        <slot/>
    </main>
    <hr/>
    <footer>
        <div>Kicketing Corp. All Copyright reserved.</div>
    </footer>
</div>

<style>
    .app {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
    }

    hr {
        width: 99%;
    }

    main {
        flex: 1;
        display: flex;
        flex-direction: column;
        padding: 1rem;
        width: 100%;
        max-width: 95rem;
        margin: 0 auto;
        box-sizing: border-box;
    }

    footer {
        display: flex;
        margin: 15px;
        flex-direction: column;
        justify-content: center;
        align-items: left;
        padding: 12px;
    }

    @media (min-width: 480px) {
        footer {
            padding: 12px 0;
        }
    }
</style>
