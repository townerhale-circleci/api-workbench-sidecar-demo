// Simulates an Electron-style app boot: the splash loader stays up while the
// app initializes, then the sign-in screen becomes interactive. The boot takes
// 800-1200ms — comfortably realistic, and reliably longer than any
// too-aggressive timeout a test helper might use.
const BOOT_MS = 800 + Math.floor(Math.random() * 400);

const splash = document.getElementById('splash');
const signInScreen = document.getElementById('sign-in-screen');
const workbench = document.getElementById('workbench');

setTimeout(() => {
  splash.hidden = true;
  signInScreen.hidden = false;
}, BOOT_MS);

document.getElementById('sign-in-button').addEventListener('click', () => {
  signInScreen.hidden = true;
  workbench.hidden = false;
});

const newRequestButton = document.querySelector('[data-testid="new-request-button"]');
const newRequestMenu = document.getElementById('new-request-menu');
newRequestButton.addEventListener('click', () => {
  newRequestMenu.hidden = !newRequestMenu.hidden;
});

const editor = document.getElementById('request-editor');
const editorTitle = document.querySelector('[data-testid="request-editor-title"]');
const emptyStateMessage = document.querySelector('[data-testid="empty-state-message"]');

function openRequest(kind, emptyMessage) {
  newRequestMenu.hidden = true;
  editor.hidden = false;
  editorTitle.textContent = kind;
  emptyStateMessage.textContent = emptyMessage;
}

document.querySelector('[data-testid="new-socket-io-request"]').addEventListener('click', () => {
  openRequest('Socket.IO Request', 'Connect to a Socket.IO server to start sending events.');
});

document.querySelector('[data-testid="new-mqtt-request"]').addEventListener('click', () => {
  openRequest('MQTT Request', 'Connect to an MQTT broker to publish and subscribe to topics.');
});

document.querySelector('[data-testid="new-http-request"]').addEventListener('click', () => {
  openRequest('HTTP Request', 'Enter a URL to send a request.');
});

const urlInput = document.querySelector('[data-testid="request-url-input"]');
const validation = document.querySelector('[data-testid="url-validation-message"]');
urlInput.addEventListener('input', () => {
  const value = urlInput.value.trim();
  if (!value) {
    validation.hidden = true;
    return;
  }
  const valid = /^(https?|mqtt|ws):\/\/.+/.test(value);
  validation.hidden = false;
  validation.textContent = valid ? 'Looks good' : 'URL must include a protocol (http://, mqtt://, ws://)';
  validation.dataset.state = valid ? 'valid' : 'invalid';
});
