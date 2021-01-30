import React from "react";

import { getTicketFromDOM } from "./DOM";

// Get current Chrome tab and return ticket details from DOM
const GetTicketWithChrome = () => {
  const [ticket, setTicket] = React.useState({
    issueTitle: "",
    issueID: "",
    issueURL: "",
  });

  React.useEffect(() => {
    const getCurrentTab = () => {
      if (typeof chrome.tabs !== "undefined") {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
          // console.log(tabs);
          // Get ticket details result from DOM
          chrome.tabs.executeScript(
            { code: `(${getTicketFromDOM})();` },
            (results) => {
              const ticket = results[0];
              const { issueTitle, issueID, issueURL } = ticket;

              setTicket({
                issueTitle,
                issueID,
                issueURL,
              });
            }
          );
        });
      }
    };

    getCurrentTab();
  }, []);

  return ticket;
};

export default GetTicketWithChrome;
