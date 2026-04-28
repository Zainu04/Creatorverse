import { useEffect, useState } from "react";
import { supabase } from "../client";
import CreatorCard from "../components/CreatorCard";
import { Link } from "react-router-dom";

export default function ShowCreators() {
  const [creators, setCreators] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getCreators() {
      const { data } = await supabase.from("creators").select("*").order("id");
      setCreators(data || []);
      setLoading(false);
    }
    getCreators();
  }, []);

  return (
    <main className="container">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
        <div>
          <h1 style={{ margin: 0 }}>✨ Creatorverse</h1>
          <p style={{ margin: 0, color: "var(--pico-muted-color)" }}>Creators worth following</p>
        </div>
        <Link to="/add" role="button">+ Add Creator</Link>
      </div>

      {loading && <p>Loading creators...</p>}

      {!loading && creators.length === 0 && (
        <p>No creators yet. <Link to="/add">Add one!</Link></p>
      )}

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
        gap: "1.5rem"
      }}>
        {creators.map((c) => (
          <CreatorCard key={c.id} creator={c} />
        ))}
      </div>
    </main>
  );
}