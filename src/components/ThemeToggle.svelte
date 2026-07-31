<script lang="ts">
  type Theme = "light" | "dark" | "system";

  let theme: Theme = $state("system");

  const labels: Record<Theme, string> = {
    system: "System theme (follows OS). Click for dark mode.",
    dark: "Dark theme. Click for light mode.",
    light: "Light theme. Click for system theme.",
  };

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
  aria-label={labels[theme]}
  title={labels[theme]}
>
  {#if theme === "system"}
    <svg class="theme-toggle__icon" viewBox="0 0 24 24" aria-hidden="true">
      <rect x="3" y="4" width="18" height="12" rx="1.5" fill="none" stroke="currentColor" stroke-width="1.5" />
      <path d="M8 20h8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
      <path d="M12 16v4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
    </svg>
  {:else if theme === "dark"}
    <svg class="theme-toggle__icon" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M12 3a7 7 0 1 0 7 7c0-.35-.03-.69-.08-1.02A5.5 5.5 0 0 1 12 3z"
        fill="none"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linejoin="round"
      />
    </svg>
  {:else}
    <svg class="theme-toggle__icon" viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="1.5" />
      <path
        d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
      />
    </svg>
  {/if}
</button>
