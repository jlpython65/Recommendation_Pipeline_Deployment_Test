import React, { useEffect, useState } from "react";
import { Routes, Route, NavLink, Link, useParams } from "react-router-dom";
import {
  Brain, Home, Play, FileText, Settings, Search, ChevronRight,
  ArrowLeft, ExternalLink, Clock3, Tag, Youtube
} from "lucide-react";


// const response = fetch("http://localhost:8000/api/reccomendations");
// console.log("Response from API:", response.then((res) => res.json()));


{/* <div>
  <h1>API Response</h1>
  <pre>{JSON.stringify(response, null, 2)}</pre>
  
</div> */}



const essays = [
  {
    id: "pursuit-of-growth",
    title: "The Pursuit of Growth",
    updated: "Aug 12, 2026",
    summary:
      "This essay explores how discipline, self-reflection, and a willingness to step outside your comfort zone can lead to meaningful personal growth.",
    themes: ["growth", "discipline", "self-improvement", "comfort zone", "purpose"],
    original:
      "True growth comes from deliberately confronting the things that are uncomfortable. Progress is less about reaching a final destination and more about repeatedly choosing difficult, meaningful actions."
  },
  {
    id: "mental-clarity",
    title: "Mental Clarity",
    updated: "Aug 8, 2026",
    summary:
      "A reflection on how reducing noise and protecting attention can make better decisions easier.",
    themes: ["clarity", "focus", "attention", "simplicity"],
    original:
      "A clear mind does not necessarily require more information. Sometimes it requires removing distractions and deciding what deserves attention."
  },
  {
    id: "building-better-habits",
    title: "Building Better Habits",
    updated: "Aug 3, 2026",
    summary:
      "Small changes compound when they are repeated consistently over time.",
    themes: ["habits", "consistency", "behavior", "discipline"],
    original:
      "The most useful habits are often the smallest ones. A behavior that can be repeated consistently has more long-term value than a perfect plan that is rarely followed."
  },
  {
    id: "simplicity-and-freedom",
    title: "Simplicity and Freedom",
    updated: "Jul 29, 2026",
    summary:
      "Less noise and fewer unnecessary commitments can create more room for meaningful work.",
    themes: ["simplicity", "freedom", "minimalism", "focus"],
    original:
      "Freedom can come from subtraction. Removing unnecessary obligations can create the space needed for the things that matter."
  }
];


function useVideos() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function loadVideos() {
      try {
        const response = await fetch("http://localhost:8080/api/recommendations", {
          signal: controller.signal,
        });
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const data = await response.json();
        if (!Array.isArray(data.recommendations)) {
          throw new Error("The response did not contain a recommendations array");
        }

        setVideos(data.recommendations);
      } catch (fetchError) {
        if (!controller.signal.aborted) {
          console.error("Error fetching videos:", fetchError);
          setError(fetchError.message || "Unable to load recommendations");
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadVideos();
    return () => controller.abort();
  }, []);

  return { videos, loading, error };
}

// const videos = [
//   {
//     id: "mindset-discipline",
//     title: "The Mindset of Discipline | Motivation for a Better You",
//     source: "YouTube",
//     duration: "12:34",
//     score: 92,
//     essay: "The Pursuit of Growth",
//     image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
//     summary:
//       "This video explores how discipline builds long-term freedom rather than restriction. It discusses practical strategies for developing better habits, maintaining motivation during difficult periods, and shifting attention from short-term rewards to long-term goals.",
//     themes: ["discipline", "habits", "mindset", "long-term thinking", "motivation"]
//   },
//   {
//     id: "finding-purpose",
//     title: "Why We Feel Lost and How to Find Our Way",
//     source: "YouTube",
//     duration: "18:21",
//     score: 87,
//     essay: "Mental Clarity",
//     image: "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?auto=format&fit=crop&w=900&q=80",
//     summary:
//       "A discussion about purpose, uncertainty, and finding direction when there is too much competing information.",
//     themes: ["purpose", "direction", "clarity", "uncertainty"]
//   },
//   {
//     id: "power-of-solitude",
//     title: "The Power of Solitude | A Calmer Mind",
//     source: "YouTube",
//     duration: "15:48",
//     score: 82,
//     essay: "Mental Clarity",
//     image: "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=900&q=80",
//     summary:
//       "An exploration of solitude as a tool for reflection, attention, and reducing mental noise.",
//     themes: ["solitude", "reflection", "focus", "clarity"]
//   },
//   {
//     id: "better-habits",
//     title: "The Science of Better Habits",
//     source: "YouTube",
//     duration: "21:07",
//     score: 76,
//     essay: "Building Better Habits",
//     image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=900&q=80",
//     summary:
//       "A practical overview of how habits form and how small environmental changes can make desirable behaviors easier to repeat.",
//     themes: ["habits", "behavior", "environment", "consistency"]
//   },
//   {
//     id: "mountain-monk",
//     title: "A Day in the Life of a Mountain Monk",
//     source: "YouTube",
//     duration: "09:52",
//     score: 71,
//     essay: "Simplicity and Freedom",
//     image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=900&q=80",
//     summary:
//       "A documentary-style look at a simple daily routine built around reflection, work, and intentional living.",
//     themes: ["simplicity", "routine", "reflection", "intentional living"]
//   }
// ];

