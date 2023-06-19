import { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Triangle } from 'react-loader-spinner'

import { Searchbar } from "./Searchbar/Searchbar";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { LoadMoreBtn } from "./LoadMoreBtn/LoadMoreBtn";
import '../index.css';
import {getImages, loaderStyles} from '../helpers';

export function App() {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    if (query === '') {
      return;
    }
    
    try {
      const fetchData = async () => {
        setStatus('pending');
        const { hits, totalHits } = await getImages(query, page);
        const isStartPage = page === 1;
        const isResponseEmpty = totalHits === 0;
        const isLastPage = hits.length < 30;
        
        if (isStartPage) {
          if (isResponseEmpty) {
            toast.error('Sorry, there are no images matching your search query.');
            throw new Error();
          }
          toast.success(`Hooray! We found ${totalHits} images.`);
        }
        if (isLastPage) {
          toast.info(`There is the last page with "${query}".`);
        }

        setImages(isStartPage ? [...hits] : (prev) => [...prev, ...hits]);
        setStatus(isLastPage ? 'rejected' : 'resolved');
      };

      fetchData();
    } catch {
      setStatus('rejected');
    }
  }, [query, page]);


  function changeQuery(newQuery) {
    if (query === newQuery) {
      toast.info("The same query. Please, enter different.")
      return;
    }
    setQuery(newQuery);
    setPage(1);
  }

  function incrementPage() {
    setPage(prev => prev + 1);
  }

  return (
    <div className="App">
      <Searchbar onSubmit={changeQuery} />
      <ImageGallery images={images} />
        
      {status === 'resolved' &&
        <LoadMoreBtn handleClick={incrementPage} />}
        
      {status === 'pending' &&
        <Triangle {...loaderStyles} />}

      <ToastContainer autoClose={3000} />
    </div>
  )
}