import { Component } from "react";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Triangle } from 'react-loader-spinner'

import { Searchbar } from "./Searchbar/Searchbar";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { LoadMoreBtn } from "./LoadMoreBtn/LoadMoreBtn";
import '../index.css';
import loaderStyles from './helpers/loaderStyles';

export class App extends Component {
  state = {
    imageName: '',
    page: 1,
    images: [],
    status: 'idle',
  }

  async componentDidUpdate(_, prevState) {
    const { imageName: prevImageName, page: prevPage } = prevState;
    const { imageName, page, images } = this.state;

    const isImageNameChanged = prevImageName !== imageName;
    const isPageChanged = prevPage !== page;

    if (isImageNameChanged || isPageChanged) {
      this.setState({ status: 'pending' });

      try {
        const { hits, totalHits } = await this.getImages();
        const isLastPage = hits.length < 30;

        if (isImageNameChanged) {
          if (totalHits === 0) {
            toast.error('Sorry, there are no images matching your search query.')
            throw new Error();
          }
          toast.success(`Hooray! We found ${totalHits} images.`);
        }

        if (isLastPage) {
          toast.info(`There is the last page with "${imageName}"`);
        }

        this.setState({
          images: isImageNameChanged
            ? [...hits]
            : [...images, ...hits],
          status: isLastPage
            ? 'rejected' :
            'resolved'
        });

      } catch {
        this.setState({ status: 'rejected' });
      }
    }
  }

  changeImageName = (newName) => {
    const { imageName } = this.state;
    if (imageName === newName) {
      toast.info("The same query. Please, enter different.")
      return;
    }

    this.setState({
      imageName: newName,
      // Якщо помістити наступні state-властивості в метод componentDidUpdate то почнуться каруселі та додаткові перевірки або створити новий state.
      page: 1,
      images: [],
    });
  }

  incrementPage = () => {
    this.setState((prevState) => ({ page: prevState.page + 1 }));
  }

  async getImages() {
    const { imageName, page } = this.state;
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
  }
  
  render() {
    const { images, status } = this.state;

    return (
      <div className="App">
        <Searchbar onSubmit={this.changeImageName} />
        <ImageGallery images={images} />
        
        {status === 'resolved' &&
          <LoadMoreBtn handleClick={this.incrementPage} />}
        
        {status === 'pending' &&
          <Triangle {...loaderStyles} />}

        <ToastContainer autoClose={3000} />
      </div>
    )
  }
}