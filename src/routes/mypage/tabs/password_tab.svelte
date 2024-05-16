<script>
    import { goto } from "$app/navigation";
    import {endpoints} from "$lib/api.js";
    let current_password = "";
    let new_password = "";
    let confirm_password = "";


    async function handleChangePassword() {

        if(current_password.trim() === ""){
            alert("현재 비밀번호를 입력하세요.");
            return;
        }
        else if (new_password.trim() === ""){
            alert("변경할 비밀번호를 입력하세요.");
            return;
        } else if (confirm_password.trim() === ""){
            alert("새로운 비밀번호 확인을 위해 확인용 비밀번호를 입력하세요.");
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
            alert("비밀번호 변경이 완료되었습니다.");
            goto("/mypage");
        } else {
            // alert("비밀번호를 다시 확인해주세요.");
            if (new_password.trim() !== confirm_password.trim()) {
                alert("변경할 비밀번호가 일치하지 않습니다. 다시 확인해주세요.");
            }
            else if (current_password) {
                // 기존 비밀번호가 일치하지 않을 때
                alert("기존 비밀번호가 일치하지 않습니다. 다시 확인해주세요.");
            }
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
</style>

<main class="container">
    <h2 style="font-weight: bold; color: #000">비밀번호 변경</h2>
    <p style="font-size: 19px;  color: #000">기존 비밀번호</p>
    <input type="password" placeholder="기존 비밀번호" bind:value={current_password} />
    <p style="font-size: 18px;  color: #000">새로운 비밀번호</p>
    <input type="password" placeholder="새로운 비밀번호" bind:value={new_password} />
    <input type="password" placeholder="새로운 비밀번호 확인" bind:value={confirm_password} />
    <button class="blue-button" on:click={handleChangePassword}>비밀번호 변경</button>
</main>