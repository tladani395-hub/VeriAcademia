import Link from 'next/link';

export default function AboutPage() {
  return (
    <main>
      <section className="hero" style={{ textAlign: 'center' }}>
        <div className="wrap">
            <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}>Built to Make Academic Knowledge More Discoverable</h1>
            <p className="lede" style={{ margin: '20px auto', maxWidth: 700 }}>
                A trusted platform for researchers, students, institutions, and innovators to discover, share, and connect around academic work.
            </p>
        </div>
      </section>

      <section className="band" style={{ background: 'var(--surface)' }}>
        <div className="wrap">
            <h2>Our Mission</h2>
            <p style={{ fontSize: '1.2rem', color: 'var(--muted)', maxWidth: 800 }}>
                We are dedicated to making academic knowledge easier to discover, fostering collaboration between researchers and students, and helping institutions effectively showcase their research contributions to the global community.
            </p>
        </div>
      </section>

      <section>
        <div className="wrap">
            <h2>Why Trust This Platform?</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
                {['Secure Authentication', 'Transparent Publication Workflow', 'Role-Based Access', 'Data Privacy'].map(item => (
                    <div key={item} className="research-card">
                        <h3>{item}</h3>
                        <p className="muted">We prioritize security and transparency in every step of the research lifecycle.</p>
                    </div>
                ))}
            </div>
        </div>
      </section>

      <section className="band" style={{ background: 'var(--surface)' }}>
        <div className="wrap">
            <h2>Transparent Publication Process</h2>
            <div style={{ display: 'flex', gap: 20, alignItems: 'center', marginTop: 30 }}>
                {['Submit', 'Review', 'Admin Approval', 'Publish', 'Discover'].map((step, i) => (
                    <div key={step} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--brand)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>{i + 1}</div>
                        <span style={{ fontWeight: 600 }}>{step}</span>
                        {i < 4 && <span style={{ color: 'var(--muted)' }}>→</span>}
                    </div>
                ))}
            </div>
        </div>
      </section>

      <section style={{ background: 'var(--paper)', padding: '60px 0' }}>
        <div className="wrap">
            <h2>About the Founder</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 40, alignItems: 'center' }}>
                <div style={{ height: 300, background: 'var(--surface)', borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--line)' }}>
                    [Tirth Ladani Photo]
                </div>
                <div>
                    <h3 style={{ fontSize: 24, marginBottom: 8 }}>Tirth Ladani</h3>
                    <p className="muted" style={{ fontWeight: 600, marginBottom: 20 }}>IT Student & Developer</p>
                    <p style={{ fontSize: 1.1, lineHeight: 1.6, color: 'var(--ink)' }}>
                        "VeriAcademia was built from the realization that academic research, while fundamental, is often siloed and difficult to discover. My goal is to use modern technology to bridge that gap—empowering students and researchers by making academic knowledge transparent, accessible, and connected globally."
                    </p>
                </div>
            </div>
        </div>
      </section>
    </main>
  );
}
