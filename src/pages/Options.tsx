import { Helmet } from "react-helmet";

const Options = ({ manifest }: any) => {
  return (
    <>
      <Helmet>
        <title>{`${manifest?.name} | Options`}</title>
      </Helmet>
      <section className="py-6">
        <div className="md:container md:mx-auto px-4">
          <div className="mb-4">
            <h1 className="text-3xl mb-4">{manifest?.name}</h1>
            <p className="mb-2">{manifest?.description}</p>
            <p className="mb-2">
              This project is written, designed and built by{" "}
              <a
                href={`https://twitter.com/earvinpiamonte`}
                className="underline text-blue-600 font-semibold"
                target="_blank"
                rel="noopener noreferrer"
              >
                Noel Earvin Piamonte
              </a>
              .
            </p>
          </div>
          <div className="mb-4">
            <p className="mb-2">Version: {manifest?.version}</p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Options;
