import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  block?: boolean;
}

const Button = (props: ButtonProps) => {
  const { children, className, block, disabled, ...rest } = props;

  return (
    <button
      {...rest}
      className={`py-2 px-4 text-sm text-center rounded-md bg-gray-300 dark:bg-gray-700 dark:text-gray-300 truncate ${
        disabled
          ? 'disabled:opacity-50 cursor-not-allowed'
          : 'hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:hover:bg-gray-600 dark:hover:text-white'
      } ${block ? 'block w-full' : ''} ${className ?? ''}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
