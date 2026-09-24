document.addEventListener("DOMContentLoaded", () => {
  const copyIconImg = '<i class="fa-regular fa-copy"></i>';
  const checkIconImg = `<i class="fa-solid fa-check"></i>`;

  document.querySelectorAll(".blog-body pre").forEach((preElement) => {
    preElement.style.position = "relative";

    // Make the button xs and position it in the top-right corner.
    const copyButton = document.createElement("button");
    copyButton.className = "btn btn-xs btn-square btn-ghost absolute top-2 right-2 text-white/60 hover:text-white bg-black/20 hover:bg-black/40 border-0 transition-all duration-200";
    copyButton.innerHTML = copyIconImg;
    copyButton.setAttribute("aria-label", "Copy code");

    copyButton.addEventListener("click", async () => {
      const codeText = preElement.querySelector("code").innerText;
      try {
        await navigator.clipboard.writeText(codeText);
        
        // Change the icon to a checkmark and apply the daisyUI success color
        copyButton.innerHTML = checkIconImg;
        copyButton.classList.add("btn-success", "text-success-content");
        copyButton.classList.remove("text-white/60");
        
        // Revert to the original icon after 2 seconds.
        setTimeout(() => {
          copyButton.innerHTML = copyIconImg;
          copyButton.classList.remove("btn-success", "text-success-content");
          copyButton.classList.add("text-white/60");
        }, 2000);
      } catch (err) {
        console.error("Failed to copy code: ", err);
      }
    });

    preElement.appendChild(copyButton);
  });
});