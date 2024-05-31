<svelte:head>
    <script src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>
</svelte:head>
<script>
    import {endpoints} from "$lib/api.js";
    import {writable} from "svelte/store";
    import {onMount} from "svelte";
    import {handleRefreshAccessToken} from "$lib/stores/auth.js";

    const passwordRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[^a-zA-Z0-9]).{8,12}$/;

    let name = "경성이";
    let email = "test@test.com";
    let address = "경성대";
    let address_kakao = writable('새로운 주소지를 검색하세요.');
    let address_detailed = writable('');
    let current_password = "";
    let new_password = "";
    let confirm_password = "";


    onMount(async () => {
        try {
            const response = await fetch(endpoints.user, {
                method: "GET",
                credentials: 'include',
            });

            if (!response.ok) {
                await handleRefreshAccessToken(response, "/mypage");
                response.text().then(errorMessage => {
                    alert(errorMessage); // 오류 메시지를 alert 창에 표시
                });
            } else {
                const result = await response.json();
                name = result.name;
                email = result.email;
                address = result.address;
            }
        } catch (err) {
            console.log(err.message);
        }
    });

    async function handleChangeName() {
        window.open('/mypage/changeName')
    }

    async function handleSearchAddress() {
        new daum.Postcode({
            oncomplete: function (data) {
                let fullAddr = data.address;
                document.getElementById("address_kakao").value = fullAddr;
                address_kakao.set(fullAddr);
            }
        }).open();
    }

    async function handleChangeAddress() {
        if ($address_kakao === '새로운 주소지를 검색하세요.') {
            alert('변경할 주소를 먼저 검색해주세요.');
        } else if ($address_detailed.trim() === '') {
            alert('상세 주소를 입력해주세요.')
        } else {
            address = $address_kakao + ' ' + $address_detailed;
            try {
                const response = await fetch(endpoints.user + "/address", {
                    method: "PUT",
                    credentials: 'include',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        address
                    }),
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                } else {
                    alert("주소 변경이 완료되었습니다.");
                }

            } catch (err) {
                console.log(err.message); // 에러 발생 시 에러 메시지 저장
            }
            address_kakao = writable('새로운 주소지를 검색하세요.');
            address_detailed.set('');
        }
    }

    async function handleChangePassword() {

        confirm_password = confirm_password.trim();
        new_password = new_password.trim();
        confirm_password = confirm_password.trim();

        if (current_password === "") {
            alert("현재 비밀번호를 입력하세요.");
            return;
        } else if (new_password === "") {
            alert("변경할 비밀번호를 입력하세요.");
            return;
        } else if (confirm_password === "") {
            alert("새로운 비밀번호 확인을 위해 확인용 비밀번호를 입력하세요.");
            return;
        }

        if (new_password !== confirm_password) {
            alert("새 비밀번호를 정확히 입력하세요.")
            return;
        }

        if (!passwordRegex.test(new_password)) {
            alert("비밀번호를 조건에 맞게 입력하세요.");
            return;
        }


        const response = await fetch(endpoints.user + "/password", {
            method: "PUT",
            credentials: 'include',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                confirmPassword: current_password,
                newPassword: new_password
            }),
        });

        if (response.ok) {
            alert("비밀번호 변경이 완료되었습니다.");
            window.location.href = "/mypage";
        } else {

        }

    }
</script>

<style>
    @import url('../../../../static/style/privacy_tab.css');
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

<title>마이페이지</title>
<main class="container">
    <!--    <h1 style="font-weight: bold; color: #000; text-align: center">개인정보 변경</h1>-->
    <div style="width: 100%">
        <div class="container-box">
            <h2>이메일</h2>
            <div class="box" style="width: 50%">
                <p>{email}</p>
            </div>
        </div>
        <div class="container-box">
            <h2>이름</h2>
            <p style="color: gray; margin-top: -20px">*구글, 카카오 회원가입 유저 한정 1회에 한해 변경 가능합니다.</p>
            <div class="box" style="width: 120px">
                <p>{name}</p>
            </div>
            <button class="blue-button" on:click={handleChangeName} style="width: 120px">변경하러 가기</button>
        </div>
        <div class="container-box">
            <h2>주소지 변경</h2>
            <p style="font-size: 19px;  color: #000">기존 주소지</p>
            <div class="box">
                <p>{address == null ? "주소를 등록하세요" : address}</p>
            </div>
            <p class="p-label">새로운 주소지</p>
            <div class="box">
                <p id="address_kakao">{$address_kakao}</p>
            </div>
            <button class="blue-button" on:click={handleSearchAddress} style="width: 40%">주소 검색하기</button>
            <br>
            <input type="text" bind:value={$address_detailed} placeholder="상세 주소를 입력하세요"/>
            <br>
            <button class="blue-button" on:click={handleChangeAddress} style="width: 40%">주소지 변경</button>
        </div>
        <br>
        <div class="container-box">
            <h2>비밀번호 변경</h2>
            <p class="p-label">기존 비밀번호</p>
            <input type="password" placeholder="기존 비밀번호" bind:value={current_password}/>
            <p style="font-size: 18px;  color: #000">새로운 비밀번호</p>
            <input type="password" placeholder="새로운 비밀번호" bind:value={new_password}/>
            <br>
            <input type="password" placeholder="새로운 비밀번호 확인" bind:value={confirm_password}/>
            <br>
            <button id="address_kakao" class="blue-button" on:click={handleChangePassword}>비밀번호 변경</button>
        </div>
    </div>
</main>
