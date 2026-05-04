import React, { useEffect, useMemo, useState } from "react";

const navItems = [
  ["Story", "#story"],
  ["Shows", "#shows"],
  ["Video", "#video"],
  ["Store", "#store"],
  ["Book", "#book"],
];

const image = (name) => `/assets/${name}`;

const sources = {
  instagram: "https://www.instagram.com/jevon314/",
  linkedin: "https://www.linkedin.com/in/jevon-westmoland-4a469911b/",
  boldJourney: "https://boldjourney.com/meet-jevon-westmoland/",
  canvasRebel: "https://canvasrebel.com/meet-jevon-westmoland/",
  loonyBin:
    "https://lr.loonybincomedy.com/ShowDetails/f1fab8b0-ac17-43be-a7a9-8137fb29dc3d/46a4734a-d472-4d42-9712-3574fd06ed97/A_Fresh_Pair_of_Jays_/Little_Rock",
  store: "https://blessedgodsfavorite.com/collections/all?page=2",
  gigSalad: "https://www.gigsalad.com/jevon_westmoland_florissant",
};

const marqueeItems = [
  "Clean Comedy",
  "Storytelling",
  "Faith",
  "Family",
  "St. Louis",
  "A Fresh Pair of Jays",
  "Host",
  "Actor",
  "Writer",
  "Blessed God's Favorite",
];

const letterize = (text) =>
  text.split("").map((char, index) => (
    <span
      className={char === " " ? "letter space" : "letter"}
      style={{ "--i": index }}
      key={`${char}-${index}`}
    >
      {char === " " ? "\u00a0" : char}
    </span>
  ));

