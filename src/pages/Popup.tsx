import { Helmet } from "react-helmet";

import useToggleDarkMode from "../hooks/useToggleDarkMode";
import CopyToClipboardButton from "../components/CopyToClipboardButton";
import GetTicketWithChrome from "../utils/GetTicketWithChrome";

const Popup = ({ manifest }: any) => {
  const { issueTitle, issueID, issueURL } = GetTicketWithChrome();
  const [newTheme, setTheme] = useToggleDarkMode();

  return (
    <>
      <Helmet>
        <title>{manifest?.name}</title>
      </Helmet>
      <div className="app-popup dark:bg-gray-900 dark:text-gray-300">
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
          <h2 className="mb-2">
            <span className="align-middle">Selected issue:</span>{" "}
            {issueID && issueURL ? (
              <a
                href={issueURL}
                className="text-blue-600 underlined font-semibold"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="align-middle text-sm mr-1">{issueID}</span>
                <svg
                  className="w-4 h-4 inline-block"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </a>
            ) : (
              <span className="text-gray-500 align-middle">None</span>
            )}
          </h2>
          <div className="mb-4">
            <CopyToClipboardButton
              value={issueID}
              disabled={!issueID}
              initialText={`Copy ID`}
              endCopyText={`Copied!`}
              className={`block w-full`}
            />
          </div>
          <div className="mb-4">
            <CopyToClipboardButton
              value={issueTitle}
              disabled={!issueTitle}
              initialText={`Copy title`}
              endCopyText={`Copied!`}
              className={`block w-full`}
            />
          </div>
          <div className="mb-4">
            <CopyToClipboardButton
              value={issueURL}
              disabled={!issueURL}
              initialText={`Copy link`}
              endCopyText={`Copied!`}
              className={`block w-full`}
            />
          </div>
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
                onClick={() => setTheme(newTheme)}
                aria-label="Toggle dark mode"
              >
                {newTheme !== "dark" ? (
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Popup;
