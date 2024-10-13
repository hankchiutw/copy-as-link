export {};

document.addEventListener('copy', async (event) => {
  // TODO: To detect selecting a link, recursively search parentElement until textContent changed
  const textToCopy = window.getSelection().toString();
  const pageUrl = window.location.href;
  const htmlToCopy = `<a href="${pageUrl}">${textToCopy}</a>`;

  const clipboardItem = new ClipboardItem({
    'text/plain': new Blob([textToCopy], { type: 'text/plain' }),
    'text/html': new Blob([htmlToCopy], { type: 'text/html' }),
  });
  try {
    await navigator.clipboard.write([clipboardItem]);
    event.preventDefault();
    console.log(`"${textToCopy}" is copied as link to ${pageUrl}`);
  } catch (error) {
    console.log(`Fail to copy "${textToCopy}" as link to ${pageUrl}: `, error);
  }
});
