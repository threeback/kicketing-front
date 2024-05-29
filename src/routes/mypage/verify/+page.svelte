<script>
    import { goto } from "$app/navigation";
    import {endpoints} from "$lib/api.js";
    let password = "";


    async function handleLogin() {

        if(password.trim() === ""){
            alert("비밀번호를 입력하세요.");
            return;
        }

        const response = await fetch(endpoints.signin, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                password,
            }),
        });

        if (response.ok) {
            goto("/mypage");
        } else {
            alert("비밀번호를 다시 확인해주세요.");
            return;
        }

    }
</script>

<style>
    .container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 60vh;
        font-family: "GmarketSansMedium", sans-serif;
    }

    h2 {
         font-size: 38px;
         margin-top: 10px;
         margin-bottom: 10px;
     }
    input,
    button {
        margin-bottom: 10px;
        padding: 8px;
        width: 40%;
        box-sizing: border-box;
        border: 1px solid #ccc; /* 테두리 색상 변경 */
        border-radius: 11px;
    }

    button {
        cursor: pointer;
        position: relative;
        padding-left: 30px; /* 아이콘을 버튼 내에 왼쪽에 위치시키기 위한 여백 추가 */
    }

    .blue-button {
        background-color: #007bff; /* 로그인 버튼 파란색으로 변경 */
        color: #fff;
    }
</style>

<main class="container">
    <h1 style="font-weight: bold; color: #000">회원정보 확인</h1>
    <p style="font-size: 19px; color: #000">회원정보 확인을 위해 비밀번호를 입력해주세요.</p>
    <br>
    <input type="password" placeholder="비밀번호" bind:value={password} />
    <button class="blue-button" on:click={handleLogin}>로그인</button>
</main>