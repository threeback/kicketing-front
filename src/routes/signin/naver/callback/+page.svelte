<script>
    import { endpoints } from "$lib/api";
    import {onMount} from "svelte";
    import { goto } from "$app/navigation";
    import {setRefreshToken, setLogin, user, getUser} from "$lib/stores/auth.js";

    let code, state;

    onMount(() => {
        const searchParams = new URLSearchParams(window.location.search);
        code = searchParams.get("code");
        state = searchParams.get("state");

        doNaverOauthLogin(code, state);
    });

    async function doNaverOauthLogin(code, state) {
        const data = {
            authCode: code,
            state: state
        };

        try {
            const response = await fetch(endpoints.oauth+"/naver",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                    body: JSON.stringify(data),
                },
            );

            await getUser();

            response.text().then((refreshToken) => {
                setRefreshToken(refreshToken);
                setLogin();
            })

            await goto("/");
        } catch (error) {
            alert("네이버 로그인 실패: " + error.message)
            goto("/signin")
        }
    }
</script>
