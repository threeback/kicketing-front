<script>
    import {isLoggedIn, removeRefreshToken, setLogout} from "$lib/stores/auth.js";
    import {endpoints} from "$lib/api.js";

    async function handleLogOut() {
        const response = await fetch(endpoints.signout, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            removeRefreshToken();
            setLogout();
            window.location.href = '/';
        }
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
</style>

<div class="auth-buttons">
    {#if $isLoggedIn}
        <a href="/mypage/verify">마이페이지</a>
        <button style="margin-left: 6px" on:click={handleLogOut}>로그아웃</button>
    {:else}
        <a href="/signin">로그인</a>
        <a href="/signup">회원가입</a>
    {/if}
</div>
