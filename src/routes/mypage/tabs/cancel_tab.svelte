<script>
    let events = [
        {
            id: 1,
            title: 'IU Concert: The Golden hour',
            date: '2023-09-28~30',
            location: '잠실올림픽주경기장',
            imageURL: 'src/lib/images/main/iu_poster.jpg',
            orderNumber: 1,
            goto: '/signin'
        },
        {
            id: 2,
            title: 'CHANGMO: UNDERGROUND ROCKSTAR 2020',
            date: '2020-03-04~18',
            location: 'NORTH AMERICA',
            imageURL: 'src/lib/images/main/changmo_poster.jpeg',
            orderNumber: 2,
            goto: '/signin'
        },{
            id: 1,
            title: 'IU Concert: The Golden hour',
            date: '2023-09-28~30',
            location: '잠실올림픽주경기장',
            imageURL: 'src/lib/images/main/iu_poster.jpg',
            orderNumber: 3,
            goto: '/signin'
        },
        {
            id: 2,
            title: 'CHANGMO: UNDERGROUND ROCKSTAR 2020',
            date: '2020-03-04~18',
            location: 'NORTH AMERICA',
            imageURL: 'src/lib/images/main/changmo_poster.jpeg',
            orderNumber: 4,
            goto: '/signin'
        },{
            id: 1,
            title: 'IU Concert: The Golden hour',
            date: '2023-09-28~30',
            location: '잠실올림픽주경기장',
            imageURL: 'src/lib/images/main/iu_poster.jpg',
            orderNumber: 5,
            goto: '/signin'
        },
        {
            id: 2,
            title: 'CHANGMO: UNDERGROUND ROCKSTAR 2020',
            date: '2020-03-04~18',
            location: 'NORTH AMERICA',
            imageURL: 'src/lib/images/main/changmo_poster.jpeg',
            orderNumber: 6,
            goto: '/signin'
        },{
            id: 1,
            title: 'IU Concert: The Golden hour',
            date: '2023-09-28~30',
            location: '잠실올림픽주경기장',
            imageURL: 'src/lib/images/main/iu_poster.jpg',
            orderNumber: 7,
            goto: '/signin'
        },
        {
            id: 2,
            title: 'CHANGMO: UNDERGROUND ROCKSTAR 2020',
            date: '2020-03-04~18',
            location: 'NORTH AMERICA',
            imageURL: 'src/lib/images/main/changmo_poster.jpeg',
            orderNumber: 8,
            goto: '/signin'
        },{
            id: 1,
            title: 'IU Concert: The Golden hour',
            date: '2023-09-28~30',
            location: '잠실올림픽주경기장',
            imageURL: 'src/lib/images/main/iu_poster.jpg',
            orderNumber: 9,
            goto: '/signin'
        },
        {
            id: 2,
            title: 'CHANGMO: UNDERGROUND ROCKSTAR 2020',
            date: '2020-03-04~18',
            location: 'NORTH AMERICA',
            imageURL: 'src/lib/images/main/changmo_poster.jpeg',
            orderNumber: 10,
            goto: '/signin'
        }
    ];
</script>

<style>
    @import url('../../../../static/style/event.css');
    @import url('../../../../static/style/button.css');

    .right {
        width: 25%;
    }
</style>

<main class="event-list-container">
    {#each events as event, index (event)}
        <div class="eventlist-item">
            <a href={event.goto}>
                <img src="{event.imageURL}" width="80px" alt="{event.title}" style="float: left; border-radius: 5px"/>
            </a>

            <a href={event.goto}>
                <div class="eventlist-title">{event.title}</div>
                <div class="eventlist-details">
                    <p>{event.location}</p>
                    <p>{event.date}</p>
                </div>
            </a>
            <div class="right">
                <div style="text-align: center;">
                    <div class="eventlist-title">예매 번호</div>
                    <div class="eventlist-details">{event.orderNumber}</div>
                    <p>예매가 정상적으로 <br> 취소되었습니다.</p>
                </div>
                <button class="blue-button">다시 예매하러 가기</button>
            </div>
        </div>

    {/each}
</main>