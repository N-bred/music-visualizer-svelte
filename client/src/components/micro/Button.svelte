<script>
  const { ariaLabel = "button", children, className = "", onClick = (() => {}), type = null } = $props();
</script>

<button aria-label={ariaLabel} class={className} onclick={onClick} {type}>
  {@render children()}
</button>
