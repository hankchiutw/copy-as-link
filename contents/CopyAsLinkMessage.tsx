import { notification } from 'antd';
import { useEffect } from 'react';

import { useCopyListener } from '~features/useCopyListener';

const CopyAsLinkMessage = () => {
  const { hasCopied, CopiedAnchor } = useCopyListener();

  const [api, contextHolder] = notification.useNotification({
    duration: 5,
    placement: 'topLeft',
  });

  useEffect(() => {
    if (hasCopied) {
      api.info({
        message: <>Copied {CopiedAnchor}</>,
      });
    }
  });

  return <>{contextHolder}</>;
};

export default CopyAsLinkMessage;
