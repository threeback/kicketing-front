<style>
    :global(.datepicker[data-picker-theme="custom-datepicker"]) {
        --datepicker-container-background: #8A2BE2;
        --datepicker-container-border: 1px solid #8A2BE2;

        --datepicker-calendar-header-text-color: #fff;
        --datepicker-calendar-dow-color: #fff;
        --datepicker-calendar-day-color: #fff;
        --datepicker-calendar-day-color-disabled: #8A2BE2;
        --datepicker-calendar-range-selected-background: #8A2BE2;

        --datepicker-calendar-header-month-nav-background-hover: #BA55D3;
        --datepicker-calendar-header-month-nav-icon-next-filter: invert(100);
        --datepicker-calendar-header-month-nav-icon-prev-filter: invert(100);
        --datepicker-calendar-header-year-nav-icon-next-filter: invert(100);
        --datepicker-calendar-header-year-nav-icon-prev-filter: invert(100);

        --datepicker-calendar-split-border: 1px solid orchid;

        --datepicker-presets-border: 1px solid orchid;
        --datepicker-presets-button-background-active: #8A2BE2;
        --datepicker-presets-button-color: #fff;
        --datepicker-presets-button-color-active: #fff;
        --datepicker-presets-button-color-hover: #333;
        --datepicker-presets-button-color-focus: #333;
    }

    .submit-button {
        background-color: #007bff; /* 로그인 버튼 파란색으로 변경 */
        color: #fff;
        border: none;
        padding: 10px 20px;
        font-size: 16px;
        cursor: pointer;
        border-radius: 5px;
        transition: background-color 0.3s, transform 0.3s; /* 애니메이션 효과 추가 */
    }

    .submit-button:hover {
        background-color: #0056b3; /* 호버링 시 더 진한 파란색 */
        transform: scale(1.05); /* 호버링 시 약간 커짐 */
    }


    .container {
        margin: 20px;
        max-width: 1200px;
    }

    .title {
        font-size: 32px;
        font-weight: bold;
        margin-bottom: 20px;
        text-align: left;
    }

    .content {
        display: flex;
        align-items: flex-start;
    }

    .poster-container {
        flex: 1;
        max-width: 400px;
        margin-right: 20px;
    }

    .poster {
        width: 310px;
        height: auto;
        display: block;
    }

    .info {
        flex: 2;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .info-item {
        display: flex;
        align-items: center;
        margin-left: 10px;
        margin-bottom: 10px;
    }

    .info-label {
        font-size: 18px;
        margin-right: 10px;
    }

    .price-section {
        display: flex;
        flex-direction: column;
    }

    .price-title {
        font-size: 18px;
        font-weight: bold;
        margin-left: 10px;
        margin-bottom: 10px;
        display: flex;
        align-items: center;
    }

    .price-list {
        display: flex;
        flex-direction: column;
        margin-left: 10px;
    }

    .price-item {
        font-size: 18px;
        margin-bottom: 5px;
        display: flex;
        text-align: left;
        margin-right: 460px;
        justify-content: space-between;
    }

    .price-type {
        color: rgb(128, 128, 128);
    }

    .price-value {
        color: black;
        font-weight: bold;
    }

    .cast-list {
        display: flex;
        flex-wrap: wrap;
    }

    .cast-member {
        margin-right: 20px;
        margin-bottom: 20px;
    }

    .cast-member img {
        border-radius: 50%;
        width: 100px; /* 이미지 크기에 맞게 조절하세요 */
        height: 100px; /* 이미지 크기에 맞게 조절하세요 */
    }

    .details {
        text-align: center;
        margin-top: 10px;
    }

    .details p {
        margin: 5px 0;
    }
</style>

<script>
    import dayjs from 'dayjs';
    import 'dayjs/locale/ko.js';
    import {onMount} from 'svelte';
    import {endpoints} from "$lib/api.js";
    import {DatePicker} from "@svelte-plugins/datepicker";
    import {format} from 'date-fns';
    import {goto} from "$app/navigation";
    import Search_box from "../search/box/search_box.svelte";
    import {fetchPerformances, name} from "$lib/stores/performance.js";

    dayjs.locale('ko');

    let performanceUUID = "";
    let queryParams = {};
    let performanceDTO = [];
    let placeDTO = [];
    let seatGrades = [];
    let stars = [];
    let bookableDates = [];
    let specificDateObject = [];
    let enabledDates = [];
    let myDates = [];
    let seatLefts = [];
    let startDate = new Date().toDateString()
    let endDate;
    let dateFormat = 'yyyy년 MM월 dd일';
    let fetchFormat = 'yyyyMMdd';
    let enableFormat = 'yyyy.MM.dd'
    let bookableFormat = 'yyyy-MM-dd'
    let isOpen = false;
    let enableFutureDates = true;
    let enablePastDates = false;
    let selected;


    const toggleDatePicker = () => (isOpen = !isOpen);

    const formatDate = (dateString) => {
        let today = new Date(dateString)
        let nextMonth = new Date(today.getFullYear().toString() + "-" +
            ((today.getMonth() + 2) % 12).toString() + "-01")

        let myDate = dateString && format(today, fetchFormat) || '';
        let nextFirstDate = nextMonth && format(nextMonth, fetchFormat) || '';

        if (myDate !== (new Date() && format(new Date(), fetchFormat) || '')) {
            getBookableDates(myDate)
        }
        return dateString && format(new Date(dateString), dateFormat) || '';
    };


    const bookableFormatDate = (dateString) => {
        return dateString && format(new Date(dateString), bookableFormat) || '';
    };

    let formattedStartDate = formatDate(startDate);

    $: formattedStartDate = formatDate(startDate)


    onMount(async () => {
        const params = new URLSearchParams(window.location.search);
        params.forEach((value, key) => {
            queryParams[key] = value;
            performanceUUID = value
        });
        try {
            const response = await fetch(endpoints.performance + "/" + performanceUUID, {
                method: "GET",
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const result = await response.json();
            performanceDTO = (result.performanceDTO);
            placeDTO = (result.placeDTO);
            seatGrades = (result.seatGrades);
            stars = (result.stars);
            let today = new Date();
            let nextMonth = new Date(today.getFullYear().toString() + "-" +
                ((today.getMonth() + 2) % 12).toString() + "-01")
            let nextFirstDate = nextMonth && format(nextMonth, fetchFormat) || '';
            await getBookableDates(today && format(today, fetchFormat) || '');
            await getBookableDates(nextFirstDate)
        } catch (err) {
            console.log(err.message);
        }
    });

    async function getBookableDates(selected) {
        try {
            const response = await fetch(endpoints.performance + "/" + performanceDTO.id + "/bookable-dates?startDate=" + selected, {
                method: "GET",
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();
            bookableDates = result.bookableDates;

            bookableDates.forEach(
                bookableDate => {
                    let daysOfMonth = new Date(bookableDate.dateTime) && format(new Date(bookableDate.dateTime), enableFormat) || '';
                    myDates.push(new Date(daysOfMonth).toDateString());
                    enabledDates = Array.from(new Set(myDates));
                }
            )

            specificDateObject = Array.from(bookableDates.filter(item => item.dateTime.split('T')[0] === bookableFormatDate(startDate)));
            specificDateObject.sort((a, b) => a.round - b.round);
            // console.log(specificDateObject)
        } catch (err) {
            console.log(err.message);
        }

    }

    function handleNavigationChange(event) {
        if (event.direction === 'next' && (event.currentPeriod.start <= performanceDTO.endDate)) {
            getBookableDates(
                new Date(event.currentPeriod.start)
                && format(new Date(event.currentPeriod.start), fetchFormat) || '')
        }
    }

    function handleDayChange(event) {

        if (formatDate(event.startDate) === formatDate(new Date())) {
            getBookableDates(event.startDate && format(new Date(event.startDate), fetchFormat) || '')
        }
    }

    async function handleBookingListener(specific) {
        goto(`/booking?performanceUUID=${performanceUUID}&onStageId=${specific.id}`)
    }

    async function handleChangeSeats(specific) {
        try {
            const response = await fetch(endpoints.performance + "/" + specific.id + "/bookable-seats", {
                method: "GET",
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const result = await response.json();
            seatLefts = result.seatGradeCounts;
            let counts = 0;
            seatLefts.forEach((seatLeft) => {
                counts += seatLeft.count
            })
            const button = document.getElementById('submit-button')
            if (counts < 1) {
                button.disabled = true;
            } else {
                button.disabled = false;
            }
        } catch (err) {
            console.log(err.message);
        }
    }

    function handleSearch(event) {
        name.set(event.detail.searchTerm);
        fetchPerformances();
    }
</script>
<div style="align-self: center">
    <Search_box on:search={handleSearch}/>
</div>
<title>{performanceDTO.name}</title>
<main class="container" style="align-self: center;">
    <div>
        <h2 class="title">{performanceDTO.name}</h2>
        <p style="margin-top: -10px; margin-left: 5px; margin-bottom: 20px">{performanceDTO.genre}</p>
    </div>
    <hr>
    <div class="content" style="margin-left: 10px; padding: 30px">
        <div class="poster-container">
            <img class="poster" src={performanceDTO.imageUrl} alt="Poster">
        </div>
        <div class="info">
            <div class="info-item">
                <span class="info-label">장소: {placeDTO.name}</span>
                <span class="info-label">{placeDTO.hall}</span>
            </div>
            <p style="margin-top: -5px; margin-left: 55px; color: gray">{placeDTO.address}</p>
            <div class="info-item">
                <span class="info-label">공연기간: {dayjs(new Date(performanceDTO.startDate)).format('YYYY년 M월 D일')}
                    ~ {dayjs(new Date(performanceDTO.endDate)).format('YYYY년 M월 D일')}</span>
            </div>
            <div class="info-item">
                <span class="info-label">공연시간: {performanceDTO.length}분</span>
            </div>
            <div class="info-item">
                <span class="info-label">관람 연령: {performanceDTO.ageLimit}세 이상</span>
            </div>
            <div class="price-section">
                <div class="price-title">
                    <span>좌석 등급별 가격</span>
                </div>
                <div class="price-list">
                    {#each seatGrades as seat}
                        <div class="price-item">
                            <span class="price-type">{seat.grade}&nbsp;&nbsp;&nbsp;</span>
                            <span class="price-value">{seat.price.toLocaleString()}&nbsp;원 </span>
                        </div>
                    {/each}
                </div>
            </div>
        </div>
        <div>
            <div>공연 날짜 선택하기</div>
            <br>
            <DatePicker bind:isOpen bind:startDate bind:endDate bind:enabledDates bind:enableFutureDates
                        bind:enablePastDates onNavigationChange={handleNavigationChange} onDayClick={handleDayChange}>
            </DatePicker>
            <input type="text" placeholder="Select date" bind:value={formattedStartDate}
                   on:click={toggleDatePicker} style="margin-bottom: 20px;"/>
            <div style="margin-bottom: 60px;">
                <div style="margin-bottom: 5px;">회차/좌석 정보</div>
                <hr>
                <select bind:value={selected} on:change={() => handleChangeSeats(selected)}
                        style="width: 165px; height: 50px; margin-bottom: 20px; font-size: 16px; border: 1px solid #ccc; border-radius: 5px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                    {#each specificDateObject as specific}
                        <option value={specific}
                                style="padding: 10px 0;">
                            &nbsp;&nbsp;&nbsp;{specific.round}회차 - {specific.dateTime.split('T')[1].slice(0, 5)}
                        </option>
                    {/each}
                </select>
                <br>
                <div style="margin-bottom: 5px">
                    {#if seatLefts.length > 0}
                        {#each seatLefts as seat}
                            <div style="margin-bottom: 5px;">
                                {seat.grade}&nbsp;등급 :&nbsp;&nbsp;{seat.count}&nbsp;석
                            </div>
                        {/each}
                    {/if}
                </div>
            </div>
            <div>
                <br>
                <button id="submit-button" class="submit-button" style="width: 165px"
                        on:click={()=> handleBookingListener(selected)}>
                    예매하기
                </button>
            </div>
        </div>
    </div>
    <hr>
    <h3 style="margin-left: 25px; font-size: 25px; font-weight: bold">출연진</h3>
    <div class="cast-list">
        {#each stars as star}
            <div class="cast-member">
                <img src={star.imageURL} alt="">
                <div class="details">
                    <span style="font-weight: bold">{star.name}</span><span
                        style="font-size: 15px; margin-left: 3px"> { star.sex === 'MALE' ? '(남)' : '(여)' }</span>
                    <p>{star.birthdate}</p>
                </div>
            </div>
        {/each}
    </div>
</main>
