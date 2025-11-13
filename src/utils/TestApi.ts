import { API_BASE_URL, API_IMAGES_URL } from "./config";
import { TItem } from "./types";

const checkResponse = <T>(res: Response): Promise<T> =>
  res.ok ? res.json() : res.json().then((err) => Promise.reject(err));

export const getItemsApi = (): Promise<TItem[]> => {
  return fetch(`${API_BASE_URL}`, {
    headers: {
 
    }
  })
    .then((res) => checkResponse<any[]>(res))
    .then(async (breeds) => {    
      const itemsWithImages = await Promise.all(
        breeds.map(async (breed, index) => {
          try {
            let mainImage = 'https://cdn2.thecatapi.com/images/0XYvRd7oD.jpg';
            let additionalImages: string[] = [];            
       
            if (breed.reference_image_id) {
              const imageResponse = await fetch(`${API_IMAGES_URL}/${breed.reference_image_id}`);
              const imageData = await imageResponse.json();
              
              if (imageData.url) {
                mainImage = imageData.url;
                additionalImages = [imageData.url];
              }
            }            
            return {
              id: breed.id || `cat-${index}-${Date.now()}`,
              title: breed.name || 'Unknown Cat',
              description: breed.description || 'No description available',     
              img: mainImage,
              images: additionalImages.length > 0 ? additionalImages : [mainImage],
              fulldescription: breed.description || 
                'A beautiful cat with unique characteristics. Perfect companion for any home.',
              isFavorite: false,
              breedData: breed
            };
          } catch (error) {
            console.error(`Error fetching image for breed ${breed.name}:`, error);
            return {
              id: breed.id || `cat-${index}-${Date.now()}`,
              title: breed.name || 'Unknown Cat',
              description: breed.description || 'No description available',     
              img: 'https://cdn2.thecatapi.com/images/0XYvRd7oD.jpg',
              images: ['https://cdn2.thecatapi.com/images/0XYvRd7oD.jpg'],
              fulldescription: breed.description || 
                'A beautiful cat with unique characteristics. Perfect companion for any home.',
              isFavorite: false,
              breedData: breed
            };
          }
        })
      );
      
      return itemsWithImages;
    })
    .catch((error) => {
      console.error('Error fetching breeds from Cat API:', error);
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