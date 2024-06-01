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
    .radio_box input[type="radio"] {
        display: none;
    }

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
    .radio_box input[type="radio"]:checked + .on {
        background: #007bff;
    }

    .on:after {
        content: "";
        position: absolute;
        display: none;
    }

    .radio_box input[type="radio"]:checked + .on:after {
        display: block;
    }

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

    input[type="text"], input[type="email"], [type="password"] {
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

    .radio_box {
        display: inline-block;
        margin: 20px 14px;
    }

    .radio_box input[type="checkbox"] {
        width: 20px;
        height: 20px;
        transform: scale(1.5); /* 크기 조정 */
    }

    .radio_box .on {
        display: inline-block;
        width: 30px; /* 너비 조정 */
        height: 30px; /* 높이 조정 */
        background-color: lightgray;
        border-radius: 20%;
        vertical-align: middle;
    }

    .radio_box input[type="checkbox"]:checked + .on {
        background-color: rgba(44, 44, 44, 0.65); /* 선택된 경우 색상 변경 */
    }

    .radio_box input[type="checkbox"] {
        position: absolute;
        opacity: 0;
        pointer-events: none;
    }

    .unbookable input[type="checkbox"] {
        background-color: red;
        border-color: red;
    }

    .unbookable label {
        color: red;
    }

    .x-mark {
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: rgba(255, 166, 0, 0.34);
    }

    .x-mark::before, .x-mark::after {
        content: '';
        position: absolute;
        width: 2px; /* 선의 두께 */
        height: 100%;
        background-color: red; /* 선의 색깔 */
    }

    .x-mark::before {
        transform: rotate(45deg);
    }

    .x-mark::after {
        transform: rotate(-45deg);
    }
</style>

<script>
    import {onMount} from 'svelte';
    import {endpoints} from "$lib/api.js";
    import {handleRefreshAccessToken, user} from "$lib/stores/auth.js";

    let performanceUUID = '28f4caa7-84f8-4ff1-a4b7-ce0fc6e171bb';
    let onStageId = 22;

    let id = 0;
    let seats = []
    let unbookableSeats = [];
    let selectedSeats

    let totalPrice = 0;
    let welfarePrice = 0;
    let elderlyPrice = 0;
    let studentPrice = 0;
    totalPrice = totalPrice.toLocaleString()
    let resultPrice;
    let selectedDiscount = '';
    let selectedDelivery = '';

    $: if (selectedDiscount === 'general') resultPrice = totalPrice;
    $: if (selectedDiscount === 'welfare') resultPrice = welfarePrice;
    $: if (selectedDiscount === 'elderly') resultPrice = elderlyPrice;
    $: if (selectedDiscount === 'student') resultPrice = studentPrice;

    let name = '';
    let birthDate = '';
    let contact1 = '';
    let contact2 = '';
    let contact3 = '';
    let contact = '${contact1}-${contact2}-${contact3}';
    let email = '';
    let address = '';

    let cardNum1 = '';
    let cardNum2 = '';
    let cardNum3 = '';
    let cardNum4 = '';
    let cvc = '';
    let cardPassword = '';

    function nextPage() {
        if (id === 0) { //seats에서 selected된 좌석 확인
            selectedSeats = seats.filter(seat => seat.checked);
            if (selectedSeats.length === 0) {
                alert('좌석을 선택해주세요.');
                return;
            }
            if (selectedSeats.length > 10) {
                alert('좌석은 최대 10개까지 선택 가능합니다.');
                return;
            }
            totalPrice = selectedSeats.reduce((total, seat) => total +
                seatGrades.find(grade => grade.grade === seat.grade).price, 0)
            welfarePrice = Math.floor(totalPrice * .5)
            elderlyPrice = Math.floor(totalPrice * .7)
            studentPrice = Math.floor(totalPrice * .9)
            fetchLockSeats();
        } else if (id === 1) {
            if (selectedDiscount === '') {
                alert('할인을 선택해주세요.');
                return;
            }
            name = $user.name;
            email = $user.email;
            id += 1;
        } else if (id === 2) {
            if (selectedDelivery === '') {
                alert('티켓 수령 방법을 선택해주세요.');
                return;
            }
            if (selectedDelivery === '배송' && address === '') {
                alert('배송 주소를 입력해주세요.');
                return;
            }
            if (name === '' || birthDate === '' || contact1 === '' || contact2 === '' || contact3 === '' || email === '') {
                alert('모든 정보를 입력해주세요.');
                return;
            }
            id += 1;
        } else if (id === 3) {
            if (cardNum1 === '' || cardNum2 === '' || cardNum3 === '' || cardNum4 === '' || cvc === '' || cardPassword === '') {
                alert('모든 정보를 입력해주세요.');
                return;
            }
            fetchPayment();
        }
    }

    async function fetchLockSeats() {
        const seatIds = selectedSeats.map(seat => seat.id);
        const response = await fetch(endpoints.reservation + '/' + onStageId, {
            method: "POST",
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                seatIds: seatIds
            })
        });

        if (response.ok) {
            id += 1;
        } else {
            response.json().then(body => {
                alert(body.errorMessage); // 오류 메시지를 alert 창에 표시
            });
            window.location.reload();
        }
    }

    let orderNumber = '';

    async function fetchPayment() {
        try {
            const response = await fetch("https://pay.pwrwpw.shop/fake_payment", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    price: resultPrice,
                    card_number: `${cardNum1}-${cardNum2}-${cardNum3}-${cardNum4}`,
                    card_password: cardPassword + "00",
                    cvc: cvc
                })
            });

            if (response.ok) {
                const result = await response.json();
                orderNumber = result.orderNumber;
                id += 1;
            } else {
                response.json().then(body => {
                    console.log(body.errorMessage); // 오류 메시지를 alert 창에 표시
                });
            }
        } catch (err) {
            console.log(err.message);
        }
    }

    async function handleReservation() {
        let discountType = selectedDiscount === 'general' ? 'NONE' : selectedDiscount === 'welfare' ? 'PRONUNCIATION' :
            selectedDiscount === 'elderly' ? 'OLD' : 'STUDENT';
        let seatsRequest = {
            seatIds: selectedSeats.map(seat => seat.id)
        }
        const response = await fetch(endpoints.reservation + `/${onStageId}/${orderNumber}`, {
            method: "POST",
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                discountType,
                seatsRequest
            })
        });

        if (response.ok) {
            alert('예매가 완료되었습니다.');
            window.location.href = `/goods?performance=${performanceUUID}`;
        } else {
            response.json().then(body => {
                alert(body.errorMessage); // 오류 메시지를 alert 창에 표시
            });
        }
    }

    function updateContact() {
        contact = `${contact1}-${contact2}-${contact3}`;
    }

    function updateEmail() {
        email = `${email}`;
    }

    let seatGrades = [];

    onMount(async () => {
        try {
            const response = await fetch(endpoints.reservation + `/${performanceUUID}/${onStageId}`, {
                method: "GET",
                credentials: 'include',
            });

            if (!response.ok) {
                response.text().then(errorMessage => {
                    alert(errorMessage); // 오류 메시지를 alert 창에 표시
                });
                await handleRefreshAccessToken(response, "/");
            } else {
                const result = await response.json();
                seats = result.bookableSeats;
                unbookableSeats = result.unbookableSeats;
                seatGrades = result.seatGradeDTOS;
            }
        } catch (err) {
            console.log(err.message);
        }
        updateContact();
        updateEmail();
    });
