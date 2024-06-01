<script src="https://unpkg.com/swiper/swiper-bundle.min.js">
    import {endpoints} from "$lib/api";
    import {onMount} from "svelte";
    import {writable} from "svelte/store";


    let performances = writable([]);
    const performanceDetailUrl = "/goods?performance=";

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
</script>

<style>
    .performance-container {
        margin-left: 10px;
        margin-right: 10px;
    }

    .performance-card {
        margin: 5px;
        box-shadow: 0 0 3px #333;
    }

    .performance-poster {
        width: 100%;
        height: 55%;
        max-width: 100%;
        border-bottom: 1px solid #ccc;
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
</style>

<main class="container">
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
                    <a href={performanceDetailUrl+performance.simplePerformanceDTO.id}>
                        <img src="{performance.simplePerformanceDTO.imageUrl}" width="300px"
                             alt="{performance.simplePerformanceDTO.name}"/>
                    </a>
                </div>
                <div class="performance-info">
                    <a href={performanceDetailUrl+performance.simplePerformanceDTO.id}>
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
</main>
