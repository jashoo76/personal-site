<script lang="ts">
  type Theme = "light" | "dark" | "system";

  let theme: Theme = $state("system");

  function apply(value: Theme) {
    theme = value;
    const root = document.documentElement;
    if (value === "system") {
      root.removeAttribute("data-theme");
      localStorage.removeItem("theme");
    } else {
      root.setAttribute("data-theme", value);
      localStorage.setItem("theme", value);
    }
  }

  function cycle() {
    const order: Theme[] = ["system", "dark", "light"];
    const next = order[(order.indexOf(theme) + 1) % order.length];
    apply(next);
  }

  $effect(() => {
    const stored = localStorage.getItem("theme");
    if (stored === "light" || stored === "dark") {
      theme = stored;
      document.documentElement.setAttribute("data-theme", stored);
    }
  });
</script>

<button
  type="button"
  class="theme-toggle"
  onclick={cycle}
  aria-label="Cycle color theme"
  title="Theme: system → dark → light"
>
  theme: {theme}
</button>
