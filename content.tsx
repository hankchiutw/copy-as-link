import { useEffect, useState } from 'react';

const copyTextAsHtml = async (textToCopy: string) => {
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
  } catch (error) {
    console.log(`Fail to copy "${textToCopy}" as link to ${pageUrl}: `, error);
  }
};

const useCopyListener = () => {
  const [textToCopy, setTextToCopy] = useState('');

  useEffect(() => {
    const copyHandler = async (event: ClipboardEvent) => {
      // TODO: To detect selecting a link, recursively search parentElement until textContent changed
      setTextToCopy(window.getSelection().toString());
      event.preventDefault();
    };
    document.addEventListener('copy', copyHandler);
    return () => document.removeEventListener('copy', copyHandler);
  }, []);

  const pageUrl = window.location.href;
  copyTextAsHtml(textToCopy);
  const CopiedAnchor = textToCopy ? <a href={pageUrl}>{textToCopy}</a> : '';

  return { hasCopied: Boolean(textToCopy), CopiedAnchor };
};

const CopyAsLinkMessage = () => {
  const { hasCopied, CopiedAnchor } = useCopyListener();
  const message = hasCopied ? <>Copied {CopiedAnchor}</> : '';

  return <div>{message}</div>;
};

export default CopyAsLinkMessage;
