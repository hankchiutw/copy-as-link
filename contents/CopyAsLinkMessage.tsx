import styleText from 'data-text:./CopyAsLinkMessage.module.css';

import { useCopyListener } from '~features/useCopyListener';

import * as style from './CopyAsLinkMessage.module.css';

export const getStyle = () => {
  const style = document.createElement('style');
  style.textContent = styleText;
  return style;
};

const CopyAsLinkMessage = () => {
  const { hasCopied, CopiedAnchor } = useCopyListener();

  return hasCopied ? (
    <div className={style.wrapper}>Copied&nbsp;{CopiedAnchor}</div>
  ) : (
    ''
  );
};

export default CopyAsLinkMessage;
