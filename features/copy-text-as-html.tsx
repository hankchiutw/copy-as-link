export const copyTextAsHtml = async (textToCopy: string) => {
  if (!textToCopy) return;

  const pageUrl = window.location.href;
  const htmlToCopy = `<a href="${pageUrl}">${textToCopy}</a>`;
  const clipboardItem = new ClipboardItem({
    'text/plain': new Blob([textToCopy], { type: 'text/plain' }),
    'text/html': new Blob([htmlToCopy], { type: 'text/html' }),
  });

  try {
    await navigator.clipboard.write([clipboardItem]);
    console.log(`"${textToCopy}" is copied as link to ${pageUrl}`);
    return <a href={pageUrl}>{textToCopy}</a>;
  } catch (error) {
    console.log(`Fail to copy "${textToCopy}" as link to ${pageUrl}: `, error);
  }
};
