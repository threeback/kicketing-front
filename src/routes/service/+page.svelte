<script>
    import Additional_box from "../additional_box.svelte";
</script>

<style>
    .service-container {
        display: flex;
        flex-direction: row;
        margin-left: 170px;
        margin-right: 170px;
        flex-wrap: wrap;
    }

    button {
        width: 400px;
        height: 250px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin: 5px;
        font-size: 30px;
        font-weight: bold;
        background-color: #fff;
        box-shadow: 0 0 5px #333;
    }

    img {
        width: 150px;
        margin-bottom: 10px;
    }
</style>

<title>고객센터</title>
<main class="container">
    <Additional_box />
    <h1 style="color: #000; font-weight: bold">고객센터</h1>
    <div class="service-container">
        <button>
            <img src="/QnA.png" alt="">
            문의하기
        </button>
        <button>
            <img src="/FAQ.png" alt="">
            FAQ
        </button>
        <br>
        <button>
            <img src="/consultation.png" alt="">
            상담원 연결
        </button>
        <button>
        <img src="/chatbotAI.png" alt="">
        챗봇AI와 상담하기
    </button>
    </div>
</main>