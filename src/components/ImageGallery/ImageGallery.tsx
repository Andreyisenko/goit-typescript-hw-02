import css from './ImageGallery.module.css';
import ImageCard from '../ImageCard/ImageCard';
import { Articl } from '../../types';
import React from 'react';
interface ImageGalleryProps {
  articles: Articl[]
  openModal: (src: string, alt: string) => void
}

const ImageGallery: React.FC <ImageGalleryProps> = ({ articles, openModal }) => {
  return (
    <ul className={css.gallery}>
      {articles.map(article => (
        <li className={css.item} key={article.id}>
          <ImageCard article={article} openModal={openModal} />
        </li>
      ))}
    </ul>
  );
};

export default ImageGallery;
