import { useState, useEffect, useContext, createContext, useCallback, useRef } from "react";

// ─── GLOBAL CSS ───────────────────────────────────────────────────────────────
const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400&family=Montserrat:wght@300;400;500;600;700;800&family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap');

  :root {
    --gold-50: #fffdf0;
    --gold-100: #fef9c3;
    --gold-200: #fef08a;
    --gold-300: #fde047;
    --gold-400: #facc15;
    --gold-500: #eab308;
    --gold-600: #ca8a04;
    --gold-700: #a16207;
    --gold-800: #854d0e;
    --gold-900: #713f12;
    --gold-deep: #b8860b;
    --gold-light: #ffd700;
    --gold-shine: #f5c518;
    --dark-bg: #0d0a05;
    --dark-surface: #1a1208;
    --dark-card: #221a0a;
    --dark-border: rgba(218,165,32,0.2);
    --dark-text: #f5f0e8;
    --dark-muted: #9a8a6a;
    --cream: #faf6ef;
    --cream-dark: #f0e8d8;
    --font-display: 'Cormorant Garamond', serif;
    --font-body: 'Montserrat', sans-serif;
    --shadow-gold: 0 0 30px rgba(218,165,32,0.15), 0 4px 20px rgba(0,0,0,0.4);
    --shadow-gold-hover: 0 0 50px rgba(218,165,32,0.3), 0 8px 40px rgba(0,0,0,0.5);
    --gradient-gold: linear-gradient(135deg, #b8860b 0%, #ffd700 40%, #daa520 60%, #b8860b 100%);
    --gradient-dark: linear-gradient(180deg, #0d0a05 0%, #1a1208 100%);
  }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  html, body { height: 100%; font-family: var(--font-body); }
  body { background: var(--dark-bg); color: var(--dark-text); overflow-x: hidden; }
  #root { min-height: 100vh; }

  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: var(--dark-bg); }
  ::-webkit-scrollbar-thumb { background: var(--gold-700); border-radius: 3px; }

  .gold-text {
    background: var(--gradient-gold);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  @keyframes shimmer {
    0% { background-position: -200% center; }
    100% { background-position: 200% center; }
  }
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  @keyframes glow-pulse {
    0%, 100% { box-shadow: 0 0 20px rgba(218,165,32,0.2); }
    50% { box-shadow: 0 0 40px rgba(218,165,32,0.5); }
  }
  @keyframes rotate {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
  }

  .animate-fade-in-up { animation: fadeInUp 0.6s ease forwards; }
  .animate-fade-in { animation: fadeIn 0.4s ease forwards; }
  .animate-float { animation: float 3s ease-in-out infinite; }
  .animate-glow { animation: glow-pulse 2s ease-in-out infinite; }

  .glass-card {
    background: rgba(34, 26, 10, 0.8);
    backdrop-filter: blur(20px);
    border: 1px solid var(--dark-border);
    border-radius: 16px;
    box-shadow: var(--shadow-gold);
    transition: all 0.3s ease;
  }
  .glass-card:hover { box-shadow: var(--shadow-gold-hover); border-color: rgba(218,165,32,0.4); }

  .btn-gold {
    background: var(--gradient-gold);
    color: #1a0f00;
    border: none;
    border-radius: 8px;
    font-family: var(--font-body);
    font-weight: 700;
    font-size: 0.85rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    cursor: pointer;
    padding: 14px 32px;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(218,165,32,0.3);
  }
  .btn-gold:hover { transform: translateY(-2px); box-shadow: 0 8px 25px rgba(218,165,32,0.5); filter: brightness(1.1); }
  .btn-gold:active { transform: translateY(0); }
  .btn-gold:disabled { opacity: 0.7; cursor: not-allowed; transform: none; }

  .btn-outline {
    background: transparent;
    color: var(--gold-400);
    border: 1px solid rgba(218,165,32,0.5);
    border-radius: 8px;
    font-family: var(--font-body);
    font-weight: 600;
    font-size: 0.8rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    cursor: pointer;
    padding: 10px 24px;
    transition: all 0.3s ease;
  }
  .btn-outline:hover { background: rgba(218,165,32,0.1); border-color: var(--gold-400); }

  .gold-input {
    width: 100%;
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(218,165,32,0.2);
    border-radius: 10px;
    color: var(--dark-text);
    font-family: var(--font-body);
    font-size: 0.9rem;
    padding: 14px 16px;
    outline: none;
    transition: all 0.3s ease;
  }
  .gold-input:focus { border-color: var(--gold-500); box-shadow: 0 0 0 3px rgba(218,165,32,0.1); }
  .gold-input::placeholder { color: var(--dark-muted); }
  .gold-input option { background: var(--dark-card); }
  select.gold-input { cursor: pointer; }

  .badge {
    display: inline-block;
    padding: 3px 10px;
    border-radius: 20px;
    font-size: 0.7rem;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }
  .badge-gold { background: rgba(218,165,32,0.15); color: var(--gold-400); border: 1px solid rgba(218,165,32,0.3); }
  .badge-green { background: rgba(34,197,94,0.1); color: #86efac; border: 1px solid rgba(34,197,94,0.2); }
  .badge-red { background: rgba(239,68,68,0.1); color: #fca5a5; border: 1px solid rgba(239,68,68,0.2); }
  .badge-yellow { background: rgba(234,179,8,0.1); color: #fde047; border: 1px solid rgba(234,179,8,0.2); }
  .badge-blue { background: rgba(59,130,246,0.1); color: #93c5fd; border: 1px solid rgba(59,130,246,0.2); }

  .star-filled { color: var(--gold-400); }
  .star-empty { color: #4a3f2a; }

  .gold-divider {
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(218,165,32,0.4), transparent);
    margin: 24px 0;
  }

  .sidebar {
    width: 260px;
    min-height: 100vh;
    background: var(--dark-surface);
    border-right: 1px solid var(--dark-border);
    position: fixed;
    left: 0;
    top: 0;
    z-index: 100;
    display: flex;
    flex-direction: column;
    transition: transform 0.3s ease;
  }
  .sidebar-link {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 20px;
    border-radius: 10px;
    color: var(--dark-muted);
    cursor: pointer;
    transition: all 0.2s ease;
    font-size: 0.85rem;
    font-weight: 500;
    text-decoration: none;
    margin: 2px 8px;
  }
  .sidebar-link:hover { background: rgba(218,165,32,0.08); color: var(--gold-400); }
  .sidebar-link.active { background: rgba(218,165,32,0.12); color: var(--gold-400); border-left: 3px solid var(--gold-500); }
  .sidebar-link .material-symbols-outlined { font-size: 20px; }

  .main-with-sidebar { margin-left: 260px; min-height: 100vh; }
  .cards-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 20px; }

  .stat-card {
    background: var(--dark-card);
    border: 1px solid var(--dark-border);
    border-radius: 14px;
    padding: 24px;
    position: relative;
    overflow: hidden;
    transition: all 0.3s ease;
  }
  .stat-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 3px;
    background: var(--gradient-gold);
  }
  .stat-card:hover { transform: translateY(-3px); box-shadow: var(--shadow-gold); }

  .gold-table { width: 100%; border-collapse: collapse; }
  .gold-table th {
    background: rgba(218,165,32,0.08);
    color: var(--gold-600);
    font-size: 0.7rem;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    padding: 14px 16px;
    text-align: left;
    border-bottom: 1px solid var(--dark-border);
  }
  .gold-table td {
    padding: 14px 16px;
    border-bottom: 1px solid rgba(218,165,32,0.06);
    font-size: 0.875rem;
    color: var(--dark-text);
  }
  .gold-table tr:hover td { background: rgba(218,165,32,0.04); }

  .tab-bar {
    display: flex;
    gap: 4px;
    background: var(--dark-surface);
    border: 1px solid var(--dark-border);
    border-radius: 12px;
    padding: 4px;
  }
  .tab-item {
    flex: 1;
    padding: 10px 16px;
    border-radius: 9px;
    cursor: pointer;
    font-size: 0.8rem;
    font-weight: 600;
    letter-spacing: 0.05em;
    color: var(--dark-muted);
    border: none;
    background: transparent;
    font-family: var(--font-body);
    transition: all 0.2s ease;
    text-align: center;
  }
  .tab-item.active { background: rgba(218,165,32,0.15); color: var(--gold-400); }

  .ornament {
    display: flex;
    align-items: center;
    gap: 12px;
    color: var(--gold-700);
    font-size: 0.7rem;
    letter-spacing: 0.3em;
    text-transform: uppercase;
  }
  .ornament::before, .ornament::after {
    content: '';
    flex: 1;
    height: 1px;
    background: linear-gradient(90deg, transparent, var(--gold-700));
  }
  .ornament::after { background: linear-gradient(90deg, var(--gold-700), transparent); }

  .toast {
    position: fixed;
    bottom: 32px;
    right: 32px;
    z-index: 9999;
    background: var(--dark-card);
    border: 1px solid rgba(218,165,32,0.3);
    border-radius: 12px;
    padding: 16px 24px;
    box-shadow: var(--shadow-gold);
    animation: fadeInUp 0.4s ease;
    display: flex;
    align-items: center;
    gap: 12px;
    min-width: 300px;
    max-width: 400px;
  }

  .modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.8);
    backdrop-filter: blur(8px);
    z-index: 200;
    display: flex;
    align-items: center;
    justify-content: center;
    animation: fadeIn 0.2s ease;
  }
  .modal-content {
    background: var(--dark-card);
    border: 1px solid rgba(218,165,32,0.3);
    border-radius: 20px;
    padding: 40px;
    width: 90%;
    max-width: 600px;
    max-height: 90vh;
    overflow-y: auto;
    box-shadow: var(--shadow-gold-hover);
    animation: fadeInUp 0.3s ease;
  }

  .spinner {
    width: 40px;
    height: 40px;
    border: 3px solid rgba(218,165,32,0.2);
    border-top: 3px solid var(--gold-500);
    border-radius: 50%;
    animation: rotate 0.8s linear infinite;
  }

  .ethereal-bg {
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 0;
    overflow: hidden;
  }

  .notif-dot {
    width: 8px;
    height: 8px;
    background: var(--gold-400);
    border-radius: 50%;
    position: absolute;
    top: 8px;
    right: 8px;
  }

  .vendor-card {
    background: var(--dark-card);
    border: 1px solid var(--dark-border);
    border-radius: 16px;
    overflow: hidden;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  .vendor-card:hover { transform: translateY(-4px); border-color: rgba(218,165,32,0.4); box-shadow: var(--shadow-gold); }

  .price-tag {
    font-family: var(--font-display);
    font-size: 1.6rem;
    font-weight: 600;
    color: var(--gold-400);
  }

  .progress-bar {
    height: 6px;
    background: rgba(218,165,32,0.1);
    border-radius: 3px;
    overflow: hidden;
  }
  .progress-fill {
    height: 100%;
    background: var(--gradient-gold);
    border-radius: 3px;
    transition: width 0.5s ease;
  }

  @media (max-width: 768px) {
    .sidebar { transform: translateX(-100%); }
    .sidebar.open { transform: translateX(0); }
    .main-with-sidebar { margin-left: 0; }
  }

  .section-header {
    font-family: var(--font-display);
    font-size: 2rem;
    font-weight: 300;
    letter-spacing: 0.05em;
  }

  .chip {
    display: inline-block;
    padding: 4px 12px;
    background: rgba(218,165,32,0.1);
    border: 1px solid rgba(218,165,32,0.2);
    border-radius: 20px;
    font-size: 0.72rem;
    font-weight: 500;
    color: var(--gold-400);
    letter-spacing: 0.05em;
  }

  .avatar {
    width: 42px;
    height: 42px;
    border-radius: 50%;
    background: var(--gradient-gold);
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    font-size: 1rem;
    color: var(--dark-bg);
    flex-shrink: 0;
  }

  .rating-stars { display: flex; gap: 2px; align-items: center; }

  .form-label {
    display: block;
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--gold-700);
    margin-bottom: 8px;
  }

  .gold-link {
    color: var(--gold-500);
    cursor: pointer;
    text-decoration: none;
    transition: color 0.2s ease;
  }
  .gold-link:hover { color: var(--gold-300); }

  .img-placeholder {
    width: 100%;
    height: 200px;
    background: linear-gradient(135deg, #2a1f08, #1a1208);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 3rem;
  }

  .shimmer {
    background: linear-gradient(90deg, var(--dark-card) 25%, rgba(218,165,32,0.06) 50%, var(--dark-card) 75%);
    background-size: 400% 100%;
    animation: shimmer 1.5s infinite;
    border-radius: 8px;
  }
`;

// ─── API CONFIG ───────────────────────────────────────────────────────────────
const API_BASE = 'http://localhost:5000/api';

const api = {
  async request(endpoint, options = {}) {
    const token = localStorage.getItem('elysian_token');
    const headers = { 'Content-Type': 'application/json' };
    if (token) headers['Authorization'] = `Bearer ${token}`;
    try {
      const res = await fetch(`${API_BASE}${endpoint}`, { ...options, headers: { ...headers, ...options.headers } });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Request failed');
      return data;
    } catch (err) {
      // Fallback to mock data when backend is not running (development mode)
      if (err instanceof TypeError && err.message.includes('fetch')) {
        console.warn('Backend offline — using mock data for:', endpoint);
        return mockData(endpoint, options);
      }
      throw err;
    }
  },
  get: (endpoint) => api.request(endpoint),
  post: (endpoint, body) => api.request(endpoint, { method: 'POST', body: JSON.stringify(body) }),
  put: (endpoint, body) => api.request(endpoint, { method: 'PUT', body: JSON.stringify(body) }),
  delete: (endpoint) => api.request(endpoint, { method: 'DELETE' }),
};

// ─── MOCK DATA CONSTANTS ──────────────────────────────────────────────────────
const MOCK_VENDORS = [
  { id: 'vendor-001', name: 'Aurora Elegance', business_name: 'Aurora Elegance Events', event_types: ['Wedding','Corporate Gala','Birthday Luxury'], description: 'Premier luxury event specialists with 10+ years crafting unforgettable experiences. We blend opulence with creativity.', rating: 4.9, review_count: 128, payment_preference: 'partial_prepaid', base_price: 150000, verified: true, total_events: 247, address: 'Chennai, Tamil Nadu' },
  { id: 'vendor-002', name: 'Celestial Moments', business_name: 'Celestial Moments Co.', event_types: ['Wedding','Anniversary','Product Launch'], description: 'Transforming ordinary moments into celestial memories. Every event is a masterpiece of light and emotion.', rating: 4.7, review_count: 89, payment_preference: 'prepaid', base_price: 200000, verified: true, total_events: 165, address: 'Mumbai, Maharashtra' },
  { id: 'vendor-003', name: 'Royal Gatherings', business_name: 'Royal Gatherings Co.', event_types: ['Corporate Event','Conference','Award Ceremony'], description: 'Regal corporate events with unmatched sophistication. We create environments where brilliance flourishes.', rating: 4.8, review_count: 210, payment_preference: 'postpaid', base_price: 100000, verified: true, total_events: 312, address: 'Delhi, NCR' },
  { id: 'vendor-004', name: 'Golden Veil', business_name: 'Golden Veil Weddings', event_types: ['Wedding','Engagement','Anniversary'], description: 'Specialists in ethereal wedding ceremonies. We craft love stories into visual poetry.', rating: 5.0, review_count: 56, payment_preference: 'partial_prepaid', base_price: 300000, verified: true, total_events: 89, address: 'Bengaluru, Karnataka' },
  { id: 'vendor-005', name: 'The Ivory Affair', business_name: 'The Ivory Affair', event_types: ['Birthday Luxury','Graduation','Baby Shower'], description: "Intimate luxury celebrations tailored with exquisite personal touches for life's finest milestones.", rating: 4.6, review_count: 73, payment_preference: 'prepaid', base_price: 80000, verified: false, total_events: 134, address: 'Hyderabad, Telangana' },
  { id: 'vendor-006', name: 'Sapphire Events', business_name: 'Sapphire Events Group', event_types: ['Fashion Show','Art Exhibition','Charity Gala'], description: 'Avant-garde event experiences for the cultural elite. Where art meets celebration.', rating: 4.5, review_count: 44, payment_preference: 'prepaid', base_price: 250000, verified: true, total_events: 67, address: 'Chennai, Tamil Nadu' },
];

const MOCK_BOOKINGS = [
  { id: 'booking-001', customer_id: 'customer-001', vendor_id: 'vendor-001', customer_name: 'Priya Sharma', vendor_name: 'Aurora Elegance Events', event_name: 'Sharma Wedding Celebration', event_type: 'Wedding', event_date: '2024-12-15', event_time: '18:00', venue: 'The Grand Leela Palace, Chennai', guest_count: 500, status: 'confirmed', total_amount: 350000, paid_amount: 175000, payment_status: 'partial', payment_preference: 'partial_prepaid', special_requirements: 'Red and gold theme, live orchestra', created_at: '2024-09-01' },
  { id: 'booking-002', customer_id: 'customer-001', vendor_id: 'vendor-002', customer_name: 'Priya Sharma', vendor_name: 'Celestial Moments', event_name: 'Silver Anniversary Gala', event_type: 'Anniversary', event_date: '2024-11-20', event_time: '19:30', venue: 'Taj Coromandel, Chennai', guest_count: 200, status: 'pending', total_amount: 220000, paid_amount: 0, payment_status: 'unpaid', payment_preference: 'prepaid', special_requirements: 'Silver decor, string quartet', created_at: '2024-09-10' },
  { id: 'booking-003', customer_id: 'customer-002', vendor_id: 'vendor-001', customer_name: 'Arjun Mehta', vendor_name: 'Aurora Elegance Events', event_name: 'Tech Corp Annual Gala', event_type: 'Corporate Gala', event_date: '2024-10-30', event_time: '20:00', venue: 'ITC Grand Chola, Chennai', guest_count: 300, status: 'confirmed', total_amount: 450000, paid_amount: 225000, payment_status: 'partial', payment_preference: 'partial_prepaid', special_requirements: 'Brand colors: navy and silver', created_at: '2024-08-15' },
];

const MOCK_REVIEWS = [
  { id: 'r1', vendor_id: 'vendor-001', customer_name: 'Priya Sharma', rating: 5, title: 'Absolutely Breathtaking!', comment: 'Aurora Elegance transformed our wedding into a fairytale. Every detail was perfection. The floral arrangements alone were worth every rupee.', created_at: '2024-09-20' },
  { id: 'r2', vendor_id: 'vendor-001', customer_name: 'Vikram Nair', rating: 5, title: 'Beyond Our Dreams', comment: 'Our corporate gala was the talk of the industry. The team executed flawlessly and the ambiance was world-class.', created_at: '2024-08-10' },
  { id: 'r3', vendor_id: 'vendor-001', customer_name: 'Sunita Kapoor', rating: 4, title: 'Exceptional Service', comment: 'Highly professional team. Slight delay in setup but the final result was stunning. Would definitely book again.', created_at: '2024-07-22' },
];

const MOCK_ALL_USERS = [
  { id: 'admin-001', name: 'Elysian Admin', email: 'admin@elysian.com', role: 'admin', status: 'active', created_at: '2024-01-01' },
  { id: 'customer-001', name: 'Priya Sharma', email: 'priya@example.com', role: 'customer', status: 'active', created_at: '2024-03-01' },
  { id: 'customer-002', name: 'Arjun Mehta', email: 'arjun@example.com', role: 'customer', status: 'active', created_at: '2024-03-15' },
  ...MOCK_VENDORS.map(v => ({ id: v.id, name: v.name, email: v.id + '@elysian.com', role: 'vendor', status: 'active', created_at: '2024-02-01', rating: v.rating, verified: v.verified })),
];

const MOCK_NOTIFICATIONS = [
  { id: 'n1', message: 'Your booking "Sharma Wedding" has been confirmed!', type: 'booking_update', read: false, created_at: '2024-09-15T10:00:00' },
  { id: 'n2', message: 'Payment of ₹1,75,000 received for Sharma Wedding', type: 'payment', read: false, created_at: '2024-09-14T14:30:00' },
  { id: 'n3', message: 'New vendor "Golden Veil" joined Elysian Events', type: 'system', read: false, created_at: '2024-09-13T09:00:00' },
  { id: 'n4', message: 'Your profile has been verified', type: 'system', read: true, created_at: '2024-09-10T11:00:00' },
];

function mockData(endpoint, options = {}) {
  const body = options.body ? JSON.parse(options.body) : {};
  if (endpoint === '/auth/login') {
    const users = {
      'admin@elysian.com': { id: 'admin-001', name: 'Elysian Admin', role: 'admin', email: 'admin@elysian.com', phone: '+91-9000000000' },
      'aurora@elysian.com': { id: 'vendor-001', name: 'Aurora Elegance', role: 'vendor', email: 'aurora@elysian.com', business_name: 'Aurora Elegance Events', event_types: ['Wedding','Corporate Gala'], rating: 4.9, review_count: 128, base_price: 150000, payment_preference: 'partial_prepaid', verified: true, total_events: 247, description: 'Premier luxury event specialists', address: 'Chennai' },
      'priya@example.com': { id: 'customer-001', name: 'Priya Sharma', role: 'customer', email: 'priya@example.com', phone: '+91-9123456789', preferred_event_types: ['Wedding'], address: 'Chennai' },
    };
    const user = users[body.email];
    if (user) return { token: user.id, user };
    throw new Error('Invalid credentials');
  }
  if (endpoint === '/auth/register') {
    const newUser = { ...body, id: 'new-' + Date.now(), password: undefined };
    return { token: newUser.id, user: newUser };
  }
  if (endpoint.startsWith('/vendors') && !endpoint.includes('/reviews')) {
    return { vendors: MOCK_VENDORS, total: MOCK_VENDORS.length };
  }
  if (endpoint.match(/\/vendors\/[\w-]+\/reviews/)) {
    return { reviews: MOCK_REVIEWS };
  }
  if (endpoint.match(/\/vendors\/[\w-]+$/)) {
    const id = endpoint.split('/').pop();
    const v = MOCK_VENDORS.find(v => v.id === id) || MOCK_VENDORS[0];
    return { ...v, reviews: MOCK_REVIEWS };
  }
  if (endpoint === '/bookings') return { bookings: MOCK_BOOKINGS };
  if (endpoint === '/admin/stats') return { total_customers: 142, total_vendors: 38, total_bookings: 856, confirmed_bookings: 634, pending_bookings: 89, total_revenue: 12450000, active_users: 176 };
  if (endpoint === '/admin/users') return { users: MOCK_ALL_USERS };
  if (endpoint === '/admin/bookings') return { bookings: MOCK_BOOKINGS };
  if (endpoint === '/notifications') return { notifications: MOCK_NOTIFICATIONS, unread: 3 };
  if (endpoint === '/event-types') return { event_types: ['Wedding','Anniversary','Birthday Luxury','Corporate Gala','Product Launch','Award Ceremony','Conference','Engagement','Baby Shower','Graduation','Charity Gala','Fashion Show'] };
  return {};
}

// ─── CONTEXT ──────────────────────────────────────────────────────────────────
const AppContext = createContext();
function useApp() { return useContext(AppContext); }

// ─── UTILITIES ────────────────────────────────────────────────────────────────
function formatCurrency(amount) {
  return '₹' + Number(amount).toLocaleString('en-IN');
}
function formatDate(dateStr) {
  if (!dateStr) return '—';
  return new Date(dateStr).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
}
function getInitials(name) {
  return name?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || '?';
}

// ─── SHARED COMPONENTS ────────────────────────────────────────────────────────
function Stars({ rating, size = 16 }) {
  return (
    <div className="rating-stars">
      {[1,2,3,4,5].map(i => (
        <span key={i} className="material-symbols-outlined" style={{ fontSize: size, color: i <= Math.round(rating) ? 'var(--gold-400)' : '#4a3f2a' }}>
          star
        </span>
      ))}
    </div>
  );
}

function StatusBadge({ status }) {
  const map = {
    pending: ['badge-yellow', 'Pending'],
    confirmed: ['badge-green', 'Confirmed'],
    declined: ['badge-red', 'Declined'],
    cancelled: ['badge', 'Cancelled'],
    completed: ['badge-blue', 'Completed'],
  };
  const [cls, label] = map[status] || ['badge', status];
  return <span className={`badge ${cls}`}>{label}</span>;
}

function Toast({ message, type = 'success', onClose }) {
  useEffect(() => {
    const t = setTimeout(onClose, 4000);
    return () => clearTimeout(t);
  }, [onClose]);
  const icon = type === 'success' ? 'check_circle' : type === 'error' ? 'error' : 'info';
  const color = type === 'success' ? '#86efac' : type === 'error' ? '#fca5a5' : 'var(--gold-400)';
  return (
    <div className="toast">
      <span className="material-symbols-outlined" style={{ color, fontSize: 22 }}>{icon}</span>
      <span style={{ fontSize: '0.875rem', flex: 1 }}>{message}</span>
      <span className="material-symbols-outlined" onClick={onClose} style={{ cursor: 'pointer', color: 'var(--dark-muted)', fontSize: 18 }}>close</span>
    </div>
  );
}

function EtherealBg() {
  return (
    <div className="ethereal-bg">
      <div style={{ position: 'absolute', top: '-20%', left: '-10%', width: '50%', height: '50%', background: 'radial-gradient(circle, rgba(218,165,32,0.04) 0%, transparent 70%)', borderRadius: '50%' }} />
      <div style={{ position: 'absolute', bottom: '-20%', right: '-10%', width: '60%', height: '60%', background: 'radial-gradient(circle, rgba(180,130,10,0.03) 0%, transparent 70%)', borderRadius: '50%' }} />
      <div style={{ position: 'absolute', top: '40%', left: '30%', width: '40%', height: '40%', background: 'radial-gradient(circle, rgba(218,165,32,0.02) 0%, transparent 70%)', borderRadius: '50%' }} />
    </div>
  );
}

function Logo({ size = 'md' }) {
  const iconSize = size === 'lg' ? 32 : 22;
  const textSize = size === 'lg' ? '2rem' : '1.1rem';
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <div style={{ width: size === 'lg' ? 52 : 36, height: size === 'lg' ? 52 : 36, borderRadius: '50%', background: 'var(--gradient-gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 15px rgba(218,165,32,0.3)', flexShrink: 0 }}>
        <span className="material-symbols-outlined" style={{ fontSize: iconSize, color: '#1a0f00' }}>auto_awesome</span>
      </div>
      <div>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: textSize, fontWeight: 600, lineHeight: 1 }} className="gold-text">Elysian</div>
        {size === 'lg' && <div style={{ fontSize: '0.65rem', letterSpacing: '0.3em', color: 'var(--gold-700)', textTransform: 'uppercase' }}>Events</div>}
      </div>
    </div>
  );
}

// ─── PAGE: LOGIN ──────────────────────────────────────────────────────────────
function LoginPage() {
  const { navigate, showToast } = useApp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();
    if (!email || !password) { showToast('Please enter email and password', 'error'); return; }
    setLoading(true);
    try {
      const data = await api.post('/auth/login', { email, password });
      localStorage.setItem('elysian_token', data.token);
      localStorage.setItem('elysian_user', JSON.stringify(data.user));
      showToast(`Welcome back, ${data.user.name}! ✨`);
      navigate(data.user.role === 'admin' ? 'admin-dashboard' : data.user.role === 'vendor' ? 'vendor-dashboard' : 'customer-dashboard');
    } catch (err) {
      showToast(err.message || 'Login failed', 'error');
    }
    setLoading(false);
  }

  function quickLogin(role) {
    const creds = { admin: ['admin@elysian.com', 'admin123'], vendor: ['aurora@elysian.com', 'vendor123'], customer: ['priya@example.com', 'customer123'] };
    setEmail(creds[role][0]);
    setPassword(creds[role][1]);
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', background: 'var(--dark-bg)', padding: 20 }}>
      <EtherealBg />
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: 'var(--gradient-gold)' }} />
      <div style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: 460, animation: 'fadeInUp 0.6s ease' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}><Logo size="lg" /></div>
          <div className="ornament" style={{ marginBottom: 16 }}>The Pinnacle of Luxury</div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2.2rem', fontWeight: 300, color: 'var(--dark-text)', letterSpacing: '0.05em' }}>Welcome Back</h1>
        </div>
        <div className="glass-card" style={{ padding: '40px 36px' }}>
          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: 20 }}>
              <label className="form-label">Email Address</label>
              <div style={{ position: 'relative' }}>
                <span className="material-symbols-outlined" style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--dark-muted)', fontSize: 20 }}>mail</span>
                <input className="gold-input" type="email" placeholder="your@email.com" value={email} onChange={e => setEmail(e.target.value)} style={{ paddingLeft: 44 }} />
              </div>
            </div>
            <div style={{ marginBottom: 28 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <label className="form-label" style={{ marginBottom: 0 }}>Password</label>
                <span className="gold-link" style={{ fontSize: '0.75rem' }}>Forgot Password?</span>
              </div>
              <div style={{ position: 'relative' }}>
                <span className="material-symbols-outlined" style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--dark-muted)', fontSize: 20 }}>lock</span>
                <input className="gold-input" type={showPw ? 'text' : 'password'} placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} style={{ paddingLeft: 44, paddingRight: 44 }} />
                <span className="material-symbols-outlined" onClick={() => setShowPw(!showPw)} style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--dark-muted)', fontSize: 20, cursor: 'pointer' }}>
                  {showPw ? 'visibility_off' : 'visibility'}
                </span>
              </div>
            </div>
            <button className="btn-gold" type="submit" style={{ width: '100%', fontSize: '0.9rem' }} disabled={loading}>
              {loading ? (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                  <div className="spinner" style={{ width: 18, height: 18, borderWidth: 2 }} />
                  Signing In...
                </div>
              ) : '✦ Sign In to Elysian'}
            </button>
          </form>
          <div className="gold-divider" />
          <p style={{ textAlign: 'center', fontSize: '0.85rem', color: 'var(--dark-muted)' }}>
            New to Elysian?{' '}
            <span className="gold-link" style={{ fontWeight: 600 }} onClick={() => navigate('register')}>Join the Inner Circle</span>
          </p>
        </div>
        <p style={{ textAlign: 'center', marginTop: 24, fontSize: '0.7rem', color: 'var(--dark-muted)', letterSpacing: '0.1em' }}>
          © 2024 Elysian Events · Privacy · Terms
        </p>
      </div>
    </div>
  );
}

// ─── PAGE: REGISTER ───────────────────────────────────────────────────────────
function RegisterPage() {
  const { navigate, showToast } = useApp();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [eventTypes, setEventTypes] = useState([]);
  const [form, setForm] = useState({
    name: '', email: '', phone: '', password: '', confirm_password: '',
    role: '', address: '', city: '', state: '',
    business_name: '', description: '', base_price: '', payment_preference: 'partial_prepaid',
    event_types: [], preferred_event_types: [], budget_range: 'premium'
  });

  useEffect(() => {
    api.get('/event-types').then(d => setEventTypes(d.event_types || []));
  }, []);

  function update(field, value) { setForm(f => ({ ...f, [field]: value })); }
  function toggleEventType(type, field = 'event_types') {
    const arr = form[field];
    setForm(f => ({ ...f, [field]: arr.includes(type) ? arr.filter(x => x !== type) : [...arr, type] }));
  }

  async function handleSubmit() {
    if (form.password !== form.confirm_password) { showToast('Passwords do not match', 'error'); return; }
    setLoading(true);
    try {
      const data = await api.post('/auth/register', { ...form, address: `${form.address}, ${form.city}, ${form.state}`, base_price: Number(form.base_price) || 50000 });
      localStorage.setItem('elysian_token', data.token);
      localStorage.setItem('elysian_user', JSON.stringify(data.user));
      showToast('Welcome to Elysian Events! ✨');
      navigate(data.user.role === 'vendor' ? 'vendor-dashboard' : 'customer-dashboard');
    } catch (err) {
      showToast(err.message, 'error');
    }
    setLoading(false);
  }

  const inputProps = (field, type = 'text', placeholder = '') => ({
    className: 'gold-input', type, value: form[field], placeholder,
    onChange: e => update(field, e.target.value)
  });

  return (
    <div style={{ minHeight: '100vh', background: 'var(--dark-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 20px', position: 'relative' }}>
      <EtherealBg />
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: 'var(--gradient-gold)' }} />
      <div style={{ width: '100%', maxWidth: 560, position: 'relative', zIndex: 1, animation: 'fadeInUp 0.6s ease' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
          <Logo />
          <button className="btn-outline" onClick={() => step > 1 ? setStep(s => s - 1) : navigate('login')} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 16px' }}>
            <span className="material-symbols-outlined" style={{ fontSize: 16 }}>arrow_back</span>Back
          </button>
        </div>
        <div style={{ marginBottom: 32 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--gold-600)', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Step {step} of {form.role ? 3 : 2}</span>
            <span style={{ fontSize: '0.8rem', color: 'var(--dark-muted)' }}>{Math.round((step / (form.role ? 3 : 2)) * 100)}% Complete</span>
          </div>
          <div className="progress-bar"><div className="progress-fill" style={{ width: `${(step / (form.role ? 3 : 2)) * 100}%` }} /></div>
        </div>
        <div className="glass-card" style={{ padding: '40px 36px' }}>
          {step === 1 && (
            <div className="animate-fade-in">
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', fontWeight: 400, marginBottom: 8 }}>Join the Inner Circle</h2>
              <p style={{ color: 'var(--dark-muted)', fontSize: '0.85rem', marginBottom: 28 }}>Create your Elysian account to begin</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
                <div><label className="form-label">Full Name</label><input {...inputProps('name', 'text', 'Your name')} /></div>
                <div><label className="form-label">Phone Number</label><input {...inputProps('phone', 'tel', '+91 XXXXXXXXXX')} /></div>
              </div>
              <div style={{ marginBottom: 16 }}><label className="form-label">Email Address</label><input {...inputProps('email', 'email', 'you@example.com')} /></div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
                <div><label className="form-label">Password</label><input {...inputProps('password', 'password', '••••••••')} /></div>
                <div><label className="form-label">Confirm Password</label><input {...inputProps('confirm_password', 'password', '••••••••')} /></div>
              </div>
              <div style={{ marginBottom: 16 }}><label className="form-label">Street Address</label><input {...inputProps('address', 'text', 'Street address')} /></div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 28 }}>
                <div><label className="form-label">City</label><input {...inputProps('city', 'text', 'City')} /></div>
                <div><label className="form-label">State</label><input {...inputProps('state', 'text', 'State')} /></div>
              </div>
              <button className="btn-gold" style={{ width: '100%' }}
                onClick={() => { if (!form.name || !form.email || !form.password) { showToast('Please fill all fields', 'error'); return; } setStep(2); }}>
                Continue →
              </button>
            </div>
          )}
          {step === 2 && (
            <div className="animate-fade-in">
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', fontWeight: 400, marginBottom: 8 }}>Your Role</h2>
              <p style={{ color: 'var(--dark-muted)', fontSize: '0.85rem', marginBottom: 28 }}>How will you experience Elysian?</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 28 }}>
                {[
                  { role: 'customer', icon: 'celebration', title: 'Customer', desc: 'Plan & book extraordinary events' },
                  { role: 'vendor', icon: 'diamond', title: 'Vendor', desc: 'Showcase your luxury services' }
                ].map(opt => (
                  <div key={opt.role} onClick={() => update('role', opt.role)}
                    style={{ padding: 24, borderRadius: 14, border: `2px solid ${form.role === opt.role ? 'rgba(218,165,32,0.6)' : 'var(--dark-border)'}`, background: form.role === opt.role ? 'rgba(218,165,32,0.06)' : 'transparent', cursor: 'pointer', textAlign: 'center', transition: 'all 0.2s ease' }}>
                    <span className="material-symbols-outlined" style={{ fontSize: 36, color: form.role === opt.role ? 'var(--gold-400)' : 'var(--dark-muted)', display: 'block', marginBottom: 12 }}>{opt.icon}</span>
                    <div style={{ fontWeight: 700, marginBottom: 6, color: form.role === opt.role ? 'var(--gold-400)' : 'var(--dark-text)' }}>{opt.title}</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--dark-muted)' }}>{opt.desc}</div>
                  </div>
                ))}
              </div>
              {form.role === 'vendor' && (
                <div style={{ marginBottom: 20 }}>
                  <div style={{ marginBottom: 16 }}><label className="form-label">Business Name</label><input {...inputProps('business_name', 'text', 'Your business name')} /></div>
                  <div style={{ marginBottom: 16 }}><label className="form-label">Description</label><textarea className="gold-input" placeholder="Describe your services..." rows={3} value={form.description} onChange={e => update('description', e.target.value)} style={{ resize: 'vertical' }} /></div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                    <div><label className="form-label">Base Price (₹)</label><input {...inputProps('base_price', 'number', '50000')} /></div>
                    <div>
                      <label className="form-label">Payment Model</label>
                      <select className="gold-input" value={form.payment_preference} onChange={e => update('payment_preference', e.target.value)}>
                        <option value="prepaid">Full Prepaid</option>
                        <option value="partial_prepaid">50% Advance</option>
                        <option value="postpaid">Post Event</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}
              {form.role === 'customer' && (
                <div style={{ marginBottom: 20 }}>
                  <label className="form-label">Budget Range</label>
                  <select className="gold-input" value={form.budget_range} onChange={e => update('budget_range', e.target.value)}>
                    <option value="standard">Standard (₹50K - ₹1L)</option>
                    <option value="premium">Premium (₹1L - ₹5L)</option>
                    <option value="luxury">Luxury (₹5L - ₹20L)</option>
                    <option value="ultra">Ultra Luxury (₹20L+)</option>
                  </select>
                </div>
              )}
              {form.role && (
                <div style={{ marginBottom: 24 }}>
                  <label className="form-label">{form.role === 'vendor' ? 'Events You Offer' : 'Events You Love'}</label>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    {eventTypes.map(type => {
                      const field = form.role === 'vendor' ? 'event_types' : 'preferred_event_types';
                      const active = form[field].includes(type);
                      return (
                        <span key={type} onClick={() => toggleEventType(type, field)}
                          style={{ padding: '6px 14px', borderRadius: 20, border: `1px solid ${active ? 'rgba(218,165,32,0.6)' : 'var(--dark-border)'}`, background: active ? 'rgba(218,165,32,0.12)' : 'transparent', color: active ? 'var(--gold-400)' : 'var(--dark-muted)', fontSize: '0.78rem', cursor: 'pointer', transition: 'all 0.2s ease', fontWeight: 500 }}>
                          {type}
                        </span>
                      );
                    })}
                  </div>
                </div>
              )}
              <button className="btn-gold" style={{ width: '100%' }} disabled={!form.role || loading} onClick={handleSubmit}>
                {loading ? 'Creating Account...' : '✦ Complete Registration'}
              </button>
            </div>
          )}
        </div>
        <p style={{ textAlign: 'center', marginTop: 20, fontSize: '0.8rem', color: 'var(--dark-muted)' }}>
          Already have an account? <span className="gold-link" onClick={() => navigate('login')}>Sign In</span>
        </p>
      </div>
    </div>
  );
}

// ─── SIDEBAR ──────────────────────────────────────────────────────────────────
function Sidebar({ user, currentPage, onNavigate, onLogout }) {
  const customerLinks = [
    { page: 'customer-dashboard', icon: 'dashboard', label: 'Dashboard' },
    { page: 'book-event', icon: 'add_circle', label: 'Book an Event' },
    { page: 'my-bookings', icon: 'event_note', label: 'My Bookings' },
    { page: 'vendor-search', icon: 'search', label: 'Find Vendors' },
    { page: 'notifications', icon: 'notifications', label: 'Notifications' },
    { page: 'profile', icon: 'person', label: 'My Profile' },
  ];
  const vendorLinks = [
    { page: 'vendor-dashboard', icon: 'dashboard', label: 'Dashboard' },
    { page: 'vendor-bookings', icon: 'event_available', label: 'Booking Requests' },
    { page: 'vendor-analytics', icon: 'bar_chart', label: 'Analytics' },
    { page: 'vendor-profile', icon: 'storefront', label: 'Business Profile' },
    { page: 'notifications', icon: 'notifications', label: 'Notifications' },
    { page: 'profile', icon: 'person', label: 'My Account' },
  ];
  const adminLinks = [
    { page: 'admin-dashboard', icon: 'admin_panel_settings', label: 'Dashboard' },
    { page: 'admin-users', icon: 'group', label: 'Manage Users' },
    { page: 'admin-bookings', icon: 'event', label: 'All Bookings' },
    { page: 'admin-vendors', icon: 'storefront', label: 'Vendors' },
    { page: 'notifications', icon: 'notifications', label: 'Notifications' },
  ];
  const links = user?.role === 'admin' ? adminLinks : user?.role === 'vendor' ? vendorLinks : customerLinks;

  return (
    <div className="sidebar">
      <div style={{ padding: '24px 20px 20px', borderBottom: '1px solid var(--dark-border)' }}>
        <Logo />
        <div style={{ marginTop: 12, display: 'flex', alignItems: 'center', gap: 10 }}>
          <div className="avatar" style={{ width: 32, height: 32, fontSize: '0.8rem' }}>{getInitials(user?.name)}</div>
          <div>
            <div style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--dark-text)', lineHeight: 1.2 }}>{user?.name}</div>
            <div style={{ fontSize: '0.68rem', color: 'var(--gold-700)', textTransform: 'capitalize', letterSpacing: '0.08em' }}>{user?.role}</div>
          </div>
        </div>
      </div>
      <nav style={{ flex: 1, padding: '12px 0', overflowY: 'auto' }}>
        {links.map(link => (
          <div key={link.page} className={`sidebar-link ${currentPage === link.page ? 'active' : ''}`} onClick={() => onNavigate(link.page)}>
            <span className="material-symbols-outlined">{link.icon}</span>
            {link.label}
          </div>
        ))}
      </nav>
      <div style={{ padding: '16px 8px', borderTop: '1px solid var(--dark-border)' }}>
        <div className="sidebar-link" onClick={onLogout}>
          <span className="material-symbols-outlined">logout</span>
          Sign Out
        </div>
      </div>
    </div>
  );
}

// ─── DASHBOARD HEADER ─────────────────────────────────────────────────────────
function DashHeader({ title, subtitle, user, onNavigate, notifCount = 0 }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32, paddingBottom: 24, borderBottom: '1px solid var(--dark-border)' }}>
      <div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 300, letterSpacing: '0.04em' }}>{title}</h1>
        {subtitle && <p style={{ color: 'var(--dark-muted)', fontSize: '0.85rem', marginTop: 4 }}>{subtitle}</p>}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ position: 'relative', cursor: 'pointer' }} onClick={() => onNavigate('notifications')}>
          <span className="material-symbols-outlined" style={{ fontSize: 24, color: 'var(--dark-muted)' }}>notifications</span>
          {notifCount > 0 && <div className="notif-dot" />}
        </div>
        <div className="avatar" onClick={() => onNavigate('profile')} style={{ cursor: 'pointer' }}>{getInitials(user?.name)}</div>
      </div>
    </div>
  );
}

// ─── BOOKING CARD ─────────────────────────────────────────────────────────────
function BookingCard({ booking: b, role, onAction }) {
  const pct = b.total_amount > 0 ? Math.round((b.paid_amount / b.total_amount) * 100) : 0;
  return (
    <div className="glass-card" style={{ padding: 24 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
        <div>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 500, marginBottom: 4 }}>{b.event_name}</h3>
          <span className="chip">{b.event_type}</span>
        </div>
        <StatusBadge status={b.status} />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 16 }}>
        {[
          { icon: 'calendar_month', text: formatDate(b.event_date) },
          { icon: 'schedule', text: b.event_time },
          { icon: 'location_on', text: b.venue?.split(',')[0] },
          { icon: 'group', text: `${b.guest_count} guests` },
        ].map((item, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span className="material-symbols-outlined" style={{ fontSize: 15, color: 'var(--gold-700)' }}>{item.icon}</span>
            <span style={{ fontSize: '0.78rem', color: 'var(--dark-muted)' }}>{item.text}</span>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: role === 'vendor' ? 16 : 0 }}>
        <div>
          <div style={{ fontSize: '0.68rem', color: 'var(--dark-muted)', marginBottom: 4 }}>{role === 'customer' ? b.vendor_name : b.customer_name}</div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', color: 'var(--gold-400)', fontWeight: 500 }}>{formatCurrency(b.total_amount)}</div>
        </div>
        {b.payment_preference && (
          <span className="badge badge-gold" style={{ fontSize: '0.65rem' }}>
            {b.payment_preference === 'partial_prepaid' ? '50% Advance' : b.payment_preference === 'prepaid' ? 'Prepaid' : 'Post Event'}
          </span>
        )}
      </div>
      {b.total_amount > 0 && (
        <div style={{ marginTop: 12 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--dark-muted)', marginBottom: 6 }}>
            <span>Payment</span><span>{pct}% paid · {formatCurrency(b.paid_amount)}</span>
          </div>
          <div className="progress-bar"><div className="progress-fill" style={{ width: `${pct}%` }} /></div>
        </div>
      )}
      {role === 'vendor' && b.status === 'pending' && onAction && (
        <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
          <button className="btn-gold" style={{ flex: 1, padding: '10px', fontSize: '0.8rem' }} onClick={() => onAction(b.id, 'confirmed')}>Accept</button>
          <button className="btn-outline" style={{ flex: 1, padding: '10px', color: '#fca5a5', borderColor: 'rgba(239,68,68,0.3)' }} onClick={() => onAction(b.id, 'declined')}>Decline</button>
        </div>
      )}
    </div>
  );
}

// ─── PAGE: CUSTOMER DASHBOARD ─────────────────────────────────────────────────
function CustomerDashboard() {
  const { user, navigate } = useApp();
  const [bookings, setBookings] = useState([]);
  const [stats, setStats] = useState({ total: 0, confirmed: 0, pending: 0, spent: 0 });

  useEffect(() => {
    api.get('/bookings').then(d => {
      const b = d.bookings || [];
      setBookings(b);
      setStats({ total: b.length, confirmed: b.filter(x => x.status === 'confirmed').length, pending: b.filter(x => x.status === 'pending').length, spent: b.reduce((sum, x) => sum + (x.paid_amount || 0), 0) });
    });
  }, []);

  const upcomingBookings = bookings.filter(b => b.status === 'confirmed').slice(0, 3);

  return (
    <div style={{ padding: '32px 36px' }}>
      <DashHeader title={`Welcome, ${user?.name?.split(' ')[0]} ✦`} subtitle="Your luxury event journey awaits" user={user} onNavigate={navigate} />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 32 }}>
        {[
          { icon: 'event', label: 'Total Bookings', value: stats.total, color: 'var(--gold-400)' },
          { icon: 'check_circle', label: 'Confirmed', value: stats.confirmed, color: '#86efac' },
          { icon: 'pending', label: 'Pending', value: stats.pending, color: '#fde047' },
          { icon: 'payments', label: 'Total Spent', value: formatCurrency(stats.spent), color: 'var(--gold-500)', isText: true },
        ].map((s, i) => (
          <div key={i} className="stat-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <p style={{ fontSize: '0.72rem', color: 'var(--dark-muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8 }}>{s.label}</p>
                <p style={{ fontSize: s.isText ? '1.4rem' : '2rem', fontFamily: 'var(--font-display)', fontWeight: 600, color: s.color }}>{s.value}</p>
              </div>
              <span className="material-symbols-outlined" style={{ fontSize: 28, color: s.color, opacity: 0.4 }}>{s.icon}</span>
            </div>
          </div>
        ))}
      </div>
      <div style={{ background: 'linear-gradient(135deg, rgba(218,165,32,0.1), rgba(180,130,10,0.05))', border: '1px solid rgba(218,165,32,0.25)', borderRadius: 16, padding: '28px 32px', marginBottom: 32, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', fontWeight: 400, marginBottom: 8 }}>Ready to Create Magic?</h3>
          <p style={{ color: 'var(--dark-muted)', fontSize: '0.88rem' }}>Browse our curated vendors and plan your extraordinary event</p>
        </div>
        <button className="btn-gold" onClick={() => navigate('book-event')} style={{ whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: 8 }}>
          <span className="material-symbols-outlined" style={{ fontSize: 18 }}>add_circle</span>Book an Event
        </button>
      </div>
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 400 }}>Upcoming Events</h2>
          <span className="gold-link" style={{ fontSize: '0.8rem' }} onClick={() => navigate('my-bookings')}>View All →</span>
        </div>
        {upcomingBookings.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--dark-muted)' }}>
            <span className="material-symbols-outlined" style={{ fontSize: 48, display: 'block', marginBottom: 12, opacity: 0.3 }}>event_busy</span>
            <p>No upcoming events. <span className="gold-link" onClick={() => navigate('book-event')}>Book your first event</span></p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 16 }}>
            {upcomingBookings.map(b => <BookingCard key={b.id} booking={b} role="customer" />)}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── PAGE: MY BOOKINGS ────────────────────────────────────────────────────────
function MyBookingsPage() {
  const { user, navigate } = useApp();
  const [bookings, setBookings] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/bookings').then(d => { setBookings(d.bookings || []); setLoading(false); });
  }, []);

  const filtered = filter === 'all' ? bookings : bookings.filter(b => b.status === filter);

  return (
    <div style={{ padding: '32px 36px' }}>
      <DashHeader title="My Bookings" subtitle="Track all your luxury event bookings" user={user} onNavigate={navigate} />
      <div className="tab-bar" style={{ marginBottom: 28, maxWidth: 500 }}>
        {['all','confirmed','pending','cancelled'].map(s => (
          <button key={s} className={`tab-item ${filter === s ? 'active' : ''}`} onClick={() => setFilter(s)}>
            {s === 'all' ? 'All Events' : s.charAt(0).toUpperCase() + s.slice(1)}
          </button>
        ))}
      </div>
      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: 60 }}><div className="spinner" /></div>
      ) : filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--dark-muted)' }}>
          <span className="material-symbols-outlined" style={{ fontSize: 56, display: 'block', marginBottom: 16, opacity: 0.2 }}>event_busy</span>
          <p style={{ marginBottom: 20 }}>No {filter !== 'all' ? filter : ''} bookings found</p>
          <button className="btn-gold" onClick={() => navigate('book-event')}>Book Your First Event</button>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 20 }}>
          {filtered.map(b => <BookingCard key={b.id} booking={b} role="customer" />)}
        </div>
      )}
    </div>
  );
}

// ─── PAGE: BOOK EVENT ─────────────────────────────────────────────────────────
function BookEventPage() {
  const { user, navigate, showToast } = useApp();
  const [step, setStep] = useState(1);
  const [vendors, setVendors] = useState([]);
  const [eventTypes, setEventTypes] = useState([]);
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ event_name: '', event_type: '', event_date: '', event_time: '18:00', venue: '', guest_count: '', special_requirements: '', notes: '' });

  useEffect(() => { api.get('/event-types').then(d => setEventTypes(d.event_types || [])); }, []);
  useEffect(() => {
    if (form.event_type) api.get(`/vendors?event_type=${form.event_type}`).then(d => setVendors(d.vendors || []));
  }, [form.event_type]);

  function update(f, v) { setForm(p => ({ ...p, [f]: v })); }

  async function handleSubmit() {
    setLoading(true);
    try {
      await api.post('/bookings', { ...form, vendor_id: selectedVendor?.id, guest_count: Number(form.guest_count) });
      showToast('Booking request sent successfully! ✨');
      navigate('my-bookings');
    } catch (err) { showToast(err.message, 'error'); }
    setLoading(false);
  }

  return (
    <div style={{ padding: '32px 36px' }}>
      <DashHeader title="Book an Event" subtitle="Craft your extraordinary experience" user={user} onNavigate={navigate} />
      <div style={{ display: 'flex', gap: 0, marginBottom: 36, maxWidth: 500 }}>
        {['Event Details', 'Choose Vendor', 'Confirm'].map((s, i) => (
          <div key={i} style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
              <div style={{ width: 32, height: 32, borderRadius: '50%', background: step >= i + 1 ? 'var(--gradient-gold)' : 'var(--dark-card)', border: `2px solid ${step >= i + 1 ? 'var(--gold-500)' : 'var(--dark-border)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 700, color: step >= i + 1 ? '#1a0f00' : 'var(--dark-muted)', marginBottom: 6 }}>
                {step > i + 1 ? '✓' : i + 1}
              </div>
              <span style={{ fontSize: '0.68rem', color: step === i + 1 ? 'var(--gold-400)' : 'var(--dark-muted)', letterSpacing: '0.05em', textAlign: 'center' }}>{s}</span>
            </div>
            {i < 2 && <div style={{ flex: 0, width: 40, height: 1, background: step > i + 1 ? 'var(--gold-600)' : 'var(--dark-border)', marginBottom: 24 }} />}
          </div>
        ))}
      </div>

      {step === 1 && (
        <div className="glass-card" style={{ padding: 36, maxWidth: 700, animation: 'fadeInUp 0.4s ease' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', marginBottom: 24, fontWeight: 400 }}>Event Details</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
            <div><label className="form-label">Event Name</label><input className="gold-input" placeholder="My Grand Celebration" value={form.event_name} onChange={e => update('event_name', e.target.value)} /></div>
            <div>
              <label className="form-label">Event Type</label>
              <select className="gold-input" value={form.event_type} onChange={e => update('event_type', e.target.value)}>
                <option value="">Select type...</option>
                {eventTypes.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div><label className="form-label">Event Date</label><input className="gold-input" type="date" value={form.event_date} onChange={e => update('event_date', e.target.value)} /></div>
            <div><label className="form-label">Event Time</label><input className="gold-input" type="time" value={form.event_time} onChange={e => update('event_time', e.target.value)} /></div>
            <div><label className="form-label">Venue</label><input className="gold-input" placeholder="Grand Ballroom, Taj Hotel" value={form.venue} onChange={e => update('venue', e.target.value)} /></div>
            <div><label className="form-label">Guest Count</label><input className="gold-input" type="number" placeholder="200" value={form.guest_count} onChange={e => update('guest_count', e.target.value)} /></div>
          </div>
          <div style={{ marginBottom: 28 }}>
            <label className="form-label">Special Requirements</label>
            <textarea className="gold-input" placeholder="Theme, catering preferences, special arrangements..." rows={3} value={form.special_requirements} onChange={e => update('special_requirements', e.target.value)} style={{ resize: 'vertical' }} />
          </div>
          <button className="btn-gold" onClick={() => { if (!form.event_name || !form.event_type || !form.event_date || !form.venue) return; setStep(2); }}>
            Continue to Choose Vendor →
          </button>
        </div>
      )}

      {step === 2 && (
        <div style={{ animation: 'fadeInUp 0.4s ease' }}>
          <div style={{ display: 'flex', gap: 12, marginBottom: 28 }}>
            <button className="btn-outline" onClick={() => setStep(1)} style={{ padding: '10px 20px' }}>← Back</button>
            <button className="btn-outline" onClick={() => { setSelectedVendor(null); setStep(3); }}>Skip — Random Vendor</button>
          </div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', marginBottom: 20, fontWeight: 400 }}>Choose Your Vendor</h2>
          {vendors.length === 0 ? (
            <div style={{ textAlign: 'center', padding: 60, color: 'var(--dark-muted)' }}>
              <span className="material-symbols-outlined" style={{ fontSize: 48, display: 'block', marginBottom: 12, opacity: 0.3 }}>search_off</span>
              <p>No vendors found for {form.event_type}. Try a different event type.</p>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 }}>
              {vendors.map(v => (
                <div key={v.id} className="vendor-card" onClick={() => { setSelectedVendor(v); setStep(3); }} style={{ border: selectedVendor?.id === v.id ? '2px solid rgba(218,165,32,0.6)' : '1px solid var(--dark-border)' }}>
                  <div className="img-placeholder">✦</div>
                  <div style={{ padding: 20 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                      <div>
                        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 500, marginBottom: 2 }}>{v.business_name}</h3>
                        {v.verified && <span style={{ fontSize: '0.68rem', color: '#86efac' }}>✓ Verified</span>}
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', color: 'var(--gold-400)' }}>{formatCurrency(v.base_price)}</div>
                        <div style={{ fontSize: '0.65rem', color: 'var(--dark-muted)' }}>starting</div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10 }}>
                      <Stars rating={v.rating} size={14} />
                      <span style={{ fontSize: '0.78rem', color: 'var(--dark-muted)' }}>{v.rating} ({v.review_count})</span>
                    </div>
                    <p style={{ fontSize: '0.78rem', color: 'var(--dark-muted)', lineHeight: 1.5, marginBottom: 10 }}>{v.description?.slice(0, 80)}...</p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                      {v.event_types?.slice(0, 2).map(t => <span key={t} className="chip" style={{ fontSize: '0.65rem' }}>{t}</span>)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {step === 3 && (
        <div className="glass-card" style={{ padding: 36, maxWidth: 600, animation: 'fadeInUp 0.4s ease' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', marginBottom: 24, fontWeight: 400 }}>Confirm Booking</h2>
          <div style={{ background: 'rgba(218,165,32,0.05)', borderRadius: 12, padding: 24, marginBottom: 24 }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', marginBottom: 16, color: 'var(--gold-400)' }}>{form.event_name}</h3>
            {[['Event Type', form.event_type], ['Date', formatDate(form.event_date)], ['Time', form.event_time], ['Venue', form.venue], ['Guests', form.guest_count], ['Vendor', selectedVendor?.business_name || 'Auto-assigned'], ['Special Requests', form.special_requirements || 'None']].map(([k, v]) => (
              <div key={k} style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: 10, marginBottom: 10, borderBottom: '1px solid var(--dark-border)', fontSize: '0.85rem' }}>
                <span style={{ color: 'var(--dark-muted)' }}>{k}</span>
                <span style={{ fontWeight: 500, maxWidth: '60%', textAlign: 'right' }}>{v}</span>
              </div>
            ))}
          </div>
          {selectedVendor && (
            <div style={{ background: 'rgba(218,165,32,0.05)', borderRadius: 12, padding: 20, marginBottom: 24 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--dark-muted)', marginBottom: 4 }}>Estimated Cost</div>
                  <div className="price-tag">{formatCurrency(selectedVendor.base_price)}</div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--dark-muted)', marginTop: 4 }}>
                    Payment: {selectedVendor.payment_preference === 'partial_prepaid' ? '50% advance required' : selectedVendor.payment_preference === 'prepaid' ? 'Full payment upfront' : 'Payment after event'}
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <Stars rating={selectedVendor.rating} />
                  <div style={{ fontSize: '0.72rem', color: 'var(--dark-muted)', marginTop: 4 }}>{selectedVendor.review_count} reviews</div>
                </div>
              </div>
            </div>
          )}
          <div style={{ display: 'flex', gap: 12 }}>
            <button className="btn-outline" onClick={() => setStep(2)} style={{ flex: 1 }}>← Edit</button>
            <button className="btn-gold" onClick={handleSubmit} disabled={loading} style={{ flex: 2 }}>
              {loading ? 'Sending Request...' : '✦ Confirm Booking Request'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── PAGE: VENDOR SEARCH ──────────────────────────────────────────────────────
function VendorSearchPage() {
  const { user, navigate, showToast } = useApp();
  const [vendors, setVendors] = useState([]);
  const [eventTypes, setEventTypes] = useState([]);
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState('');
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    api.get('/event-types').then(d => setEventTypes(d.event_types || []));
    loadVendors();
  }, []);

  function loadVendors() {
    setLoading(true);
    const q = filterType ? `?event_type=${filterType}` : search ? `?search=${search}` : '';
    api.get(`/vendors${q}`).then(d => { setVendors(d.vendors || []); setLoading(false); });
  }

  useEffect(() => { loadVendors(); }, [filterType]);

  function viewVendor(v) {
    setSelected(v);
    api.get(`/vendors/${v.id}/reviews`).then(d => setReviews(d.reviews || []));
  }

  if (selected) {
    return (
      <div style={{ padding: '32px 36px' }}>
        <button className="btn-outline" onClick={() => setSelected(null)} style={{ marginBottom: 24, display: 'flex', alignItems: 'center', gap: 6 }}>
          <span className="material-symbols-outlined" style={{ fontSize: 16 }}>arrow_back</span> Back
        </button>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
          <div>
            <div className="img-placeholder" style={{ borderRadius: 16, marginBottom: 24, fontSize: '5rem' }}>✦</div>
            <div className="glass-card" style={{ padding: 24 }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', marginBottom: 16 }}>Reviews</h3>
              {(reviews.length > 0 ? reviews : MOCK_REVIEWS).map(r => (
                <div key={r.id} style={{ marginBottom: 20, paddingBottom: 20, borderBottom: '1px solid var(--dark-border)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div className="avatar" style={{ width: 30, height: 30, fontSize: '0.75rem' }}>{getInitials(r.customer_name)}</div>
                      <div>
                        <div style={{ fontSize: '0.82rem', fontWeight: 600 }}>{r.customer_name}</div>
                        <div style={{ fontSize: '0.7rem', color: 'var(--dark-muted)' }}>{formatDate(r.created_at)}</div>
                      </div>
                    </div>
                    <Stars rating={r.rating} size={13} />
                  </div>
                  <div style={{ fontWeight: 600, fontSize: '0.85rem', marginBottom: 4 }}>{r.title}</div>
                  <p style={{ fontSize: '0.8rem', color: 'var(--dark-muted)', lineHeight: 1.6 }}>{r.comment}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div style={{ marginBottom: 8 }}>
              {selected.verified && <span style={{ color: '#86efac', fontSize: '0.78rem' }}>✓ Verified Partner</span>}
            </div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2.2rem', fontWeight: 400, marginBottom: 8 }}>{selected.business_name}</h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <Stars rating={selected.rating} />
              <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', color: 'var(--gold-400)' }}>{selected.rating}</span>
              <span style={{ color: 'var(--dark-muted)', fontSize: '0.82rem' }}>({selected.review_count} reviews)</span>
            </div>
            <p style={{ color: 'var(--dark-muted)', lineHeight: 1.7, marginBottom: 24, fontSize: '0.9rem' }}>{selected.description}</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 24 }}>
              {selected.event_types?.map(t => <span key={t} className="chip">{t}</span>)}
            </div>
            <div className="stat-card" style={{ marginBottom: 24 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 20, textAlign: 'center' }}>
                {[['Events', selected.total_events], ['Rating', selected.rating + '★'], ['Reviews', selected.review_count]].map(([l, v]) => (
                  <div key={l}>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: 'var(--gold-400)', fontWeight: 600 }}>{v}</div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--dark-muted)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{l}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="glass-card" style={{ padding: 24, marginBottom: 24 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--dark-muted)', marginBottom: 4 }}>Starting From</div>
                  <div className="price-tag">{formatCurrency(selected.base_price)}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--dark-muted)', marginBottom: 4 }}>Payment</div>
                  <span className="badge badge-gold">
                    {selected.payment_preference === 'partial_prepaid' ? '50% Advance' : selected.payment_preference === 'prepaid' ? 'Prepaid' : 'Post Event'}
                  </span>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 10 }}>
                <span className="material-symbols-outlined" style={{ color: 'var(--gold-700)', fontSize: 16 }}>location_on</span>
                <span style={{ fontSize: '0.82rem', color: 'var(--dark-muted)' }}>{selected.address}</span>
              </div>
            </div>
            <button className="btn-gold animate-glow" style={{ width: '100%', fontSize: '1rem' }} onClick={() => navigate('book-event')}>
              ✦ Book This Vendor
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: '32px 36px' }}>
      <DashHeader title="Find Vendors" subtitle="Discover extraordinary event specialists" user={user} onNavigate={navigate} />
      <div style={{ display: 'flex', gap: 16, marginBottom: 28 }}>
        <div style={{ flex: 1, position: 'relative' }}>
          <span className="material-symbols-outlined" style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--dark-muted)', fontSize: 20 }}>search</span>
          <input className="gold-input" style={{ paddingLeft: 44 }} placeholder="Search vendors..." value={search} onChange={e => setSearch(e.target.value)} onKeyDown={e => e.key === 'Enter' && loadVendors()} />
        </div>
        <select className="gold-input" style={{ maxWidth: 220 }} value={filterType} onChange={e => setFilterType(e.target.value)}>
          <option value="">All Event Types</option>
          {eventTypes.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
      </div>
      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: 80 }}><div className="spinner" /></div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 }}>
          {vendors.map(v => (
            <div key={v.id} className="vendor-card" onClick={() => viewVendor(v)}>
              <div className="img-placeholder">✦</div>
              <div style={{ padding: 20 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                  <div>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem', fontWeight: 500, marginBottom: 3 }}>{v.business_name}</h3>
                    {v.verified && <span style={{ fontSize: '0.68rem', color: '#86efac' }}>✓ Verified</span>}
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', color: 'var(--gold-400)' }}>{formatCurrency(v.base_price)}</div>
                    <div style={{ fontSize: '0.6rem', color: 'var(--dark-muted)' }}>from</div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10 }}>
                  <Stars rating={v.rating} size={13} />
                  <span style={{ fontSize: '0.75rem', color: 'var(--dark-muted)' }}>{v.rating} ({v.review_count})</span>
                </div>
                <p style={{ fontSize: '0.78rem', color: 'var(--dark-muted)', lineHeight: 1.5, marginBottom: 12 }}>{v.description?.slice(0, 90)}...</p>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  {v.event_types?.slice(0, 2).map(t => <span key={t} className="chip" style={{ fontSize: '0.65rem' }}>{t}</span>)}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── PAGE: VENDOR DASHBOARD ───────────────────────────────────────────────────
function VendorDashboard() {
  const { user, navigate } = useApp();
  const [bookings, setBookings] = useState([]);
  const [stats, setStats] = useState({ pending: 0, confirmed: 0, total_revenue: 0, total_bookings: 0 });

  useEffect(() => {
    api.get('/bookings').then(d => {
      const b = d.bookings || [];
      setBookings(b);
      setStats({ pending: b.filter(x => x.status === 'pending').length, confirmed: b.filter(x => x.status === 'confirmed').length, total_revenue: b.reduce((s, x) => s + (x.paid_amount || 0), 0), total_bookings: b.length });
    });
  }, []);

  function handleAction(bookingId, status) {
    setBookings(bookings.map(b => b.id === bookingId ? { ...b, status } : b));
  }

  const pendingBookings = bookings.filter(b => b.status === 'pending');

  return (
    <div style={{ padding: '32px 36px' }}>
      <DashHeader title={`${user?.business_name || user?.name} ✦`} subtitle="Your event management command center" user={user} onNavigate={navigate} />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 32 }}>
        {[
          { icon: 'pending_actions', label: 'Pending Requests', value: stats.pending, color: '#fde047' },
          { icon: 'event_available', label: 'Confirmed Events', value: stats.confirmed, color: '#86efac' },
          { icon: 'event', label: 'Total Bookings', value: stats.total_bookings, color: 'var(--gold-400)' },
          { icon: 'payments', label: 'Revenue Earned', value: formatCurrency(stats.total_revenue), color: 'var(--gold-500)', isText: true },
        ].map((s, i) => (
          <div key={i} className="stat-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <p style={{ fontSize: '0.68rem', color: 'var(--dark-muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8 }}>{s.label}</p>
                <p style={{ fontSize: s.isText ? '1.4rem' : '2rem', fontFamily: 'var(--font-display)', fontWeight: 600, color: s.color }}>{s.value}</p>
              </div>
              <span className="material-symbols-outlined" style={{ fontSize: 28, color: s.color, opacity: 0.4 }}>{s.icon}</span>
            </div>
          </div>
        ))}
      </div>
      {pendingBookings.length > 0 && (
        <div style={{ marginBottom: 32 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 400 }}>
              Pending Requests <span style={{ background: 'rgba(253,224,71,0.15)', color: '#fde047', padding: '2px 10px', borderRadius: 12, fontSize: '0.8rem', fontWeight: 600, marginLeft: 8 }}>{pendingBookings.length}</span>
            </h2>
            <span className="gold-link" style={{ fontSize: '0.8rem' }} onClick={() => navigate('vendor-bookings')}>View All →</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 20 }}>
            {pendingBookings.map(b => <BookingCard key={b.id} booking={b} role="vendor" onAction={handleAction} />)}
          </div>
        </div>
      )}
      <div className="glass-card" style={{ padding: 28 }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', fontWeight: 400, marginBottom: 20 }}>Business Profile</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 20 }}>
          <div>
            <div style={{ fontSize: '0.7rem', color: 'var(--dark-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 6 }}>Rating</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Stars rating={user?.rating || 0} />
              <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: 'var(--gold-400)' }}>{user?.rating || '—'}</span>
            </div>
          </div>
          <div>
            <div style={{ fontSize: '0.7rem', color: 'var(--dark-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 6 }}>Base Price</div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: 'var(--gold-400)' }}>{formatCurrency(user?.base_price || 0)}</div>
          </div>
          <div>
            <div style={{ fontSize: '0.7rem', color: 'var(--dark-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 6 }}>Status</div>
            <span className={`badge ${user?.verified ? 'badge-green' : 'badge-yellow'}`}>{user?.verified ? '✓ Verified' : 'Pending Verification'}</span>
          </div>
        </div>
        <div className="gold-divider" />
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {(user?.event_types || []).map(t => <span key={t} className="chip">{t}</span>)}
        </div>
        <button className="btn-outline" style={{ marginTop: 20 }} onClick={() => navigate('vendor-profile')}>Edit Profile</button>
      </div>
    </div>
  );
}

// ─── PAGE: VENDOR BOOKINGS ────────────────────────────────────────────────────
function VendorBookingsPage() {
  const { user, navigate, showToast } = useApp();
  const [bookings, setBookings] = useState([]);
  const [filter, setFilter] = useState('pending');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/bookings').then(d => { setBookings(d.bookings || []); setLoading(false); });
  }, []);

  function handleAction(bookingId, status) {
    setBookings(prev => prev.map(b => b.id === bookingId ? { ...b, status } : b));
    showToast(`Booking ${status} successfully`);
  }

  const filtered = filter === 'all' ? bookings : bookings.filter(b => b.status === filter);

  return (
    <div style={{ padding: '32px 36px' }}>
      <DashHeader title="Booking Requests" subtitle="Manage incoming event bookings" user={user} onNavigate={navigate} />
      <div className="tab-bar" style={{ marginBottom: 28, maxWidth: 500 }}>
        {['pending', 'confirmed', 'declined', 'all'].map(s => (
          <button key={s} className={`tab-item ${filter === s ? 'active' : ''}`} onClick={() => setFilter(s)}>
            {s.charAt(0).toUpperCase() + s.slice(1)}
          </button>
        ))}
      </div>
      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: 60 }}><div className="spinner" /></div>
      ) : filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: 80, color: 'var(--dark-muted)' }}>
          <span className="material-symbols-outlined" style={{ fontSize: 56, display: 'block', marginBottom: 16, opacity: 0.2 }}>event_busy</span>
          <p>No {filter} bookings</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 20 }}>
          {filtered.map(b => <BookingCard key={b.id} booking={b} role="vendor" onAction={handleAction} />)}
        </div>
      )}
    </div>
  );
}

// ─── PAGE: VENDOR ANALYTICS ───────────────────────────────────────────────────
function VendorAnalyticsPage() {
  const { user, navigate } = useApp();
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const data = [120000, 180000, 90000, 240000, 300000, 210000, 280000, 350000, 420000, 380000, 290000, 450000];
  const maxVal = Math.max(...data);

  return (
    <div style={{ padding: '32px 36px' }}>
      <DashHeader title="Analytics" subtitle="Your performance at a glance" user={user} onNavigate={navigate} />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 32 }}>
        {[
          { label: 'Yearly Revenue', value: formatCurrency(data.reduce((a, b) => a + b, 0)), change: '+23%' },
          { label: 'Total Events', value: '247', change: '+18%' },
          { label: 'Avg Rating', value: '4.9 ★', change: '+0.2' },
        ].map((s, i) => (
          <div key={i} className="stat-card">
            <div style={{ fontSize: '0.7rem', color: 'var(--dark-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 10 }}>{s.label}</div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', color: 'var(--gold-400)', fontWeight: 600, marginBottom: 6 }}>{s.value}</div>
            <span style={{ fontSize: '0.75rem', color: '#86efac', background: 'rgba(34,197,94,0.1)', padding: '2px 8px', borderRadius: 12 }}>↑ {s.change}</span>
          </div>
        ))}
      </div>
      <div className="glass-card" style={{ padding: 32, marginBottom: 24 }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', fontWeight: 400, marginBottom: 24 }}>Monthly Revenue</h2>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 12, height: 200, padding: '0 8px' }}>
          {data.map((val, i) => (
            <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
              <div style={{ width: '100%', height: `${(val / maxVal) * 100}%`, background: 'var(--gradient-gold)', borderRadius: '4px 4px 0 0', opacity: 0.7, transition: 'all 0.3s', cursor: 'pointer', minHeight: 4 }} />
              <span style={{ fontSize: '0.6rem', color: 'var(--dark-muted)', textTransform: 'uppercase' }}>{months[i]}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="glass-card" style={{ padding: 32 }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', fontWeight: 400, marginBottom: 24 }}>Event Types</h2>
        {[['Wedding', 45, '#ffd700'], ['Corporate Gala', 30, '#daa520'], ['Birthday Luxury', 25, '#b8860b']].map(([type, pct, color]) => (
          <div key={type} style={{ marginBottom: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: '0.85rem' }}>
              <span>{type}</span><span style={{ color: 'var(--gold-400)', fontWeight: 600 }}>{pct}%</span>
            </div>
            <div className="progress-bar"><div className="progress-fill" style={{ width: `${pct}%`, background: color }} /></div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── PAGE: ADMIN DASHBOARD ────────────────────────────────────────────────────
function AdminDashboard() {
  const { user, navigate } = useApp();
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/admin/stats').then(d => { setStats(d); setLoading(false); });
  }, []);

  return (
    <div style={{ padding: '32px 36px' }}>
      <DashHeader title="Admin Command Center" subtitle="Elysian Events Platform Overview" user={user} onNavigate={navigate} />
      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: 80 }}><div className="spinner" /></div>
      ) : (
        <>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 32 }}>
            {[
              { icon: 'group', label: 'Total Customers', value: stats.total_customers, color: '#93c5fd' },
              { icon: 'storefront', label: 'Active Vendors', value: stats.total_vendors, color: 'var(--gold-400)' },
              { icon: 'event', label: 'Total Bookings', value: stats.total_bookings, color: '#86efac' },
              { icon: 'payments', label: 'Platform Revenue', value: formatCurrency(stats.total_revenue), color: 'var(--gold-500)', isText: true },
            ].map((s, i) => (
              <div key={i} className="stat-card">
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div>
                    <p style={{ fontSize: '0.68rem', color: 'var(--dark-muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8 }}>{s.label}</p>
                    <p style={{ fontSize: s.isText ? '1.3rem' : '2rem', fontFamily: 'var(--font-display)', fontWeight: 600, color: s.color }}>{s.value}</p>
                  </div>
                  <span className="material-symbols-outlined" style={{ fontSize: 28, color: s.color, opacity: 0.4 }}>{s.icon}</span>
                </div>
              </div>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
            <div className="glass-card" style={{ padding: 28 }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 400, marginBottom: 20 }}>Booking Status</h3>
              {[['Confirmed', stats.confirmed_bookings, '#86efac'], ['Pending', stats.pending_bookings, '#fde047'], ['Total', stats.total_bookings, 'var(--gold-400)']].map(([l, v, c]) => (
                <div key={l} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid var(--dark-border)' }}>
                  <span style={{ fontSize: '0.85rem', color: 'var(--dark-muted)' }}>{l}</span>
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', color: c, fontWeight: 600 }}>{v}</span>
                </div>
              ))}
            </div>
            <div className="glass-card" style={{ padding: 28 }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 400, marginBottom: 20 }}>Quick Actions</h3>
              {[
                { label: 'Manage Users', icon: 'group', page: 'admin-users' },
                { label: 'Review Vendors', icon: 'storefront', page: 'admin-vendors' },
                { label: 'All Bookings', icon: 'event', page: 'admin-bookings' },
              ].map(item => (
                <div key={item.page} onClick={() => navigate(item.page)} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 0', cursor: 'pointer', borderBottom: '1px solid var(--dark-border)', color: 'var(--dark-muted)', transition: 'color 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.color = 'var(--gold-400)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'var(--dark-muted)'}>
                  <span className="material-symbols-outlined" style={{ fontSize: 20 }}>{item.icon}</span>
                  <span style={{ fontSize: '0.85rem', fontWeight: 500 }}>{item.label}</span>
                  <span className="material-symbols-outlined" style={{ marginLeft: 'auto', fontSize: 16 }}>chevron_right</span>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

// ─── PAGE: ADMIN USERS ────────────────────────────────────────────────────────
function AdminUsersPage() {
  const { user, navigate, showToast } = useApp();
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/admin/users').then(d => { setUsers(d.users || []); setLoading(false); });
  }, []);

  const filtered = filter === 'all' ? users : users.filter(u => u.role === filter);

  return (
    <div style={{ padding: '32px 36px' }}>
      <DashHeader title="Manage Users" subtitle="Platform user management" user={user} onNavigate={navigate} />
      <div className="tab-bar" style={{ marginBottom: 28, maxWidth: 400 }}>
        {['all', 'customer', 'vendor', 'admin'].map(r => (
          <button key={r} className={`tab-item ${filter === r ? 'active' : ''}`} onClick={() => setFilter(r)}>
            {r.charAt(0).toUpperCase() + r.slice(1)}
          </button>
        ))}
      </div>
      <div className="glass-card" style={{ overflow: 'hidden' }}>
        <table className="gold-table">
          <thead>
            <tr><th>User</th><th>Role</th><th>Status</th><th>Joined</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {filtered.map(u => (
              <tr key={u.id}>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div className="avatar" style={{ width: 34, height: 34, fontSize: '0.8rem' }}>{getInitials(u.name)}</div>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '0.88rem' }}>{u.name}</div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--dark-muted)' }}>{u.email}</div>
                    </div>
                  </div>
                </td>
                <td><span className="badge badge-gold" style={{ textTransform: 'capitalize' }}>{u.role}</span></td>
                <td>
                  <span className={`badge ${u.status === 'active' ? 'badge-green' : 'badge-red'}`}>{u.status}</span>
                  {u.verified && <span className="badge badge-blue" style={{ marginLeft: 6 }}>Verified</span>}
                </td>
                <td style={{ color: 'var(--dark-muted)', fontSize: '0.8rem' }}>{formatDate(u.created_at)}</td>
                <td>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button className="btn-outline" style={{ padding: '4px 12px', fontSize: '0.72rem' }} onClick={() => showToast(`Action on ${u.name}`)}>
                      {u.status === 'active' ? 'Suspend' : 'Activate'}
                    </button>
                    {u.role === 'vendor' && !u.verified && (
                      <button className="btn-gold" style={{ padding: '4px 12px', fontSize: '0.72rem' }} onClick={() => showToast(`${u.name} verified!`)}>Verify</button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── PAGE: ADMIN BOOKINGS ──────────────────────────────────────────────────────
function AdminBookingsPage() {
  const { user, navigate } = useApp();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/admin/bookings').then(d => { setBookings(d.bookings || []); setLoading(false); });
  }, []);

  return (
    <div style={{ padding: '32px 36px' }}>
      <DashHeader title="All Bookings" subtitle="Platform-wide booking management" user={user} onNavigate={navigate} />
      <div className="glass-card" style={{ overflow: 'hidden' }}>
        <table className="gold-table">
          <thead>
            <tr><th>Event</th><th>Customer</th><th>Vendor</th><th>Date</th><th>Amount</th><th>Status</th></tr>
          </thead>
          <tbody>
            {bookings.map(b => (
              <tr key={b.id}>
                <td>
                  <div style={{ fontWeight: 600, fontSize: '0.88rem' }}>{b.event_name}</div>
                  <span className="chip" style={{ fontSize: '0.6rem' }}>{b.event_type}</span>
                </td>
                <td style={{ fontSize: '0.82rem' }}>{b.customer_name}</td>
                <td style={{ fontSize: '0.82rem' }}>{b.vendor_name}</td>
                <td style={{ fontSize: '0.8rem', color: 'var(--dark-muted)' }}>{formatDate(b.event_date)}</td>
                <td style={{ fontFamily: 'var(--font-display)', color: 'var(--gold-400)' }}>{formatCurrency(b.total_amount)}</td>
                <td><StatusBadge status={b.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── PAGE: ADMIN VENDORS ──────────────────────────────────────────────────────
function AdminVendorsPage() {
  const { user, navigate, showToast } = useApp();
  const [vendors, setVendors] = useState([]);

  useEffect(() => {
    api.get('/vendors').then(d => setVendors(d.vendors || []));
  }, []);

  return (
    <div style={{ padding: '32px 36px' }}>
      <DashHeader title="Vendor Management" subtitle="Review and manage platform vendors" user={user} onNavigate={navigate} />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20 }}>
        {vendors.map(v => (
          <div key={v.id} className="glass-card" style={{ padding: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
              <div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 500 }}>{v.business_name}</h3>
                <div style={{ fontSize: '0.78rem', color: 'var(--dark-muted)' }}>{v.address}</div>
              </div>
              <span className={`badge ${v.verified ? 'badge-green' : 'badge-yellow'}`}>{v.verified ? 'Verified' : 'Pending'}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12 }}>
              <Stars rating={v.rating} size={13} />
              <span style={{ fontSize: '0.78rem', color: 'var(--dark-muted)' }}>{v.rating} · {v.review_count} reviews</span>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginBottom: 16 }}>
              {v.event_types?.slice(0, 3).map(t => <span key={t} className="chip" style={{ fontSize: '0.65rem' }}>{t}</span>)}
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              {!v.verified && <button className="btn-gold" style={{ flex: 1, padding: '8px', fontSize: '0.78rem' }} onClick={() => showToast(`${v.business_name} verified!`)}>Verify</button>}
              <button className="btn-outline" style={{ flex: 1, padding: '8px', fontSize: '0.78rem' }} onClick={() => showToast('Action taken')}>Manage</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── PAGE: PROFILE ────────────────────────────────────────────────────────────
function ProfilePage() {
  const { user, navigate, showToast, setUser } = useApp();
  const [form, setForm] = useState({ ...user });
  const [loading, setLoading] = useState(false);

  async function handleSave() {
    setLoading(true);
    try {
      const data = await api.put('/users/me', form);
      setUser(data.user || form);
      localStorage.setItem('elysian_user', JSON.stringify(data.user || form));
      showToast('Profile updated successfully! ✨');
    } catch {
      showToast('Profile updated!');
      setUser(form);
      localStorage.setItem('elysian_user', JSON.stringify(form));
    }
    setLoading(false);
  }

  function update(f, v) { setForm(p => ({ ...p, [f]: v })); }

  return (
    <div style={{ padding: '32px 36px' }}>
      <DashHeader title="My Profile" subtitle="Manage your account details" user={user} onNavigate={navigate} />
      <div style={{ maxWidth: 700 }}>
        <div className="glass-card" style={{ padding: 32, marginBottom: 24, display: 'flex', alignItems: 'center', gap: 24 }}>
          <div className="avatar" style={{ width: 80, height: 80, fontSize: '1.8rem' }}>{getInitials(form.name)}</div>
          <div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', fontWeight: 400 }}>{form.name}</h2>
            <div style={{ color: 'var(--dark-muted)', fontSize: '0.85rem', marginBottom: 8 }}>{form.email}</div>
            <span className="badge badge-gold" style={{ textTransform: 'capitalize' }}>{form.role}</span>
          </div>
        </div>
        <div className="glass-card" style={{ padding: 32 }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 400, marginBottom: 24 }}>Personal Information</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
            <div><label className="form-label">Full Name</label><input className="gold-input" value={form.name || ''} onChange={e => update('name', e.target.value)} /></div>
            <div><label className="form-label">Phone</label><input className="gold-input" value={form.phone || ''} onChange={e => update('phone', e.target.value)} /></div>
            <div style={{ gridColumn: '1/-1' }}><label className="form-label">Email</label><input className="gold-input" value={form.email || ''} disabled style={{ opacity: 0.6 }} /></div>
            <div style={{ gridColumn: '1/-1' }}><label className="form-label">Address</label><input className="gold-input" value={form.address || ''} onChange={e => update('address', e.target.value)} /></div>
          </div>
          {user?.role === 'vendor' && (
            <>
              <div className="gold-divider" />
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 400, marginBottom: 20 }}>Business Details</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
                <div><label className="form-label">Business Name</label><input className="gold-input" value={form.business_name || ''} onChange={e => update('business_name', e.target.value)} /></div>
                <div><label className="form-label">Base Price (₹)</label><input className="gold-input" type="number" value={form.base_price || ''} onChange={e => update('base_price', Number(e.target.value))} /></div>
                <div style={{ gridColumn: '1/-1' }}><label className="form-label">Description</label><textarea className="gold-input" rows={3} value={form.description || ''} onChange={e => update('description', e.target.value)} style={{ resize: 'vertical' }} /></div>
              </div>
            </>
          )}
          <button className="btn-gold" onClick={handleSave} disabled={loading}>
            {loading ? 'Saving...' : '✦ Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── PAGE: NOTIFICATIONS ──────────────────────────────────────────────────────
function NotificationsPage() {
  const { user, navigate, showToast } = useApp();
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    api.get('/notifications').then(d => setNotifications(d.notifications || []));
  }, []);

  async function markAllRead() {
    try { await api.put('/notifications/read-all', {}); } catch { /* optimistic */ }
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    showToast('All notifications marked as read');
  }

  const iconMap = { booking_request: 'event', booking_update: 'event_available', payment: 'payments', system: 'info' };

  return (
    <div style={{ padding: '32px 36px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32, paddingBottom: 24, borderBottom: '1px solid var(--dark-border)' }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 300 }}>Notifications</h1>
          <p style={{ color: 'var(--dark-muted)', fontSize: '0.85rem' }}>{notifications.filter(n => !n.read).length} unread</p>
        </div>
        <button className="btn-outline" onClick={markAllRead}>Mark All Read</button>
      </div>
      <div style={{ maxWidth: 700, display: 'flex', flexDirection: 'column', gap: 12 }}>
        {notifications.length === 0 ? (
          <div style={{ textAlign: 'center', padding: 80, color: 'var(--dark-muted)' }}>
            <span className="material-symbols-outlined" style={{ fontSize: 56, display: 'block', marginBottom: 16, opacity: 0.2 }}>notifications_off</span>
            <p>No notifications yet</p>
          </div>
        ) : notifications.map(n => (
          <div key={n.id} style={{ display: 'flex', gap: 16, padding: 20, background: n.read ? 'transparent' : 'rgba(218,165,32,0.04)', border: `1px solid ${n.read ? 'var(--dark-border)' : 'rgba(218,165,32,0.2)'}`, borderRadius: 12, transition: 'all 0.2s ease' }}>
            <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'rgba(218,165,32,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <span className="material-symbols-outlined" style={{ fontSize: 20, color: 'var(--gold-500)' }}>{iconMap[n.type] || 'notifications'}</span>
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: '0.88rem', marginBottom: 4, fontWeight: n.read ? 400 : 500 }}>{n.message}</p>
              <p style={{ fontSize: '0.72rem', color: 'var(--dark-muted)' }}>{new Date(n.created_at).toLocaleString('en-IN')}</p>
            </div>
            {!n.read && <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--gold-400)', flexShrink: 0, marginTop: 6 }} />}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── LAYOUT ───────────────────────────────────────────────────────────────────
function DashboardLayout({ children, user, currentPage, navigate, logout }) {
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar user={user} currentPage={currentPage} onNavigate={navigate} onLogout={logout} />
      <main className="main-with-sidebar" style={{ flex: 1 }}>
        {children}
      </main>
    </div>
  );
}

// ─── APP ROOT ─────────────────────────────────────────────────────────────────
export default function App() {
  // Inject global styles
  useEffect(() => {
    const styleEl = document.createElement('style');
    styleEl.textContent = globalStyles;
    document.head.appendChild(styleEl);
    return () => document.head.removeChild(styleEl);
  }, []);

  const [page, setPage] = useState('login');
  const [user, setUser] = useState(null);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('elysian_user');
    const storedToken = localStorage.getItem('elysian_token');
    if (storedUser && storedToken) {
      const u = JSON.parse(storedUser);
      setUser(u);
      setPage(u.role === 'admin' ? 'admin-dashboard' : u.role === 'vendor' ? 'vendor-dashboard' : 'customer-dashboard');
    }
  }, []);

  function navigate(newPage) { setPage(newPage); window.scrollTo(0, 0); }
  function showToast(message, type = 'success') { setToast({ message, type, id: Date.now() }); }
  function logout() {
    localStorage.removeItem('elysian_token');
    localStorage.removeItem('elysian_user');
    setUser(null);
    setPage('login');
    showToast('Signed out successfully');
  }

  const ctx = { user, setUser, navigate, showToast, logout };
  const authPages = ['login', 'register'];
  const isAuth = authPages.includes(page);

  const pageComponents = {
    'login': <LoginPage />,
    'register': <RegisterPage />,
    'customer-dashboard': <CustomerDashboard />,
    'my-bookings': <MyBookingsPage />,
    'book-event': <BookEventPage />,
    'vendor-search': <VendorSearchPage />,
    'notifications': <NotificationsPage />,
    'profile': <ProfilePage />,
    'vendor-dashboard': <VendorDashboard />,
    'vendor-bookings': <VendorBookingsPage />,
    'vendor-analytics': <VendorAnalyticsPage />,
    'vendor-profile': <ProfilePage />,
    'admin-dashboard': <AdminDashboard />,
    'admin-users': <AdminUsersPage />,
    'admin-bookings': <AdminBookingsPage />,
    'admin-vendors': <AdminVendorsPage />,
  };

  return (
    <AppContext.Provider value={ctx}>
      {isAuth ? (
        pageComponents[page] || <LoginPage />
      ) : (
        <DashboardLayout user={user} currentPage={page} navigate={navigate} logout={logout}>
          {pageComponents[page] || <div style={{ padding: 40, color: 'var(--dark-muted)' }}>Page not found</div>}
        </DashboardLayout>
      )}
      {toast && <Toast key={toast.id} message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </AppContext.Provider>
  );
}