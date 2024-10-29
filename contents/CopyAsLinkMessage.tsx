import icon32 from 'data-base64:~assets/icon-32.png';
import { useEffect, useState } from 'react';

import { copyTextAsHtml } from '~features/copy-text-as-html';
import { useSelectionListener } from '~features/useSelectionListener';

const CopyAnchor = ({ onClick, position }) => {
  return (
    <span
      onClick={onClick}
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
  );
};

const CopiedInfo = ({ position }) => {
  const [opacity, setOpacity] = useState(1);
  useEffect(() => {
    const fadeOut = setTimeout(() => {
      setOpacity(0);
    }, 500);

    return () => clearTimeout(fadeOut);
  }, []);

  return (
    <span
      style={{
        position: 'absolute',
        top: position.y,
        left: position.x,
        lineHeight: '12px',
        fontSize: '12px',
        whiteSpace: 'nowrap',
        backgroundColor: '#a3a3a3',
        color: '#4d4d4d',
        borderRadius: '8px',
        padding: '2px 8px',
        fontFamily: 'sans-serif',
        transition: 'opacity 2s ease-in',
        opacity,
      }}>
      copied as link!
    </span>
  );
};

const CopyAsLinkMessage = () => {
  const { position, selectedText } = useSelectionListener();
  const [hintElement, setHintElement] = useState(null);

  const onClickIcon = async () => {
    await copyTextAsHtml(selectedText);
    setHintElement(<CopiedInfo position={position}></CopiedInfo>);
  };

  useEffect(() => {
    if (position) {
      setHintElement(
        <CopyAnchor onClick={onClickIcon} position={position}></CopyAnchor>,
      );
    }
  }, [position]);

  return <>{position && hintElement}</>;
};

export default CopyAsLinkMessage;
