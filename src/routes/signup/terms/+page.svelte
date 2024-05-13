<script>
    import { goto } from "$app/navigation";

    // function selectAll()  {
    //     const selectAllCheckbox = document.querySelector('#agreeAll');
    //     const checkboxes = document.getElementsByName('agree');
    //
    //
    //     checkboxes.forEach((checkbox) => {
    //         checkbox.checked = selectAllCheckbox.checked;
    //     })
    // }

    function checkAgreement() {
        const checkboxes = document.querySelectorAll('.agreeLabel input[type="checkbox"]');
        let allAgreed = true;

        checkboxes.forEach((checkbox) => {
            if (!checkbox.checked) {
                allAgreed = false;
            }
        });

        if (allAgreed) {
            // 모든 약관에 동의한 경우
            alert("회원가입이 완료되었습니다.");
            goto("/");
        } else {
            alert("약관에 동의하지 않은 항목이 있습니다. 모두 동의해주세요.");
        }
    }
</script>

<style>
    .container {
        font-family: "GmarketSansMedium", sans-serif;
        margin-left: -100px;
        margin-right: -100px;
    }

    div {
        color: black;
    }

    .box {
        border: 2px solid #000;
        border-radius: 25px;
        padding: 10px;
        display: flex;
        height: 300px;
        box-sizing: border-box;
        flex-direction: column;
        overflow: auto;
    }

    input[type="checkbox"] {
        width: 1.2rem;
        height: 1.2rem;
        border-radius: 50%;
        border: 1px solid #999;
        appearance: none;
        cursor: pointer;
        transition: background 0.2s;
    }

    input[type="checkbox"]:checked {
        content: '\2713';
        background: #007bff;
        border: none;
        border-radius: 50%;
        display: flex;
        width: 1.2rem;
        appearance: none;
        cursor: pointer;
        text-align: center;
        line-height: 1.2rem; /* 체크박스의 높이에 맞게 조정 */
        color: white;
    }
    button {
        padding: 15px;
        font-size: 21px;
        width: 100%;
        box-sizing: border-box;
        border: 1px solid #ccc; /* 테두리 색상 변경 */
        border-radius: 11px;
    }

    button {
        cursor: pointer;
        position: relative;
    }

    .blue-button {
        background-color: #007bff; /* 로그인 버튼 파란색으로 변경 */
        color: #fff;
    }
</style>

<title>회원가입 약관동의</title>

<main class="container">
    <h1 style="font-weight: bold; color: #000">약관 동의 페이지</h1>
