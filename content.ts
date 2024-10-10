export {};

document.addEventListener('copy', (event) => {
  // TODO: To detect selecting a link, recursively search parentElement until textContent changed
  const selectedText = window.getSelection().toString();
  const pageUrl = window.location.href;

  // Prevent the default copy behavior and set custom clipboard content
  event.clipboardData.setData('text/plain', selectedText);
  event.clipboardData.setData(
    'text/html',
    `<a href="${pageUrl}">${selectedText}</a>`,
  );
  event.preventDefault();
  console.log(`${selectedText} is copied as link to ${pageUrl}`);
});
