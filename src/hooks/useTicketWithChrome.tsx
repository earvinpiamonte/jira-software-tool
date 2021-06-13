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
      chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
        try {
          // Get ticket details result from DOM
          chrome.scripting.executeScript(
            {
              target: {
                tabId: tab.id ?? chrome.tabs.TAB_ID_NONE,
                allFrames: true,
              },
              function: getTicketFromDOM,
            },
            (results) => {
              const { result } = results[0];
              const { issueTitle, issueID, issueURL } = result;

              setTicket({
                issueTitle,
                issueID,
                issueURL,
              });
            }
          );
        } catch (error) {
          console.log("Script execution error: ", error);
        }
      });
    }
  }, []);

  return ticket;
};

export default useTicketWithChrome;
