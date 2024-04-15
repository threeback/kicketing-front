<script>
    import { v4 as uuidv4 } from "uuid";

    function generateUniqueState() {
        return uuidv4();
    }

    let username = "";
    let password = "";
    let rememberMe = false;
    let autoLogin = false;

    function handleLogin() {
        if (username === "user" && password === "password") {
            alert("로그인 성공!");
        } else {
            alert("아이디 또는 비밀번호가 잘못되었습니다.");
        }
    }

    async function handleNaverLogin() {
        const responseType = "code";
        const clientId = "aYP4gwQE8RjQby7a7Umc";
        const redirectUri = encodeURIComponent(
            "http://localhost:5173/signin/naver/callback",
        );
        const state = encodeURIComponent(generateUniqueState());
        const scope = ""; // 스코프는 필요에 따라 설정

        // 요청 URL 생성
        const loginUrl = `https://nid.naver.com/oauth2.0/authorize?response_type=${responseType}&client_id=${clientId}&redirect_uri=${redirectUri}&state=${state}`;

        window.location.href = loginUrl; // 현재 페이지를 리다이렉트하여 GET 요청을 보냄
    }

    async function handleKakaoLogin() {
        const responseType = "code";
        const clientId = "f7b6f4aed2edf392e73a697adee24827";
        const redirectUri = encodeURIComponent(
            "http://localhost:5173/signin/kakao/callback",
        );
        const state = encodeURIComponent(generateUniqueState());
        const scope = ""; // 스코프는 필요에 따라 설정

        // 요청 URL 생성
        const loginUrl = `https://kauth.kakao.com/oauth/authorize?response_type=${responseType}&client_id=${clientId}&redirect_uri=${redirectUri}&state=${state}`;

        window.location.href = loginUrl; // 현재 페이지를 리다이렉트하여 GET 요청을 보냄
    }
</script>

<div class="container">
    <h2>로그인</h2>
    <input type="text" placeholder="아이디" bind:value={username} />
    <input type="password" placeholder="비밀번호" bind:value={password} />

    <button class="blue-button" on:click={handleLogin}>로그인</button>

    <button class="oauth-button" on:click={handleNaverLogin}>
        <img src="src/lib/images/naverlogin.png" alt="네이버 로그인" />
    </button>

    <button class="oauth-button" on:click={handleKakaoLogin}>
        <img src="src/lib/images/kakaologin.png" alt="카카오 로그인" />
    </button>
</div>

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

    .oauth-button {
        width: 150px;
        border: none; /* 버튼 테두리 제거 */
        background: none; /* 버튼 배경 제거 */
        cursor: pointer; /* 커서를 포인터로 변경하여 클릭 가능함을 나타냄 */
        padding: 0; /* 내부 여백 제거 */
    }

    /* 이미지 스타일링 */
    .oauth-button img {
        width: 150px; /* 이미지의 너비를 100px로 설정 */
        height: auto; /* 이미지의 높이를 자동으로 조정하여 비율 유지 */
    }
</style>
