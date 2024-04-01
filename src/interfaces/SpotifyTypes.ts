// interface Image {
//     url: string;
// }

// interface Artist {
//     name: string;
// }

// // eslint-disable-next-line @typescript-eslint/no-unused-vars
// interface Track {
//     name: string;
//     artists: Artist[];
//     album: {
//         images: Image[];
//     };
// }

export interface SpotifyData {
    currently_playing: {
        name: string;
        artists: { name: string }[];
        album: {
            images: { url: string }[];
        };
    };
    queue: Array<{
        name: string;
        artists: { name: string }[];
        album: {
            images: { url: string }[];
        };
    }>;
}
