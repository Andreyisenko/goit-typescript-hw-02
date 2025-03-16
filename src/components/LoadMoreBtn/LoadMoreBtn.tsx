import css from './LoadMoreBtn.module.css';

interface LoadMoreBtnProps {
  changeloadMore: () => void;
}

const LoadMoreBtn: React.FC<LoadMoreBtnProps> = ({ changeloadMore }) => {
  return (
    <div>
      <button type="button" onClick={changeloadMore} className={css.button}>
        Load more{' '}
      </button>
    </div>
  );
};

export default LoadMoreBtn;
