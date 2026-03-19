import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useGetAllApartmentsQuery } from '../../store/api/apartment';

/* ─── Injected global styles ─── */
const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Jost:wght@300;400;500&display=swap');

  :root {
    --gold: #c9a96e;
    --gold-light: #d4ba85;
    --bg: #0e0c0a;
    --bg-2: #141210;
    --bg-3: #1a1612;
    --border: #2a2520;
    --text: #f0ebe3;
    --muted: #9a9088;
    --dim: #7a7168;
  }

  .apt-page * { box-sizing: border-box; margin: 0; padding: 0; }

  .apt-page {
    font-family: 'Jost', sans-serif;
    background: var(--bg);
    color: var(--text);
    min-height: 100vh;
  }

  /* ── LOADING ── */
  .apt-loading {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: var(--bg);
    gap: 1.5rem;
  }
  .apt-spinner {
    width: 48px; height: 48px;
    border: 2px solid var(--border);
    border-top-color: var(--gold);
    border-radius: 50%;
    animation: spin 0.9s linear infinite;
  }
  @keyframes spin { to { transform: rotate(360deg); } }
  .apt-loading p { font-size: 0.8rem; letter-spacing: 0.2em; text-transform: uppercase; color: var(--dim); }

  /* ── ERROR / EMPTY ── */
  .apt-state-box {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--bg);
  }
  .apt-state-inner {
    text-align: center;
    padding: 3rem;
    border: 1px solid var(--border);
    background: var(--bg-2);
    max-width: 400px;
    width: 100%;
  }
  .apt-state-inner h2 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.8rem;
    font-weight: 400;
    color: var(--text);
    margin-bottom: 0.75rem;
  }
  .apt-state-inner p { font-size: 0.85rem; color: var(--muted); margin-bottom: 2rem; }
  .apt-btn-gold {
    display: inline-block;
    background: transparent;
    border: 1px solid var(--gold);
    color: var(--gold);
    padding: 0.7rem 2rem;
    font-family: 'Jost', sans-serif;
    font-size: 0.72rem;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    text-decoration: none;
    transition: background 0.3s, color 0.3s;
    cursor: pointer;
  }
  .apt-btn-gold:hover { background: var(--gold); color: var(--bg); }

  /* ── PAGE HEADER ── */
  .apt-header {
    text-align: center;
    padding: 5rem 2rem 3rem;
    border-bottom: 1px solid var(--border);
    position: relative;
  }
  .apt-header::before {
    content: '';
    position: absolute;
    top: 0; left: 50%; transform: translateX(-50%);
    width: 1px; height: 3rem;
    background: var(--gold);
    opacity: 0.5;
  }
  .apt-header-tag {
    font-size: 0.68rem;
    letter-spacing: 0.25em;
    text-transform: uppercase;
    color: var(--gold);
    margin-bottom: 1rem;
    display: block;
  }
  .apt-header h1 {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(2rem, 5vw, 3.5rem);
    font-weight: 300;
    color: var(--text);
    margin-bottom: 0.75rem;
  }
  .apt-header p {
    font-size: 0.9rem;
    color: var(--muted);
    max-width: 500px;
    margin: 0 auto;
  }

  /* ── CONTAINER ── */
  .apt-container {
    max-width: 1280px;
    margin: 0 auto;
    padding: 4rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 6rem;
  }

  /* ── APARTMENT CARD ── */
  .apt-card {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0;
    border: 1px solid var(--border);
    background: var(--bg-2);
    animation: fadeUp 0.6s ease both;
    position: relative;
    transition: box-shadow 0.3s ease-in-out;
  }
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(24px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .apt-card:nth-child(2) { animation-delay: 0.15s; }
  .apt-card:nth-child(3) { animation-delay: 0.3s; }

  /* ── GALLERY SIDE ── */
  .apt-gallery {
    position: relative;
    background: var(--bg-3);
    display: flex;
    flex-direction: column;
  }

  /* Carousel */
  .apt-carousel {
    position: relative;
    width: 100%;
    height: 280px;
    overflow: hidden;
    background: var(--bg-3);
    flex-shrink: 0;
  }
  .apt-carousel-img {
    width: 100%;
    height: 280px;
    object-fit: cover;
    display: block;
  }
  .apt-carousel-btn {
    position: absolute;
    top: 50%; transform: translateY(-50%);
    background: rgba(14,12,10,0.72);
    border: 1px solid rgba(201,169,110,0.3);
    color: var(--gold);
    width: 36px; height: 36px;
    display: flex; align-items: center; justify-content: center;
    cursor: pointer;
    font-size: 1.2rem;
    z-index: 10;
    transition: background 0.2s, border-color 0.2s;
    line-height: 1;
  }
  .apt-carousel-btn:hover { background: rgba(201,169,110,0.15); border-color: var(--gold); }
  .apt-carousel-btn.prev { left: 0.75rem; }
  .apt-carousel-btn.next { right: 0.75rem; }

  .apt-img-counter {
    position: absolute;
    bottom: 0.65rem; right: 0.65rem;
    background: rgba(14,12,10,0.85);
    border: 1px solid rgba(201,169,110,0.28);
    color: var(--gold);
    font-size: 0.58rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    padding: 0.22rem 0.6rem;
    pointer-events: none;
    z-index: 5;
  }

  .apt-dots {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 6px;
    padding: 0.55rem 0;
    background: var(--bg);
    border-top: 1px solid var(--border);
  }
  .apt-dot {
    width: 5px; height: 5px;
    border-radius: 50%;
    background: var(--border);
    border: 1px solid var(--dim);
    cursor: pointer;
    transition: background 0.2s, transform 0.2s;
    padding: 0;
  }
  .apt-dot.active { background: var(--gold); border-color: var(--gold); transform: scale(1.2); }

  .apt-gallery-placeholder {
    width: 100%; height: 280px;
    display: flex; align-items: center; justify-content: center;
    color: var(--dim); font-size: 0.75rem; letter-spacing: 0.15em; text-transform: uppercase;
  }

  /* ── DETAILS SIDE ── */
  .apt-details {
    padding: 2.5rem;
    display: flex;
    flex-direction: column;
    border-left: 1px solid var(--border);
  }
  .apt-badge {
    display: inline-block;
    font-size: 0.62rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--gold);
    border: 1px solid rgba(201,169,110,0.3);
    padding: 0.25rem 0.75rem;
    margin-bottom: 1.25rem;
    width: fit-content;
  }
  .apt-name {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(1.6rem, 3vw, 2.4rem);
    font-weight: 400;
    color: var(--text);
    line-height: 1.15;
    margin-bottom: 0.5rem;
  }
  .apt-location {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.82rem;
    color: var(--dim);
    margin-bottom: 2rem;
    letter-spacing: 0.05em;
  }
  .apt-location-dot {
    width: 5px; height: 5px;
    border-radius: 50%;
    background: var(--gold);
    flex-shrink: 0;
  }

  /* PRICE ROW */
  .apt-price-row {
    display: flex;
    align-items: baseline;
    gap: 0.5rem;
    padding: 1.25rem 0;
    border-top: 1px solid var(--border);
    border-bottom: 1px solid var(--border);
    margin-bottom: 2rem;
  }
  .apt-price {
    font-family: 'Cormorant Garamond', serif;
    font-size: 2rem;
    font-weight: 400;
    color: var(--gold);
  }
  .apt-price-unit {
    font-size: 0.78rem;
    color: var(--dim);
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  /* SPECS GRID */
  .apt-specs {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1px;
    background: var(--border);
    border: 1px solid var(--border);
    margin-bottom: 2rem;
  }
  .apt-spec {
    background: var(--bg-2);
    padding: 1rem 0.75rem;
    text-align: center;
  }
  .apt-spec-val {
    display: block;
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.5rem;
    font-weight: 400;
    color: var(--text);
    margin-bottom: 0.2rem;
  }
  .apt-spec-lbl {
    display: block;
    font-size: 0.6rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--dim);
  }

  /* DESCRIPTION */
  .apt-section-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.1rem;
    font-weight: 400;
    color: var(--text);
    margin-bottom: 0.5rem;
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }
  .apt-section-title::after {
    content: '';
    flex: 1;
    height: 1px;
    background: var(--border);
  }
  .apt-description {
    font-size: 0.85rem;
    color: var(--muted);
    line-height: 1.85;
    margin-bottom: 2rem;
  }

  /* AMENITIES */
  .apt-amenities {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.5rem;
    margin-bottom: 2rem;
  }
  .apt-amenity {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    font-size: 0.78rem;
    color: var(--muted);
    padding: 0.5rem 0;
    border-bottom: 1px solid rgba(42,37,32,0.6);
  }
  .apt-amenity-dot {
    width: 4px; height: 4px;
    border-radius: 50%;
    background: var(--gold);
    flex-shrink: 0;
  }

  /* FACILITIES */
  .apt-facilities {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 2rem;
  }
  .apt-facility-tag {
    font-size: 0.65rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--gold);
    border: 1px solid rgba(201,169,110,0.25);
    background: rgba(201,169,110,0.05);
    padding: 0.3rem 0.75rem;
  }

  /* ACTION BUTTONS */
  .apt-actions {
    margin-top: auto;
    padding-top: 2rem;
    border-top: 1px solid var(--border);
    display: flex;
    gap: 1rem;
  }
  .apt-btn-primary {
    flex: 1;
    background: var(--gold);
    color: var(--bg);
    border: none;
    padding: 0.9rem 1rem;
    font-family: 'Jost', sans-serif;
    font-size: 0.72rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    cursor: pointer;
    font-weight: 500;
    transition: background 0.3s;
  }
  .apt-btn-primary:hover { background: var(--gold-light); }
  .apt-btn-secondary {
    flex: 1;
    background: transparent;
    color: var(--gold);
    border: 1px solid rgba(201,169,110,0.4);
    padding: 0.9rem 1rem;
    font-family: 'Jost', sans-serif;
    font-size: 0.72rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    cursor: pointer;
    transition: border-color 0.3s, background 0.3s;
  }
  .apt-btn-secondary:hover { border-color: var(--gold); background: rgba(201,169,110,0.05); }

  /* ── FOOTER ── */
  .apt-footer {
    text-align: center;
    padding: 2.5rem;
    border-top: 1px solid var(--border);
    font-size: 0.68rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--dim);
  }
  .apt-footer span {
    color: var(--gold);
    margin: 0 0.5rem;
  }

  /* ── RESPONSIVE ── */
  @media (max-width: 900px) {
    .apt-card { grid-template-columns: 1fr; }
    .apt-details { border-left: none; border-top: 1px solid var(--border); }
    .apt-carousel { height: 220px; }
    .apt-carousel-img { height: 220px; }
    .apt-gallery-placeholder { height: 220px; }
  }
  @media (max-width: 560px) {
    .apt-amenities { grid-template-columns: 1fr; }
    .apt-specs { grid-template-columns: repeat(2, 1fr); }
    .apt-actions { flex-direction: column; }
  }
