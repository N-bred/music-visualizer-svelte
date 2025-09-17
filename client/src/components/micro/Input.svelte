<script>
  let { id, name, min = 0, max = 0, step = 0, type, value = $bindable(), placeholder = "", required, accept = "", onChange = (() => {}), onInput=(()=>{}) } = $props();

</script>

<input {id} {type} {name} {min} {max} {step} {placeholder} {required} {accept} onchange={onChange} oninput={onInput} bind:value={value} />
