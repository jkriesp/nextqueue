import { useState, useEffect } from 'react';
import axios from 'axios';
import { SpotifyData } from '../interfaces/SpotifyTypes';

interface SpotifyQueueProps {
  token: string;
}

export const useSpotifyData = ({ token }: SpotifyQueueProps): { data: SpotifyData | null; error: string | null; } => {
  const [data, setData] = useState<SpotifyData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://api.spotify.com/v1/me/player/queue', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setData(response.data);
      } catch (error) {
        setError('Failed to fetch data:' + error);
      }
    };
    fetchData();
  }, [token]);

  return { data, error };
};
