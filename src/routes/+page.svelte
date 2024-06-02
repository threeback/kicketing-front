<script src="https://unpkg.com/swiper/swiper-bundle.min.js">
    import {endpoints} from "$lib/api";
    import {onMount} from "svelte";
    import {writable} from "svelte/store";
    import Search_box from "./search/box/search_box.svelte";
    import Additional_box from "./additional_box.svelte";
    import {fetchPerformances, name} from "$lib/stores/performance.js";

    let performances = writable([]);
    const performanceDetailUrl = "/goods?performance=";

    onMount(async () => {
        try {
            const response = await fetch(endpoints.performances + '/none?dateUnit=month&size=10', {
                method: "GET"
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const result = await response.json();
            performances.set(result.performances);
        } catch (err) {
            console.log(err.message); // 에러 발생 시 에러 메시지 저장
        }
    });

    function handleSearch(event) {
        name.set(event.detail.searchTerm);
        fetchPerformances();
    }
</script>

<style>
    .performance-container {
        margin-left: 10px;
        margin-right: 10px;
    }

    .performance-card {
        margin: 5px;
        box-shadow: 0 0 3px #333;
    }

    .performance-poster {
        width: 100%;
        height: 55%;
        max-width: 100%;
        border-bottom: 1px solid #ccc;
    }

    .performance-info {
        padding: 15px;
        margin: 10px;
    }

    .performance-title {
        font-size: 18px;
        color: #fff;
        font-weight: bold;
        margin-bottom: 5px;
        text-shadow: -1px 0px black, 0px 1px black, 1px 0px black, 0px -1px black;
    }

    .performance-details {
        font-size: 14px;
        color: #fff;
        text-shadow: -1px 0px black, 0px 1px black, 1px 0px black, 0px -1px black;
    }


</style>

<title>Kicketing</title>
<main class="container">
    <Search_box on:search={handleSearch}/>
    <Additional_box />
    <h1 style="color: black; font-weight: bold ">공연 목록</h1>
    <div class="performance-container">
        {#each $performances as performance}
            <div class="performance-card" style="height: 370px">
                <div class="performance-poster">
                    <a href={performanceDetailUrl+performance.simplePerformanceDTO.id}>
                        <img src="{performance.simplePerformanceDTO.imageUrl}" width="300px"
                             alt="{performance.simplePerformanceDTO.name}"/>
                    </a>
                </div>
                <div class="performance-info" style="backdrop-filter: blur(10px);">
                    <a href={performanceDetailUrl+performance.simplePerformanceDTO.id}>
                        <div class="performance-title">{performance.simplePerformanceDTO.name}</div>
                        <div class="performance-details">
                            <p>{performance.placeDTO.name + " " + performance.placeDTO.hall}</p>
                            <p>{performance.simplePerformanceDTO.startDate + " ~ " + performance.simplePerformanceDTO.endDate}</p>
                        </div>
                    </a>
                </div>
            </div>
        {/each}
    </div>
</main>
