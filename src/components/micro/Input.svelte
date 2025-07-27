<script>
  const { id, name, min = 0, max = 0, step = 0, type, defaultValue = "", placeholder = "", required, accept = "", onChange = (() => {}), onInput=(()=>{}) } = $props();
  const value = $state({ current: defaultValue });
</script>

<input {id} {type} {name} {min} {max} {step} {placeholder} {required} {accept} onchange={onChange} oninput={onInput} bind:value={value.current} />
