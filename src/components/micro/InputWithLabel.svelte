<script>
  import Input from "./Input.svelte";

  const { labelContent, name, placeholder = "", required, type, defaultValue = "", accept = "" } = $props();

  const value = $state({ current: defaultValue });
</script>

<label for={name + "input"}>{labelContent}</label>
<Input {type} {name} id={name + "input"} {placeholder} {required} {accept} defaultValue={value.current} />
