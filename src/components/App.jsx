import { useState, useEffect } from "react";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Triangle } from 'react-loader-spinner'

import { Searchbar } from "./Searchbar/Searchbar";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { LoadMoreBtn } from "./LoadMoreBtn/LoadMoreBtn";
import '../index.css';
import loaderStyles from './helpers/loaderStyles';

export function App() {
  const [imageName, setImageName] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [status, setStatus] = useState('idle');

  const getImages = async () => {
    const URL = `https://pixabay.com/api/`;
    const config = {
      params: {
        key: `35543828-6c73cc5fdea5a14873063547d`,
        q: imageName,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page,
        per_page: 30,
      },
    };

    const response = await axios.get(URL, config);
    return response.data;
  };

  useEffect(() => {
    if (imageName === '') {
      return;
    }
    const fetchData = async () => {
      setStatus('pending');
      try {
        const { hits, totalHits } = await getImages();
        const isLastPage = hits.length < 30;

        if (imageName !== '' && totalHits === 0) {
          toast.error('Sorry, there are no images matching your search query.');
          throw new Error();
        }
        if (isLastPage) {
          toast.info(`There is the last page with "${imageName}".`);
        }

        toast.success(`Hooray! We found ${totalHits} images.`);
        setImages([...hits]);
        setStatus(isLastPage ? 'rejected' : 'resolved');

      } catch {
        setStatus('rejected');
      }
    };
    
    fetchData();
  }, [imageName]);



  useEffect(() => {
    if (page === 1) {
      return;
    }

    const fetchData = async () => {
      setStatus('pending');
      try {
        const { hits } = await getImages();
        const isLastPage = hits.length < 30;

        if (isLastPage) {
          toast.info(`There is the last page.`);
        }

        setImages(prevImages => [...prevImages, ...hits]);
        setStatus(isLastPage ? 'rejected' : 'resolved');
      } catch {
        setStatus('rejected');
      }
    };

    fetchData();
  }, [page]);
  
  
  

  function changeImageName(newName) {
    if (imageName === newName) {
      toast.info("The same query. Please, enter different.")
      return;
    }
    setImageName(newName);
    setPage(1);
    setImages([]);
  }

  function incrementPage() {
    setPage(page + 1);
  }

  return (
    <div className="App">
      <Searchbar onSubmit={changeImageName} />
      <ImageGallery images={images} />
        
      {status === 'resolved' &&
        <LoadMoreBtn handleClick={incrementPage} />}
        
      {status === 'pending' &&
        <Triangle {...loaderStyles} />}

      <ToastContainer autoClose={3000} />
    </div>
  )
}