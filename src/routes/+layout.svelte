<script>
	import Header from '../components/container/ContainerHeader.svelte';
  import ContainerFooter from '../components/container/ContainerFooter.svelte';
	import './styles.css';
  import '../app.css';
</script>

<div class="app">
	<Header />

	<main>
		<slot />
	</main>
  <ContainerFooter />
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		max-width: 64rem;
		margin: 0 auto;
		box-sizing: border-box;
	}
</style>
