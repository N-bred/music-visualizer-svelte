<script>
  const { labelContent, name, placeholder = "", required, type, defaultValue = "", accept="" } = $props();
  const value = $state({ current: defaultValue });
</script>

<label for={name + "input"}>{labelContent}</label>
<input bind:value={value.current} {type} {name} id={name + "input"} {placeholder} {required} {accept} />
