<script>
  document.getElementById("email-signup-form").addEventListener("submit", e => {
    e.preventDefault();
    requireConsent(() => {
      window.location.href = "/dashboard";
    });
  });

  document.querySelectorAll("[data-provider]").forEach(btn => {
    btn.addEventListener("click", () => {
      requireConsent(() => {
        window.location.href = "/dashboard";
      });
    });
  });
</script>
