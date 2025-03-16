import axios from 'axios';

const YOUR_ACCESS_KEY = 'Hg1CpLsou6vsLxEalGGcMeVDU3n-0eTBhr2sOtrVw94';
export const fetchArticles = async (query, page) => {
  const params = new URLSearchParams({
    client_id: YOUR_ACCESS_KEY,
    query,
    page,
    per_page: 20,
  });
  const response = await axios.get(
    `https://api.unsplash.com/search/photos?${params} `
  );
  return response.data;
};
