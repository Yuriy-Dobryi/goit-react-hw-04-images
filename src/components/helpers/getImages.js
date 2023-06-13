import axios from 'axios';

const getImages = async (q, page) => {
  const URL = `https://pixabay.com/api/`;
  const config = {
    params: {
      key: `35543828-6c73cc5fdea5a14873063547d`,
      q,
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

export default getImages;
