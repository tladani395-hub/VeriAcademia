export default function AdminVerificationPage() {
  return (
    <div>
      <section className="page-hero">
        <div className="wrap">
          <p className="eyebrow mono">UNIVERSITY ADMIN · VERIFICATION</p>
          <h1>Verification status</h1>
          <p className="lede">Review and manage evidence for institutional verification.</p>
        </div>
      </section>
      <section>
        <div className="wrap detail-grid">
          <div className="detail-main">
            <div className="research-card">
              <h3>Current status</h3>
              <div className="card-top">
                <span className="chip ok">✓ Verified</span>
              </div>
              <p className="muted">This university completed platform review and domain ownership verification on 2025-11-02.</p>
            </div>
            <div className="research-card">
              <h3>Evidence documents</h3>
              <table style={{ width: '100%' }}>
                <tbody>
                  <tr><td>Domain ownership (DNS TXT)</td><td className="mono muted">Confirmed</td></tr>
                  <tr><td>Institutional charter</td><td className="mono muted">Uploaded</td></tr>
                  <tr><td>Administrator identity</td><td className="mono muted">Confirmed</td></tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="detail-side">
            <div className="research-card">
              <h3>Upload evidence</h3>
              <p className="muted">Add supporting documents for verification review.</p>
              <form onSubmit={(e) => e.preventDefault()}>
                <label>Document type
                  <select className="filter-select">
                    <option>Institutional charter</option>
                    <option>Accreditation letter</option>
                    <option>Other</option>
                  </select>
                </label>
                <div className="form-row">
                  <button className="btn primary" type="submit">Upload file</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
