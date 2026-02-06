<script>
  const root = document.documentElement;
  const toggle = document.getElementById("themeToggle");

  toggle.onclick = () => {
    const theme = root.dataset.theme === "dark" ? "light" : "dark";
    root.dataset.theme = theme;
    localStorage.setItem("theme", theme);
  };

  const saved = localStorage.getItem("theme");
  if (saved) root.dataset.theme = saved;
</script>
