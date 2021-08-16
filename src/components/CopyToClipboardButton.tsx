import React from 'react';

import { ClipboardIcon, CheckIcon } from '@heroicons/react/outline';

import Button from '../components/Button';

const CopyToClipboardButton = ({
  value,
  icon,
  initialText,
  endCopyText,
}: {
  value: string;
  initialText: string;
  endCopyText: string;
  icon?: string;
}) => {
  const [copied, setCopied] = React.useState(false);

  React.useEffect(() => {
    if (copied) {
      let id = setTimeout(() => setCopied(false), 1000);
      return () => clearTimeout(id);
    }
  }, [copied]);

  return (
    <Button
      onClick={() => {
        navigator.clipboard.writeText(value);
        setCopied(true);
      }}
      block={true}
      disabled={!value}
    >
      {!icon ? (
        copied ? (
          <CheckIcon className="w-4 h-4 inline-block mr-1 text-green-500" />
        ) : (
          <ClipboardIcon className="w-4 h-4 inline-block mr-1" />
        )
      ) : (
        icon
      )}
      <span className="align-middle text-sm">
        {copied ? endCopyText : initialText}
      </span>
    </Button>
  );
};

export default CopyToClipboardButton;