function useReveals() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.14 },
    );

    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [curtainLifted, setCurtainLifted] = useState(false);
  const menuLabel = menuOpen ? "Close navigation" : "Open navigation";
  const marquee = useMemo(() => [...marqueeItems, ...marqueeItems], []);

  useReveals();

  useEffect(() => {
    const lift = window.setTimeout(() => setCurtainLifted(true), 500);
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => {
      window.clearTimeout(lift);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <div className={`curtain ${curtainLifted ? "lifted" : ""}`}>
        <span>JW</span>
      </div>

      <nav className={`nav ${scrolled ? "scrolled" : ""}`}>
        <div className="nav-inner">
          <div className="nav-crest">Clean Joy Co.</div>
          <a className="nav-logo" href="#top" onClick={closeMenu}>
            Jevon <span>Westmoland</span>
          </a>
          <div className="nav-right">
            <ul className="nav-links">
              {navItems.map(([label, href]) => (
                <li key={label}>
                  <a href={href}>{label}</a>
                </li>
              ))}
            </ul>
            <a className="gold-btn compact" href={sources.gigSalad} target="_blank" rel="noreferrer">
              Book
            </a>
            <button
              className={`hamburger ${menuOpen ? "active" : ""}`}
              type="button"
              aria-label={menuLabel}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((open) => !open)}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </nav>

      <div className={`mobile-menu ${menuOpen ? "active" : ""}`} aria-hidden={!menuOpen}>
        <ul>
          {navItems.map(([label, href]) => (
            <li key={label}>
              <a href={href} onClick={closeMenu}>
                {label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <main id="top">
        <section className="hero">
          <div className="hero-bg">
            <img src={image("jevon-loony-stage.jpg")} alt="Jevon Westmoland performing on stage" />
          </div>
          <div className="hero-side-label">Christian Comedy · St. Louis, MO</div>
          <div className="container hero-content">
            <div className="hero-top-row">
              <div className="hero-eyebrow-group">
                <span className="live-dot" />
                <span className="eyebrow">Clean set · Big laugh · Real life</span>
              </div>
              <p className="hero-meta-right">
                <span>Est. 2021</span>
                Comedian · Actor · Host · Writer
              </p>
            </div>

            <h1 className="hero-title">
              <span>{letterize("Jevon")}</span>
              <span>{letterize("Westmoland")}</span>
            </h1>

            <div className="hero-bottom">
              <p className="hero-strapline">
                Gospel-rooted, family-friendly comedy from a St. Louis storyteller who finds the funny in faith,
                fatherhood, marriage, and everyday life.
              </p>
              <div className="hero-actions">
                <a className="gold-btn" href={sources.gigSalad} target="_blank" rel="noreferrer">
                  Book Jevon
                </a>
                <a className="outline-btn" href={sources.instagram} target="_blank" rel="noreferrer">
                  Follow @jevon314
                </a>
              </div>
            </div>
          </div>
        </section>

        <div className="ticker" aria-label="Jevon Westmoland highlights">
          <div className="ticker-track">
            {marquee.map((item, index) => (
              <span key={`${item}-${index}`}>{item}</span>
            ))}
          </div>
        </div>

        <section className="block single-feature" id="story">
          <div className="container feature-grid">
            <div className="feature-media reveal">
              <img src={image("jevon-plaid.jpg")} alt="Portrait of Jevon Westmoland" />
              <div className="image-caption">Frostwood roots · St. Louis voice</div>
            </div>
            <div className="feature-copy reveal">
              <p className="section-kicker">I · The Story</p>
              <h2 className="section-title">From open mics to rooms that know his name.</h2>
              <p>
                Jevon started stand-up in October 2021 and quickly built a lane around clean storytelling, sharp
                observation, and crowd connection. His material stays rooted in real life: being a son, brother, husband,
                father, and believer.
              </p>
              <p>
                He has hosted and performed in clubs across the Midwest and beyond, including Helium, Funny Bone, and
                Loony Bin rooms, while sharing stages with veteran and rising comics.
              </p>
              <div className="stat-row">
                <div>
                  <strong>5.0</strong>
                  <span>Audience rating</span>
                </div>
                <div>
                  <strong>2021</strong>
                  <span>First open mic</span>
                </div>
                <div>
                  <strong>200 mi</strong>
                  <span>Travel radius listed</span>
                </div>
              </div>
              <a className="text-link" href={sources.boldJourney} target="_blank" rel="noreferrer">
                Read the press story
              </a>
            </div>
          </div>
        </section>

        <section className="scripture-band">
          <div className="container">
            <p>✦ Proverbs 17:22 ✦</p>
            <h2>A cheerful heart is good medicine.</h2>
          </div>
        </section>

        <section className="block" id="shows">
          <div className="container">
            <div className="section-head reveal">
              <p className="section-kicker">II · The Stage</p>
              <h2 className="section-title">Comedy built for church nights, clubs, corporate rooms, and family events.</h2>
              <a className="text-link" href={sources.gigSalad} target="_blank" rel="noreferrer">
                Request a quote
              </a>
            </div>

            <div className="show-grid">
              {[
                ["Clean Stand-Up", "Family and work-friendly comedy with storytelling at the center."],
                ["Hosting", "A steady, quick room presence for showcases, church programs, clubs, and private events."],
                ["A Fresh Pair of Jays", "A comedy collaboration and podcast with Jason Jenkins built around two Midwest voices."],
                ["Acting & Writing", "Screen-forward creative work, sketches, scripts, and character-driven ideas."],
              ].map(([title, text], index) => (
                <article className="show-card reveal" style={{ "--delay": `${index * 80}ms` }} key={title}>
                  <span>0{index + 1}</span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="block visual-stack" id="video">
          <div className="container visual-grid">
            <div className="visual-copy reveal">
              <p className="section-kicker">III · The Screen</p>
              <h2 className="section-title">The laugh lands clean. The room still shakes.</h2>
              <p>
                Jevon’s clips and live moments are shaped for multi-generational audiences: church folks, club crowds,
                family reunions, and workplaces that want a show without the side-eye.
              </p>
              <div className="button-row">
                <a className="gold-btn" href={sources.instagram} target="_blank" rel="noreferrer">
                  Watch Clips
                </a>
                <a className="outline-btn" href={sources.loonyBin} target="_blank" rel="noreferrer">
                  A Fresh Pair of Jays
                </a>
              </div>
            </div>

            <div className="video-wall reveal">
              <video src={image("jevon-room-clip.mp4")} autoPlay muted loop playsInline />
            </div>
          </div>
        </section>

        <section className="block gallery-block">
          <div className="container">
            <div className="section-head reveal">
              <p className="section-kicker">IV · The Room</p>
              <h2 className="section-title">Documented by the people who booked him.</h2>
              <p>
                Verified audiences describe Jevon as professional, punctual, personable, and clean-funny enough to bring
                back.
              </p>
            </div>
            <div className="gallery">
              <img className="reveal" src={image("jevon-blue-smile.jpg")} alt="Jevon smiling with a microphone" />
              <img className="reveal" src={image("jevon-headshot.jpg")} alt="Jevon Westmoland headshot" />
              <img className="reveal" src={image("jevon-mic-hoodie.jpg")} alt="Jevon performing on stage" />
            </div>
          </div>
        </section>

        <section className="block store-block" id="store">
          <div className="container store-grid">
            <div className="store-copy reveal">
              <p className="section-kicker">V · The Store</p>
              <h2 className="section-title">Blessed God’s Favorite.</h2>
              <p>
                Faith-forward apparel with bold colorways, cozy hoodies, and praise-coded everyday wear. The current
                collection includes Divine Favor, Glory Light, Favor & Fire, and more.
              </p>
              <a className="gold-btn" href={sources.store} target="_blank" rel="noreferrer">
                Shop the Collection
              </a>
            </div>
            <div className="product-rail reveal">
              {[
                ["blessed-cream.png", "Divine Favor"],
                ["blessed-gold.png", "Glory Light"],
                ["blessed-fire.png", "Favor & Fire"],
              ].map(([file, title]) => (
                <a href={sources.store} target="_blank" rel="noreferrer" className="product" key={title}>
                  <img src={image(file)} alt={`${title} hoodie`} />
                  <span>{title}</span>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="block press-block">
          <div className="container">
            <div className="section-head reveal">
              <p className="section-kicker">VI · The Record</p>
              <h2 className="section-title">Press, platforms, and receipts.</h2>
            </div>
            <div className="press-grid">
              <a className="press-card reveal" href={sources.canvasRebel} target="_blank" rel="noreferrer">
                <span>CanvasRebel</span>
                <h3>Started when God saw fit.</h3>
                <p>On timing, creative courage, writing daily, and building a comedy voice.</p>
              </a>
              <a className="press-card reveal" href={sources.boldJourney} target="_blank" rel="noreferrer">
                <span>Bold Journey</span>
                <h3>Work ethic as a promise.</h3>
                <p>On reading, writing, networking, and learning the craft without shortcuts.</p>
              </a>
              <a className="press-card reveal" href={sources.loonyBin} target="_blank" rel="noreferrer">
                <span>Loony Bin</span>
                <h3>A Fresh Pair of Jays.</h3>
                <p>A clean comedic journey with multigenerational reach and Midwest roots.</p>
              </a>
            </div>
          </div>
        </section>

        <section className="book-section" id="book">
          <div className="container book-inner reveal">
            <p>✦ Keep the room laughing ✦</p>
            <h2>Bring Jevon to your next church event, gala, club night, company program, or private celebration.</h2>
            <div className="booking-actions">
              <a className="gold-btn" href={sources.gigSalad} target="_blank" rel="noreferrer">
                Book the Show
              </a>
              <a className="outline-btn" href={sources.linkedin} target="_blank" rel="noreferrer">
                Connect on LinkedIn
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer-grid">
          <div>
            <a className="footer-logo" href="#top">
              JW
            </a>
            <p>Clean Christian comedy, storytelling, hosting, acting, writing, and joy for rooms that need it.</p>
          </div>
          <div>
            <h4>Work</h4>
            <a href="#story">Story</a>
            <a href="#shows">Shows</a>
            <a href="#video">Video</a>
            <a href="#store">Store</a>
          </div>
          <div>
            <h4>Connect</h4>
            <a href={sources.instagram} target="_blank" rel="noreferrer">
              Instagram
            </a>
            <a href={sources.linkedin} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
            <a href={sources.gigSalad} target="_blank" rel="noreferrer">
              Booking
            </a>
          </div>
        </div>
        <div className="container footer-bottom">
          <span>© 2026 Jevon Westmoland</span>
          <span>Built for jlmiller12s/jevon-westmoland</span>
        </div>
      </footer>
    </>
  );
}

export default App;
