import { SpotifyData } from '../interfaces/SpotifyTypes';

// Assuming data is already a parsed JSON object and not a string
export const parseSpotifyData = (data: SpotifyData) => {
    // Extract currently playing info
    const currentlyPlaying = data.currently_playing ? {
        artist: data.currently_playing.artists[0].name,
        trackName: data.currently_playing.name,
        images: data.currently_playing.album.images.map(image => image.url),
    } : null;

    // Extract queue info
    const queue = data.queue.map(track => ({
        artist: track.artists[0].name,
        trackName: track.name,
        images: track.album.images.map(image => image.url),
    }));

    // Log the currently playing info for debugging
    console.log('Currently playing:', currentlyPlaying);
    console.log('Queue:', queue);

    // Return these values to be used where this function is called
    return { currentlyPlaying, queue };
};