function Layout({ children }) {
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <Link to="/" className="brand">
          <div className="brand-icon"><Brain size={23} /></div>
          <div>
            <strong>Media Recommendation</strong>
            <span>Pipeline</span>
          </div>
        </Link>

        <nav>
          <NavItem to="/" icon={<Home size={18} />} label="Home" />
          <NavItem to="/recommendations" icon={<Play size={18} />} label="Recommendations" />
          <NavItem to="/essays" icon={<FileText size={18} />} label="Essays" />
          <NavItem to="/videos" icon={<Youtube size={18} />} label="Videos" />
        </nav>

        <div className="sidebar-bottom">
          <button className="nav-item">
            <Settings size={18} />
            <span>Settings</span>
          </button>
        </div>
      </aside>

      <main className="main">
        <header className="topbar">
          <div />
          <div className="top-actions">
            <Search size={19} />
            <div className="avatar">JL</div>
          </div>
        </header>
        {children}
      </main>
    </div>
  );
}

function NavItem({ to, icon, label }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}
    >
      {icon}
      <span>{label}</span>
    </NavLink>
  );
}

function HomePage() {
  return (
    <Page title="Media Recommendation Pipeline" subtitle="Personalized media recommendations based on your essays.">
      <section className="hero-card">
        <div>
          <span className="eyebrow">SEMANTIC RECOMMENDATIONS</span>
          <h2>Find media that matches what you care about.</h2>
          <p>
            Your essays are converted into embeddings and compared with media
            representations to surface the strongest semantic matches.
          </p>
          <Link className="primary-button" to="/recommendations">View recommendations</Link>
        </div>
        <div className="hero-stat">
          <strong>92%</strong>
          <span>Top semantic match</span>
        </div>
      </section>

      <div className="section-heading">
        <div>
          <h2>Quick access</h2>
          <p>Explore your essays and generated video summaries.</p>
        </div>
      </div>

      <div className="quick-grid">
        <QuickCard to="/recommendations" icon={<Play />} title="Recommendations" text="Ranked media matches based on semantic similarity." />
        <QuickCard to="/essays" icon={<FileText />} title="Essay Summaries" text="Browse summaries and open your original writing." />
        <QuickCard to="/videos" icon={<Youtube />} title="Video Summaries" text="Browse generated summaries for recommended videos." />
      </div>
    </Page>
  );
}

function Recommendations() {
  const { videos, loading, error } = useVideos();

  return (
    <Page title="Recommendations" subtitle="Personalized media recommendations based on your essays.">
      <div className="section-heading">
        <div>
          <h2>Top matches</h2>
          <p>Ranked by semantic similarity between media and your essays.</p>
        </div>
      </div>

      {loading && <p>Loading recommendations...</p>}
      {error && <p role="alert">Could not load recommendations: {error}</p>}
      <div className="recommendation-list">
        {videos.map(video => (
          <Link to={`/videos/${video.id}`} className="recommendation-card" key={video.id}>
            <img src={video.image} alt="" />
            <div className="recommendation-content">
              <div className="source">
                <Youtube size={14} />
                {video.source}
              </div>
              <h3>{video.title}</h3>
              <div className="match-row">
                <FileText size={14} />
                <span>Matches: {video.essay}</span>
              </div>
            </div>
            <div className="score">{video.score}%</div>
            <ChevronRight className="card-arrow" size={20} />
          </Link>
        ))}
      </div>
    </Page>
  );
}

function Essays() {
  const [query, setQuery] = useState("");
  const filtered = essays.filter(e =>
    e.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <Page title="Essay Summaries" subtitle="View your essay summaries and explore the original writings.">
      <div className="search-box">
        <Search size={17} />
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search essays..."
        />
      </div>

      <div className="list-stack">
        {filtered.map(essay => (
          <Link className="list-card" to={`/essays/${essay.id}`} key={essay.id}>
            <div className="document-icon"><FileText /></div>
            <div>
              <h3>{essay.title}</h3>
              <p>{essay.summary}</p>
              <small>Updated: {essay.updated}</small>
            </div>
            <ChevronRight />
          </Link>
        ))}
      </div>
    </Page>
  );
}

