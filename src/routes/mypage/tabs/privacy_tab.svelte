<svelte:head>
    <script src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>
</svelte:head>
<script>
    import { goto } from "$app/navigation";
    import {endpoints} from "$lib/api.js";
    import {writable} from "svelte/store";
    let name = "송수건";
    let user_state= 1;
    let address = "부산광역시 남구 수영로 309";
    let address_kakao = writable('새로운 주소지를 검색하세요.');
    let address_detailed = writable('');
    let current_password = "";
    let new_password = "";
    let confirm_password = "";

    async function handleChangeName() {
        if (user_state === 1) {
            window.open('/mypage/changeName')
        } else {
            alert('이름 변경이 불가합니다.');
        }
    }

    async function handleSearchAddress() {
        new daum.Postcode({
            oncomplete: function(data) {
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
            alert('주소 변경이 완료 되었습니다.');
            address = $address_kakao + ' ' + $address_detailed;
            address_kakao = writable('새로운 주소지를 검색하세요.');
            address_detailed.set('');
        }
    }

    async function handleChangePassword() {

        if(current_password.trim() === ""){
            alert("현재 비밀번호를 입력하세요.");
            return;
        }
        else if (new_password.trim() === ""){
            alert("변경할 비밀번호를 입력하세요.");
            return;
        } else if (confirm_password.trim() === ""){
            alert("새로운 비밀번호 확인을 위해 확인용 비밀번호를 입력하세요.");
            return;
        }

        const response = await fetch(endpoints.signin, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                password,
            }),
        });

        if (response.ok) {
            alert("비밀번호 변경이 완료되었습니다.");
            goto("/mypage");
        } else {
            // alert("비밀번호를 다시 확인해주세요.");
            if (new_password.trim() !== confirm_password.trim()) {
                alert("변경할 비밀번호가 일치하지 않습니다. 다시 확인해주세요.");
            }
            else if (current_password) {
                // 기존 비밀번호가 일치하지 않을 때
                alert("기존 비밀번호가 일치하지 않습니다. 다시 확인해주세요.");
            }
            return;
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
    <h1 style="font-weight: bold; color: #000; text-align: center">개인정보 변경</h1>
    <div style="width: 100%">
        <div class="container-box">
            <h2>이름 확인</h2>
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
                <p>{address}</p>
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
            <input type="password" placeholder="기존 비밀번호" bind:value={current_password} />
            <p style="font-size: 18px;  color: #000">새로운 비밀번호</p>
            <input type="password" placeholder="새로운 비밀번호" bind:value={new_password} />
            <br>
            <input type="password" placeholder="새로운 비밀번호 확인" bind:value={confirm_password} />
            <br>
            <button id="address_kakao" class="blue-button" on:click={handleChangePassword}>비밀번호 변경</button>
        </div>
    </div>
</main>