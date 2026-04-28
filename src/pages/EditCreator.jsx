import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { supabase } from '../client';

export default function EditCreator() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', url: '', description: '', imageURL: '' });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function fetchCreator() {
      const { data, error } = await supabase
        .from('creators')
        .select('*')
        .eq('id', id)
        .single();
      if (error) console.error(error);
      else setForm(data);
      setLoading(false);
    }
    fetchCreator();
  }, [id]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    const { error } = await supabase
      .from('creators')
      .update({ name: form.name, url: form.url, description: form.description, imageURL: form.imageURL })
      .eq('id', id);
    if (error) { console.error(error); setSaving(false); return; }
    navigate(`/creator/${id}`);
  }

  async function handleDelete() {
    if (!confirm(`Delete ${form.name}?`)) return;
    const { error } = await supabase.from('creators').delete().eq('id', id);
    if (error) console.error(error);
    else navigate('/');
  }

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="page form-page">
      <Link to={`/creator/${id}`} className="back-link">← Back</Link>
      <h1 className="form-title">Edit Creator</h1>

      <form onSubmit={handleSubmit} className="creator-form">
        <label>
          Name *
          <input name="name" value={form.name} onChange={handleChange} required />
        </label>
        <label>
          Channel URL *
          <input name="url" value={form.url} onChange={handleChange} required />
        </label>
        <label>
          Description *
          <textarea name="description" value={form.description} onChange={handleChange} required rows={4} />
        </label>
        <label>
          Image URL (optional)
          <input name="imageURL" value={form.imageURL || ''} onChange={handleChange} />
        </label>
        <div className="form-actions">
          <button type="submit" className="btn-submit" disabled={saving}>
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
          <button type="button" onClick={handleDelete} className="btn-delete">
            Delete Creator
          </button>
        </div>
      </form>
    </div>
  );
}