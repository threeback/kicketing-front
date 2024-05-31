<script>
    import {onMount} from "svelte";
    import {endpoints} from "$lib/api.js";
    import {handleRefreshAccessToken} from "$lib/stores/auth.js";

    let current_name = '';
    let new_name = '';

    const nameRegex = /^[가-힣]{2,20}$/;

    onMount(async () => {
        try {
            const response = await fetch(endpoints.user, {
                method: "GET",
                credentials: 'include',
            });
            if (!response.ok) {
                await handleRefreshAccessToken(response, "/mypage");
            } else {
                const result = await response.json();
                current_name = result.name;
            }
        } catch (err) {
            console.log(err.message); // 에러 발생 시 에러 메시지 저장
        }
    });

    async function check_alert() {
        if (confirm('입력하신 이름이 \'' + new_name + '\'이(가) 정확합니까?')) {

            if (!nameRegex.test(new_name)) {
                alert("이름을 정확히 입력하세요.");
                return;
            }

            try {
                const response = await fetch(endpoints.user + "/name", {
                    method: "PUT",
                    credentials: 'include',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        name: new_name
                    }),
                });
                if (!response.ok) {
                    response.text().then(errorMessage => {
                        alert(errorMessage); // 오류 메시지를 alert 창에 표시
                    });
                    await handleRefreshAccessToken(response, "/mypage");
                } else {
                    alert("이름이 성공적으로 변경되었습니다.");
                    window.close();
                }
            } catch (err) {
                console.log(err.message);
            }
        }
    }
</script>

<title>이름 변경하기</title>
<main class="container">
    <h2>이름 변경하기</h2>
    <p class="p-label">현재 설정된 이름</p>
    <div class="box">
        {current_name}
    </div>
    <p class="p-label">새로 변경할 이름</p>
    <p style="color: gray; margin-top: -20px">*이름 변경은 한 번만 가능하오니, 실명을 정확하게 기입해주세요.</p>
    <input type="text" bind:value={new_name} placeholder="실명을 정확히 기입해주세요."/>
    <button class="blue-button" on:click={check_alert}>변경하기</button>
</main>

<style>

    .container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 60vh;
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

    .box {
        width: fit-content;
        padding: 10px 20px;
    }

    .p-label {
        font-size: 19px;
        color: #000;
    }
</style>