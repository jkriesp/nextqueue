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
    <>
      <h1>Currently Playing</h1>
      <div className="card">
        {currentlyPlaying.map((song, index) => (
          <div key={index} className="song-card">
            <img src={song.images[0]} alt={song.trackName} className="song-image" />
            <div className="song-info">
              <h2>{song.trackName}</h2>
              <p>{song.artist}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default SpotifyCurrentlyPlaying;
