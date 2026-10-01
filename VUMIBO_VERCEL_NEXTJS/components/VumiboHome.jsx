"use client";
import { Fragment, useEffect, useRef, useState } from "react";
import { siteConfig } from "../site-config";

const characters = {
 forklift: { lines: ["The mighty", "little lifter."], role: "A little lift goes a long way", description: "First to lend a hand. Always ready to lift, carry and give a big idea a little push.", tags: ["Orange", "Lifts & carries", "Big-hearted"], greeting: "I can lift it!", alt: "Orange forklift with bright blue eyes and a happy smile", number: "01" },
 crane: { lines: ["A friend with", "a helping hook."], role: "Big dreams? Reach a little higher", description: "When the team needs a lift, Crane is there. Up, over and into place — steady does it!", tags: ["Turquoise", "Reaches high", "A helping hook"], greeting: "Up we go!", alt: "Friendly turquoise crane with a long lifting arm and yellow hook", number: "02" },
 "fan-truck": { lines: ["A little breeze.", "A big whoosh!"], role: "Here comes a breath of fresh fun", description: "A spin, a puff and a whole lot of cheer. Fan Truck knows how to get a good idea moving.", tags: ["Purple", "Blows & spins", "Full of energy"], greeting: "Whooosh!", alt: "Purple truck with a large turquoise fan and a cheerful face", number: "03" }
};
const platforms = [{ key: "spotify", name: "Spotify", icon: "spotify" }, { key: "appleMusic", name: "Apple Music", icon: "applemusic" }, { key: "youtubeMusic", name: "YouTube Music", icon: "youtubemusic" }];
const previews = { pinwheel: { title: "Build a Giant Pinwheel", src: "/assets/pinwheel-preview.mp4", poster: "/assets/episode-pinwheel.webp" }, race: { title: "The Great Little Race", src: "/assets/race-preview.mp4", poster: "/assets/episode-race.webp" } };
function safeHttps(value) { try { const url = new URL(value); return url.protocol === "https:" ? url.href : null; } catch { return null; } }

export default function VumiboHome() {
 const [menuOpen, setMenuOpen] = useState(false);
 const [characterKey, setCharacterKey] = useState("forklift");
 const [preview, setPreview] = useState(null);
 const [year, setYear] = useState(2026);
 const dialogRef = useRef(null); const videoRef = useRef(null);
 const character = characters[characterKey]; const activePreview = previews[preview];
 const youtubeHref = safeHttps(siteConfig.youtube) || "https://www.youtube.com/@Vumibo";
 function handleTabKey(event, key) {
  const keys = Object.keys(characters); const i = keys.indexOf(key);
  const next = { ArrowRight: (i + 1) % keys.length, ArrowLeft: (i + keys.length - 1) % keys.length, Home: 0, End: keys.length - 1 }[event.key];
  if (next !== undefined) { event.preventDefault(); setCharacterKey(keys[next]); document.getElementById(`tab-${keys[next]}`)?.focus(); }
 }
 function handleBackdrop(event) {
  if (event.target !== dialogRef.current) return;
  const r = dialogRef.current.getBoundingClientRect();
  if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) setPreview(null);
 }
 useEffect(() => {
  const dialog = dialogRef.current, video = videoRef.current;
  if (!activePreview) { if (dialog?.open) dialog.close(); video?.pause(); return; }
  const previousOverflow = document.body.style.overflow;
  if (!dialog.open) dialog.showModal(); document.body.style.overflow = "hidden";
  video.muted = true; video.play().catch(() => {});
  return () => { video.pause(); if (dialog.open) dialog.close(); document.body.style.overflow = previousOverflow; };
 }, [activePreview]);
 useEffect(() => {
  setYear(new Date().getFullYear());
  const abort = new AbortController();
  document.addEventListener("keydown", event => { if (event.key === "Escape") setMenuOpen(false); }, { signal: abort.signal });
  const motion = window.matchMedia("(prefers-reduced-motion: reduce)"); let observer;
  const revealElements = [...document.querySelectorAll(".section-heading,.crew-stage,.episode-card,.music-copy,.grownups-copy")];
  if (!motion.matches && "IntersectionObserver" in window) {
   observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add("in-view"); observer.unobserve(entry.target); } }), { threshold: 0.10 });
   revealElements.forEach(element => { element.classList.add("reveal-ready"); observer.observe(element); });
  }
  const hero = document.querySelector(".hero"), art = document.querySelector(".hero-art");
  if (!motion.matches && window.matchMedia("(pointer: fine)").matches) {
   hero.addEventListener("pointermove", event => { const r = hero.getBoundingClientRect(); art.style.setProperty("--mx", ((event.clientX - r.left) / r.width - .5) * 12 + "px"); art.style.setProperty("--my", ((event.clientY - r.top) / r.height - .5) * 9 + "px"); }, { signal: abort.signal });
   hero.addEventListener("pointerleave", () => { art.style.setProperty("--mx", "0px"); art.style.setProperty("--my", "0px"); }, { signal: abort.signal });
  }
  return () => { abort.abort(); observer?.disconnect(); revealElements.forEach(element => element.classList.remove("reveal-ready", "in-view")); };
 }, []);
 return <>