</script>

<title>예매 상세페이지</title>
<main class="container">
    <h2>예매 진행하기</h2>
    <div class="additional-icon">
        <p class="event-info-button { id === 0 ? 'selected-tab' : '' }">좌석 선택</p>
        <p class="event-info-button { id === 1 ? 'selected-tab' : '' }">가격/할인선택</p>
        <p class="event-info-button { id === 2 ? 'selected-tab' : '' }">배송선택/주문자확인</p>
        <p class="event-info-button { id === 3 ? 'selected-tab' : '' }">결제정보 입력</p>
        <p class="event-info-button { id === 4 ? 'selected-tab' : '' }">결제하기</p>
    </div>
    { #if id === 0 }
        <div class="box" style="margin-left: 230px; margin-right: 230px">
            <h2>좌석 선택</h2>
            <div class="seat-container" style=" align-self: center">
                <div style="text-align: center; font-size: 60px; border: 1px solid black; padding: 20px;">
                    무대
                </div>
                <div style="align-self: center; text-align: center; font-size: 20px; margin-top: 20px">
                    {#each [...seats, ...unbookableSeats].sort((a, b) => {
                        // row를 사전순으로 정렬
                        if (a.seatRow !== b.seatRow) {
                            return a.seatRow.localeCompare(b.seatRow);
                        } else {
                            // row가 같으면 col을 숫자로 비교하여 정렬
                            return parseInt(a.seatCol) - parseInt(b.seatCol);
                        }
                    }) as seat, index}
                        { #if index !== 0 && index % 10 === 0}
                            <br>
                        {/if}
                        { #if unbookableSeats.some(item => item.id === seat.id)}
                            <label for="seat{index}" class="radio_box">
                                <input id="seat{index}" type="checkbox" name="seat" value="{seat.seatCol}{seat.seatRow}"
                                       bind:checked={seat.checked} disabled>
                                <span class="on x-mark" style="background-color: rgba(255,166,0,0.34); display: flex;
                                align-items: center; justify-content: center" >{seat.grade}</span>
                            </label>
                        { :else }
                            <label for="seat{index}" class="radio_box">
                                <input id="seat{index}" type="checkbox" name="seat" value="{seat.seatCol}{seat.seatRow}"
                                       bind:checked={seat.checked}>
                                <span class="on" style="display: flex; align-items: center; justify-content: center">{seat.grade}</span>
                            </label>
                        { /if  }
                    {/each}
                </div>

                <br>
                <br>
                <hr>
                <br>
                <table class="table">
                    <tr>
                        <th>등급</th>
                        <th>좌석</th>
                        <th>가격</th>
                    </tr>
                    { #each seats.sort((a, b) => {
                        // row를 사전순으로 정렬
                        if (a.seatRow !== b.seatRow) {
                            return a.seatRow.localeCompare(b.seatRow);
                        } else {
                            // row가 같으면 col을 숫자로 비교하여 정렬
                            return parseInt(a.seatCol) - parseInt(b.seatCol);
                        }
                    }) as seat, index }
                        { #if seat.checked }
                            <tr>
                                <td>{seat.grade}등급</td>
                                <td>{seat.seatRow}열 {seat.seatCol}석</td>
                                <td>{seatGrades.find(grade => grade.grade === seat.grade).price.toLocaleString()}원</td>
                            </tr>
                        { /if       }
                    { /each        }
                </table>
            </div>
            <button class="blue-button" on:click={nextPage}
                    style="margin-top: 30px; width: 100%; padding: 12px; font-size: 20px">다음으로 이동
            </button>
        </div>
    { :else if id === 1 }
        <div class="box" style="margin-left: 248px; margin-right: 248px">
            { #each selectedSeats as seat, index }
                <span>{seat.seatCol}{seat.seatRow}</span>
                { #if index < selectedSeats.length - 1 }
                    <span>, </span>
                { /if         }
            { /each         }
            <span>의 총 { selectedSeats.length }개의 좌석을 선택하셨습니다.</span>
            <hr>
            <table class="table">
                <tr>
                    <th>기본가</th>
                    <td>일반</td>
                    <td>{ totalPrice.toLocaleString() }원</td>
                    <td>
                        <label for="general" class="radio_box">
                            <input id="general" type="radio" name="ticket" value="general"
                                   bind:group={selectedDiscount}>
                            <span class="on"></span>
                        </label>
                    </td>
                </tr>
                <tr>
                    <th rowspan="3">기본할인</th>
                    <td>복지 할인(장애인, 국가유공자) 50%</td>
                    <td>{welfarePrice.toLocaleString()}원</td>
                    <td>
                        <label for="welfare" class="radio_box">
                            <input id="welfare" type="radio" name="ticket" value="welfare"
                                   bind:group={selectedDiscount}>
                            <span class="on"></span>
                        </label>
                    </td>
                </tr>
                <tr>
                    <td>노약자 할인 30%</td>
                    <td>{elderlyPrice.toLocaleString()}원</td>
                    <td>
                        <label for="elderly" class="radio_box">
                            <input id="elderly" type="radio" name="ticket" value="elderly"
                                   bind:group={selectedDiscount}>
                            <span class="on"></span>
                        </label>
                    </td>
                </tr>
                <tr>
                    <td>대학생 할인 10%</td>
                    <td>{studentPrice.toLocaleString()}원</td>
                    <td>
                        <label for="student" class="radio_box">
                            <input id="student" type="radio" name="ticket" value="student"
                                   bind:group={selectedDiscount}>
                            <span class="on"></span>
                        </label>
                    </td>
                </tr>
            </table>
            <button class="blue-button" on:click={nextPage}
                    style="margin-top: 30px; width: 100%; padding: 12px; font-size: 20px">다음으로 이동
            </button>
        </div>
    { :else if id === 2 }
        <div class="box" style="margin-left: 230px; margin-right: 230px">
            <div class="ticket-container">
                <h3 style="width: max-content">티켓수령방법</h3>
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
                { #if selectedDelivery === '배송' }
                    <form>
                        <label for="address">배송 주소</label>
                        <input placeholder="주소를 입력해주세요." type="text" id="address" name="address" bind:value={address}
                               required>
                    </form>
                    <p style="font-size: 0.9em">배송비는 3,000원이며, 3일 이내에 배송됩니다.</p>
                {:else if selectedDelivery === '현장수령'}
                    <p>티켓은 예매번호로 수령 가능합니다.</p>
                    <p style="font-size: 0.9em">티켓현장수령은 예매시 부여되는 "예매번호"로 관람일 당일 티켓을 수령하여 입장합니다.</p>
                { /if         }
            </div>
            <div class="user-info">
                <h3>예매자 확인</h3>
                <form>
                    <label for="name">이름</label>
                    <input type="text" id="name" name="name" bind:value={name} required><br>

                    <label for="birthdate">생년월일</label>
                    <input type="text" id="birthdate" name="birthdate" placeholder="예) 870201 (YYMMDD)"
                           bind:value={birthDate} required><br>

                    <p class="note">생년월일을 정확히 입력해주세요. 가입 시 입력하신 정보와 다를 경우, 본인확인이 되지 않아 예매가 불가합니다.</p>

                    <label for="contact">연락처</label>
                    <div class="contact-container">
                        <input type="text" id="contact" name="contact1" bind:value={contact1} on:input={updateContact}
                               required>
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
            <button class="blue-button" on:click={nextPage}
                    style="margin-top: 30px; width: 97%; padding: 12px; font-size: 20px">다음으로 이동
            </button>
        </div>
    { :else if id === 3 }
        <div class="box" style="margin-left: 230px; margin-right: 230px">
            <h2>결제 정보 입력</h2>
            <form>
                <label for="cardNum">카드 번호</label>
                <div class="contact-container">
                    <input type="text" maxlength="4" id="cardNum" name="cardNum1" bind:value={cardNum1} required>
                    <span class="hipen">-</span>
                    <input type="text" maxlength="4" name="cardNum2" bind:value={cardNum2} required>
                    <span class="hipen">-</span>
                    <input type="password" maxlength="4" name="cardNum3" bind:value={cardNum3} required>
                    <span class="hipen">-</span>
                    <input type="text" maxlength="4" name="cardNum4" bind:value={cardNum4} required>
                </div>
                <br>
                <label for="cvc">CVC</label>
                <input type="password" maxlength="3" id="cvc" name="cvc" bind:value={cvc} required>
                <br>
                <label for="cardPassword">카드 비밀번호 앞 2자리</label>
                <input type="password" maxlength="2" id="cardPassword" name="cardPassword" bind:value={cardPassword}
                       required>
            </form>
            <button class="blue-button" on:click={nextPage}
                    style="margin-top: 30px; width: 97%; padding: 12px; font-size: 20px">다음으로 이동
            </button>
        </div>

    { :else if id === 4 }
        <div class="box" style="margin-left: 230px; margin-right: 230px">
            <h2>예매 정보 최종 확인</h2>
            <span style="font-weight: bold; color: #000; font-size: 18px">좌석 정보: </span>
            { #each selectedSeats as seat, index }
                <span>{seat.seatCol}{seat.seatRow}석</span>
                { #if index < selectedSeats.length - 1 }
                    <span>, </span>
                { /if         }
            { /each         }
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
                <span>{address}</span>
            { /if         }
            <br>
            <br>
            <span style="font-weight: bold; color: #000; font-size: 18px">이메일: </span>
            <span>{ email }</span>
            <h3>결제 정보</h3>
            <div class="box" style="width: fit-content; text-align: center">
                <span style="font-weight: bold; color: #000; font-size: 18px">카드 번호: </span>
                <span>{ cardNum1 }-{ cardNum2 }-****-{ cardNum4 }</span>
                <br>
            </div>
            <br>
            <h3>총 결제 금액</h3>
            <h2 style="margin-top: -15px">{ resultPrice.toLocaleString() }원</h2>
            <p class="note" style="text-align: center">*예매 확정 이후 1시간 내에 입금이 확인되지 않을 경우 주문은 취소처리 됩니다.</p>
            <button class="blue-button" style="margin-top: 30px; width: 97%; padding: 12px; font-size: 20px"
                    on:click={handleReservation}>
                입금 안내 확인 및 예매 확정
            </button>

        </div>
    {/if}
</main>
