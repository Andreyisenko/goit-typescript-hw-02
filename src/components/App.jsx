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

function App() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPages] = useState(0);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalSrc, setModalSrc] = useState('');
  const [modalAlt, setModalAlt] = useState('');

  useEffect(() => {
    if (query === '') {
      return;
    }
    const getData = async () => {
      try {
        setIsLoading(true);
        setIsError(false);
        const { results, total_pages } = await fetchArticles(query, page);
        if (results.length === 0) {
          toast(`no results found, try again`);
        }
        setTotalPages(total_pages);
        setArticles(prev => [...prev, ...results]);
      } catch (error) {
        setIsError(error.message);
        toast.error(
          `download error ${error.message}`,

          {
            style: {
              borderRadius: '10px',
              background: 'red',
              color: '#fff',
            },
          }
        );
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, [query, page]);

  const handleSetQuery = newQuery => {
    setQuery(newQuery);
    setArticles([]);
    setPage(1);
  };

  const changeloadMore = () => {
    setPage(prev => prev + 1);
  };
  const openModal = (src, alt) => {
    setModalIsOpen(true);
    setModalSrc(src);
    setModalAlt(alt);
  };
  const closeModal = () => {
    setModalIsOpen(false);
    setModalSrc(null);
    setModalAlt('');
  };
  return (
    <>
      <h1 className="title">goit-react-hw-04</h1>
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
