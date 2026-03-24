document.addEventListener("DOMContentLoaded", () => {
  const reveals = document.querySelectorAll("[data-email-user]");
  reveals.forEach((el) => {
    el.addEventListener("click", (event) => {
      const revealed = el.getAttribute("data-revealed") === "true";
      if (revealed) return;

      if (el.tagName.toLowerCase() === "a") {
        event.preventDefault();
      }

      const user = el.getAttribute("data-email-user");
      const domain = el.getAttribute("data-email-domain");
      const tld = el.getAttribute("data-email-tld");
      if (!user || !domain || !tld) return;

      const email = `${user}@${domain}.${tld}`;
      el.textContent = email;
      el.setAttribute("data-revealed", "true");

      if (el.tagName.toLowerCase() === "a") {
        el.setAttribute("href", `mailto:${email}`);
      }
    });
  });

  const fishStage = document.querySelector(".fish-stage");
  if (fishStage && "IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            fishStage.classList.add("is-active");
          }
        });
      },
      { threshold: 0.4 }
    );
    observer.observe(fishStage);
  } else if (fishStage) {
    fishStage.classList.add("is-active");
  }
});
