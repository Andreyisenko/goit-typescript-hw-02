import { useEffect, useState } from 'react';
import './App.css';
import SearchBar from './SearchBar/SearchBar';
import ImageGallery from './ImageGallery/ImageGallery';
import { fetchArticles } from '../services/api';
import LoadMoreBtn from './LoadMoreBtn/LoadMoreBtn';
import toast from 'react-hot-toast';
import ErrorMessage from './ErrorMessage/ErrorMessage';
import Loader from './Loader/Loader';
import ImageModal from './ImageModal/ImageModal';
import { Articl } from '../types';

function App() {
  const [articles, setArticles] = useState<Articl[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean | string | unknown>(false);
  const [query, setQuery] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [totalPage, setTotalPages] = useState<number>(0);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [modalSrc, setModalSrc] = useState<string | null>('');
  const [modalAlt, setModalAlt] = useState<string>('');
  // console.log(query);

  useEffect(() => {
    if (query === '') {
      return;
    }
    const getData = async () => {
      try {
        setIsLoading(true);
        setIsError(false);
        const { results, total_pages }  = await fetchArticles(query, page);
        if (results.length === 0) {
          toast(`no results found, try again`);
        }
        setTotalPages(total_pages);
        setArticles(prev => [...prev, ...results]);
      } catch (error) {
        setIsError(error);
        toast.error(
          `download error ${error}`,

          {
            style: {
              borderRadius: '10px',
              background: 'red',
              color: '#fff',
            },
          }
        );

        setIsError(true);
        throw error;
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, [query, page]);

  const handleSetQuery = (newQuery: string): void => {
    setQuery(newQuery);
    setArticles([]);
    setPage(1);
  };

  const changeloadMore = (): void => {
    setPage(prev => prev + 1);
  };
  const openModal = (src: string, alt: string): void => {
    setModalIsOpen(true);
    setModalSrc(src);
    setModalAlt(alt);
  };
  const closeModal = (): void => {
    setModalIsOpen(false);
    setModalSrc(null);
    setModalAlt('');
  };
  return (
    <>
      <h1 className="title">goit-typescript-hw-02</h1>
      <SearchBar handleSetQuery={handleSetQuery} />
      <ImageGallery articles={articles} openModal={openModal} />
      {isLoading && <h2>Loading...</h2>}
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {page < totalPage && <LoadMoreBtn changeloadMore={changeloadMore} />}
      <ImageModal
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
        src={modalSrc}
        alt={modalAlt}
      />
    </>
  );
}

export default App;
