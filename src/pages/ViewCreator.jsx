import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "../client";

export default function ViewCreator() {
  const { id } = useParams();
  const [creator, setCreator] = useState(null);

  useEffect(() => {
    async function fetchCreator() {
      const { data } = await supabase
        .from("creators")
        .select("*")
        .eq("id", id)
        .single();
      setCreator(data);
    }
    fetchCreator();
  }, [id]);

  if (!creator) return (
    <main className="container">
      <p aria-busy="true">Loading...</p>
    </main>
  );

  return (
    <main className="container" style={{ maxWidth: "680px" }}>
      <Link to="/">← Back to all creators</Link>

      <article style={{ marginTop: "1.5rem" }}>
        {creator.imageURL && (
          <img
            src={creator.imageURL}
            alt={creator.name}
            style={{ width: "100%", maxHeight: "320px", objectFit: "cover", borderRadius: "8px", marginBottom: "1rem" }}
          />
        )}
        <hgroup>
          <h2>{creator.name}</h2>
          <a href={creator.url} target="_blank" rel="noreferrer">{creator.url}</a>
        </hgroup>
        <p>{creator.description}</p>

        <div style={{ display: "flex", gap: "1rem", marginTop: "1.5rem" }}>
          <a href={creator.url} target="_blank" rel="noreferrer" role="button">Visit Channel</a>
          <Link to={`/edit/${creator.id}`} role="button" className="secondary">Edit</Link>
        </div>
      </article>
    </main>
  );
}