import '../assets/css/CreatorCard.css';

export default function CreatorCard({ creator }) {
    const priceLabel = creator.price === 0 ? 'FREE' : `$${creator.price}/mo`;

    return (
        <div className="creator-card">
            <div className="creator-card-media">
                <img src={creator.image} alt={creator.name} className="creator-card-img" />
                <div className="creator-card-gradient" />

                {creator.online && (
                    <div className="creator-card-online">
                        <span className="creator-card-online-dot" />
                        <span>Online</span>
                    </div>
                )}

                <div className="creator-card-price">{priceLabel}</div>

                <div className="creator-card-info">
                    <div className="creator-card-name-row">
                        <h3 className="creator-card-name">{creator.name}</h3>
                        {creator.verified && (
                            <svg className="creator-card-verified" width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                        )}
                    </div>
                    <p className="creator-card-username">@{creator.username}</p>
                </div>
            </div>

            <div className="creator-card-meta">
                <div className="creator-card-stats">
                    <span>{creator.posts} posts</span>
                    <span className="creator-card-dot">·</span>
                    <span>{creator.subscribers} subs</span>
                </div>
                <p className="creator-card-bio">{creator.bio}</p>
            </div>
        </div>
    );
}