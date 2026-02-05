const form = document.getElementById("proxy-form");
const targetInput = document.getElementById("target-url");
const status = document.getElementById("status");
const frame = document.getElementById("preview-frame");
const previewUrl = document.getElementById("preview-url");
const sampleBtn = document.getElementById("sample-btn");
const directBtn = document.getElementById("direct-btn");

const PROXY_BASE = "https://r.jina.ai/http://";
const SAMPLE_URL = "https://roblox.com";

const updateStatus = (message, isError = false) => {
  status.textContent = message;
  status.style.color = isError ? "#c0392b" : "";
};

const normalizeUrl = (value) => {
  if (!value) return null;
  try {
    const url = new URL(value.startsWith("http") ? value : `https://${value}`);
    return url.href;
  } catch (error) {
    return null;
  }
};

const loadProxy = (url) => {
  const normalized = normalizeUrl(url);
  if (!normalized) {
    updateStatus("Please enter a valid URL (include a domain).", true);
    return;
  }

  const proxyUrl = `${PROXY_BASE}${normalized}`;
  frame.src = proxyUrl;
  previewUrl.textContent = normalized;
  updateStatus(
    `Proxying via ${proxyUrl}. Some sites may block iframe previews or only show text.`
  );
};

form.addEventListener("submit", (event) => {
  event.preventDefault();
  loadProxy(targetInput.value.trim());
});

sampleBtn.addEventListener("click", () => {
  targetInput.value = SAMPLE_URL;
  loadProxy(SAMPLE_URL);
});

directBtn.addEventListener("click", () => {
  const normalized = normalizeUrl(targetInput.value.trim());
  if (!normalized) {
    updateStatus("Please enter a valid URL (include a domain).", true);
    return;
  }
  window.open(normalized, "_blank", "noopener,noreferrer");
  updateStatus("Opened the destination directly in a new tab.");
});

updateStatus("Enter a URL to preview it through the relay.");
