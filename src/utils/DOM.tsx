// Access Jira details from web page and return ticket details
const getTicketFromDOM = () => {
  const jiraBaseURL = document.location.origin;

  // Jira selected issue (self-hosted)
  const $issueTitle = document.getElementById("summary-val"); // issue title
  const $issueElement: any = document.getElementById("issuekey-val"); // issue ID and URL
  const $issueLinkOnBoard = $issueElement?.childNodes[0]; // issue URL; [0] -> <a>
  const $issueLinkOnPage = document.getElementById("key-val"); // issue URL on issue page

  // Jira selected issue (cloud)
  const $issueLinkOnBoardCloud = document.querySelector(
    '[data-test-id="issue.views.issue-base.foundation.breadcrumbs.breadcrumb-current-issue-container"] a'
  );
  const $issueTitleCloud = document.querySelector(
    '[data-test-id="issue.views.issue-base.foundation.summary.heading"]'
  );

  // Issue link on board | page | cloud
  const $issueLink =
    $issueLinkOnBoard ?? $issueLinkOnPage ?? $issueLinkOnBoardCloud;

  // Issue title on self-hosted | cloud
  const issueTitle = $issueTitle?.innerText ?? $issueTitleCloud?.innerHTML;

  // Issue link text
  const issueID = $issueLink?.innerText;

  // Contactenate base and issue URL
  // If there's no matching issue link -> undefined
  const issueURL = $issueLink
    ? `${jiraBaseURL}${$issueLink?.getAttribute("href")}`
    : undefined;

  return {
    issueTitle,
    issueID,
    issueURL,
  };
};

export { getTicketFromDOM };