<a className="skip-link" href="#main">Skip to content</a>
<header className="header" id="top">
  <a className="brand" href="#top" aria-label="Vumibo home"><img src="/assets/wordmark.svg" alt="Vumibo" width="174" height="44" /></a>
  <nav className="desktop-nav" aria-label="Main navigation">
    <a href="#crew">The crew</a><a href="#adventures">Adventures</a><a href="#music">Music</a><a href="#grownups">For grown-ups</a>
  </nav>
  <a className="button button-header" data-link="youtube" href={youtubeHref} target="_blank" rel="noopener"><span className="play-icon" aria-hidden="true"></span>Watch on YouTube</a>
  <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? "Close navigation" : "Open navigation"} aria-expanded={menuOpen} aria-controls="mobile-nav"><span></span><span></span></button>
  <nav id="mobile-nav" className="mobile-nav" aria-label="Mobile navigation" hidden={!menuOpen} onClick={() => setMenuOpen(false)}><a href="#crew">The crew</a><a href="#adventures">Adventures</a><a href="#music">Music</a><a href="#grownups">For grown-ups</a></nav>
</header>
<main id="main">
  <section className="hero" aria-labelledby="hero-title">
    <div className="hero-orbit orbit-one" aria-hidden="true"></div><div className="hero-orbit orbit-two" aria-hidden="true"></div>
    <div className="hero-copy">
      <p className="eyebrow hero-eyebrow"><span className="mini-spark" aria-hidden="true">✦</span> A whole little world of wonder</p>
      <h1 id="hero-title">Little wheels.<br /><span>BIG</span><br />adventures.</h1>
      <p className="hero-description">Big ideas start with little friends.<br /> Come along for the ride.</p>
      <div className="hero-actions"><a className="button button-yellow" href="#adventures"><span className="play-icon" aria-hidden="true"></span>Let's watch</a><a className="text-link" href="#crew">Meet your new friends</a></div>
    </div>
    <div className="hero-art" aria-label="Vumibo's colourful vehicle friends">
      <div className="hero-halo" aria-hidden="true"></div>
      <div className="hello-sticker" aria-hidden="true">BEEP<br />BEEP!</div>
      <div className="hero-characters" id="hero-characters"><img className="hero-island" src="/assets/hero-island.webp" srcSet="/assets/hero-island-small.webp 800w, /assets/hero-island.webp 1400w" sizes="(max-width: 800px) 100vw, 62vw" alt="Our orange forklift, turquoise crane and purple fan truck on their colourful little island" width="1400" height="1312" fetchPriority="high" /></div>
      <span className="hero-star star-one" aria-hidden="true">✦</span><span className="hero-star star-two" aria-hidden="true">✦</span>
      <span className="world-note">Made of colour. Powered by friendship.</span>
    </div>
    <div className="hero-bottom"><span>Original stories & songs</span><a href="#crew">Explore the Vumibo world <span aria-hidden="true">↓</span></a><span className="hero-edition">LET'S GO, GO, GO!</span></div>
  </section>
  <div className="joy-strip" aria-hidden="true"><div><span>LITTLE WHEELS</span><b>✦</b><span>BIG IDEAS</span><b>✦</b><span>BETTER TOGETHER</span><b>✦</b><span>LITTLE WHEELS</span><b>✦</b><span>BIG IDEAS</span><b>✦</b><span>BETTER TOGETHER</span><b>✦</b></div></div>
  <section className="crew-section section-pad" id="crew" aria-labelledby="crew-title">
    <div className="section-heading"><div><p className="eyebrow">Meet the Vumibo crew</p><h2 id="crew-title">Small crew.<br /><span className="blue-text">Big personalities.</span></h2></div><p>Different wheels. Different skills.<br />Always better together.</p></div>
    <div className="crew-stage" data-character={characterKey}>
      <div className="crew-info">
        <div className="character-tabs" role="tablist" aria-label="Choose a character"><button id="tab-forklift" type="button" role="tab" aria-selected={characterKey === "forklift"} aria-controls="character-panel" data-character="forklift" tabIndex={characterKey === "forklift" ? 0 : -1} onClick={() => setCharacterKey("forklift")} onKeyDown={(event) => handleTabKey(event, "forklift")}><img src="/assets/forklift.webp" alt="" width="80" height="80" /><span>Forklift</span></button><button id="tab-crane" type="button" role="tab" aria-selected={characterKey === "crane"} aria-controls="character-panel" data-character="crane" tabIndex={characterKey === "crane" ? 0 : -1} onClick={() => setCharacterKey("crane")} onKeyDown={(event) => handleTabKey(event, "crane")}><img src="/assets/crane.webp" alt="" width="80" height="80" /><span>Crane</span></button><button id="tab-fan-truck" type="button" role="tab" aria-selected={characterKey === "fan-truck"} aria-controls="character-panel" data-character="fan-truck" tabIndex={characterKey === "fan-truck" ? 0 : -1} onClick={() => setCharacterKey("fan-truck")} onKeyDown={(event) => handleTabKey(event, "fan-truck")}><img src="/assets/fan-truck.webp" alt="" width="80" height="80" /><span>Fan Truck</span></button></div>
        <div id="character-panel" role="tabpanel" aria-labelledby={`tab-${characterKey}`} tabIndex="0"><p className="eyebrow" id="character-role">{character.role}</p><h3 id="character-name">{character.lines.map((line, index) => <Fragment key={line}>{index > 0 && <br />}{line}</Fragment>)}</h3><p className="character-description" id="character-description">{character.description}</p><div className="character-tags" id="character-tags">{character.tags.map(tag => <span key={tag}>{tag}</span>)}</div></div>
        <div className="crew-count"><span id="character-count">{character.number}</span><span className="count-line"></span><span>03 friends, one team</span></div>
      </div>
      <div className="character-visual"><span className="character-number" aria-hidden="true">{character.number}</span><div className="character-ring" aria-hidden="true"></div><img id="character-image" src={`/assets/${characterKey}.webp`} alt={character.alt} width="1000" height="873" loading="lazy" /><span className="character-greeting" id="character-greeting" aria-hidden="true">{character.greeting}</span></div>
    </div>
  </section>
  <section className="adventures section-pad" id="adventures" aria-labelledby="adventure-title">
    <div className="section-heading"><div><p className="eyebrow">A little play. A big adventure.</p><h2 id="adventure-title">Ready. Set.<br /><span className="yellow-text">Let's go!</span></h2></div><a className="button button-white" href={youtubeHref} data-link="youtube" target="_blank" rel="noopener"><img src="/assets/youtube.svg" className="button-icon" alt="" />More on YouTube</a></div>
    <div className="adventure-grid">
      <article className="episode-card episode-featured">
        <button className="episode-art" data-preview="pinwheel" onClick={() => setPreview("pinwheel")} aria-label="Play preview of Build a Giant Pinwheel"><img src="/assets/episode-pinwheel.webp" alt="The three Vumibo trucks with giant colourful pinwheels" width="1400" height="788" loading="lazy" /><span className="episode-label">THE PINWHEEL ADVENTURE</span><span className="big-play" aria-hidden="true"><span className="play-icon"></span></span><span className="preview-caption">Play a little preview</span></button>
        <div className="episode-info"><span className="episode-index">01 / TEAMWORK</span><h3>One giant pinwheel.<br />Three little helpers.</h3><p>Lift it. Place it. Make it spin. A big idea takes a whole team.</p><button className="inline-play" data-preview="pinwheel" onClick={() => setPreview("pinwheel")}><span className="play-icon" aria-hidden="true"></span>Watch preview</button></div>
      </article>
      <article className="episode-card episode-race">
        <button className="episode-art" data-preview="race" onClick={() => setPreview("race")} aria-label="Play preview of the Vumibo race adventure"><img src="/assets/episode-race.webp" alt="A colourful race course in the Vumibo world" width="1400" height="788" loading="lazy" /><span className="episode-label">THE GREAT LITTLE RACE</span><span className="big-play" aria-hidden="true"><span className="play-icon"></span></span><span className="preview-caption">On your marks!</span></button>
        <div className="episode-info"><span className="episode-index">02 / LET'S ROLL</span><h3>A race full<br />of surprises.</h3><p>Twists, turns and a helping hand. There's more than one way to win.</p><button className="inline-play" data-preview="race" onClick={() => setPreview("race")}><span className="play-icon" aria-hidden="true"></span>Watch preview</button></div>
      </article>
    </div>
    <div className="adventure-foot"><span>Every adventure starts with “What if?”</span><img src="/assets/wordmark.svg" alt="Vumibo" width="120" height="30" loading="lazy" /></div>
  </section>
  <section className="music-section section-pad" id="music" aria-labelledby="music-title">
    <div className="music-art"><div className="music-circle" aria-hidden="true"></div><span className="music-word" aria-hidden="true">AGAIN!<br />AGAIN!</span><img className="album-art" src="/assets/album-cover.webp" alt="Vumibo's Lift, Carry, Blow & Spin! album cover" width="1000" height="1000" loading="lazy" /><div className="album-sticker" aria-hidden="true">SING<br />ALONG!</div></div>
    <div className="music-copy"><p className="eyebrow">Little songs. Big smiles.</p><h2 id="music-title">Good days<br />on <span>repeat.</span></h2><p className="music-intro">For the car ride. The living room dance.<br /> The “one more time!”</p><div className="now-playing"><span>OUR FIRST SONG</span><h3>Lift, Carry,<br /> Blow & Spin!</h3><p>Vumibo</p></div><div className="music-platforms" aria-label="Listen to Vumibo">{platforms.map(platform => { const href = safeHttps(siteConfig[platform.key]); return <a key={platform.key} className={`platform-link${href ? " is-live" : ""}`} data-platform={platform.key} href={href || undefined} target={href ? "_blank" : undefined} rel={href ? "noopener noreferrer" : undefined} aria-disabled={href ? undefined : true} tabIndex={href ? undefined : -1}><img src={`/assets/${platform.icon}.svg`} alt="" width="28" height="28" /><span>{platform.name}</span><small>{href ? "Listen now" : "Coming soon"}</small></a>; })}</div></div>
  </section>
  <section className="grownups section-pad" id="grownups" aria-labelledby="grownups-title">
    <div className="grownups-art"><img src="/assets/logo-full.webp" alt="The original Vumibo yellow mascot and colourful logo" width="947" height="1000" loading="lazy" /><span className="grownups-caption">A colourful world to share.</span></div>
    <div className="grownups-copy"><p className="eyebrow">A little note for grown-ups</p><h2 id="grownups-title">Big on play.<br />Full of heart.</h2><p>Vumibo brings friendly vehicles, original stories and sing-along songs into one colourful world. There are things to build, problems to solve and friends to cheer on.</p><p>Pull up a seat. There's room for you, too.</p><div className="faq"><details><summary>What will we find in Vumibo?</summary><p>Original animated adventures with our vehicle crew, along with songs inspired by their stories. Sometimes they build. Sometimes they race. They always find a reason to help each other.</p></details><details><summary>Are the songs in English?</summary><p>Yes. Our songs use English lyrics, while our animated stories use action, expressions and sound effects to tell the story.</p></details><details><summary>Where can we watch and listen?</summary><p>Visit <a data-link="youtube" href={youtubeHref} target="_blank" rel="noopener">Vumibo on YouTube</a> for our videos. Official Spotify, Apple Music and YouTube Music links will appear in the music section as our releases become available.</p></details></div></div>
  </section>
  <section className="last-call" aria-labelledby="last-call-title"><img src="/assets/pinwheel.webp" alt="" width="482" height="1000" loading="lazy" /><div><p className="eyebrow">There's always another adventure</p><h2 id="last-call-title">See you around,<br />little explorer.</h2><a className="button button-yellow" data-link="youtube" href={youtubeHref} target="_blank" rel="noopener"><span className="play-icon" aria-hidden="true"></span>Come play on YouTube</a></div><img className="footer-truck" src="/assets/fan-truck.webp" alt="" width="874" height="1000" loading="lazy" /></section>
