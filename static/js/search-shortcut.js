document.addEventListener("keydown", (event) => {
  // Ignore when typing in input fields or editable elements
  if (
    event.target instanceof HTMLElement &&
    (event.target.isContentEditable ||
      ["INPUT", "TEXTAREA", "SELECT"].includes(event.target.tagName))
  ) {
    return;
  }

  if (event.key === "/") {
    event.preventDefault();
    document.getElementById("search-input")?.focus();
  }
});