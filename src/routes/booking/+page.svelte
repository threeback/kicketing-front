<script>
    import { onMount } from 'svelte';

    let id = 1;
    let seats = [
        { row: 1, col: 'A', price: 80000 },
        { row: 1, col: 'B', price: 80000 },
        { row: 1, col: 'C', price: 80000 },
        { row: 1, col: 'D', price: 80000 },
    ]

    let totalPrice = seats.reduce((total, seat) => total + seat.price, 0);
    let welflarePrice = Math.floor(totalPrice * .5).toLocaleString();
    let elderlyPrice = Math.floor(totalPrice * .7).toLocaleString();
    let studentPrice = Math.floor(totalPrice * .9).toLocaleString();
    totalPrice = totalPrice.toLocaleString()
    let resultPrice;
    let selectedDiscount = '';
    let selectedDelivery = '';
    let pickupMethod = '';

    $: if (selectedDiscount === 'welfare') resultPrice = welflarePrice;
    $: if (selectedDiscount === 'elderly') resultPrice = elderlyPrice;
    $: if (selectedDiscount === 'student') resultPrice = studentPrice;

    // $: if (selectedDelivery === '현장수령') pickupMethod = '현장수령';
    // $: if (selectedDelivery === '배달') pickupMethod = '배달';


    let name = '';
    let birthDate = '';
    let contact1 = '';
    let contact2 = '';
    let contact3 = '';
    let contact = '${contact1}-${contact2}-${contact3}';
    let email = '';
    let address = '사용자 주소';

    function nextPage() { id += 1; }

    function updateContact() {
        contact = `${contact1}-${contact2}-${contact3}`;
    }

    function updateEmail() {
        email = `${email}`;
    }


