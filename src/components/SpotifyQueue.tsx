import React, { useEffect, useState } from 'react';
import { parseSpotifyData } from '../services/SpotifyService';
import { SpotifyData } from '../interfaces/SpotifyTypes';

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

    useEffect(() => {
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
                    console.log(queue);
                    setQueuedSongs(queue); // Assuming parseSpotifyData returns an object with a queue property
                } else {
                    console.error('Failed to fetch queued songs:', response.status);
                }
            } catch (error) {
                console.error('Error fetching queued songs:', error);
            }
        };

        fetchQueuedSongs();
    }, [token]);

    return (
        <div>
            <h1>Queued Songs</h1>
            <ul>
                {queuedSongs.map((song, index) => (
                    <li key={index}>{song.trackName} by {song.artist}</li>
                ))}
            </ul>
        </div>
    );
};

export default SpotifyQueue;
