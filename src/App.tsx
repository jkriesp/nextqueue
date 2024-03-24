import { useEffect, useState } from 'react';
import './App.css';
import SpotifyQueue from './components/SpotifyQueue';

function App() {
  const [token, setToken] = useState<string | null>(null);
  const CLIENT_ID = '3c72f77eac534054b9feb1f9b9ee617c';
  const REDIRECT_URI = 'http://localhost:5173';
  const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize';
  const RESPONSE_TYPE = 'token';
  const SCOPES = 'user-read-playback-state user-read-currently-playing';
  const SCOPE_URL_ENCODED = encodeURIComponent(SCOPES);
  // Construct the auth link
  const authLink = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE_URL_ENCODED}`;



  useEffect(() => {
    const hash = window.location.hash
    let token = window.localStorage.getItem('token')

    if (!token && hash) {
      token = (hash.substring(1).split("&").find(elem => elem.startsWith("access_token"))?.split("=")[1]) || null;
      window.location.hash = '';
      window.localStorage.setItem('token', token || '');
    }
    setToken(token)
  }, [])

  const logout = () => {
    setToken("")
    window.localStorage.removeItem("token")
  }


  return (
    <div className="App">
      <header className="App-header"></header>
      <h1>Visualize Your Spotify Queue</h1>
      {!token ? <h1>Visualize Your Spotify Queue</h1> : <SpotifyQueue token={token} />}
      {!token ?
        <a href={authLink}>Login
          to Spotify</a>
        : <button onClick={logout}>Logout</button>}

    </div>
  );
}

export default App;
