const Alert = ({
  message,
  type,
  display,
}: {
  message?: string;
  type?: string;
  display?: string;
}) => {
  let textClass = 'text-gray-900';
  const displayClass = display === 'inline' ? 'inline' : 'block';

  switch (type) {
    case 'success':
      textClass = 'text-green-500';
      break;
    case 'error':
      textClass = 'text-red-500';
      break;
    case 'warning':
      textClass = 'text-yellow-500';
      break;
    case 'info':
      textClass = 'text-blue-500';
      break;
    case 'muted':
      textClass = 'text-gray-400';
      break;
  }

  return (
    <div className={`align-middle ${displayClass} ${textClass}`}>
      <span className="align-middle">{message}</span>
    </div>
  );
};

export default Alert;
