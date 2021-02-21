import { Helmet } from "react-helmet";

import useTheme from "../hooks/useTheme";

const Options = ({ manifest }: any) => {
  useTheme();

  return (
    <>
      <Helmet>
        <title>{`${manifest?.name} | Options`}</title>
      </Helmet>
      <section className="py-6 dark:bg-gray-900 dark:text-gray-300 min-h-screen">
        <div className="md:container md:mx-auto px-4">
          <div className="mb-4">
            <h1 className="text-3xl mb-4 dark:text-white">{manifest?.name}</h1>
            <h2 className="text-lg mb-2 dark:text-white">About</h2>
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
            <h2 className="text-lg mb-2 dark:text-white">Credits</h2>
            <p>
              Jira Software images are owned by{" "}
              <a
                href={`https://www.atlassian.com/`}
                className="underline text-blue-600 font-semibold"
                target="_blank"
                rel="noopener noreferrer"
              >
                Atlassian
              </a>{" "}
              and generated using{" "}
              <a
                href={`https://realfavicongenerator.net/`}
                className="underline text-blue-600 font-semibold"
                target="_blank"
                rel="noopener noreferrer"
              >
                RealFaviconGenerator.net
              </a>
              .
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Options;
