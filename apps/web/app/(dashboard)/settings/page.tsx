'use client';

import { useState } from 'react';

export default function SettingsPage() {
  const [saved, setSaved] = useState(false);

  return (
    <div>
      <section className="page-hero">
        <div className="wrap">
          <p className="eyebrow mono">SETTINGS</p>
          <h1>Account settings</h1>
        </div>
      </section>
      <section>
        <div className="wrap">
          <form
            className="research-card"
            onSubmit={(e) => {
              e.preventDefault();
              setSaved(true);
            }}
          >
            <h3>Profile</h3>
            <label>
              Display name
              <input defaultValue="Dr. Ananya Patel" />
            </label>
            <label>
              Email
              <input type="email" defaultValue="ananya@charusat.ac.in" />
            </label>
            <label>
              Institution
              <input defaultValue="CHARUSAT University" />
            </label>
            <div className="form-row">
              <button className="btn primary" type="submit">
                {saved ? 'Saved ✓' : 'Save changes'}
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
