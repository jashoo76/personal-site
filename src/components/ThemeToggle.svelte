<script lang="ts">
  type Theme = "light" | "dark";

  let theme: Theme = $state("light");

  const labels: Record<Theme, string> = {
    dark: "Dark theme. Click for light mode.",
    light: "Light theme. Click for dark theme.",
  };

  function apply(value: Theme) {
    theme = value;
    document.documentElement.setAttribute("data-theme", value);
    try {
      localStorage.setItem("theme", value);
    } catch {}
  }

  function cycle() {
    apply(theme === "light" ? "dark" : "light");
  }
</script>

<button
  type="button"
  class="theme-toggle"
  onclick={cycle}
  aria-label={labels[theme]}
  title={labels[theme]}
>
  <svg class="theme-toggle__icon theme-toggle__icon--light" viewBox="0 0 24 24" aria-hidden="true">
    <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="1.5" />
    <path
      d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
    />
  </svg>
  <svg class="theme-toggle__icon theme-toggle__icon--dark" viewBox="0 0 24 24" aria-hidden="true">
    <path
      d="M12 3a7 7 0 1 0 7 7c0-.35-.03-.69-.08-1.02A5.5 5.5 0 0 1 12 3z"
      fill="none"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linejoin="round"
    />
  </svg>
</button>

<style>
  .theme-toggle__icon--dark {
    display: none;
  }
  :global(html[data-theme="dark"]) .theme-toggle__icon--light {
    display: none;
  }
  :global(html[data-theme="dark"]) .theme-toggle__icon--dark {
    display: block;
  }
</style>