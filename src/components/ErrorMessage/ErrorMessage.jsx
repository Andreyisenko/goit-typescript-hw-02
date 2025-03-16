import css from './ErrorMessage.module.css';
const ErrorMessage = () => {
  return (
    <div>
      <p className={css.text}>Error loading, try again later...</p>
    </div>
  );
};

export default ErrorMessage;
