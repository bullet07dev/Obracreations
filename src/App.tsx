import { useEffect, useState } from "react";

const stories = [
  { src: "/photos/rain.JPG", title: "Rain, Then Forever", meta: "Wedding · Editorial" },
  { src: "/photos/mermaid.JPG", title: "A World of Wonder", meta: "Milestone · Portrait" },
  { src: "/photos/princess.JPG", title: "Little Royalty", meta: "Portrait · Celebration" },
  { src: "/photos/portrait.JPG", title: "Softly, She Shines", meta: "Portrait · Natural light" },
  { src: "/photos/generations.JPG", title: "The Dance", meta: "Family · Documentary" },
  { src: "/photos/vows.JPG", title: "Words We Keep", meta: "Wedding · Ceremony" },
  { src: "/photos/celebration.JPG", title: "Birthday Magic", meta: "Event · Celebration" },
  { src: "/photos/grace.JPG", title: "Grace in Bloom", meta: "Portrait · Legacy" },
];

function Icon({ name }: { name: "play" | "pause" | "back" | "next" | "arrow" }) {
  const paths = {
    play: <path d="m9 7 8 5-8 5V7Z" fill="currentColor" />,
    pause: <path d="M8 7h3v10H8V7Zm5 0h3v10h-3V7Z" fill="currentColor" />,
    back: <path d="M7 7v10M18 7l-8 5 8 5V7Z" fill="currentColor" stroke="currentColor" strokeWidth="1.5" />,
    next: <path d="M17 7v10M6 7l8 5-8 5V7Z" fill="currentColor" stroke="currentColor" strokeWidth="1.5" />,
    arrow: <path d="m8 16 8-8m-7 0h7v7" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />,
  };
  return <svg viewBox="0 0 24 24" aria-hidden="true">{paths[name]}</svg>;
}

export default function App() {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const move = (direction: number) =>
    setActive((current) => (current + direction + stories.length) % stories.length);

  return (
    <main>
      <nav className={scrolled ? "nav nav--scrolled" : "nav"}>
        <div className="wordmark">OBRA<span>CREATIONS</span></div>
        <div className="nav-links">
          <div onClick={() => document.querySelector("#work")?.scrollIntoView({ behavior: "smooth" })}>Archive</div>
          <div onClick={() => document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" })}>About</div>
        </div>
        <div className="availability"><i /> Available for stories</div>
      </nav>

      <section className="hero">
        <div className="ambient" style={{ backgroundImage: `url(${stories[active].src})` }} />
        <div className="hero-copy">
          <div className="eyebrow"><span>01</span> Visual stories by Obracreations</div>
          <div className="display">Life, in<br /><em>full color.</em></div>
          <p>Honest photographs of love, family, and the beautiful seconds that never come twice.</p>
        </div>

        <div className="player">
          <div className="player-top"><span>Now viewing</span><b>•••</b></div>
          <div className="cover-wrap">
            <img src={stories[active].src} alt={stories[active].title} />
            <div className={playing ? "equalizer" : "equalizer paused"}><i /><i /><i /><i /></div>
          </div>
          <div className="track-info">
            <div><strong>{stories[active].title}</strong><span>Obracreatıons · Selected Works</span></div>
            <div className="heart">♡</div>
          </div>
          <div className="progress"><i /><span /></div>
          <div className="times"><span>1:24</span><span>–2:36</span></div>
          <div className="controls">
            <div className="control" onClick={() => move(-1)}><Icon name="back" /></div>
            <div className="play" onClick={() => setPlaying(!playing)}><Icon name={playing ? "pause" : "play"} /></div>
            <div className="control" onClick={() => move(1)}><Icon name="next" /></div>
          </div>
        </div>
        <div className="scroll-note">Scroll to explore <span>↓</span></div>
      </section>

      <section className="archive" id="work">
        <div className="section-intro">
          <div className="eyebrow"><span>02</span> The archive</div>
          <div className="section-title">Every frame<br />has a heartbeat.</div>
          <p>A collection of the loud, quiet, polished and wonderfully imperfect.</p>
        </div>
        <div className="gallery">
          {stories.slice(1).map((story, index) => (
            <article className={`tile tile-${index + 1}`} key={story.title} onClick={() => { setActive(index + 1); window.scrollTo({ top: 0, behavior: "smooth" }); }}>
              <img src={story.src} alt={story.title} loading="lazy" />
              <div className="tile-shade" />
              <div className="tile-number">0{index + 2}</div>
              <div className="tile-copy"><span>{story.meta}</span><strong>{story.title}</strong></div>
              <div className="tile-arrow"><Icon name="arrow" /></div>
            </article>
          ))}
        </div>
      </section>

      <section className="about" id="about">
        <div className="about-image"><img src="/photos/promise.JPG" alt="A wedding photographed by Obracreations" loading="lazy" /></div>
        <div className="about-copy">
          <div className="eyebrow"><span>03</span> Behind the lens</div>
          <div className="quote">“I don’t photograph how it looked. I photograph how it <em>felt.</em>”</div>
          <p>Obracreatıons creates vivid, deeply human imagery for celebrations and families. Guided by light, movement, and real connection, every gallery becomes a place you can return to.</p>
          <div className="cta">Start your story <Icon name="arrow" /></div>
        </div>
      </section>

      <footer>
        <div className="footer-title">Let’s make something<br /><em>worth remembering.</em></div>
        <div className="footer-bottom"><span>© 2025 OBRACREATIONS</span><span>Photography with feeling</span></div>
      </footer>
    </main>
  );
}
