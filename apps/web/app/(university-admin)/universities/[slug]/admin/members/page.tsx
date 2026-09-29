export default function AdminMembersPage() {
  const members = [
    { name: 'Dr. Ananya Patel', email: 'ananya@charusat.ac.in', role: 'University Admin', status: 'Active' },
    { name: 'Prof. R. Mehta', email: 'rmehta@charusat.ac.in', role: 'Reviewer', status: 'Active' },
    { name: 'Ms. Priya Shah', email: 'pshah@charusat.ac.in', role: 'Member', status: 'Invited' },
  ];
  return (
    <div>
      <section className="page-hero">
        <div className="wrap">
          <p className="eyebrow mono">UNIVERSITY ADMIN · MEMBERS</p>
          <h1>Members</h1>
          <p className="lede">Manage university staff, reviewers and administrators.</p>
        </div>
      </section>
      <section>
        <div className="wrap">
          <div className="publication-list">
            {members.map((m) => (
              <div className="publication-card" key={m.email}>
                <div className="card-top">
                  <span className="mono">{m.role.toUpperCase()}</span>
                  <span className={`chip ${m.status === 'Active' ? 'ok' : 'pending'}`}>
                    {m.status === 'Active' ? '✓' : '◔'} {m.status}
                  </span>
                </div>
                <h2>{m.name}</h2>
                <p className="mono muted">{m.email}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
