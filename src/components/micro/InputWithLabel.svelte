<script>
  let {
    labelContent,
    name,
    min = null,
    max = null,
    step = null,
    placeholder = "",
    required,
    type,
    value = $bindable(),
    accept = "",
    onChange = () => {},
  } = $props();
</script>

<label for={name + "input"}>{labelContent}</label>
<input {type} {name} id={name + "input"} {placeholder} {required} {accept} bind:value onchange={(e) => onChange(e)} {min} {max} {step}/>
