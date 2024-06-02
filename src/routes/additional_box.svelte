<script>
    let genre;
    function redirectToEventsPage(genre) {
        window.location.href = "/ranking?genre=" + genre;
    }
</script>

<style>
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

<div class="additional-icon">
    <button class="event-info-button" on:click={() => redirectToEventsPage('콘서트')}>콘서트</button>
    <button class="event-info-button" on:click={() => redirectToEventsPage('뮤지컬')}>뮤지컬</button>
    <button class="event-info-button" on:click={() => redirectToEventsPage('클래식')}>클래식</button>
    <button class="event-info-button" on:click={() => redirectToEventsPage('연극')}>연극</button>
    <a href="/promotion">
        <button class="event-info-button">이벤트</button>
    </a>
    <a href="/notice">
        <button class="event-info-button">공지사항</button>
    </a>
    <button class="event-info-button" on:click={() => redirectToEventsPage('notice')}>고객센터</button>
</div>
<hr>
<br>