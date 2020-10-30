<script>
    import NavBar from './NavBar.svelte'
    export let name;
</script>

<style>
    body {
        padding: 0px;
    }

    main {
        text-align: center;
        max-width: 240px;
        margin: 0 auto;
    }

    h1 {
        color: #ff3e00;
        text-transform: uppercase;
        font-size: 4em;
        font-weight: 100;
    }

    @media (min-width: 640px) {
        main {
            max-width: none;
        }
    }
</style>

<main>
    <NavBar />
</main>
