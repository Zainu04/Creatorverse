import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../client';

export default function AddCreator() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', url: '', description: '', imageURL: '' });
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.from('creators').insert([form]);
    if (error) { console.error(error); setLoading(false); return; }
    navigate('/');
  }

  return (
    <div className="page form-page">
      <Link to="/" className="back-link">← Back</Link>
      <h1 className="form-title">Add a Creator</h1>

      <form onSubmit={handleSubmit} className="creator-form">
        <label>
          Name *
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="e.g. Ryan Trahan"
            required
          />
        </label>
        <label>
          Channel URL *
          <input
            name="url"
            value={form.url}
            onChange={handleChange}
            placeholder="https://youtube.com/@..."
            required
          />
        </label>
        <label>
          Description *
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="What kind of content do they make?"
            required
            rows={4}
          />
        </label>
        <label>
          Image URL (optional)
          <input
            name="imageURL"
            value={form.imageURL}
            onChange={handleChange}
            placeholder="https://..."
          />
        </label>
        <button type="submit" className="btn-submit" disabled={loading}>
          {loading ? 'Adding...' : 'Add Creator'}
        </button>
      </form>
    </div>
  );
}