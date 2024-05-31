<script>
    import {onMount} from "svelte";
    import {endpoints} from "$lib/api.js";
    import {handleRefreshAccessToken} from "$lib/stores/auth.js";

    let canceledReservationArray = [];

    onMount(async () => {
        try {
            const response = await fetch(endpoints.user + "/my-reservation/canceled", {
                method: "GET",
                credentials: 'include',
            });

            if (!response.ok) {
                await handleRefreshAccessToken(response, "/mypage");
            } else {
                const result = await response.json();
                canceledReservationArray = Object.entries(result.canceledReservationDTOMap)
                    .map(([orderNumber, data]) => ({orderNumber, ...data}));

                canceledReservationArray.sort((a, b) => {
                    return new Date(b.canceledAt) - new Date(a.canceledAt);
                });
            }
        } catch (err) {
            console.log(err.message);
        }
    });
</script>

<style>
    .right {
        width: 25%;
    }
</style>

<title>마이페이지</title>
<main class="event-list-container">
    {#if canceledReservationArray.length < 1}
        <h1 style="text-align: center;">취소 내역이 없습니다.</h1>
    {/if}
    {#each canceledReservationArray as canceled}
        <div class="eventlist-item">
            <img src="{canceled.imageUrl}" width="16%"
                 alt="{canceled.performanceName}"
                 style="float: left; border-radius: 5px;"/>
            <div class="eventlist-title" style="text-align-last: center">
                <div>{canceled.performanceName}</div>
            </div>

            <div class="eventlist-details" style="margin: 10px">
                <p>{canceled.placeName + " " + canceled.hall}</p>
                <p>{canceled.performanceDate.slice(0, 10) + " (" +
                canceled.performanceDate.slice(11, 16) + ") " + canceled.round + "회차"}</p>
            </div>

            <div class="right">
                <div style="text-align: center;">
                    <div class="eventlist-title">예매 번호</div>
                    <div class="eventlist-details">{canceled.orderNumber}</div>
                </div>
            </div>
            <div style="text-align: center;">
                <div class="eventlist-orderedAt">예매 일자</div>
                <div class="eventlist-details">{canceled.orderedAt?.slice(0, 10) || ''
                + " " }</div>
                <div>{canceled.orderedAt?.slice(11, 16) || ''}</div>
                <br>
                <div class="eventlist-orderedAt">취소 일자</div>
                <div class="eventlist-details">{canceled.canceledAt?.slice(0, 10) || ''
                + " "}</div>
                <div>{canceled.canceledAt?.slice(11, 16) || ''}</div>
            </div>
            <div class="eventlist-item" style="display: block; width: 16%">
                <div class="eventlist-details" style="font-size: 20px">
                    좌석 정보 {canceled.seatDTOS.length}개
                </div>
                <br>
                {#each canceled.seatDTOS as seat}
                    <li style="padding: 4px; margin-left: 20px ">
                        {seat.seatRow + "열 " + seat.seatCol + "석 (" + seat.grade + ")"}
                    </li>
                {/each}
            </div>
        </div>
    {/each}
</main>