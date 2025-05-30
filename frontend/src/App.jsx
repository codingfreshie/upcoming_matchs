import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/matches') 
      .then((res) => res.json())
      .then((data) => {

      setMatches(data);
      setLoading(false);
    })
      .catch((err) => {
        console.error('Error fetching matches:', err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="container">
      <h1 className="title"> Upcoming Basketball Matches</h1>

      {loading ? (
        <p className="loading">Loading matches...</p>
      ) : (
        <div className="match-list">
          {matches.map((match) => (
            <div className="match-card" key={match.id}>
              
              <h2>{match.tournament?.name}</h2>
              <p className="timestamp">
                {new Date(match.startTimestamp * 1000).toLocaleString()}
              </p>
              <p><strong>Stage:</strong> {match.roundInfo?.name || 'TBD'}</p>
              <p><strong>Teams:</strong> {match.homeTeam.name} vs {match.awayTeam.name}</p>
              {/* <p><strong>Season:</strong> {match.season?.name}</p> */}
              <p><strong>Status:</strong> {match.status?.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
