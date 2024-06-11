<script>
  import Container from '$components/container/Container.svelte';
  import ContainerView from '$components/container/ContainerView.svelte';
	import './styles.css';
  import '../app.css';
</script>

<Container>
	<ContainerView>
    <slot></slot>
  </ContainerView>
</Container>
