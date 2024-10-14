import { useCopyListener } from './useCopyListener';

const CopyAsLinkMessage = () => {
  const { hasCopied, CopiedAnchor } = useCopyListener();
  const message = hasCopied ? <>Copied {CopiedAnchor}</> : '';

  return <div>{message}</div>;
};

export default CopyAsLinkMessage;
