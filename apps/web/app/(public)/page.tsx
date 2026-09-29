'use client';

import Link from 'next/link';
import { Hero3DCanvas } from '../../components/Hero3DCanvas';
import { Card3D } from '../../components/Card3D';
import { SearchBar } from '../../components/SearchBar';

const paths = [
  [
    'Discover',
    'Browse verified universities, accredited researchers, publications, and patents without needing an account.',
  ],
  [
    'Join',
    'Register your academic institution, confirm domain ownership, and onboard accredited department members.',
  ],
  [
    'Contribute',
    'Maintain your researcher identity, publish verified papers, and link tamper-proof evidence records.',
  ],
  [
    'Govern',
    'Audit affiliations, review submissions, manage institutional roles, and export cryptographically signed records.',
  ],
];

export default function HomePage() {
  return (
    <div>
      {/* Hero Section with Interactive 3D Canvas Background */}
      <section className="hero" style={{ position: 'relative', overflow: 'hidden', minHeight: '560px' }}>
        <Hero3DCanvas />
        <div className="wrap hero-grid" style={{ position: 'relative', zIndex: 1 }}>
          <div>
            <p className="eyebrow mono" style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              <span style={{ display: 'inline-block', width: 8, height: 8, borderRadius: '50%', background: 'var(--success)' }} />
              VERIFIED ACADEMIC NETWORK PROTOCOL
            </p>
            <h1 style={{ fontSize: 'clamp(2.4rem, 4vw, 3.6rem)', marginTop: 12, marginBottom: 16 }}>
              Research you can trace back to a verified university.
            </h1>
            <p className="lede">
              Discover accredited universities, verified scholars, and immutable research. Every record displays cryptographic proof, reviewer history, and domain trust signatures.
            </p>

            <SearchBar />

            <div className="chips" style={{ marginTop: 24 }}>
              <span className="chip ok">✓ Verified Institution</span>
              <span className="chip pend">◔ Peer Audit Pending</span>
              <span className="chip req">🔒 Request Access</span>
            </div>
          </div>

          <div style={{ padding: '10px 0' }}>
            <Card3D />
          </div>
        </div>
      </section>

      {/* Live Platform Stats */}
      <section style={{ borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)', background: 'var(--surface)', padding: '36px 0' }}>
        <div className="wrap" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 24, textAlign: 'center' }}>
          <div>
            <div style={{ fontSize: 32, fontWeight: 700, color: 'var(--brand)', fontFamily: 'var(--display)' }}>140+</div>
            <div className="mono" style={{ color: 'var(--muted)', fontSize: 13, marginTop: 4 }}>VERIFIED UNIVERSITIES</div>
          </div>
          <div>
            <div style={{ fontSize: 32, fontWeight: 700, color: 'var(--brand)', fontFamily: 'var(--display)' }}>18,400+</div>
            <div className="mono" style={{ color: 'var(--muted)', fontSize: 13, marginTop: 4 }}>ACCUMULATED PAPERS</div>
          </div>
          <div>
            <div style={{ fontSize: 32, fontWeight: 700, color: 'var(--brand)', fontFamily: 'var(--display)' }}>99.98%</div>
            <div className="mono" style={{ color: 'var(--muted)', fontSize: 13, marginTop: 4 }}>EVIDENCE SIGNATURE MATCH</div>
          </div>
          <div>
            <div style={{ fontSize: 32, fontWeight: 700, color: 'var(--brand)', fontFamily: 'var(--display)' }}>34</div>
            <div className="mono" style={{ color: 'var(--muted)', fontSize: 13, marginTop: 4 }}>INTERNATIONAL PARTNERS</div>
          </div>
        </div>
      </section>

      {/* Four Pillars */}
      <section>
        <div className="wrap">
          <div className="section-head" style={{ marginBottom: 40, textAlign: 'center' }}>
            <p className="eyebrow mono">DISCOVER · JOIN · CONTRIBUTE · GOVERN</p>
            <h2 style={{ fontSize: '2.2rem' }}>Four Pillars of VeriAcademia</h2>
            <p style={{ maxWidth: '64ch', margin: '0 auto', color: 'var(--muted)' }}>
              A multi-tier platform built for high-trust academic transparency. Server-side role enforcement protects confidential research while celebrating open discoveries.
            </p>
          </div>
          <div className="paths">
            {paths.map(([title, text], i) => (
              <Link
                className="path"
                href={i === 0 ? '/universities' : '/auth/sign-up'}
                key={title}
                style={{ position: 'relative', overflow: 'hidden' }}
              >
                <span className="mono" style={{ color: 'var(--brand)', fontWeight: 700, fontSize: 14 }}>
                  0{i + 1}
                </span>
                <h3 style={{ margin: '12px 0 8px', fontSize: 22 }}>{title}</h3>
                <p style={{ margin: 0, color: 'var(--muted)', fontSize: 14.5, lineHeight: 1.5 }}>{text}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Verification Chain Section */}
      <section className="band" style={{ padding: '80px 0' }}>
        <div className="wrap split">
          <div>
            <p className="eyebrow mono">TRUST PROTOCOL</p>
            <h2 style={{ fontSize: '2.2rem', marginBottom: 16 }}>How a publication earns the Verified mark</h2>
            <p className="muted" style={{ fontSize: 17, marginBottom: 28 }}>
              No document becomes public simply by uploading. Every entry passes through automated domain authentication and institutional peer checks.
            </p>
            <ol className="steps" style={{ display: 'flex', flexDirection: 'column', gap: 20, paddingLeft: 20 }}>
              <li>
                <strong style={{ fontSize: 17, color: 'var(--ink)' }}>1. University Domain Validation</strong>
                <p style={{ margin: '4px 0 0', color: 'var(--muted)', fontSize: 14.5 }}>
                  Platform verifiers check DNS records and official registrar identity.
                </p>
              </li>
              <li>
                <strong style={{ fontSize: 17, color: 'var(--ink)' }}>2. Institutional Member Approval</strong>
                <p style={{ margin: '4px 0 0', color: 'var(--muted)', fontSize: 14.5 }}>
                  University administrators approve researcher profiles matching official department rosters.
                </p>
              </li>
              <li>
                <strong style={{ fontSize: 17, color: 'var(--ink)' }}>3. Evidence Audit & Cryptographic Seal</strong>
                <p style={{ margin: '4px 0 0', color: 'var(--muted)', fontSize: 14.5 }}>
                  Submissions generate unique SHA-256 hashes linked to reviewer timestamps.
                </p>
              </li>
            </ol>
          </div>

          <div className="access-card" style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 16, padding: 32 }}>
            <span className="mono" style={{ color: 'var(--brand)', fontWeight: 700 }}>VERIFIED AUDIT LOG</span>
            <h3 style={{ fontSize: 22, marginTop: 8, marginBottom: 20 }}>Granular Access Control</h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ padding: 14, background: 'var(--paper)', borderRadius: 10, borderLeft: '4px solid var(--brand)' }}>
                <strong style={{ display: 'block', fontSize: 15 }}>Public Readers</strong>
                <span style={{ fontSize: 13.5, color: 'var(--muted)' }}>Search index, view abstracts, citations & domain credentials.</span>
              </div>
              <div style={{ padding: 14, background: 'var(--paper)', borderRadius: 10, borderLeft: '4px solid var(--gold)' }}>
                <strong style={{ display: 'block', fontSize: 15 }}>Verified Scholars</strong>
                <span style={{ fontSize: 13.5, color: 'var(--muted)' }}>Request direct peer access for restricted pre-prints & datasets.</span>
              </div>
              <div style={{ padding: 14, background: 'var(--paper)', borderRadius: 10, borderLeft: '4px solid var(--success)' }}>
                <strong style={{ display: 'block', fontSize: 15 }}>Institutional Admin</strong>
                <span style={{ fontSize: 13.5, color: 'var(--muted)' }}>Full member management, role assignment, and audit trail export.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section style={{ padding: '60px 0 80px' }}>
        <div className="wrap cta" style={{ borderRadius: 20, boxShadow: '0 25px 50px -12px var(--shadow-lg)' }}>
          <p className="eyebrow mono" style={{ color: '#fff', opacity: 0.9 }}>VERIFIED INSTITUTIONAL RECORD</p>
          <h2 style={{ fontSize: '2.5rem', color: '#fff', margin: '12px 0 16px' }}>
            Bring your university&apos;s research into one verified network.
          </h2>
          <p style={{ opacity: 0.9, maxWidth: '54ch', margin: '0 auto 32px', fontSize: 18 }}>
            Claim your institutional domain, verify department members, and showcase traceable academic output to the world.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link className="btn" href="/auth/sign-up" style={{ background: '#fff', color: 'var(--brand)', borderColor: '#fff' }}>
              Register Institutional Account
            </Link>
            <Link className="btn" href="/universities" style={{ color: '#fff', borderColor: '#fff', borderWidth: '2px', padding: '0 30px' }}>
              Explore Universities
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
