<script>
    import { v4 as uuidv4 } from "uuid";
    import { googleOauthApi } from "$lib/api";
    import { kakaoOauthApi } from "$lib/api";
    import { naverOauthApi } from "$lib/api";
    import { endpoints } from "$lib/api";
    import { goto } from "$app/navigation";

    function generateUniqueState() {
        return uuidv4();
    }

    let email= "";
    let password = "";
    let rememberMe = false;
    let autoLogin = false;

    async function handleLogin() {

        if(email.trim() == "" || password.trim() == ""){
            alert("로그인 정보를 정확히 입력하세요.");
            return;
        }

        const response = await fetch(endpoints.signin, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				email,
				password,
			}),
		});

        if (response.ok) {
			goto("/");
		} else {
			alert("이메일 또는 비밀번호가 잘못되었습니다.");
            return;
		}

    }

    async function handleNaverLogin() {
        const responseType = "code";
        const clientId = `${naverOauthApi.clientId}`;
        const redirectUri = encodeURIComponent(`${naverOauthApi.redirectUri}`);
        const state = encodeURIComponent(generateUniqueState());
        const scope = ""; // 스코프는 필요에 따라 설정

        // 요청 URL 생성
        const loginUrl = `${naverOauthApi.uri}?response_type=${responseType}&client_id=${clientId}&redirect_uri=${redirectUri}&state=${state}`;

        window.location.href = loginUrl; // 현재 페이지를 리다이렉트하여 GET 요청을 보냄
    }

    async function handleKakaoLogin() {
        const responseType = "code";
        const clientId = `${kakaoOauthApi.clientId}`;
        const redirectUri = encodeURIComponent(`${kakaoOauthApi.redirectUri}`);
        const state = encodeURIComponent(generateUniqueState());
        const scope = ""; // 스코프는 필요에 따라 설정

        // 요청 URL 생성
        const loginUrl = `${kakaoOauthApi.uri}?response_type=${responseType}&client_id=${clientId}&redirect_uri=${redirectUri}&state=${state}`;

        window.location.href = loginUrl; // 현재 페이지를 리다이렉트하여 GET 요청을 보냄
    }

    async function handleGoogleLogin() {
        const state = encodeURIComponent(generateUniqueState());
        const loginUrl = `${googleOauthApi.uri}?client_id=${googleOauthApi.clientId}&redirect_uri=${googleOauthApi.redirectUri}&response_type=code&scope=email profile&state=${state}`;
        window.location.href = loginUrl; // 현재 페이지를 리다이렉트하여 GET 요청을 보냄
    }
</script>
<title>로그인</title>
<div class="container">
    <h2>로그인</h2>
    <input type="text" placeholder="아이디" bind:value={email} />
    <input type="password" placeholder="비밀번호" bind:value={password} />

    <div class="auth-buttons">
        <span>아직 회원이 아니십니까?</span>
        <a href="/signup">회원가입 바로가기</a>
    </div>

    <button class="blue-button" on:click={handleLogin}>로그인</button>

    <div class="oauth-container">
        <button class="oauth-button" on:click={handleNaverLogin}>
            <img src="src/lib/images/naverlogin.png" alt="네이버 로그인" />
        </button>

        <button class="oauth-button" on:click={handleKakaoLogin}>
            <img src="src/lib/images/kakaologin.png" alt="카카오 로그인" />
        </button>

        <button class="oauth-button" on:click={handleGoogleLogin}>
            <img src="src/lib/images/googlelogin.png" alt="구글 로그인" />
        </button>
    </div>
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
        width: 45%;
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

    .oauth-container {
        display: flex;
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
        width: 140px; /* 이미지의 너비를 100px로 설정 */
        height: 35px; /* 이미지의 높이를 자동으로 조정하여 비율 유지 */
    }

    .auth-buttons {
        padding: 5px;
        font-size: 14px;
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
