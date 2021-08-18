import React from 'react';

const TextArea = (props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) => {
  const { value } = props;
  const textareaElement = React.useRef<HTMLTextAreaElement>(null);

  React.useEffect(() => {
    updateTextareaHeight();
  }, [value]);

  const updateTextareaHeight = () => {
    if (textareaElement.current) {
      const $element = textareaElement.current;
      const extraHeight = 3;

      $element.style.height = `auto`;
      $element.style.height = `${$element.scrollHeight + extraHeight}px`;
      $element.style.resize = `none`;
      $element.style.overflowY = `hidden`;
    }
  };

  return <textarea ref={textareaElement} {...props}></textarea>;
};

export default TextArea;
