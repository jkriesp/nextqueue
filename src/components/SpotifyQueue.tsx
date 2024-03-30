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

const SpotifyQueue: React.FC<SpotifyQueueProps> = ({ token }) => {
    const [queuedSongs, setQueuedSongs] = useState<Song[]>([]);

    const { data, error } = useSpotifyData({ token });
    useEffect(() => {
        if (data) {
            const parsedData = parseSpotifyData(data);
            if (parsedData && parsedData.queue) {
                setQueuedSongs(parsedData.queue); // Ensure it's always an array
            } else {
                setQueuedSongs([]); // Fallback to an empty array
            }
        } else {
            setQueuedSongs([]); // Handle error by setting to an empty array
        }
    }, [data, error]);

    /*     useEffect(() => {
            const fetchQueuedSongs = async () => {
                try {
                    const response = await fetch('https://api.spotify.com/v1/me/player/queue', {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
    
                    if (response.ok) {
                        const jsonData = await response.json();
                        const { queue } = parseSpotifyData(jsonData); // This needs to correctly interpret the queue structure
                        setQueuedSongs(queue); // Assuming parseSpotifyData returns an object with a queue property
                    } else {
                        console.error('Failed to fetch queued songs:', response.status);
                    }
                } catch (error) {
                    console.error('Error fetching queued songs:', error);
                }
            };
    
            fetchQueuedSongs();
        }, [token]); */

    return (

        <div>
            <h1>Queued Songs</h1>
            <div className="card-container">
                {queuedSongs.map((song, index) => (
                    <div key={index} className="song-card">
                        <img src={song.images[0]} alt="Album cover" className="song-image" />
                        <div className="song-info">
                            <h2>{song.trackName}</h2>
                            <p>{song.artist}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SpotifyQueue;
