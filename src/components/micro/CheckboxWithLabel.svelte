<script>
  let { labelContent, name, checked = $bindable() } = $props();
</script>

<label for={name + "input"}>{labelContent}</label>
<input type="checkbox" {name} id={name + "input"} bind:checked />
