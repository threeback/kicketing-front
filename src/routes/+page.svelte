<script src="https://unpkg.com/swiper/swiper-bundle.min.js">
    import {endpoints} from "$lib/api";
    import {onMount} from "svelte";
    import {writable} from "svelte/store";
    import {removeRefreshToken} from "$lib/stores/auth.js";
    import { isLoggedIn, setLogout } from '$lib/stores/auth.js';


    let performances = writable([]);

    onMount(async () => {
        try {
            const response = await fetch(endpoints.performances + '/none?dateUnit=month&size=10', {
                method: "GET"
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const result = await response.json();
            performances.set(result.performances);
        } catch (err) {
            console.log(err.message); // 에러 발생 시 에러 메시지 저장
        }
    });

    // 검색어 상태
    let searchTerm = '';

    function scrollRight() {
        const container = document.querySelector('.performance-container');
        if (container) {
            container.scrollLeft += 300; // Adjust this value based on the card width
            container.style.transition = 'all ease 2s 0s';
        }
    }

    function scrollLeft() {
        const container = document.querySelector('.performance-container');
        if (container) {
            container.scrollLeft -= 300; // Adjust this value based on the card width
            container.style.transition = 'all ease 2s 0s';
        }
    }

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
    /* 스타일링 */
    .container {
        font-family: "GmarketSansMedium", sans-serif;
        margin-left: -100px;
        margin-right: -100px;
    }

    .performance-container {
        display: flex;
        flex-wrap: nowrap; /* 가로로만 나열되도록 설정 */
        overflow-x: auto; /* 스크롤바 추가 */
        overflow: auto;
        margin-bottom: 150px;
    }

    .performance-card {
        flex: 0 0 auto; /* 고정 너비 */
        margin-right: 20px;
        border: 1px solid #ccc;
        /*border-radius: 25px;*/
        border-radius: 10px;
        overflow: hidden; /* 내용이 넘칠 경우 숨김 처리 */
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        width: 300px; /* 각 카드의 너비 */
        height: 400px;
        flex-direction: column; /* 세로로 아이템들을 나열합니다. */
    }

    .performance-poster {
        width: 100%;
        height: 55%;
        max-width: 100%;
        border-bottom: 1px solid #ccc;
        /*backdrop-filter: blur(5px);*/
        /*-webkit-backdrop-filter: blur(5px);*/
    }

    .performance-info {
        padding: 15px;
        margin: 10px;
    }

    .performance-title {
        font-size: 18px;
        color: #fff;
        font-weight: bold;
        margin-bottom: 5px;
        text-shadow: -1px 0px black, 0px 1px black, 1px 0px black, 0px -1px black;
    }

    .performance-details {
        font-size: 14px;
        color: #fff;
        text-shadow: -1px 0px black, 0px 1px black, 1px 0px black, 0px -1px black;
    }

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

    .search-box {
        display: flex;
        margin-bottom: 20px;
        position: relative;
        width: 1000px;
    }

    .search-box input[type="text"] {
        flex-grow: 1;
        margin-left: 300px;
        margin-right: 100px;
        padding: 16px;
        font-size: 19px;
        border: 1px solid #ccc;
        border-radius: 25px;

    }

    /* 검색 버튼 스타일 */
    .search-button {
        margin-left: auto;
        position: absolute;
        top: 53%;
        left: 840px;
        transform: translateY(-50%);
        background-color: #00ff0000;
        border: none;
        border-radius: 50%;
        width: 53px;
        height: 53px;
        cursor: pointer;
    }

    /* 검색 버튼 아이콘 스타일 */
    .search-button img {
        width: 30px;
        height: 30px;
    }

    .additional-icon {
        display: flex;
        align-items: center;
        justify-content: center; /* 좌우 중앙 정렬 */
    }

    .event-info-button {
        margin: 10px;
        background-color: #00ff0000;
        color: #000;
        border: none;
        padding: 10px 20px;
        border-radius: 5px;
        cursor: pointer;
        font-size: 22px; /* 원하는 크기로 조정 */
        font-weight: bold; /* 볼드체 설정 */
        white-space: nowrap; /* 텍스트가 한 줄에 모두 표시되도록 설정 */
    }

    .scroll-button {
        background-color: transparent;
        border: none;
        cursor: pointer;
        padding: 10px;
        position: absolute;
        top: 78%;
        transform: translateY(-50%);
        transition: all ease 2s 0s;
        transition-property: width
    }

    .scroll-button img {
        width: 60px;
        height: 60px;
    }

    .swiper-button-prev {
        background-color: transparent;
        border: none;
        cursor: pointer;
        padding: 10px;
        position: absolute;
        top: 78%;
        transform: translateY(-50%);
        transition: all ease 2s 0s;
        transition-property: width
    }

    .swiper-button-next {
        background-color: transparent;
        border: none;
        cursor: pointer;
        padding: 10px;
        position: absolute;
        top: 78%;
        transform: translateY(-50%);
        transition: all ease 2s 0s;
        transition-property: width
    }
</style>

<main class="container">
    <div class="auth-buttons">
        {#if $isLoggedIn}
            <a href="/mypage/verify">마이페이지</a>
            <button on:click={handleLogOut}>로그아웃</button>
        {:else}
            <a href="/signin">로그인</a>
            <a href="/signup">회원가입</a>
        {/if}
    </div>
    <div class="search-box" style="text-align: center">
        <input type="text" placeholder="검색할 공연 정보를 입력해주세요." bind:value={searchTerm}>

        <button class="search-button">
            <img src="src/lib/images/main/search.png" alt=""/>
        </button>

    </div>
    <div class="additional-icon">
        <a href="/signin">
            <button class="event-info-button">콘서트</button>
        </a>
        <a href="/signin">
            <button class="event-info-button">뮤지컬</button>
        </a>
        <a href="/signin">
            <button class="event-info-button">랭킹별 보기</button>
        </a>
        <a href="/signin">
            <button class="event-info-button">극장별 보기</button>
        </a>
        <a href="/signin">
            <button class="event-info-button">이벤트</button>
        </a>
        <a href="/signin">
            <button class="event-info-button">공지사항</button>
        </a>
        <a href="/signin">
            <button class="event-info-button">고객센터</button>
        </a>
    </div>
    <hr>
    <h1 style="color: black; font-weight: bold ">공연 목록</h1>
    <div class="performance-container">
        {#each $performances as performance}
            <div class="performance-card">
                <div class="performance-poster">
                    <a href={performance.goto}>
                        <img src="{performance.simplePerformanceDTO.imageUrl}" width="300px"
                             alt="{performance.simplePerformanceDTO.name}"/>
                    </a>
                </div>
                <div class="performance-info">
                    <a href={performance.goto}>
                        <div class="performance-title">{performance.simplePerformanceDTO.name}</div>
                        <div class="performance-details">
                            <p>{performance.placeDTO.name + " " + performance.placeDTO.hall}</p>
                            <p>{performance.simplePerformanceDTO.startDate + " ~ " + performance.simplePerformanceDTO.endDate}</p>
                        </div>
                    </a>
                </div>
            </div>
        {/each}
    </div>
    <button class="scroll-button" style="left: 10px" on:click={scrollLeft}>
        <img src="src/lib/images/main/left.png" alt=""/>
    </button>
    <button class="scroll-button" style="right: 10px" on:click={scrollRight}>
        <img src="src/lib/images/main/right.png" alt=""/>
    </button>
</main>
