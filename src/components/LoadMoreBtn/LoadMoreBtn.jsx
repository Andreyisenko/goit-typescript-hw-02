import css from './LoadMoreBtn.module.css';
const LoadMoreBtn = ({ changeloadMore }) => {
  return (
    <div>
      <button type="button" onClick={changeloadMore} className={css.button}>
        Load more{' '}
      </button>
    </div>
  );
};

export default LoadMoreBtn;
