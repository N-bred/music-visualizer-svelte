<script>
  const { ariaLabel = "button", content, onclick = (()=>{}), type = null } = $props();
</script>

<button aria-label={ariaLabel} onclick={onclick} {type}>
  {content}
</button>
