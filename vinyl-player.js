// vinyl-player.js
document.addEventListener('DOMContentLoaded', function() {
  const root = document.querySelector('.pd-vynil-player');
  if (!root) return;

  const audio = root.querySelector('.pd-audio');
  const discBtn = root.querySelector('.pd-vynil-disc');
  const trackBtns = Array.from(root.querySelectorAll('.pd-track'));
  let currentSrc = '';
  let lastChosen = null;

  function setPlayingUI(on) {
    root.classList.toggle('is-playing', !!on);
  }

  function setActive(btn) {
    trackBtns.forEach(b => b.classList.toggle('is-active', b === btn));
    if (btn) lastChosen = btn;
  }

  async function playSrc(src, btn) {
    if (!src) return;
    if (currentSrc !== src) {
      audio.pause();
      audio.currentTime = 0;
      audio.src = src;
      audio.load();
      currentSrc = src;
    }
    try {
      await audio.play();
      setActive(btn);
      setPlayingUI(true);
    } catch (e) {
      setPlayingUI(false);
    }
  }

  function toggle() {
    if (!audio.src) {
      const first = trackBtns[0];
      return playSrc(first?.dataset?.src || '', first);
    }
    if (audio.paused) {
      return playSrc(audio.src, lastChosen || trackBtns.find(b => b.dataset.src === currentSrc) || trackBtns[0]);
    }
    audio.pause();
    setPlayingUI(false);
  }

  // Eventos
  trackBtns.forEach(btn => btn.addEventListener('click', () => playSrc(btn.dataset.src, btn)));
  discBtn.addEventListener('click', toggle);
  audio.addEventListener('pause', () => setPlayingUI(false));
  audio.addEventListener('ended', () => setPlayingUI(false));
  audio.addEventListener('play', () => setPlayingUI(true));
});
