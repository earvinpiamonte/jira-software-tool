import React from 'react';

import { Helmet } from 'react-helmet';
import { CogIcon, ExternalLinkIcon } from '@heroicons/react/solid';

import useTicketWithChrome from '../hooks/useTicketWithChrome';

import {
  CLIPBOARD_ITEMS_STORAGE_KEY,
  DEFAULT_CLIPBOARD_ITEM,
} from '../utils/Constants';
import { chromeStorageGet } from '../utils/ChromeStorage';

import CopyToClipboardButton from '../components/CopyToClipboardButton';

const Popup = ({ manifest }: any) => {
  const { issueTitle, issueID, issueURL } = useTicketWithChrome();
  const [customButton, setCustomButton] = React.useState({
    label: '',
    value: '',
  });

  const retrieveClipboardItems = async () => {
    const clipboardItems: any = await chromeStorageGet(
      CLIPBOARD_ITEMS_STORAGE_KEY,
      [DEFAULT_CLIPBOARD_ITEM]
    );

    const [firstItem] = clipboardItems;
    const { label, value } = firstItem;

    let parsedValue = value;
    parsedValue = parsedValue.replaceAll('[id]', issueID);
    parsedValue = parsedValue.replaceAll('[title]', issueTitle);
    parsedValue = parsedValue.replaceAll('[url]', issueURL);

    setCustomButton({ label, value: parsedValue });
  };

  React.useEffect(() => {
    retrieveClipboardItems();
  }, [issueTitle, issueID, issueURL]);

  return (
    <>
      <Helmet>
        <title>{manifest?.name}</title>
      </Helmet>
      <div className="app-popup dark:bg-gray-900 dark:text-gray-300 text-base">
        <div className="p-4">
          <div className="mb-4">
            <img
              src={`${process.env.PUBLIC_URL}/images/32.png`}
              className="bg-white border rounded mr-2 inline-block"
              alt="Jira Sotware logo"
              draggable={false}
            />
            <h1 className="text-lg inline-block align-middle dark:text-white">
              {manifest?.name}
            </h1>
          </div>
          <h2 className="mb-2 text-sm">
            <span className="align-middle">Selected issue:</span>{' '}
            {issueID && issueURL ? (
              <a
                href={issueURL}
                className="text-blue-600 underlined font-semibold"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="align-middle mr-1">{issueID}</span>
                <ExternalLinkIcon className="w-4 h-4 inline-block" />
              </a>
            ) : (
              <span className="text-gray-500 align-middle">None</span>
            )}
          </h2>
          <div className="mb-4">
            <CopyToClipboardButton
              value={issueID}
              initialText={`Copy ID`}
              endCopyText={`Copied`}
            />
          </div>
          <div className="mb-4">
            <CopyToClipboardButton
              value={issueTitle}
              initialText={`Copy title`}
              endCopyText={`Copied`}
            />
          </div>
          <div className="mb-4">
            <CopyToClipboardButton
              value={issueURL}
              initialText={`Copy link`}
              endCopyText={`Copied`}
            />
          </div>
          {customButton.label && (
            <div className="mb-4">
              <CopyToClipboardButton
                value={issueID && customButton.value}
                initialText={`Copy ${customButton.label}`}
                endCopyText={`Copied`}
              />
            </div>
          )}
        </div>
        <div className="bg-gray-100 border-top py-2 px-4 dark:bg-gray-800 dark:text-gray-300">
          <div className="flex">
            <div className="flex flex-1 items-center">
              <span className="text-xs text-gray-500">
                <span>Version {manifest?.version}</span>
              </span>
            </div>
            <div className="flex flex-1 items-center justify-end">
              <button
                className="py-1 px-2 text-sm text-center rounded-md bg-gray-300 dark:bg-gray-700 dark:text-gray-300 text-sm hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:hover:bg-gray-600 dark:hover:text-white"
                aria-label="Toggle dark mode"
                onClick={() => {
                  chrome.runtime.openOptionsPage
                    ? chrome.runtime.openOptionsPage()
                    : window.open(
                        chrome.runtime.getURL('index.html?page=Options')
                      );
                }}
              >
                <CogIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Popup;
