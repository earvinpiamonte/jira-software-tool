// Access Jira details from web page and return ticket details
const getTicketFromDOM = () => {
  const ticket: any = {};

  const jiraBaseURL = document.location.origin;

  // Jira selected issue
  const $ticketSummary = document.getElementById("summary-val"); // issue title
  const $issueElement: any = document.getElementById("issuekey-val"); // issue ID and URL
  const $issueLink = $issueElement?.childNodes[0]; // issue URL; [0] -> <a>
  const $issueLinkAlt = document.getElementById("key-val"); // issue URL on issue page

  const $issueURL = $issueLink ?? $issueLinkAlt;

  ticket.issueTitle = $ticketSummary?.innerText;
  ticket.issueID = $issueURL?.innerText;
  ticket.issueURL = $issueURL
    ? `${jiraBaseURL}${$issueURL?.getAttribute("href")}` // concat base url & issue URL
    : undefined;

  // console.log(ticket);
  return ticket;
};

export { getTicketFromDOM };
