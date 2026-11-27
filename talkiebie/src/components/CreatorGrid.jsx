import CreatorCard from './CreatorCard';
import '../assets/css/CreatorGrid.css';

export default function CreatorGrid({ creators }) {
    const filters = ['All', 'Free', 'Paid', 'New', 'Popular', 'Nearby'];

    return (
        <div className="creator-grid-wrap">
            <section className="featured-section">
                <h2 className="section-heading">Featured</h2>
                <div className="featured-row scrollbar-hide">
                    {creators.slice(0, 6).map((c) => (
                        <div key={c.id} className="featured-item">
                            <div className="featured-ring">
                                <div className="featured-ring-inner">
                                    <img src={c.avatar} alt={c.name} />
                                </div>
                            </div>
                            <span className="featured-name">{c.name}</span>
                        </div>
                    ))}
                </div>
            </section>

            <div className="filter-pills scrollbar-hide">
                {filters.map((f, i) => (
                    <button key={f} className={`filter-pill ${i === 0 ? 'active' : ''}`}>
                        {f}
                    </button>
                ))}
            </div>

            <div className="creator-grid">
                {creators.map((creator) => (
                    <CreatorCard key={creator.id} creator={creator} />
                ))}
            </div>
        </div>
    );
}