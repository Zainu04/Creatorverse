import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../client';
import Card from '../components/CreatorCard';

export default function ShowCreators() {
  const [creators, setCreators] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCreators() {
      const { data, error } = await supabase.from('creators').select('*');
      if (error) console.error(error);
      else setCreators(data);
      setLoading(false);
    }
    fetchCreators();
  }, []);

  return (
    <div className="page">
      <header className="site-header">
        <div className="header-inner">
          <h1 className="site-title">✦ Creatorverse</h1>
          <p className="site-subtitle">A curated collection of creators worth following</p>
          <Link to="/add" className="btn-add">+ Add Creator</Link>
        </div>
      </header>

      <main className="main-content">
        {loading ? (
          <div className="loading">Loading creators...</div>
        ) : creators.length === 0 ? (
          <div className="empty-state">
            <p>No creators yet. Add some!</p>
            <Link to="/add" className="btn-add">+ Add Creator</Link>
          </div>
        ) : (
          <div className="grid">
            {creators.map((c) => (
              <Card key={c.id} creator={c} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}