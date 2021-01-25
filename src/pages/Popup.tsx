import React from "react";
import { Helmet } from "react-helmet";

import CopyToClipboardButton from "../components/CopyToClipboardButton";

const Popup = ({ manifest }: any) => {
  const [ticket, setTicket] = React.useState({
    title: "",
    ID: "",
    URL: "",
  });

  // access current Jira web page DOM
  const contentDOM = () => {
    const ticket: any = {};

    const jiraBaseURL = document.location.origin;

    // Jira selected issue
    const $ticketSummary = document.getElementById("summary-val"); // issue title
    const $issueElement: any = document.getElementById("issuekey-val"); // issue ID and URL
    const $issueLink = $issueElement?.childNodes[0]; // issue URL; [0] -> <a>

    ticket.title = $ticketSummary?.innerText;
    ticket.ID = $issueLink?.innerText;
    ticket.URL = $issueLink
      ? `${jiraBaseURL}${$issueLink?.getAttribute("href")}` // if issue link -> concat base url & issue
      : undefined;

    // console.log(ticket);
    return ticket;
  };

  React.useEffect(() => {
    const getCurrentTab = () => {
      if (typeof chrome.tabs !== "undefined") {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
          // console.log(tabs);
          chrome.tabs.executeScript(
            { code: `(${contentDOM})();` },
            (results) => {
              const ticket = results[0];
              const { ID, title, URL } = ticket;

              setTicket({
                ID,
                title,
                URL,
              });
            }
          );
        });
      }
    };

    getCurrentTab();
  }, []);

  return (
    <>
      <Helmet>
        <title>{manifest?.name}</title>
      </Helmet>
      <div className="app-popup">
        <div className="py-4 px-4 mb-6">
          <h1 className="text-lg mb-4">{manifest?.name}</h1>
          <div className="mb-4">
            <CopyToClipboardButton
              value={ticket.ID}
              disabled={!ticket.ID}
              initialText={`Copy ticket ID`}
              endCopyText={`Copied!`}
              className={`w-full py-2 px-4 rounded-md bg-gray-300 text-sm w-full block text-center ${
                ticket.ID
                  ? "hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  : ""
              }`}
            />
          </div>
          <div className="mb-4">
            <CopyToClipboardButton
              value={ticket.title}
              disabled={!ticket.title}
              initialText={`Copy ticket title`}
              endCopyText={`Copied!`}
              className={`w-full py-2 px-4 rounded-md bg-gray-300 text-sm w-full block text-center ${
                ticket.title
                  ? "hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  : ""
              }`}
            />
          </div>
          <div className="mb-4">
            <CopyToClipboardButton
              value={ticket.URL}
              disabled={!ticket.URL}
              initialText={`Copy ticket link`}
              endCopyText={`Copied!`}
              className={`w-full py-2 px-4 rounded-md bg-gray-300 text-sm w-full block text-center ${
                ticket.URL
                  ? "hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  : ""
              }`}
            />
          </div>
        </div>
        <div className="absolute left-0 right-0 bottom-0 bg-gray-100 border-top py-2 px-4">
          <p className="text-xs text-gray-500">
            <span>Version {manifest?.version}</span>
          </p>
        </div>
      </div>
    </>
  );
};

export default Popup;
