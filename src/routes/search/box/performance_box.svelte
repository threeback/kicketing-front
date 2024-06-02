<script>
    import {goto} from "$app/navigation";
    import { endpoints } from "$lib/api";

    export let performance;

    const handleClick = () => {
        goto(`/goods?performance=${performance.id}`);
    }
</script>

<div class="performance-card" on:click={handleClick} style="height: 500px">
    <div class="performance-poster">
        <img src="{performance.imageUrl}" alt="{performance.name}" class="performance-image"/>
    </div>
    <div class="performance-info">
        <p class="performance-title">{performance.name}</p>
        <p class="performance-genre">장르: {performance.genre}</p>
        <p class="performance-place">{performance.placeName} {performance.placeHall}</p>
        <p class="performance-date">{performance.startDate} ~ {performance.endDate}</p>
    </div>
</div>

<style>
    .performance-card {
        background: #ffffff;
        border-radius: 10px;
        padding: 20px;
        margin: 10px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        transition: transform 0.2s;
        width: calc(30% - 10px);
        box-sizing: border-box;
        cursor: pointer;
    }

    .performance-card:hover {
        transform: scale(1.02);
    }

    .performance-poster {
        text-align: center;
        margin-bottom: 15px;
    }

    .performance-image {
        border-radius: 10px;
        max-width: 100%;
        height: auto;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }

    .performance-info {
        text-align: center;
    }

    .performance-title {
        font-size: 1.2rem;
        font-weight: bold;
        margin: 0;
        color: #333;
    }

    .performance-genre,
    .performance-place,
    .performance-date {
        margin: 5px 0;
        color: #555;
    }

    .performance-genre {
        font-size: 1rem;
        font-weight: 500;
    }

    .performance-place,
    .performance-date {
        font-size: 0.875rem;
        font-weight: 400;
    }
</style>
