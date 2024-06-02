<script>
    import Additional_box from "../additional_box.svelte";
    let promotions = [
        { id: 1, title: 'BTS 콘서트 얼리버드 할인 이벤트', startDate: '2024년 6월 1일', endDate: '2024년 6월 10일' },
        { id: 2, title: '백예린 라이브 공연 선착순 할인 이벤트', startDate: '2024년 6월 5일', endDate: '2024년 6월 20일' },
        { id: 3, title: 'NCT DREAM 콘서트 스페셜 프로모션', startDate: '2024년 6월 10일', endDate: '2024년 6월 25일' },
        { id: 4, title: '블랙핑크 콘서트 VIP 티켓 할인', startDate: '2024년 6월 1일', endDate: '2024년 6월 15일' },
        { id: 5, title: '폴킴 전국 투어 콘서트 예매 이벤트', startDate: '2024년 6월 3일', endDate: '2024년 6월 17일' },
        { id: 6, title: '마마무 콘서트 티켓 10% 할인', startDate: '2024년 6월 7일', endDate: '2024년 6월 21일' },
        { id: 7, title: '트와이스 콘서트 한정 특가 이벤트', startDate: '2024년 6월 2일', endDate: '2024년 6월 12일' },
        { id: 8, title: '에픽하이 콘서트 얼리버드 예매', startDate: '2024년 6월 5일', endDate: '2024년 6월 20일' },
        { id: 9, title: '태연 단독 콘서트 할인 프로모션', startDate: '2024년 6월 1일', endDate: '2024년 6월 15일' },
        { id: 10, title: '적재 라이브 공연 특가 이벤트', startDate: '2024년 6월 8일', endDate: '2024년 6월 18일' }
    ];
</script>

<style>
    .promotion-container {
        width: 1150px;
        flex-direction: row;
    }

    .promotion-id {
        float: left;
        margin-left: 10px;
        padding-right: 10px;
    }
    .promotion-title {
        margin-left: 100px;
        float: left;
    }

    .promotion-period {
        float: right;
    }
    button {
        background-color: #fff;
        border: none;
    }
</style>

<main class="container">
    <Additional_box />
    <h2>진행 중인 이벤트 현황</h2>
    <hr>
    <div class="promotion-container">
        <span class="promotion-id">번호</span>
        <span style="margin-left: 430px">이벤트</span>
        <span style="margin-left: 470px">진행 날짜</span>
    </div>
    { #each promotions as promotion }
        <hr>
        <button>
            <div class="promotion-container">
                <div class="promotion-id">{promotion.id}</div>
                <div class="promotion-title">{promotion.title}</div>
                <div class="promotion-period">{promotion.startDate} ~ {promotion.endDate}</div>
            </div>
        </button>
    {/each}
</main>