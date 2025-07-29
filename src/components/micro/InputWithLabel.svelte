<script>
  import Input from "./Input.svelte";

  let { labelContent, name, placeholder = "", required, type, value = $bindable(), accept = "", onChange = (() =>{}) } = $props();
</script>

<label for={name + "input"}>{labelContent}</label>
<Input {type} {name} id={name + "input"} {placeholder} {required} {accept} bind:value onChange={onChange} />
