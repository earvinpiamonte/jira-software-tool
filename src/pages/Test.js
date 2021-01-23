import React from "react";
import { Helmet } from "react-helmet";

const Test = () => {
  return (
    <>
      <Helmet>
        <title>Test page for popup</title>
      </Helmet>
      <section className="py-6">
        <div className="md:container md:mx-auto px-4">
          <h1 className="text-2xl mb-4" id="summary-val">
            This is a sample issue title or summary
          </h1>
          <p id="issuekey-val" data-field-id="issuekey" title="issue.key">
            <a href="/browse/JIRA-60537" title="View this issue">
              JIRA-60537
            </a>
          </p>
        </div>
      </section>
    </>
  );
};

export default Test;
