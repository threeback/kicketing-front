<script>
    import {getUser, isLoggedIn, removeRefreshToken, setLogout, user} from "$lib/stores/auth.js";
    import {endpoints} from "$lib/api.js";
    import {onDestroy} from "svelte";

    async function handleLogOut() {
        const response = await fetch(endpoints.signout, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        removeRefreshToken();
        setLogout();
        user.set(null);
        window.location.href = '/';
    }

</script>

<style>
    .auth-buttons {
        position: absolute;
        top: 20px;
        right: 20px;
    }

    .auth-buttons a {
        font-size: 14px;
        color: #666;
        text-decoration: underline;
    }

    .auth-buttons a:hover {
        color: #333;
    }

    .signout-button {
        background: none;
        font-size: 14px;
        color: #666;
        border: none;
        padding: 0;
        text-decoration: underline;
        /*margin-left: 6px;*/
    }
</style>

<div class="auth-buttons">
    {#if $isLoggedIn}
        {#if $user}
            {$user.name}님
        {:else}
        {/if}
        <a href="/mypage">마이페이지</a>
        <button class="signout-button" on:click={handleLogOut}>로그아웃</button>
    {:else}
        <a href="/signin">로그인</a>
        <a href="/signup">회원가입</a>
    {/if}
</div>
