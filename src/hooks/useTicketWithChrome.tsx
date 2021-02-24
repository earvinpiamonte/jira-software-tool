import React from "react";

import { getTicketFromDOM } from "../utils/DOM";

// Get current Chrome tab and return ticket details from DOM
const useTicketWithChrome = () => {
  const [ticket, setTicket] = React.useState({
    issueTitle: "",
    issueID: "",
    issueURL: "",
  });

  React.useEffect(() => {
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
  }, []);

  return ticket;
};

export default useTicketWithChrome;
