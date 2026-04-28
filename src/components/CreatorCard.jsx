import { Link } from 'react-router-dom';

export default function Card({ creator }) {
  const { id, name, url, description, imageURL } = creator;

  return (
    <div className="card">
      <div className="card-image">
        {imageURL ? (
          <img src={imageURL} alt={name} />
        ) : (
          <div className="card-image-placeholder">
            <span>{name.charAt(0)}</span>
          </div>
        )}
        <div className="card-overlay">
          <Link to={`/creator/${id}`} className="btn-view">View</Link>
          <Link to={`/edit/${id}`} className="btn-edit">Edit</Link>
        </div>
      </div>
      <div className="card-body">
        <h2 className="card-name">{name}</h2>
        <p className="card-description">{description}</p>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="card-link"
        >
          Visit Channel ↗
        </a>
      </div>
    </div>
  );
}