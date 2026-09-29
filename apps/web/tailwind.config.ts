import type { Config } from 'tailwindcss';
const config: Config = { content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'], theme: { extend: { colors: { ink: 'var(--ink)', paper: 'var(--paper)', surface: 'var(--surface)', brand: 'var(--brand)' } } }, plugins: [] };
export default config;
