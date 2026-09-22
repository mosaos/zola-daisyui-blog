document.addEventListener("DOMContentLoaded", () => {
  // 1. コピー用のアイコン（SVG）
  const copyIconSvg = `<svg xmlns="http://w3.org" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376A8.965 8.965 0 0 0 12 12.75a8.965 8.965 0 0 0-3.75 3.376m7.5 0V14.25m-7.5 3l-1.5 2.124M11.25 18v-4.658a1.82 1.82 0 0 0-.543-1.287l-1.57-1.57" /></svg>`;
  
  // 2. 成功時のチェックマークアイコン（SVG）
  const checkIconSvg = `<svg xmlns="http://w3.org" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4"><path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" /></svg>`;

  document.querySelectorAll(".blog-body pre").forEach((preElement) => {
    preElement.style.position = "relative";

    // ボタンを極小（btn-squareで正方形）にして右上に配置
    const copyButton = document.createElement("button");
    copyButton.className = "btn btn-xs btn-square btn-ghost absolute top-2 right-2 text-white/60 hover:text-white bg-black/20 hover:bg-black/40 border-0 transition-all duration-200";
    copyButton.innerHTML = copyIconSvg;
    copyButton.setAttribute("aria-label", "Copy code");

    copyButton.addEventListener("click", async () => {
      const codeText = preElement.querySelector("code").innerText;
      try {
        await navigator.clipboard.writeText(codeText);
        
        // アイコンをチェックマークに変更し、daisyUIの成功色をふわっと当てる
        copyButton.innerHTML = checkIconSvg;
        copyButton.classList.add("btn-success", "text-success-content");
        copyButton.classList.remove("text-white/60");
        
        // 2秒後に元のアイコンに戻す
        setTimeout(() => {
          copyButton.innerHTML = copyIconSvg;
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