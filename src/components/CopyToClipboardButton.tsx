import React from "react";

const CopyToClipboardButton = ({
  value,
  disabled,
  icon,
  initialText,
  endCopyText,
  className,
}: {
  value: string;
  initialText: string;
  endCopyText: string;
  disabled?: boolean;
  icon?: string;
  className?: string;
}) => {
  const [copied, setCopied] = React.useState(false);

  React.useEffect(() => {
    if (copied) {
      let id = setTimeout(() => setCopied(false), 1000);
      return () => clearTimeout(id);
    }
  }, [copied]);

  return (
    <button
      type="button"
      className={`py-2 px-4 text-sm text-center rounded-md bg-gray-300 dark:bg-gray-700 dark:text-gray-300 ${
        disabled
          ? "disabled:opacity-50 cursor-not-allowed"
          : "hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:hover:bg-gray-600 dark:hover:text-white"
      } ${className}`}
      onClick={() => {
        navigator.clipboard.writeText(value);
        setCopied(true);
      }}
      disabled={disabled}
    >
      {!icon ? (
        copied ? (
          <svg
            className="w-4 h-4 inline-block mr-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        ) : (
          <svg
            className="w-4 h-4 inline-block mr-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            />
          </svg>
        )
      ) : (
        icon
      )}
      <span className="align-middle text-sm">
        {copied ? endCopyText : initialText}
      </span>
    </button>
  );
};

export default CopyToClipboardButton;
