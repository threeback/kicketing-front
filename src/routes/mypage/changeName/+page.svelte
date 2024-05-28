<script>
    let current_name = '송수건';
    let new_name = '';

    function check_alert() {
        if (confirm('입력하신 이름이 \'' + new_name + '\'이(가) 정확합니까?'))
            handleChangeName();
    }

    async function handleChangeName () {
        window.close();
    }
</script>
<style>
    @import url('../../../../static/style/changeName.css');
    @import url('../../../../static/style/button.css');

    h2 {
        font-size: 30px;
        margin-bottom: 30px;
        font-weight: bold;
        color: #000;
        text-align: center;
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
    }
</style>

<title>이름 변경하기</title>
<main class="container">
    <h2>이름 변경하기</h2>
    <p class="p-label">현재 설정된 이름</p>
    <div class="box">
        {current_name}
    </div>
    <p class="p-label">새로 변경할 이름</p>
    <p style="color: gray; margin-top: -20px">*이름 변경은 한 번만 가능하오니, 실명을 정확하게 기입해주세요.</p>
    <input type="text" bind:value={new_name} placeholder="실명을 정확히 기입해주세요." />
    <button class="blue-button" on:click={check_alert}>변경하기</button>
</main>