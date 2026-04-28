export default function CreatorCard({ creator }) {
    return (
        <div className="card">
            <img src={creator.imageURL} alt={creator.name} />

            <h2>{creator.name}</h2>

            <p>{creator.description}</p>

            <a href={creator.URL} target="_blank">
                Visit Channel
            </a>
        </div>
    )
}