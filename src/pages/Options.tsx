import React from 'react';

import { Helmet } from 'react-helmet';
import { InformationCircleIcon, XIcon } from '@heroicons/react/solid';

import {
  CLIPBOARD_ITEMS_STORAGE_KEY,
  CLIPBOARD_ITEM_VALUE_MAX_LENGTH,
  DEFAULT_CLIPBOARD_ITEM,
} from '../utils/Constants';
import { chromeStorageGet, chromeStorageSet } from '../utils/ChromeStorage';

import { ThemeContext } from '../providers/ThemeProvider';

import FormGroup from '../components/FormGroup';
import Button from '../components/Button';
import TextArea from '../components/TextArea';
import Alert from '../components/Alert';
import Modal from '../components/Modal';

const alertTimeoutMs = 3000;
let alertTimeoutID = setTimeout(() => {}, 0);

const Options = ({ manifest }: any) => {
  const { theme, setTheme } = React.useContext(ThemeContext);

  const [inputLabel, setInputLabel] = React.useState('');
  const [inputValue, setInputValue] = React.useState('');
  const [inputTheme, setInputTheme] = React.useState(theme);

  const [submitting, setSubmitting] = React.useState(false);
  const [inputValueRemaining, setInputValueRemaining] = React.useState(
    CLIPBOARD_ITEM_VALUE_MAX_LENGTH
  );

  const [alert, setAlert] = React.useState({
    show: false,
    type: 'error',
    message: 'Something went wrong. Please try again.',
  });

  const [modalIsOpen, setModalIsOpen] = React.useState(false);
  const [modalContent, setModalContent] = React.useState<React.ReactNode>();

  const openModal = (content?: React.ReactNode) => {
    setModalContent(content);
    setModalIsOpen(true);
  };
  const closeModal = () => setModalIsOpen(false);

  const hideAlert = () => {
    const { show, ...rest } = alert;
    setAlert({ show: false, ...rest });
  };

  const retrieveClipboardItems = async () => {
    const clipboardItems: any = await chromeStorageGet(
      CLIPBOARD_ITEMS_STORAGE_KEY,
      [DEFAULT_CLIPBOARD_ITEM]
    );

    const [firstItem] = clipboardItems;
    const { label, value } = firstItem;

    setInputLabel(label);
    setInputValue(value);
  };

  const handleInputChange =
    (setValue: CallableFunction) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      clearTimeout(alertTimeoutID);

      setValue(e.target.value);
      setAlert({
        show: true,
        type: 'muted',
        message: 'Changes made are not yet applied.',
      });
    };

  const saveClipboardItem = async () => {
    setInputLabel(inputLabel.trim());
    setInputValue(inputValue);

    return await chromeStorageSet(CLIPBOARD_ITEMS_STORAGE_KEY, [
      {
        label: inputLabel,
        value: inputValue,
      },
    ]);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    clearTimeout(alertTimeoutID);

    const saved = await saveClipboardItem();

    setTheme(inputTheme);

    setSubmitting(false);

    if (saved) {
      setAlert({
        show: true,
        type: 'success',
        message: 'Settings successfully saved.',
      });

      alertTimeoutID = setTimeout(hideAlert, alertTimeoutMs);

      return;
    }

    setAlert({
      show: true,
      type: 'warning',
      message: 'Something went wrong. Please try again.',
    });
  };

  React.useEffect(() => {
    retrieveClipboardItems();
  }, []);

  React.useEffect(() => {
    setInputValueRemaining(CLIPBOARD_ITEM_VALUE_MAX_LENGTH - inputValue.length);
  }, [inputValue]);

  React.useEffect(() => {
    document.body.style.overflowY = modalIsOpen ? 'hidden' : 'auto';

    if (!modalIsOpen) {
      setModalContent(null);
    }
  }, [modalIsOpen]);

  return (
    <>
      <Helmet>
        <title>{`${manifest?.name} | Options`}</title>
      </Helmet>
      <Modal show={modalIsOpen} onClose={() => setModalIsOpen(false)}>
        <div className="flex items-center mb-4">
          <div className="flex-grow">
            <InformationCircleIcon className="w-5 h-5 inline-block mr-1" />
            <span className="align-middle font-medium">
              Custom copy to clipboard button
            </span>
          </div>
          <div className="flex-none">
            <button type="button" onClick={closeModal} aria-label="Close">
              <XIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
        <div className="mb-4">{modalContent}</div>
      </Modal>
      <section className="py-6 dark:bg-gray-900 dark:text-gray-300 min-h-screen text-base">
        <div className="md:container md:mx-auto px-4">
          <div className="mb-4 border rounded-md px-4 pt-8 pb-10 bg-white dark:bg-gray-800 dark:border-gray-700">
            <div className="mb-8">
              <img
                src={`${process.env.PUBLIC_URL}/images/32.png`}
                className="bg-white border rounded mr-4 inline-block"
                alt="Jira Sotware logo"
                draggable={false}
              />
              <h1 className="text-4xl inline-block align-middle dark:text-white">
                {manifest?.name}
              </h1>
            </div>
            <h2 className="text-2xl text-gray-900 mb-4 dark:text-white">
              Settings
            </h2>
            <form className="mb-16" onSubmit={handleFormSubmit}>
              <FormGroup>
                <div className="mb-1">
                  <label htmlFor={inputTheme}>Theme</label>
                </div>
                <div className="mb-1">
                  <label htmlFor="light">
                    <input
                      type="radio"
                      name="theme"
                      id="light"
                      onChange={handleInputChange(setInputTheme)}
                      value="light"
                      checked={inputTheme === 'light'}
                      disabled={submitting}
                    />
                    <span className="ml-2 align-middle">Light</span>
                  </label>
                </div>
                <div className="mb-1">
                  <label htmlFor="dark">
                    <input
                      type="radio"
                      name="theme"
                      id="dark"
                      onChange={handleInputChange(setInputTheme)}
                      value="dark"
                      checked={inputTheme === 'dark'}
                      disabled={submitting}
                    />
                    <span className="ml-2 align-middle">Dark</span>
                  </label>
                </div>
              </FormGroup>
              <FormGroup>
                <div className="flex mb-1">
                  <div className="flex-grow">
                    <label className="block" htmlFor="copyToClipboardItem">
                      Button label
                    </label>
                  </div>
                  <div className="flex-none">
                    <button
                      type="button"
                      className="px-1"
                      onClick={() => {
                        openModal(
                          <p>
                            Set a custom copy to clipboard button on the
                            dropdown menu. This button can be hidden on the
                            dropdown by setting the label empty.
                          </p>
                        );
                      }}
                      aria-label="Open Button Label modal"
                    >
                      <InformationCircleIcon className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                <input
                  type="text"
                  id="copyToClipboardItem"
                  name="copyToClipboardItem"
                  className="w-full border-gray-300 rounded shadow-sm dark:text-gray-900 disabled:bg-gray-100 focus:ring-transparent"
                  value={inputLabel}
                  onChange={handleInputChange(setInputLabel)}
                  disabled={submitting}
                />
              </FormGroup>
              <FormGroup>
                <div className="flex mb-1">
                  <div className="flex-grow">
                    <label
                      className="block"
                      htmlFor="copyToClipboardItemFormat"
                    >
                      Custom value
                    </label>
                  </div>
                  <div className="flex-none">
                    <button
                      type="button"
                      className="px-1"
                      onClick={() => {
                        openModal(
                          <>
                            <p className="mb-2">
                              Available variables that can be used for custom
                              value:{' '}
                              <span className="px-2 bg-gray-200 dark:bg-gray-900 mr-1 inline-block rounded-md">
                                [id]
                              </span>
                              ,{' '}
                              <span className="px-2 bg-gray-200 dark:bg-gray-900 mr-1 inline-block rounded-md">
                                [title]
                              </span>
                              ,{' '}
                              <span className="px-2 bg-gray-200 dark:bg-gray-900 mr-1 inline-block rounded-md">
                                [url]
                              </span>
                              .
                            </p>
                            <p>
                              The custom value can have new lines and up to 100
                              characters.
                            </p>
                          </>
                        );
                      }}
                      aria-label="Open Custom value modal"
                    >
                      <InformationCircleIcon className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                <TextArea
                  name="copyToClipboardItemFormat"
                  id="copyToClipboardItemFormat"
                  className="w-full border-gray-300 rounded shadow-sm dark:text-gray-900 disabled:bg-gray-100 focus:ring-transparent block mb-1"
                  value={inputValue}
                  rows={1}
                  maxLength={CLIPBOARD_ITEM_VALUE_MAX_LENGTH}
                  onChange={handleInputChange(setInputValue)}
                  disabled={submitting}
                />
                <p className="mb-0 text-gray-400">
                  <small>
                    {`${inputValueRemaining} character${
                      inputValueRemaining > 1 ? 's' : ''
                    } left`}
                  </small>
                </p>
              </FormGroup>
              <FormGroup>
                <Button type="submit" className="mr-4" disabled={submitting}>
                  {submitting ? 'Saving...' : 'Save'}
                </Button>
                {alert.show && (
                  <Alert
                    display="inline"
                    type={alert.type}
                    message={alert.message}
                  />
                )}
              </FormGroup>
            </form>
            <hr className="my-16 border" />
            <h2 className="text-2xl text-gray-900 mb-4 dark:text-white">
              About
            </h2>
            <p className="mb-2">
              {manifest?.name} &mdash; {manifest?.description}
            </p>
            <p className="mb-8">
              This project is written, designed and built by{' '}
              <a
                href={`https://www.earvinpiamonte.com/`}
                className="underline text-blue-600 font-semibold"
                target="_blank"
                rel="noopener noreferrer"
              >
                earvinpiamonte.com
              </a>
              .
            </p>
            <h2 className="text-2xl text-gray-900 mb-4 dark:text-white">
              Disclaimer
            </h2>
            <p>
              Jira Software images are owned by{' '}
              <a
                href={`https://www.atlassian.com/`}
                className="underline text-blue-600 font-semibold"
                target="_blank"
                rel="noopener noreferrer"
              >
                Atlassian
              </a>{' '}
              and generated using{' '}
              <a
                href={`https://realfavicongenerator.net/`}
                className="underline text-blue-600 font-semibold"
                target="_blank"
                rel="noopener noreferrer"
              >
                RealFaviconGenerator.net
              </a>
              . This project nor I is affiliated with Jira or Atlassian in any
              way.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Options;
