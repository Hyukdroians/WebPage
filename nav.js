document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll(".frame .div");
  const currentPath = window.location.pathname.replace(/\/$/, '');

  links.forEach(link => {
    const href = link.getAttribute("href").replace(/\/$/, ''); 
    if (currentPath === href || currentPath.startsWith(href + "/")) {
      link.classList.add("active");
    }
  });
});
