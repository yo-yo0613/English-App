export interface DictionaryApiResponse {
  word: string;
  phonetics: {
    text?: string;
    audio?: string;
  }[];
  meanings: {
    partOfSpeech: string;
    definitions: {
      definition: string;
      example?: string;
      synonyms: string[];
      antonyms: string[];
    }[];
  }[];
}

export const fetchWordData = async (word: string): Promise<DictionaryApiResponse | null> => {
  try {
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    if (!response.ok) {
      if (response.status === 404) return null;
      throw new Error('Failed to fetch word data');
    }
    const data = await response.json();
    return data[0]; // The API returns an array of entries
  } catch (error) {
    console.error('Error fetching dictionary data:', error);
    return null;
  }
};
