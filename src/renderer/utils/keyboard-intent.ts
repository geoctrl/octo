function keyboardIntentClick(): void {
  if (document.body.classList.contains("keyboard-intent")) {
    document.body.classList.remove("keyboard-intent");
  }
}

function keyboardIntentKeydown(): void {
  if (!document.body.classList.contains("keyboard-intent")) {
    document.body.classList.add("keyboard-intent");
  }
}

document.addEventListener("click", keyboardIntentClick);
document.addEventListener("keydown", () => {
  keyboardIntentKeydown();
});