<!--    <label for="agreeAll" style="display: flex;align-items: center;">-->
<!--        <input type="checkbox" id="agreeAll" name="agree" value="agreeAll" onchange="selectAll()"/>-->
<!--        <h2 style="font-weight: bold; color: black">전체 동의</h2>-->
<!--    </label>-->
    <hr>


    <label for="agreePersonalData" class="agreeLabel" style="display: flex;align-items: center;">
        <input type="checkbox" id="agreePersonalData" name="agree" value="agreePersonalData"/>
        <h2 style="font-weight: bold; color: black">개인정보 약관 동의</h2>
    </label>
    <div class="box">
        <h3>개인정보 처리방침 동의</h3>
        <p>귀하는 본 서비스 이용을 위해 개인정보 처리방침에 동의해야 합니다. 아래의 내용을 주의 깊게 읽고 동의 여부를 결정해 주세요.</p>
        <br>

        <h3>1. 수집하는 개인정보 항목</h3>
        <p>서비스 이용을 위해 귀하의 아이디, 이메일 주소 등의 개인정보를 수집합니다.</p>
        <br>

        <h3>2. 개인정보의 이용 목적</h3>
        <p>귀하의 개인정보는 서비스 제공, 이용자 식별 및 본인 확인, 서비스 이용에 따른 요금 정산, 불만처리 등의 목적으로 이용됩니다.</p>
        <br>

        <h3>3. 개인정보의 보유 및 이용 기간</h3>
        <p>귀하의 개인정보는 서비스 이용 계약 종료 시까지 보유 및 이용됩니다. 단, 관련 법령에 의한 보유 기간이 정해져 있는 경우 해당 기간까지 보유될 수 있습니다.</p>
        <br>

        <h3>4. 개인정보의 제공 및 공유</h3>
        <p>귀하의 개인정보는 서비스 제공을 위해 필요한 경우에 한하여 제3자에게 제공될 수 있습니다. 단, 귀하의 동의 없이 제3자에게 제공되지 않습니다.</p>
        <br>

        <h3>5. 개인정보의 파기 절차 및 방법</h3>
        <p>귀하의 개인정보는 수집 및 이용 목적이 달성된 후 즉시 파기되며, 전자적 파일 형태로 저장된 개인정보는 기록을 재생할 수 없는 방법으로 완전히 삭제됩니다.</p>
        <br>

        <h3>6. 권리 행사</h3>
        <p>귀하는 개인정보에 대한 열람, 정정, 삭제, 처리정지 요구 등의 권리를 행사할 수 있습니다.</p>
        <br>

        <h3>7. 개인정보 처리방침의 변경</h3>
        <p>본 개인정보 처리방침은 법령 및 정부 지침의 변경, 회사 정책에 따라 변경될 수 있습니다. 변경 시 본 서비스의 공지사항을 통해 고지할 것입니다.</p>
        <br>

        <h3>8. 동의</h3>
        <p>본 개인정보 처리방침에 동의합니다. 이를 확인하고 서비스 이용을 계속하시려면 "동의합니다" 버튼을 클릭해 주세요.</p>
    </div>

    <br>

    <label for="agreeFinancial" class="agreeLabel" style="display: flex;align-items: center;">
        <input type="checkbox" id="agreeFinancial" name="agree" value="agreeFinancial"/>
        <h2 style="font-weight: bold; color: black">전자금융거래 약관 동의</h2>
    </label>

    <div class="box">
        <h3>제1조 (목적)</h3>
        <p>이 약관은 전자금융거래 이용자가 이 주식회사(이하 “회사”라 한다)가 제공하는 전자금융거래 서비스를 이용함에 있어, 전자금융거래의 종류, 이용자와 회사간의 권리, 의무 및 책임사항, 전자금융거래 서비스의 이용절차 및 방법에 관한 기본적인 사항을 규정함을 목적으로 합니다.</p>
        <br>

        <h3>제2조 (정의)</h3>
        <p>이 약관에서 사용하는 용어의 정의는 다음과 같습니다.
        <ul>
            <li>1. "전자금융거래"란 회사가 전자적 장치를 통하여 금융상품 및 금융서비스를 제공하고 거래가 이루어지는 행위를 말합니다.</li>
            <li>2. "이용자"란 회사와의 전자금융거래계약을 체결하여 전자금융거래 서비스를 이용하는 자를 말합니다.</li>
            <li>3. "비밀번호"란 이용자의 동일성 식별 및 금융거래의 보안을 위하여 이용자 자신이 설정하고 회사에 등록한 문자, 숫자 또는 그 조합을 말합니다.</li>
            <li>4. "계좌"란 전자금융거래에 있어 이용자에게 개설된 예금계좌 및 여타의 계좌를 말합니다.</li>
        </ul>
        <br>

        <h3>제3조 (약관의 효력 및 변경)</h3>
        <p>1. 이 약관은 전자금융거래 서비스 이용 신청 시 이용자에게 공지하고 동의를 받음으로써 효력을 발생합니다.
            <br>2. 회사는 전자금융거래의 종류나 내용의 변경 등 필요한 경우 약관을 변경할 수 있으며, 변경된 약관은 변경된 내용을 게시한 날부터 효력을 발생합니다.</p>
        <br>

        <h3>제4조 (전자금융거래 서비스의 중단)</h3>
        <p>회사는 다음 각 호에 해당하는 경우 전자금융거래 서비스의 제공을 중단할 수 있습니다.
        <ul>
            <li>1. 긴급한 기술적 결함이 발생한 경우</li>
            <li>2. 서비스용 설비의 보수 등 공사로 인한 경우</li>
            <li>3. 서비스용 설비의 장애 또는 서비스 이용의 폭주 등으로 정상적인 서비스 제공이 불가능한 경우</li>
        </ul>
        <br>

        <h3>제5조 (이용자의 의무)</h3>
        <p>1. 이용자는 전자금융거래 서비스를 이용함에 있어 다음 각 호의 행위를 해서는 안됩니다.
        <ul>
            <li>가. 회사에 허위 사실을 기재하는 행위</li>
            <li>나. 다른 이용자의 계좌번호 또는 비밀번호를 이용하여 금전을 인출하거나 이체하는 행위</li>
            <li>다. 전자금융거래 서비스 이용 과정에서 부정한 방법으로 획득한 정보를 이용하여 거래를 하는 행위</li>
        </ul>
        <br>2. 이용자는 회사의 안전한 전자금융거래 서비스를 위하여 다음 각 호의 의무를 준수해야 합니다.
        <ul>
            <li>가. 비밀번호의 유지 및 변경</li>
            <li>나. 이용자 본인의 사고로 인한 손실에 대한 책임</li>
            <li>다. 거래내역의 확인</li>
        </ul>
        <br>

        <h3>제6조 (회사의 책임)</h3>
        <p>회사는 제3자가 이용자의 계좌번호 및 비밀번호를 이용하여 발생한 손해에 대하여 책임을 지지 않습니다.</p>
    </div>

    <br>

    <label for="agreeSite" class="agreeLabel" style="display: flex;align-items: center;">
        <input type="checkbox" id="agreeSite" name="agree" value="agreeSite"/>
        <h2 style="font-weight: bold; color: black">사이트 이용약관 동의</h2>
    </label>

    <div class="box">

        <h3>제1조 (목적)</h3>
        <p>본 약관은 Kicketing (이하 '사이트'라 함)에서 제공하는 서비스 이용과 관련하여 회원과 사이트 운영자간의 권리, 의무 및 책임사항을 규정합니다.</p>

        <h3>제2조 (약관의 효력 및 변경)</h3>
        <p>1. 본 약관은 회원가입 시 회원에게 공지하고 동의를 받음으로써 효력을 발생합니다.</p>
        <p>2. 사이트 운영자는 필요한 경우 약관을 변경할 수 있으며, 변경된 약관은 사이트에 공지함으로써 효력을 발생합니다.</p>

        <h3>제3조 (회원가입)</h3>
        <p>1. 사이트의 회원이 되기 위해서는 사이트가 요구하는 개인정보를 제공하여야 합니다.</p>
        <p>2. 회원가입 시 제공하는 정보는 정확하고 실명성이 있어야 합니다. 회원은 자신의 정보를 소중히 관리하여야 하며, 타인의 정보를 도용하여 회원가입을 할 경우 서비스 이용이 제한될 수 있습니다.</p>

        <h3>제4조 (서비스의 제공)</h3>
        <p>1. 사이트는 회원에게 다양한 이벤트 및 티켓 구매 서비스를 제공합니다.</p>
        <p>2. 서비스 이용 중 발생하는 회원의 개인정보는 개인정보 보호 정책에 따라 관리됩니다.</p>

        <h3>제5조 (회원의 의무)</h3>
        <p>1. 회원은 본인의 ID와 비밀번호를 관리하여야 하며, 타인에게 양도하거나 대여할 수 없습니다.</p>
        <p>2. 회원은 사이트를 이용함에 있어 다음 각 호의 행위를 해서는 안됩니다.
        <ul>
            <li>가. 타인의 개인정보를 부정하게 사용하는 행위</li>
            <li>나. 사이트의 운영을 방해하는 행위</li>
            <li>다. 법률에 위반되는 행위</li>
        </ul>

        <h3>제6조 (회원 이름 관리)</h3>
        <p>1. 회원가입 시 입력한 이름과 티켓 구매자의 본명이 반드시 일치하여야 합니다.</p>
        <p>2. 본 사이트 회원가입이 아닌 구글, 카카오 로그인 시에는 1회에 한하여 이름을 변경할 기회가 주어집니다.</p>
        <p>3. 회원의 이름과 현장에서 확인한 이름이 다를 경우, 환불 절대 불가 및 현장 입장이 제한될 수 있음을 동의합니다.</p>
    </div>
    <br>
    <br>
    <button class="blue-button" on:click={checkAgreement} >동의 및 회원가입 진행</button>
</main>