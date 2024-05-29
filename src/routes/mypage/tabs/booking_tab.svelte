<script>
    import {onMount} from "svelte";
    import {endpoints} from "$lib/api.js";
    import {handleRefreshAccessToken} from "$lib/stores/auth.js";

    let reservationArray = [];

    onMount(async () => {
        try {
            const response = await fetch(endpoints.user + "/my-reservation", {
                method: "GET",
                credentials: 'include',
            });

            if (!response.ok) {
                await handleRefreshAccessToken(response, "/mypage");
            } else {
                const result = await response.json();
                reservationArray = Object.entries(result.reservations)
                    .map(([orderNumber, data]) => ({orderNumber, ...data}));
            }
        } catch (err) {
            console.log(err.message); // 에러 발생 시 에러 메시지 저장
        }
    });

    async function cancelReservation(orderNumber) {
        if (confirm("정말 예약을 취소하시겠습니까? 한 번 예약을 취소하면 되돌릴 수 없습니다.")) {
            const response = await fetch(endpoints.user + "/my-reservation/" + orderNumber, {
                method: "DELETE",
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                response.text().then(errorMessage => {
                    alert(errorMessage); // 오류 메시지를 alert 창에 표시
                });
                await handleRefreshAccessToken(response, "/mypage");
            } else {
                alert("예매 취소가 완료되었습니다.");
                window.location.href = "/mypage";
            }
        } else {
            return;
        }
    }
</script>

<style>
    @import url('../../../../static/style/event.css');
    @import url('../../../../static/style/button.css');
</style>

<title>마이페이지</title>
<main class="event-list-container">
    {#each reservationArray as reservation}
        <div class="eventlist-item">
            <img src="{reservation.simplePerformanceDTO.imageUrl}" width="16%"
                 alt="{reservation.simplePerformanceDTO.name}"
                 style="float: left; border-radius: 5px;"/>

            <div class="eventlist-title" style="text-align-last: center; padding: 10px">
                <div>{reservation.simplePerformanceDTO.name}</div>
                <div>{reservation.simplePerformanceDTO.genre}</div>
            </div>

            <div class="eventlist-details">
                <p>{reservation.placeDTO.name + " " + reservation.placeDTO.hall}</p>
                <p>{reservation.onStageDTO.dateTime.slice(0, 10) + " ("
                + reservation.onStageDTO.dateTime.slice(11, 16) + ") " + reservation.onStageDTO.round + "회차"}</p>
            </div>

            <div>
                <div style="text-align: center;">
                    <div class="eventlist-title">예매 번호</div>
                    <div class="eventlist-details">{reservation.orderNumber}</div>
                    <br>
                    <div class="eventlist-orderedAt">예매 일자</div>
                    <div class="eventlist-details">{reservation.simpleReservationDTO.orderedAt?.slice(0, 10) || ''
                    + " "}</div>
                    <div>
                        {reservation.simpleReservationDTO.orderedAt?.slice(11, 16) || ''}
                    </div>
                </div>

            </div>
            <div class="eventlist-item" style="display: block; width: 16%">
                <div class="eventlist-details" style="font-size: 20px">
                    좌석 정보 {reservation.seatDTOS.length}개
                </div>
                <br>
                {#each reservation.seatDTOS as seat}
                    <li style="padding: 4px; margin-left: 20px ">
                        {seat.seatRow + "열 " + seat.seatCol + "석 (" + seat.grade + ")"}
                    </li>
                {/each}
            </div>
            <div>
                <button class="red-button" on:click={()=> cancelReservation(reservation.orderNumber)}>예매 취소</button>
            </div>
        </div>
    {/each}


</main>