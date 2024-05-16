<script>
    import { goto } from "$app/navigation";
    import {endpoints} from "$lib/api.js";
    let current_address = "부산광역시 남구 수영로 309";
    let new_address = "";


    async function handleLogin() {

        if (new_address.trim() === ""){
            alert("새로운 주소를 입력하세요.");
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
            alert("주소지 변경이 완료되었습니다.")
            goto("/mypage");
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
        font-size: 30px;
        margin-bottom: 30px;
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

    .box {
        margin-bottom: 10px;
        padding: 8px;
        width: 40%;
        box-sizing: border-box;
        border: 1px solid #ccc; /* 테두리 색상 변경 */
        font_color: black;
        border-radius: 11px;
    }
</style>

<main class="container">
    <h2 style="font-weight: bold; color: #000">주소지 변경</h2>
    <p style="font-size: 19px;  color: #000">기존 주소지</p>
    <div class="box">
        <p>{current_address}</p>
    </div>
    <p style="font-size: 18px;  color: #000">새로운 주소지 입력</p>
    <input type="password" placeholder="새로운 주소지" value={new_address} />
    <button class="blue-button" on:click={handleLogin}>주소지 변경</button>
</main>