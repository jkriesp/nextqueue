import React, { useEffect, useState } from 'react';
import { parseSpotifyData } from '../services/SpotifyService';
import { useSpotifyData } from '../services/useSpotifyData';

interface SpotifyQueueProps {
  token: string;
}

interface Song {
  artist: string;
  trackName: string;
  images: string[];
}

const SpotifyCurrentlyPlaying: React.FC<SpotifyQueueProps> = ({ token }) => {
  const [currentlyPlaying, setCurrentlyPlaying] = useState<Song[]>([]);

  // use the useSpotifyData to get the currently playing song
  const { data, error } = useSpotifyData({ token });
  useEffect(() => {
    if (data) {
      const parsedData = parseSpotifyData(data);
      if (parsedData && parsedData.currentlyPlaying) {
        setCurrentlyPlaying([parsedData.currentlyPlaying]); // Ensure it's always an array
      } else {
        setCurrentlyPlaying([]); // Fallback to an empty array
      }
    } else {
      setCurrentlyPlaying([]); // Handle error by setting to an empty array
    }
  }, [data, error]);

  return (

    <div>
      <h1>Currently Playing</h1>
      <ul>
        {currentlyPlaying.map((song, index) => (
          <li key={index}>
            <img src={song.images[0]} alt={song.trackName} />
            {song.artist} - {song.trackName}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SpotifyCurrentlyPlaying;
