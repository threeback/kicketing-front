<script>
    import privacy_tab from "./tabs/privacy_tab.svelte";
    import booking_tab from "./tabs/booking_tab.svelte";
    import cancel_tab from "./tabs/cancel_tab.svelte";
    import Tabs from "./tabs/tabs.svelte";

    let items = [
        {
            label: "개인정보 변경",
            value: 1,
            component: privacy_tab
        },
        {
            label: "예매내역 확인",
            value: 2,
            component: booking_tab
        },
        {
            label: "예매 취소 내역",
            value: 3,
            component: cancel_tab
        }
    ];
</script>
<style>
    .container {
        font-family: "GmarketSansMedium", sans-serif;
        margin-left: -100px;
        margin-right: -100px;
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
</style>
<main class="container">
    <div class="auth-buttons">
        <a href="/">홈으로</a>
<!--        <a href="/signup">로그아웃</a>-->
    </div>
    <h1 style="font-weight: bold; color: #000">마이페이지</h1>
    <hr>
    <Tabs {items}/>
</main>