</main>
<footer className="site-footer"><div className="footer-top"><a href="#top" className="footer-brand" aria-label="Vumibo home"><img src="/assets/wordmark.svg" alt="Vumibo" width="200" height="50" loading="lazy" /></a><p>Little wheels. Big adventures.</p><nav aria-label="Footer navigation"><a href="#crew">The crew</a><a href="#adventures">Watch</a><a href="#music">Listen</a><a href="#grownups">For grown-ups</a></nav></div><div className="footer-bottom"><span>© <span id="year">{year}</span> Vumibo.</span><span>Made for a world of little imaginations.</span><a href="#top">Back to the top</a></div></footer>
<dialog className="preview-dialog" id="preview-dialog" ref={dialogRef} aria-labelledby="preview-title" onCancel={() => setPreview(null)} onClick={handleBackdrop}><div className="dialog-top"><div><span className="eyebrow">A little look inside</span><h2 id="preview-title">{activePreview?.title || "A Vumibo adventure"}</h2></div><button className="close-dialog" type="button" onClick={() => setPreview(null)} aria-label="Close video preview">×</button></div><video id="preview-video" ref={videoRef} src={activePreview?.src} poster={activePreview?.poster} controls playsInline preload="none" muted aria-label="Silent animation preview"></video><div className="dialog-bottom"><p>Animation preview · sound off</p><a href={youtubeHref} data-link="youtube" target="_blank" rel="noopener">Visit Vumibo on YouTube</a></div></dialog>

 </>;
}
