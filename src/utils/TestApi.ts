import { API_BASE_URL, API_KEY } from "./config";
import { TItem } from "./types";

const checkResponse = <T>(res: Response): Promise<T> =>
  res.ok ? res.json() : res.json().then((err) => Promise.reject(err));

export const getItemsApi = (): Promise<TItem[]> => {
  return fetch(`${API_BASE_URL}/images/search?limit=10&has_breeds=1`, {
    headers: {
      'x-api-key': API_KEY
    }
  })
    .then((res) => checkResponse<any[]>(res))
    .then((data) => { 
      
      const items: TItem[] = data.map((item, index) => ( {
        
        id: item.id || `cat-${index}-${Date.now()}`,
        title: item.name || 'Unknown Cat',
        description: item.description || 'No description available',     
        img: item.image.url,
        images: [item.image.url],
        fulldescription: item.breeds?.[0]?.description || 
          'A beautiful cat with unique characteristics. Perfect companion for any home.',
        isFavorite: false,       
     
      }));
      
      return items;
    })
    .catch((error) => {
      console.error('Error fetching from Cat API:', error);
      return getFallbackData();
    });
};

const getFallbackData = (): TItem[] => {
  return [
    {
      id: 'fallback-1',
      title: 'Beautiful Cat',
      description: 'Lovely companion for your home',      
      
      img: 'https://cdn2.thecatapi.com/images/0XYvRd7oD.jpg',
      images: ['https://cdn2.thecatapi.com/images/0XYvRd7oD.jpg'],
      fulldescription: 'A beautiful cat with unique characteristics. Perfect companion for any home.',
      isFavorite: false      
    },
    {
      id: 'fallback-2',
      title: 'Cute Kitten',
      description: 'Playful and energetic kitten',        
      img: 'https://cdn2.thecatapi.com/images/1q6.jpg',
      images: ['https://cdn2.thecatapi.com/images/1q6.jpg'],
      fulldescription: 'A playful kitten full of energy and love.',
      isFavorite: false
   
    
    }
  ];
};
