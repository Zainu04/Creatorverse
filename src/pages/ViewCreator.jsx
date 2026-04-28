import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { supabase } from '../client';

export default function ViewCreator() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [creator, setCreator] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCreator() {
      const { data, error } = await supabase
        .from('creators')
        .select('*')
        .eq('id', Number(id))
        .single();
      if (error) console.error(error);
      else setCreator(data);
      setLoading(false);
    }
    fetchCreator();
  }, [id]);

  async function handleDelete() {
    if (!confirm(`Delete ${creator.name}?`)) return;
    const { error } = await supabase.from('creators').delete().eq('id', id);
    if (error) console.error(error);
    else navigate('/');
  }

  if (loading) return <div className="loading">Loading...</div>;
  if (!creator) return <div className="loading">Creator not found.</div>;

  return (
    <div className="page view-page">
      <Link to="/" className="back-link">← Back to all creators</Link>

      <div className="view-card">
        {creator.imageURL && (
          <div className="view-image">
            <img src={creator.imageURL} alt={creator.name} />
          </div>
        )}
        <div className="view-info">
  <h1 className="view-name">{creator.name}</h1>
  <p className="view-description">{creator.description}</p>

  <div className="url-bar">
    <span className="url-icon">🔎</span>
    <span className="url-text">{creator.url}</span>
  </div>

  <div className="view-actions">
    <a
      href={creator.url}
      target="_blank"
      rel="noopener noreferrer"
      className="btn-visit"
    >
      Visit Channel ↗
    </a>

    <Link to={`/edit/${creator.id}`} className="btn-edit-large">
      Edit
    </Link>

    <button onClick={handleDelete} className="btn-delete">
      Delete
    </button>
  </div>
</div>
        
      </div>
    </div>
  );
}