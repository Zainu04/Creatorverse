import { useState } from "react";
import { supabase } from "../client";
import { Link, useNavigate } from "react-router-dom";

export default function AddCreator() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", url: "", description: "", imageURL: "" });
  const [saving, setSaving] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addCreator = async (e) => {
    e.preventDefault();
    setSaving(true);
    await supabase.from("creators").insert(form);
    navigate("/");
  };

  return (
    <main className="container" style={{ maxWidth: "600px" }}>
      <Link to="/">← Back</Link>
      <h2 style={{ marginTop: "1rem" }}>Add a Creator</h2>

      <form onSubmit={addCreator}>
        <label>
          Name
          <input name="name" value={form.name} onChange={handleChange} placeholder="e.g. Ryan Trahan" required />
        </label>
        <label>
          Channel URL
          <input name="url" value={form.url} onChange={handleChange} placeholder="https://youtube.com/@..." required />
        </label>
        <label>
          Description
          <textarea name="description" value={form.description} onChange={handleChange} placeholder="What do they make?" required />
        </label>
        <label>
          Image URL <small>(optional)</small>
          <input name="imageURL" value={form.imageURL} onChange={handleChange} placeholder="https://..." />
        </label>
        <button type="submit" aria-busy={saving} disabled={saving}>
          {saving ? "Adding..." : "Add Creator"}
        </button>
      </form>
    </main>
  );
}