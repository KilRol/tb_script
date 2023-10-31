export function getGridTableButton(expand) {
  const show_btn = document.createElement("div");
  show_btn.classList = "results__item-more-wrap";

  const show_btn_link = document.createElement("a");
  show_btn_link.classList = "results__item-more";
  show_btn_link.href = "javascript:void(0);";
  show_btn_link.textContent = "Результаты матчей";

  show_btn.onclick = expand;

  show_btn.appendChild(show_btn_link);
  return show_btn;
}