function Videos() {
  const { videos, loading, error } = useVideos();

  return (
    <Page title="Video Summaries" subtitle="Browse summaries generated from recommended media.">
      {loading && <p>Loading videos...</p>}
      {error && <p role="alert">Could not load videos: {error}</p>}
      <div className="list-stack">
        {videos.map(video => (
          <Link className="list-card" to={`/videos/${video.id}`} key={video.id}>
            <img className="mini-thumb" src={video.image} alt="" />
            <div>
              <h3>{video.title}</h3>
              <p>{video.summary}</p>
              <small><Youtube size={12} /> {video.source} · {video.duration} · {video.score}% match</small>
            </div>
            <ChevronRight />
          </Link>
        ))}
      </div>
    </Page>
  );
}

function EssayDetail() {
  const { id } = useParams();
  const essay = essays.find(e => e.id === id);

  if (!essay) return <NotFound />;

  return (
    <Page>
      <BackLink to="/essays" text="Back to Essays" />
      <div className="detail-header">
        <div className="document-icon large"><FileText /></div>
        <div>
          <h1>{essay.title}</h1>
          <p>Updated: {essay.updated}</p>
        </div>
      </div>

      <div className="tabs">
        <span className="tab active">Summary</span>
        <span className="tab">Original Essay</span>
      </div>

      <SummaryPanel title="Essay Summary" text={essay.summary} themes={essay.themes} />

      <Link className="original-card" to={`/essays/${essay.id}?original=true`}>
        <FileText />
        <div>
          <strong>View Original Essay</strong>
          <span>Open the complete original writing</span>
        </div>
        <ChevronRight />
      </Link>
    </Page>
  );
}

function VideoDetail() {
  const { id } = useParams();
  const { videos, loading, error } = useVideos();
  const video = videos.find(v => v.id === id);

  if (loading) {
    return <Page title="Loading video..." />;
  }

  if (error) {
    return <Page title="Unable to load video" subtitle={error} />;
  }

  if (!video) return <NotFound />;

  return (
    <Page>
      <BackLink to="/recommendations" text="Back to Recommendations" />

      <div className="video-header">
        <img src={video.image} alt="" />
        <div className="video-info">
          <h1>{video.title}</h1>
          <div className="meta">
            <Youtube size={15} />
            {video.source} · {video.duration}
          </div>
          <div className="match-pill">{video.score}% Similarity to Essay</div>
        </div>
      </div>

      <SummaryPanel title="Video Summary" text={video.summary} themes={video.themes} />

      <Link
        className="related-card"
        to={`/essays/${essays.find(e => e.title === video.essay)?.id}`}
      >
        <FileText />
        <div>
          <strong>Related Essay</strong>
          <span>{video.essay}</span>
        </div>
        <ChevronRight />
      </Link>

      <a className="external-card" href="https://youtube.com" target="_blank" rel="noreferrer">
        <ExternalLink />
        <div>
          <strong>Watch Original Video</strong>
          <span>Open the source on YouTube</span>
        </div>
        <ExternalLink />
      </a>
    </Page>
  );
}

function SummaryPanel({ title, text, themes }) {
  return (
    <section className="summary-panel">
      <h2><FileText size={18} /> {title}</h2>
      <p>{text}</p>
      <div className="theme-title"><Tag size={15} /> Key Themes</div>
      <div className="tags">
        {themes.map(theme => <span key={theme}>{theme}</span>)}
      </div>
    </section>
  );
}

function QuickCard({ to, icon, title, text }) {
  return (
    <Link className="quick-card" to={to}>
      <div className="quick-icon">{icon}</div>
      <h3>{title}</h3>
      <p>{text}</p>
      <ChevronRight />
    </Link>
  );
}

function BackLink({ to, text }) {
  return (
    <Link className="back-link" to={to}>
      <ArrowLeft size={16} /> {text}
    </Link>
  );
}

function Page({ title, subtitle, children }) {
  return (
    <div className="page">
      {title && (
        <div className="page-title">
          <h1>{title}</h1>
          {subtitle && <p>{subtitle}</p>}
        </div>
      )}
      {children}
    </div>
  );
}

function NotFound() {
  return (
    <Page title="Not Found" subtitle="The requested item does not exist." />
  );
}

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/recommendations" element={<Recommendations />} />
        <Route path="/essays" element={<Essays />} />
        <Route path="/essays/:id" element={<EssayDetail />} />
        <Route path="/videos" element={<Videos />} />
        <Route path="/videos/:id" element={<VideoDetail />} />
      </Routes>
    </Layout>
  );
}