onMount(() => {
    updateContact();
    updateEmail();
});
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
        font-size: 22px; /* 원하는 크기로 조정 */
        font-weight: bold; /* 볼드체 설정 */
        white-space: nowrap; /* 텍스트가 한 줄에 모두 표시되도록 설정 */
    }

    .selected-tab {
        background-color: #F0F0F0; /* 로그인 버튼 파란색으로 변경 */
        color: #000;
    }

    .box {
        padding: 20px;
    }

    .table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 20px;
        border-radius: 11px;
    }

    .table th, .table td {
        border: 1px solid #f0f0f0;
        padding: 8px;
    }

    .table th {
        background-color: #f2f2f2;
        text-align: center;
    }


    .radio_box {
        display: inline-block;
        display: inline;
        zoom: 1;
        position: relative;
        padding-left: 13px;
        cursor: pointer;
        font-size: 14px;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    /* 기본 라디오 버튼 숨기기 */
    .radio_box input[type="radio"] { display: none; }

    /* 선택되지 않은 라디오 버튼 스타일 꾸미기 */
    .on {
        width: 20px;
        height: 20px;
        background: #ddd;
        border-radius: 50%;
        position: absolute;
        top: 0;
        left: 0;
    }

    /* 선택된 라디오 버튼 스타일 꾸미기 */
    .radio_box input[type="radio"]:checked + .on { background: #007bff; }
    .on:after {
        content: "";
        position: absolute;
        display: none;
    }
    .radio_box input[type="radio"]:checked + .on:after { display: block; }
    .on:after {
        width: 10px;
        height: 10px;
        background: #fff;
        border-radius: 50%;
        position: absolute;
        left: 5px;
        top: 5px;
    }

    .ticket-container, .user-info {
        display: inline-grid;
        justify-content: space-between;
        width: 48%;
    }

    h3 {
        text-align: center;
        color: #000;
        font-size: 1.5em;
        padding-bottom: 10px;
        margin-bottom: 20px;
    }

    form {
        display: flex;
        flex-direction: column;
    }

    input[type="text"], input[type="email"] {
        margin-bottom: 20px;
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 4px;
        width: 100%;
        box-sizing: border-box;
    }

    p {
        font-size: 18px;
    }

    p.note {
        color: red;
        font-size: 0.9em;
        margin-top: -30px;
        margin-bottom: 30px;
    }

    .contact-container {
        display: flex;
        justify-content: space-between;
    }

    .hipen {
        margin: 11px 7px;
    }
</style>

<title>예매 상세페이지</title>
<main class="container">
    <h2>예매 진행하기</h2>
    <div class="additional-icon">
        <p class="event-info-button { id === 0 ? 'selected-tab' : '' }">좌석 선택</p>
        <p class="event-info-button { id === 1 ? 'selected-tab' : '' }">가격/할인선택</p>
        <p class="event-info-button { id === 2 ? 'selected-tab' : '' }">배송선택/주문자확인</p>
        <p class="event-info-button { id === 3 ? 'selected-tab' : '' }">결제하기</p>
    </div>
    { #if id === 1 }
        <div class="box" style="margin-left: 248px; margin-right: 248px">
            { #each seats as seat, index }
                <span>{seat.col}{seat.row}석</span>
                { #if index < seats.length - 1 }
                    <span>, </span>
                { /if }
            { /each }
            <span>의 총 { seats.length }개의 좌석을 선택하셨습니다.</span>
            <hr>
            <table class="table">
                <tr>
                    <th>기본가</th>
                    <td>일반</td>
                    <td>{ totalPrice }원</td>
                    <td>
                        <label for="general" class="radio_box">
                            <input id="general"  type="radio" name="ticket" value="general" bind:group={selectedDiscount}>
                            <span class="on"></span>
                        </label>
                    </td>
                </tr>
                <tr>
                    <th rowspan="3">기본할인</th>
                    <td>복지 할인(장애인, 국가유공자) 50%</td>
                    <td>{welflarePrice}원</td>
                    <td>
                        <label for="welfare" class="radio_box">
                            <input id="welfare"  type="radio" name="ticket" value="welfare" bind:group={selectedDiscount}>
                            <span class="on"></span>
                        </label>
                    </td>
                </tr>
                <tr>
                    <td>노약자 할인 30%</td>
                    <td>{elderlyPrice}원</td>
                    <td>
                        <label for="elderly" class="radio_box">
                            <input id="elderly" type="radio" name="ticket" value="elderly" bind:group={selectedDiscount}>
                            <span class="on"></span>
                        </label>
                    </td>
                </tr>
                <tr>
                    <td>대학생 할인 10%</td>
                    <td>{studentPrice}원</td>
                    <td>
                        <label for="student" class="radio_box">
                            <input id="student" type="radio" name="ticket" value="student" bind:group={selectedDiscount}>
                            <span class="on"></span>
                        </label>
                    </td>
                </tr>
            </table>
            <button class="blue-button" on:click={nextPage} style="margin-top: 30px; width: 100%; padding: 12px; font-size: 20px">다음으로 이동</button>
        </div>
    { :else if id === 2 }
        <div class="box" style="margin-left: 230px; margin-right: 230px">
            <div class="ticket-container">
                <h3>티켓수령방법</h3>
                <form>
                    <label>
                        <input type="radio" name="method" value="현장수령" bind:group={selectedDelivery}>
                        <span class="on"></span>
                        현장수령
                    </label><br>
                    <label>
                        <input type="radio" name="method" value="배송" bind:group={selectedDelivery} checked>
                        <span class="on"></span>
                        배송(3,000원)
                    </label>
                </form>
                <p style="font-size: 0.9em">티켓현장수령은 예매시 부여되는 "예매번호"로 관람일 당일 티켓을 수령하여 입장합니다.</p>
            </div>
            <div class="user-info">
                <h3>예매자 확인</h3>
                <form>
                    <label for="name">이름</label>
                    <input type="text" id="name" name="name" bind:value={name} required><br>

                    <label for="birthdate">생년월일</label>
                    <input type="text" id="birthdate" name="birthdate" placeholder="예) 870201 (YYMMDD)" bind:value={birthDate} required><br>

                    <p class="note">생년월일을 정확히 입력해주세요. 가입 시 입력하신 정보와 다를 경우, 본인확인이 되지 않아 예매가 불가합니다.</p>

                    <label for="contact">연락처</label>
                    <div class="contact-container">
                        <input type="text" id="contact" name="contact1" bind:value={contact1} on:input={updateContact} required>
                        <span class="hipen">-</span>
                        <input type="text" name="contact2" bind:value={contact2} on:input={updateContact} required>
                        <span class="hipen">-</span>
                        <input type="text" name="contact3" bind:value={contact3} on:input={updateContact} required>
                    </div>
                    <br>
                    <label for="email">이메일</label>
                    <input type="email" id="email" name="email" bind:value={email} on:input={updateEmail} required><br>
                    <p class="note">SMS 문자와 이메일로 예매 확정 및 예매 정보를 보내드립니다. 정확하게 기입해주세요.</p>
                </form>
            </div>
            <button class="blue-button" on:click={nextPage} style="margin-top: 30px; width: 97%; padding: 12px; font-size: 20px">다음으로 이동</button>
        </div>
    { :else if id === 3 }
        <div class="box" style="margin-left: 230px; margin-right: 230px">
            <h2>예매 정보 최종 확인</h2>
            <span style="font-weight: bold; color: #000; font-size: 18px">좌석 정보: </span>
            { #each seats as seat, index }
                <span>{seat.col}{seat.row}석</span>
                { #if index < seats.length - 1 }
                    <span>, </span>
                { /if }
            { /each }
            <br>
            <br>
            <span style="font-weight: bold; color: #000; font-size: 18px">예매자 성함: </span>
            <span>{ name }</span>
            <br>
            <br>
            <span style="font-weight: bold; color: #000; font-size: 18px">생년월일: </span>
            <span>{ birthDate }</span>
            <br>
            <br>
            <span style="font-weight: bold; color: #000; font-size: 18px">연락처: </span>
            <span>{ contact }</span>
            <br>
            <br>
            <span style="font-weight: bold; color: #000; font-size: 18px">수령방법: </span>
            <span>{ selectedDelivery }</span>
            { #if selectedDelivery === '배송' }
                <br>
                <br>
                <span style="font-weight: bold; color: #000; font-size: 18px">수령할 주소: </span>
                <span>{ address }</span>
            { /if }
            <br>
            <br>
            <span style="font-weight: bold; color: #000; font-size: 18px">이메일: </span>
            <span>{ email }</span>
            <h3>무통장 입금 안내</h3>
            <div class="box" style="width: fit-content; text-align: center">
                <h3 style="margin-top: -5px">계좌 번호</h3>
                <p>939302-00-690710 KB국민은행</p>
                <p>예금주: 전지환</p>
            </div>
            <br>
            <h3>총 결제 금액</h3>
            <h2 style="margin-top: -15px">{ resultPrice }원</h2>
            <p class="note" style="text-align: center">*예매 확정 이후 1시간 내에 입금이 확인되지 않을 경우 주문은 취소처리 됩니다.</p>
            <button class="blue-button" style="margin-top: 30px; width: 97%; padding: 12px; font-size: 20px">입금 안내 확인 및 예매 확정</button>

        </div>
    {/if}
</main>