`;

/* ─── Inject styles once ─── */
if (typeof document !== 'undefined' && !document.getElementById('apt-luxury-styles')) {
  const tag = document.createElement('style');
  tag.id = 'apt-luxury-styles';
  tag.textContent = STYLES;
  document.head.appendChild(tag);
}

/* ─── Main Component ─── */
const ApartmentDetails = () => {
  const { data: apartments, isLoading, error } = useGetAllApartmentsQuery();
  const [currentImageIndexes, setCurrentImageIndexes] = useState({});
  const location = useLocation();
  const apartmentRefs = useRef({});

  // Get apartment ID from URL query params
  const queryParams = new URLSearchParams(location.search);
  const highlightId = queryParams.get('id');

  const API_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:8000';

  // Scroll to highlighted apartment when data loads
  useEffect(() => {
    if (!isLoading && apartments && highlightId) {
      // Small delay to ensure DOM is ready
      setTimeout(() => {
        const element = apartmentRefs.current[highlightId];
        if (element) {
          element.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center',
            inline: 'nearest'
          });
          
          // Add highlight effect
          element.style.transition = 'box-shadow 0.3s ease-in-out';
          element.style.boxShadow = '0 0 0 3px var(--gold)';
          
          // Remove highlight after 2 seconds
          setTimeout(() => {
            element.style.boxShadow = '';
          }, 2000);
        }
      }, 100);
    }
  }, [isLoading, apartments, highlightId]);

  const getImageUrl = (imagePath) => {
    if (!imagePath) return null;
    if (typeof imagePath === 'object') {
      const found = [
        imagePath.url, imagePath.image, imagePath.image_url,
        imagePath.photo, imagePath.photo_url, imagePath.media_url,
        imagePath.file, imagePath.path, imagePath.src
      ].find(p => typeof p === 'string');
      return found ? getImageUrl(found) : null;
    }
    const s = String(imagePath);
    if (s.startsWith('http')) return s;
    if (s.startsWith('/')) return `${API_URL}${s}`;
    return `${API_URL}/media/${s}`;
  };

  const getApartmentImages = (apartment) => {
    if (Array.isArray(apartment.images))
      return apartment.images.map(getImageUrl).filter(Boolean);
    if (apartment.images && Array.isArray(apartment.images.urls))
      return apartment.images.urls.map(getImageUrl).filter(Boolean);
    if (apartment.image) { const u = getImageUrl(apartment.image); return u ? [u] : []; }
    for (const p of ['photos','pictures','gallery','media','property_images'])
      if (Array.isArray(apartment[p])) return apartment[p].map(getImageUrl).filter(Boolean);
    return [];
  };

  const handleNextImage = (id, total) =>
    setCurrentImageIndexes(prev => ({ ...prev, [id]: ((prev[id] || 0) + 1) % total }));
  const handlePrevImage = (id, total) =>
    setCurrentImageIndexes(prev => ({ ...prev, [id]: ((prev[id] || 0) - 1 + total) % total }));
  const setImage = (id, idx) =>
    setCurrentImageIndexes(prev => ({ ...prev, [id]: idx }));

  const safe = (v, def = '—') => {
    if (typeof v === 'string' || typeof v === 'number') return v;
    if (v && typeof v === 'object') return v.name || v.title || v.text || def;
    return def;
  };

  const getName = a => (typeof a.name === 'string' ? a.name : a.name?.name || 'Unnamed');
  const getLocation = a => (typeof a.location === 'string' ? a.location : a.location?.address || a.location?.name || 'Location N/A');
  const getDesc = a => (typeof a.description === 'string' ? a.description : a.description?.text || a.description?.overview || 'No description available.');
  const getAmenities = a => Array.isArray(a.amenities) ? a.amenities : (Array.isArray(a.amenities?.items) ? a.amenities.items : []);
  const getFacilities = a => Array.isArray(a.facilities) ? a.facilities : (Array.isArray(a.facilities?.items) ? a.facilities.items : []);

  /* ── STATES ── */
  if (isLoading) return (
    <div className="apt-page">
      <div className="apt-loading">
        <div className="apt-spinner" />
        <p>Loading properties</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="apt-page">
      <div className="apt-state-box">
        <div className="apt-state-inner">
          <h2>Unable to Load</h2>
          <p>We couldn't fetch the apartment listings. Please try again.</p>
          <Link to="/" className="apt-btn-gold">Return Home</Link>
        </div>
      </div>
    </div>
  );

  if (!apartments || !Array.isArray(apartments) || apartments.length === 0) return (
    <div className="apt-page">
      <div className="apt-state-box">
        <div className="apt-state-inner">
          <h2>No Listings</h2>
          <p>No apartments are available at this time. Check back soon.</p>
          <Link to="/" className="apt-btn-gold">Browse Properties</Link>
        </div>
      </div>
    </div>
  );

  /* ── MAIN RENDER ── */
  return (
    <div className="apt-page">
      {/* Page Header */}
      <header className="apt-header">
        <span className="apt-header-tag">Curated Collection</span>
        <h1>Available Properties</h1>
        <p>Discover your perfect residence from our handpicked selection of premium apartments.</p>
      </header>

      {/* Listings */}
      <div className="apt-container">
        {apartments.map((apartment, cardIdx) => {
          if (!apartment || typeof apartment !== 'object') return null;

          const id        = apartment.id ?? cardIdx;
          const images    = getApartmentImages(apartment);
          const total     = images.length;
          const curIdx    = currentImageIndexes[id] || 0;
          const amenities = getAmenities(apartment);
          const facilities= getFacilities(apartment);
          const isHighlighted = highlightId && String(highlightId) === String(id);

          return (
            <article 
              className="apt-card" 
              key={id} 
              ref={el => apartmentRefs.current[id] = el}
              style={{ 
                animationDelay: `${cardIdx * 0.12}s`,
                scrollMarginTop: '100px', // Offset for header
                ...(isHighlighted ? { boxShadow: '0 0 0 3px var(--gold)' } : {})
              }}
            >

              {/* ── LEFT: Carousel Gallery ── */}
              <div className="apt-gallery">
                {total > 0 ? (
                  <>
                    <div className="apt-carousel">
                      <img
                        key={curIdx}
                        src={images[curIdx]}
                        alt={`${getName(apartment)} ${curIdx + 1}`}
                        className="apt-carousel-img"
                        onError={e => { e.target.src = 'https://via.placeholder.com/600x280/141210/c9a96e?text=No+Image'; }}
                      />
                      {total > 1 && (
                        <>
                          <button className="apt-carousel-btn prev" onClick={() => handlePrevImage(id, total)}>&#8249;</button>
                          <button className="apt-carousel-btn next" onClick={() => handleNextImage(id, total)}>&#8250;</button>
                        </>
                      )}
                      <div className="apt-img-counter">{curIdx + 1} / {total}</div>
                    </div>
                    {total > 1 && (
                      <div className="apt-dots">
                        {images.map((_, i) => (
                          <button
                            key={i}
                            className={`apt-dot${i === curIdx ? ' active' : ''}`}
                            onClick={() => setImage(id, i)}
                          />
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <div className="apt-gallery-placeholder">No Images Available</div>
                )}
              </div>

              {/* ── RIGHT: Details ── */}
              <div className="apt-details">
                <span className="apt-badge">Premium Listing</span>

                <h2 className="apt-name">{getName(apartment)}</h2>

                <div className="apt-location">
                  <span className="apt-location-dot" />
                  {getLocation(apartment)}
                </div>

                {/* Price */}
                <div className="apt-price-row">
                  <span className="apt-price">
                    {typeof apartment.price === 'number'
                      ? `$${apartment.price.toLocaleString()}`
                      : safe(apartment.price, 'Price on request')}
                  </span>
                  {typeof apartment.price === 'number' && (
                    <span className="apt-price-unit">/ month</span>
                  )}
                </div>

                {/* Specs */}
                <div className="apt-specs">
                  <div className="apt-spec">
                    <span className="apt-spec-val">
                      {apartment.area ? safe(apartment.area) : '1,200'}
                    </span>
                    <span className="apt-spec-lbl">sq ft</span>
                  </div>
                  <div className="apt-spec">
                    <span className="apt-spec-val">
                      {apartment.bedrooms ? safe(apartment.bedrooms) : '2'}
                    </span>
                    <span className="apt-spec-lbl">Bedrooms</span>
                  </div>
                  <div className="apt-spec">
                    <span className="apt-spec-val">
                      {apartment.bathrooms ? safe(apartment.bathrooms) : '2'}
                    </span>
                    <span className="apt-spec-lbl">Bathrooms</span>
                  </div>
                </div>

                {/* Description */}
                <div style={{ marginBottom: '1.75rem' }}>
                  <p className="apt-section-title">Overview</p>
                  <p className="apt-description">{getDesc(apartment)}</p>
                </div>

                {/* Amenities */}
                {amenities.length > 0 && (
                  <div style={{ marginBottom: '1.5rem' }}>
                    <p className="apt-section-title">Amenities</p>
                    <div className="apt-amenities">
                      {amenities.map((a, i) => (
                        <div key={i} className="apt-amenity">
                          <span className="apt-amenity-dot" />
                          {safe(a)}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Facilities */}
                {facilities.length > 0 && (
                  <div style={{ marginBottom: '1.5rem' }}>
                    <p className="apt-section-title">Building Facilities</p>
                    <div className="apt-facilities">
                      {facilities.map((f, i) => (
                        <span key={i} className="apt-facility-tag">{safe(f)}</span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="apt-actions">
                  <button className="apt-btn-primary">Book Now</button>
                  <button className="apt-btn-secondary">Request Visit</button>
                </div>
              </div>

            </article>
          );
        })}
      </div>
    </div>
  );
};

export default ApartmentDetails;