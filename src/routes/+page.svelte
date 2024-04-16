<!-- src/routes/index.svelte -->

<script>
	// 가상의 티켓 이벤트 데이터
	let events = [
		{
			id: 1,
			title: '콘서트 티켓 이벤트',
			date: '2024-04-20',
			location: '콘서트 홀 A',
			imageURL: 'concert.jpg'
		},
		{
			id: 2,
			title: '스포츠 이벤트 티켓 할인',
			date: '2024-05-10',
			location: '체육관',
			imageURL: 'sports.jpg'
		}
	];

	// 검색어 상태
	let searchTerm = '';
</script>

<style>
	/* 스타일링 */
	.container {
		font-family: "GmarketSansMedium", sans-serif;
	}

	.event {
		margin-bottom: 20px;
		padding: 10px;
		border: 1px solid #ccc;
		border-radius: 5px;
	}

	.event img {
		width: 100%;
		border-radius: 5px;
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

	/* 검색창 스타일 */
	.search-box {
		margin-bottom: 20px;
		position: relative;
		width: 644px;
	}

	.search-box input[type="text"] {
		padding: 16px;
		font-size: 19px;
		border: 1px solid #ccc;
		border-radius: 100px;
		width: 600px;
	}

	/* 검색 버튼 스타일 */
	.search-button {
		position: absolute;
		top: 50%;
		right: 10px; /* 수정된 부분: right 속성을 사용하여 오른쪽 끝에 정렬 */
		transform: translateY(-50%);
		background-color: #00ff0000;
		border: none;
		border-radius: 50%;
		width: 53px;
		height: 53px;
		cursor: pointer;
	}

	/* 검색 버튼 아이콘 스타일 */
	.search-button svg {
		width: 28px;
		height: 28px;
		fill: #007bff; /* 아이콘 색상을 흰색으로 설정 */
	}
</style>

<main class="container">
	<div class="auth-buttons">
		<a href="/signin">로그인</a>
		<a href="/signup">회원가입</a>
		<a href="/mypage">마이페이지</a>
	</div>

	<div class="search-box">
		<input type="text" placeholder="검색할 공연 정보를 입력해주세요." bind:value={searchTerm}>
		<button class="search-button">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
				<path d="M0 0h24v24H0z" fill="none"/>
				<path d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 0 0 1.48-5.34c-.47-2.78-2.79-5-5.59-5.34a6.505 6.505 0 0 0-7.27 7.27c.34 2.8 2.56 5.12 5.34 5.59a6.5 6.5 0 0 0 5.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0 .41-.41.41-1.08 0-1.49L15.5 14zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
			</svg>
		</button>
	</div>

	<button class="event-info-button">공연 정보 보기</button>

	<h1>티켓 이벤트 목록</h1>
	{#each events as event}
		<div class="event" key={event.id}>
			<h2>{event.title}</h2>
			<p>일자: {event.date}</p>
			<p>장소: {event.location}</p>
			<img src="assets/{event.imageURL}" alt="{event.title}" />
			<a href="event/{event.id}">티켓 예매하기</a>
		</div>
	{/each}
</main>
