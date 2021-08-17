import React from 'react';

const Modal = ({
  children,
  show,
  onClose,
}: {
  children?: React.ReactNode;
  show?: boolean;
  onClose?: (event: React.MouseEvent<any>) => void;
}) => {
  const onClickHandler = (event: React.MouseEvent<any>) =>
    event.target === event.currentTarget && onClose && onClose(event);

  return (
    <>
      {show && (
        <div
          className="bg-black bg-opacity-80 fixed inset-0 h-screen w-screen z-10 py-32 px-4 overflow-y-auto text-base"
          onClick={onClickHandler}
        >
          <div className="mx-auto max-w-lg px-4 py-4 bg-white rounded-lg dark:bg-gray-800 dark:text-gray-400">
            {children}
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
