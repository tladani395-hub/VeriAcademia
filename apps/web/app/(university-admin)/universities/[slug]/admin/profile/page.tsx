'use client';
import { useState } from 'react';

export default function AdminProfilePage() {
  const [saved, setSaved] = useState(false);
  return (
    <div>
      <section className="page-hero">
        <div className="wrap">
          <p className="eyebrow mono">UNIVERSITY ADMIN · PROFILE</p>
          <h1>Edit university profile</h1>
          <p className="lede">Update the public-facing information for this institution.</p>
        </div>
      </section>
      <section>
        <div className="wrap">
          <form className="research-card" onSubmit={(e) => { e.preventDefault(); setSaved(true); }}>
            <label>University name<input defaultValue="CHARUSAT University" /></label>
            <label>Description<textarea defaultValue="Charotar University of Science and Technology — a leading research institution in Gujarat, India." rows={3} /></label>
            <label>Website<input type="url" defaultValue="https://charusat.ac.in" /></label>
            <label>City<input defaultValue="Anand, Gujarat" /></label>
            <label>Country<input defaultValue="India" /></label>
            <div className="form-row">
              <button className="btn primary" type="submit">{saved ? 'Saved ✓' : 'Save changes'}</button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
