import { Helmet } from 'react-helmet';

const Test = () => {
  return (
    <>
      <Helmet>
        <title>Test page for popup</title>
      </Helmet>
      <section className="py-6 text-base">
        <div className="md:container md:mx-auto px-4">
          <h1 className="text-2xl mb-4" id="summary-val">
            Lorem ipsum dolor sit amet consectetur adipisicing elit
          </h1>
          <p data-field-id="issuekey" title="issue.key">
            <a href="/browse/JENNIE-1996" id="key-val" title="View this issue">
              JENNIE-1996
            </a>
          </p>
        </div>
      </section>
    </>
  );
};

export default Test;
