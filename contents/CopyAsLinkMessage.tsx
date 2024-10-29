import { notification } from 'antd';
import icon32 from 'data-base64:~assets/icon-32.png';
import { useEffect, useState } from 'react';

import { copyTextAsHtml } from '~features/copy-text-as-html';
import { useSelectionListener } from '~features/useSelectionListener';

const CopyAsLinkMessage = () => {
  const { position, selectedText } = useSelectionListener();
  const [iconVisible, setIconVisible] = useState(true);
  const [api, contextHolder] = notification.useNotification({
    duration: 5,
    placement: 'topLeft',
  });

  const shouldRenderIcon = position && iconVisible;

  const onClickIcon = async () => {
    const CopiedAnchor = await copyTextAsHtml(selectedText);
    setIconVisible(false);
    api.info({
      message: <>Copied {CopiedAnchor}</>,
    });
  };

  useEffect(() => {
    setIconVisible(true);
  }, [position]);

  return (
    <>
      {contextHolder}
      {shouldRenderIcon && (
        <span
          onClick={onClickIcon}
          title="copy as link"
          style={{
            position: 'absolute',
            top: position.y,
            left: position.x,
            width: '16px',
            height: '16px',
            cursor: 'pointer',
          }}>
          <img src={icon32} alt="copy as link" style={{ width: '100%' }} />
        </span>
      )}
    </>
  );
};

export default CopyAsLinkMessage;
