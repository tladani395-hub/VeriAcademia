export default function MyProfilePage() {
  return (
    <div>
      <section className="page-hero">
        <div className="wrap">
          <p className="eyebrow mono">PROFILE</p>
          <h1>My profile</h1>
          <p className="lede">Manage your researcher profile and external identifiers.</p>
        </div>
      </section>
      <section>
        <div className="wrap detail-grid">
          <div className="detail-main">
            <div className="research-card">
              <h3>Profile</h3>
              <p>Dr. Ananya Patel · Associate Professor · Artificial Intelligence</p>
              <p className="muted">CHARUSAT University · <span className="chip ok">✓ Verified</span></p>
            </div>
            <div className="research-card">
              <h3>External profiles</h3>
              <p className="mono">ORCID: 0000-0001-2345-6789</p>
              <p className="mono">Google Scholar · ResearchGate</p>
            </div>
          </div>
          <div className="detail-side">
            <div className="research-card">
              <h3>Stats</h3>
              <div className="mini-stats">
                <span><b>42</b> publications</span>
                <span><b>4</b> patents</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
