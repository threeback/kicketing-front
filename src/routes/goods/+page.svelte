<script>
    let title = '현대 뮤지컬 공연';
    let ganre = '뮤지컬';
    let posterUrl = 'https://kicketing.s3.ap-northeast-2.amazonaws.com/poster/%E1%84%86%E1%85%B2%E1%84%8C%E1%85%B5%E1%84%8F%E1%85%A5%E1%86%AF.jpg';
    let place = {
        id: 1,
        name: 'LG아트센터',
        address: '서울특별시 강서구 마곡중앙로 136',
        hall: 'SIGNATURE홀'
    };
    let length = 90;
    let startDate = '2024.05.01';
    let endDate = '2024.07.05';
    let ageLimit = 12;
    let prices = [
        { type: 'VIP', price: 160000 },
        { type: 'R', price: 80000 },
        { type: 'S', price: 60000 },
        { type: 'A', price: 35000 }
    ];
    let stars = [
        { id: 1, name: '이현석', birthdate: '1999.01.01', gender: 'MALE', imageURL: 'http://example.com/images/msic.jpg' },
        { id: 3, name: '정부용', birthdate: '2001.03.03', gender: 'MALE', imageURL: 'http://example.com/images/msic.jpg' },
        { id: 4, name: '전지환', birthdate: '2002.04.05', gender: 'MALE', imageURL: 'http://example.com/images/msic.jpg' },
        { id: 6, name: '카리나', birthdate: '1992.03.06', gender: 'FEMALE', imageURL: 'http://example.com/images/msic.jpg' },
    ]
    let gender = '';

    async function handleBookingListener() {

    }
</script>

<style>
    @import url('../../../static/style/goods.css');
    @import url('../../../static/style/button.css');
</style>

<title>{title}</title>
<main class="container">
    <h1>공연 상세 정보</h1>
    <hr>
    <h2 class="title">{title}</h2>
    <p style="margin-top: -10px; margin-left: 5px; margin-bottom: 20px">{ganre}</p>
    <div class="content">
        <div class="poster-container">
            <img class="poster" src={posterUrl} alt="Poster">
        </div>
        <div class="info">
            <div class="info-item">
                <span class="info-label">장소: {place.name}</span>
                <span style="font-size: 15px">({place.hall})</span>
            </div>
            <p style="margin-top: -5px; margin-left: 55px; color: gray">{place.address}</p>
            <div class="info-item">
                <span class="info-label">공연기간: {startDate} ~ {endDate}</span>
            </div>
            <div class="info-item">
                <span class="info-label">공연시간: {length}분</span>
            </div>
            <div class="info-item">
                <span class="info-label">관람연령: {ageLimit}세 이상 관람가</span>
            </div>
            <div class="price-section">
                <div class="price-title">
                    <span>좌석 등급별 가격</span>
                </div>
                <div class="price-list">
                    {#each prices as price}
                        <div class="price-item">
                            <span class="price-type">{price.type}</span>
                            <span class="price-value">{price.price.toLocaleString()}원</span>
                        </div>
                    {/each}
                </div>
            </div>
<!--            <button class="blue-button" on:click={handleBookingListener} style="width: 165px">예매하러 가기</button>-->
        </div>
    </div>
    <hr>
    <h3 style="margin-left: 25px; font-size: 25px; font-weight: bold">출연진</h3>
    <div class="cast-list">
        {#each stars as star}
            <div class="cast-member">
                <img src='src/lib/images/main/iu_poster.jpg' alt="">
                <div class="details">
                    <span style="font-weight: bold">{star.name}</span><span style="font-size: 15px; margin-left: 3px">{gender} { star.gender === 'MALE' ? '남' : '여' }</span>
                    <p>{star.birthdate}</p>
                </div>
            </div>
        {/each}
    </div>
</main>