<script>
    import { onMount } from "svelte";

    let code, state;

    onMount(() => {
        const searchParams = new URLSearchParams(window.location.search);
        code = searchParams.get("code");
        state = searchParams.get("state");

        doNaverOauthLogin(code, state);
    });

    async function doNaverOauthLogin(code, state1) {
        const data = {
            authCode: code,
            state: state1
        };

        try {
            console.log(data)
            const response = await fetch(
                "http://localhost:8080/api/oauth/naver",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                },
            );

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            const responseData = await response.json();
            console.log(responseData);
        } catch (error) {
            console.error(
                "There was a problem with the fetch operation:",
                error,
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
