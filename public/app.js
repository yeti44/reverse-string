const input = document.getElementById("input");
const output = document.getElementById("output");
const button = document.getElementById("reverse-btn");

async function reverse() {
  const text = input.value;
  output.textContent = "";

  try {
    const res = await fetch(`/api/reverse?text=${encodeURIComponent(text)}`);
    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      output.textContent = `Error: ${body.error ?? res.statusText}`;
      return;
    }
    const data = await res.json();
    output.textContent = data.reversed;
  } catch (err) {
    output.textContent = `Request failed: ${err instanceof Error ? err.message : String(err)}`;
  }
}

button.addEventListener("click", reverse);
input.addEventListener("keydown", (event) => {
  if ((event.metaKey || event.ctrlKey) && event.key === "Enter") {
    reverse();
  }
});
