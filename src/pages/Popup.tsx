import { Helmet } from "react-helmet";

import CopyToClipboardButton from "../components/CopyToClipboardButton";
import GetTicketWithChrome from "../utils/GetTicketWithChrome";

const Popup = ({ manifest }: any) => {
  const { issueTitle, issueID, issueURL } = GetTicketWithChrome();

  return (
    <>
      <Helmet>
        <title>{manifest?.name}</title>
      </Helmet>
      <div className="app-popup">
        <div className="p-4">
          <div className="mb-4">
            <img
              src={`${process.env.PUBLIC_URL}/images/32.png`}
              className="bg-white border rounded mr-2 inline-block"
              alt="Jira Sotware logo"
              draggable={false}
            />
            <h1 className="text-lg inline-block align-middle">
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
              className={`w-full py-2 px-4 rounded-md bg-gray-300 text-sm w-full block text-center ${
                issueID
                  ? "hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  : ""
              }`}
            />
          </div>
          <div className="mb-4">
            <CopyToClipboardButton
              value={issueTitle}
              disabled={!issueTitle}
              initialText={`Copy title`}
              endCopyText={`Copied!`}
              className={`w-full py-2 px-4 rounded-md bg-gray-300 text-sm w-full block text-center ${
                issueTitle
                  ? "hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  : ""
              }`}
            />
          </div>
          <div className="mb-4">
            <CopyToClipboardButton
              value={issueURL}
              disabled={!issueURL}
              initialText={`Copy link`}
              endCopyText={`Copied!`}
              className={`w-full py-2 px-4 rounded-md bg-gray-300 text-sm w-full block text-center ${
                issueURL
                  ? "hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  : ""
              }`}
            />
          </div>
        </div>
        <div className="bg-gray-100 border-top py-2 px-4">
          <p className="text-xs text-gray-500">
            <span>Version {manifest?.version}</span>
          </p>
        </div>
      </div>
    </>
  );
};

export default Popup;
