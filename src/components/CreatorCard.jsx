import { Link } from "react-router-dom";

export default function CreatorCard({ creator }) {
  return (
    <div>
      <h2>{creator.name}</h2>

      <p>{creator.description}</p>

      <a href={creator.url} target="_blank">
        Visit
      </a>

      <br />

      <Link to={`/creator/${creator.id}`}>View</Link>
      <Link to={`/edit/${creator.id}`}>Edit</Link>
    </div>
  );
}