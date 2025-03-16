import axios from 'axios';
import type { AxiosResponse } from 'axios';

const YOUR_ACCESS_KEY = 'Hg1CpLsou6vsLxEalGGcMeVDU3n-0eTBhr2sOtrVw94';

interface Art {
  id: string
  alt_description: string
  likes: number
  urls: {
    regular: string
    small: string   
  }
  user: {
    name: string
  }
}

interface Resp {
  total: number;
  total_pages: number;
  results: Art[];
}

export const fetchArticles = async (query: string, page: number):  Promise <Resp> => {
  const params = new URLSearchParams({
    client_id: YOUR_ACCESS_KEY,
    query,
    page,   
    per_page: 20,
  });
  const response: AxiosResponse<Resp> = await axios.get (
    `https://api.unsplash.com/search/photos?${params} `
  );
  return response.data;
};
