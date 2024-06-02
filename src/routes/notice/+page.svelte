<script>
    import Additional_box from "../additional_box.svelte";
    let notices = [
        { id: 1, title: '코로나19 예방 조치에 따른 공연 일정 변경 안내', postedDate: '2024년 6월 5일' },
        { id: 2, title: 'DAY6 월드투어 일정 추가 안내', postedDate: '2024년 6월 12일' },
        { id: 3, title: '콘서트 티켓 환불 및 교환 관련 안내', postedDate: '2024년 6월 20일' },
        { id: 4, title: '사이트 서버 점검 일정 안내', postedDate: '2024년 6월 25일' },
        { id: 5, title: '여자친구 콘서트 일정 변경 안내', postedDate: '2024년 6월 30일' },
        { id: 6, title: '사이트 보안 업그레이드 안내', postedDate: '2024년 7월 5일' },
        { id: 7, title: '새로운 결제 시스템 도입 안내', postedDate: '2024년 7월 10일' },
        { id: 8, title: '회원 가입 이용 약관 변경 안내', postedDate: '2024년 7월 15일' },
        { id: 9, title: '콘서트 티켓 예매 시스템 장애 안내', postedDate: '2024년 7월 20일' },
        { id: 10, title: '고객센터 임시 휴무 안내', postedDate: '2024년 7월 25일' }
    ];
</script>

<style>
    .notice-container {
        width: 1150px;
        flex-direction: row;
    }

    .notice-id {
        float: left;
        margin-left: 10px;
        padding-right: 10px;
    }
    .notice-title {
        margin-left: 100px;
        float: left;
    }

    .notice-period {
        float: right;
    }
    button {
        background-color: #fff;
        border: none;
    }
</style>

<title>공지사항</title>
<main class="container">
    <Additional_box />
    <h2>공지사항</h2>
    <hr>
    <div class="notice-container">
        <span class="notice-id">번호</span>
        <span style="margin-left: 430px">공지사항</span>
        <span style="margin-left: 540px">게시일</span>
    </div>
    { #each notices as notice }
        <hr>
        <button>
            <div class="notice-container">
                <div class="notice-id">{notice.id}</div>
                <div class="notice-title">{notice.title}</div>
                <div class="notice-period">{notice.postedDate}</div>
            </div>
        </button>
    {/each}
</main>