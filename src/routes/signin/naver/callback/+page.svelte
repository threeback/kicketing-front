<script>
    import { endpoints } from "$lib/api";
    import {onMount} from "svelte";
    import { goto } from "$app/navigation";

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
                    body: JSON.stringify(data),
                    credentials: "include",
                },
            );

            if (!response.ok) {
                throw new Error("Network response was not ok" + response.error);
            }

            // const responseData = await response.json();
            response.text().then((refresh) => {
                let accessToken = response.headers.get("Authorization");
                console.log("refresh: " + refresh)
                console.log("access: " + accessToken)
            })

            await goto("/");
        } catch (error) {
            console.error(
                "There was a problem with the fetch operation:",
                error.message,
            );
        }
    }
</script>

<main>
    {#if code}
        <p>Code: {code}</p>
    {:else}
        <p>No code found in the URL</p>
    {/if}

    {#if state}
        <p>State: {state}</p>
    {/if}
</main>
