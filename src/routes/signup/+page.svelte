<script>
	import { endpoints } from "$lib/api";
	import { goto } from "$app/navigation";

	const nameRegex = /^[가-힣]{2,20}$/;
	const passwordRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[^a-zA-Z0-9]).{8,12}$/;

	let email = "";
	let name = "";
	let showEmailVerification = false;
	let emailVerified = false;
	let emailVerificationCode = "";
	let verificationResponse = "";
	let password = "";
	let passwordConfirm = "";

	async function sendVerificationCode() {
		if (email.trim() == "") {
			alert("이메일을 입력하세요.");
			return;
		}
		showEmailVerification = true;
		// 인증을 다시 시도하므로 false로 설정
		emailVerified = false;

		const response = await fetch(endpoints.signup + "/email/code", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				email,
			}),
		});

		if (response.ok) {
			alert("3분 이내에 인증을 완료하세요.");
		} else {
			alert("이메일 전송에 실패하였습니다.");
		}
	}

	async function verifyEmailCode() {
		let code = emailVerificationCode;
		const response = await fetch(endpoints.signup + "/email/confirm", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				email,
				code,
			}),
		});

		if (response.ok) {
			emailVerified = true;
			verificationResponse = "인증에 성공하였습니다.";
		} else {
			emailVerified = false;
			verificationResponse = "인증에 실패하였습니다.";
		}
	}

	async function submitForm() {
		// 회원가입 API 요청
		if (password !== passwordConfirm) {
			alert("비밀번호가 일치하지 않습니다.");
			return;
		}
		if (!nameRegex.test(name)) {
			alert("이름을 정확히 입력하세요.");
			return;
		}
		if (!passwordRegex.test(password)) {
			alert("비밀번호를 조건에 맞게 입력하세요.");
			return;
		}

		const response = await fetch(endpoints.signup + "/", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				email,
				password,
				name,
			}),
		});

		if (response.ok) {
			alert("회원가입이 완료되었습니다.");
			goto("/signin");
		} else {
			alert("회원가입에 실패하였습니다.");
		}
	}
</script>

<!--div-->

<div class="container">
	<form on:submit|preventDefault={submitForm}>
		<div>
			<label for="email">이메일</label>
			<input
				type="text"
				id="email"
				bind:value={email}
				class:disabled={emailVerified}
			/>
		</div>

		<div>
			<button
				type="button"
				on:click={sendVerificationCode}
				class:disabled={emailVerified}>인증번호 보내기</button
			>
		</div>

		{#if showEmailVerification}
			<div>
				<label for="emailVerification">이메일 인증</label>
				<input
					type="text"
					id="emailVerification"
					bind:value={emailVerificationCode}
					placeholder="인증번호 6자리를 입력하세요."
					class:disabled={emailVerified}
				/>
				<button
					type="button"
					on:click={verifyEmailCode}
					class:disabled={emailVerified}>확인</button
				>
				<button
					type="button"
					on:click={sendVerificationCode}
					class:disabled={emailVerified}>재전송</button
				>
				{#if verificationResponse}
					<p class="alert-info">{verificationResponse}</p>
				{/if}
			</div>
		{/if}

		{#if emailVerified}
			<div class={emailVerified ? "verified" : ""}>
				<div>
					<label for="password">비밀번호</label>
					<input
						type="password"
						id="password"
						bind:value={password}
						placeholder="8~12자리 영문, 숫자, 특수기호"
					/>
				</div>
				<div>
					<label for="passwordConfirm">비밀번호 확인</label>
					<input
						type="password"
						id="passwordConfirm"
						bind:value={passwordConfirm}
						placeholder="8~12자리 영문, 숫자, 특수기호"
					/>
				</div>
				<div>
					<label for="name">이름</label>
					<input
						type="text"
						id="name"
						bind:value={name}
						placeholder="공연 입장시 확인합니다. 정확한 본명을 기재하세요."
					/>
				</div>
			</div>
		{/if}
		<br />
		<button type="submit">회원가입</button>
	</form>
</div>

<style>
	.container {
		width: 60%;
		margin: 2rem auto;
		padding: 2rem;
		background-color: #fff;
		font-family: "GmarketSansMedium", sans-serif;
	}

	label {
		display: block;
		margin-bottom: 0.5rem;
		color: #2b2b2b;
		font-weight: normal;
	}

	input[type="text"],
	input[type="password"] {
		width: calc(100% - 20px);
		padding: 10px;
		margin-bottom: 1rem;
		border: none;
		border-bottom: 1px solid #d1d1d1;
		font-size: 1rem;
		background-color: transparent;
	}

	input:focus {
		border-bottom: 2px solid #4c80f1;
		outline: none;
	}

	button {
		background-color: #f7f7f7;
		color: #2b2b2b;
		border: 1px solid #d1d1d1;
		border-radius: 8px;
		padding: 0.75rem 1.5rem;

		cursor: pointer;
		font-size: 1rem;
		transition: background-color 0.3s ease-in-out;
	}

	button:hover {
		background-color: #e0e0e0;
	}

	.alert-info {
		padding: 10px;
		background-color: #f7f7f7;
		border-left: 5px solid #4c80f1;
		color: #2b2b2b;
		margin-top: 1rem;
	}

	.verified {
		padding: 1rem;
		margin-bottom: 1rem;
	}

	button[type="submit"] {
		background: #3a6ed8;
		color: white;
		display: block;
		width: 100%;
		max-width: 680px;
		height: 50px;
		border-radius: 8px;
		margin: 0 auto;
		border: none;
		cursor: pointer;
		font-size: 14px;
		font-family: "GmarketSansMedium", sans-serif;
		box-shadow: 0 15px 30px rgba(#7c7387, 0.36);
		transition: 0.2s linear;
	}

	button[type="submit"]:hover {
		background-color: #103d97;
	}
	.disabled {
		opacity: 0.5; /* 불투명도 설정 */
		pointer-events: none; /* 이벤트 처리 비활성화 */
	}
</style>
