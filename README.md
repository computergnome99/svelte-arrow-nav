# Svelte Arrow Nav

Convert an area to "Arrow Key"-based navigation.

Simply apply the included "Svelte Action" to your element:

```svelte
<script>
    import { arrowNav } from "@calvin/svelte-arrow-nav";
</script>

<ul use:arrowNav>
    <li><a href="#1"> Link 1 </a></li>
    <li><a href="#2"> Link 2 </a></li>
    <li><a href="#3"> Link 3 </a></li>
</ul>
```

You can also specify the selected `index` to have the Svelte Action default to specific index (instead of the last focused element).

```svelte
<script>
    import { arrowNav } from "@calvin/svelte-arrow-nav";

    let selected = 0;
</script>

<ul use:arrowNav={selected}>
    ...
</ul>
```

