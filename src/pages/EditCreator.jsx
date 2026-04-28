import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { supabase } from "../client";

export default function EditCreator() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", url: "", description: "", imageURL: "" });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function getData() {
      const { data } = await supabase
        .from("creators")
        .select("*")
        .eq("id", id)
        .single();
      if (data) setForm(data);
    }
    getData();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const update = async (e) => {
    e.preventDefault();
    setSaving(true);
    await supabase.from("creators").update(form).eq("id", id);
    navigate(`/creator/${id}`);
  };

  const deleteCreator = async () => {
    if (!window.confirm(`Delete ${form.name}?`)) return;
    await supabase.from("creators").delete().eq("id", id);
    navigate("/");
  };

  return (
    <main className="container" style={{ maxWidth: "600px" }}>
      <Link to={`/creator/${id}`}>← Back</Link>
      <h2 style={{ marginTop: "1rem" }}>Edit {form.name}</h2>

      <form onSubmit={update}>
        <label>
          Name
          <input name="name" value={form.name} onChange={handleChange} required />
        </label>
        <label>
          Channel URL
          <input name="url" value={form.url} onChange={handleChange} required />
        </label>
        <label>
          Description
          <textarea name="description" value={form.description} onChange={handleChange} required />
        </label>
        <label>
          Image URL <small>(optional)</small>
          <input name="imageURL" value={form.imageURL || ""} onChange={handleChange} />
        </label>
        <div style={{ display: "flex", gap: "1rem" }}>
          <button type="submit" aria-busy={saving} disabled={saving}>
            {saving ? "Saving..." : "Save Changes"}
          </button>
          <button type="button" className="secondary" onClick={deleteCreator} style={{ color: "red" }}>
            Delete Creator
          </button>
        </div>
      </form>
    </main>
  );
}