import { Articl } from '../../types';
import css from './ImageCard.module.css';

interface ImageCardProps {
  article: Articl
  openModal: (src: string, alt: string) => void
}

const ImageCard: React.FC <ImageCardProps> = ({ article, openModal }) => {
  return (
    <div className={css.wraper}>
      <img
        className={css.imgE}
        src={article.urls.small}
        alt={article.alt_description}
        onClick={() => openModal(article.urls.regular, article.alt_description)}
      />
      <p className={css.text}>Autor: {article.user.name}</p>
      <p className={css.text}>Likes: {article.likes}</p>
    </div>
  );
};

export default ImageCard;
