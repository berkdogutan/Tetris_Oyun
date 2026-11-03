const { chromium } = require('playwright');
const path = require('path');
const REPO = '/home/berk/Tetris_Oyun';
const OUT = __dirname + '/shots';
require('fs').mkdirSync(OUT, { recursive: true });
const results = [];
function rec(file, name, ok, info = '') { results.push({ file, name, ok, info }); console.log(`${ok ? 'PASS' : 'FAIL'} [${file}] ${name} ${info}`); }
const sleep = ms => new Promise(r => setTimeout(r, ms));

async function openPage(browser, file, viewport) {
  const ctx = await browser.newContext({ viewport });
  const page = await ctx.newPage();
  const errors = [];
  page.on('pageerror', e => errors.push('pageerror: ' + e.message));
  page.on('requestfailed', r => { if (!/favicon/.test(r.url())) errors.push('requestfailed: ' + r.url()); });
  page.on('console', m => { if (m.type() === 'error' && !/favicon|ERR_FILE_NOT_FOUND/.test(m.text())) errors.push('console: ' + m.text()); });
  page.on('dialog', d => d.accept());
  await page.goto('file://' + path.join(REPO, file));
  await sleep(500);
  return { page, errors, ctx };
}

// drag in canvas-pixel coordinates (mouse events use offsetX so CSS px == canvas px only if unscaled)
async function dragMouse(page, from, to) {
  const box = await page.locator('#gameCanvas').boundingBox();
  await page.mouse.move(box.x + from.x, box.y + from.y);
  await page.mouse.down();
  await page.mouse.move(box.x + to.x, box.y + to.y, { steps: 5 });
  await page.mouse.up();
}

async function testGame(browser) {
  const F = 'game.html';
  const { page, errors } = await openPage(browser, F, { width: 450, height: 800 });
  await page.screenshot({ path: OUT + '/game-home.png' });
  rec(F, 'home screen visible', await page.locator('#homeScreen').evaluate(e => e.classList.contains('active')));
  // canvas scaling check
  const scale = await page.evaluate(() => { const c = document.getElementById('gameCanvas'); return { css: c.getBoundingClientRect(), w: c.width, h: c.height }; });
  await page.click('text=TAP TO START', { force: true });
  await sleep(300);
  rec(F, 'start -> game screen', await page.locator('#gameScreen').evaluate(e => e.classList.contains('active')));
  const sc2 = await page.evaluate(() => { const c = document.getElementById('gameCanvas'); const r = c.getBoundingClientRect(); return `canvas ${c.width}x${c.height} css ${Math.round(r.width)}x${Math.round(r.height)}`; });
  rec(F, 'canvas css size equals buffer (mouse offsetX unscaled)', sc2.includes('450x800 css 450x800'), sc2);

  // deterministic: put a single zone straight above the launch point, shoot straight up
  await page.evaluate(() => { game.zones = [{ x: 225, y: 450, r: 25, val: 100, c: '#ffffff' }]; game.obstacles = []; });
  await dragMouse(page, { x: 225, y: 650 }, { x: 225, y: 790 }); // pull down 140 => vy = -14
  await page.waitForFunction(() => game.mode === 'READY' && state.level === 2, null, { timeout: 8000 }).catch(() => {});
  await sleep(300);
  const st = await page.evaluate(() => ({ score: state.score, level: state.level, lives: state.lives, mode: game.mode }));
  rec(F, 'hit zone with straight shot -> score 100 & level 2', st.score === 100 && st.level === 2 && st.lives === 5, JSON.stringify(st));
  await page.screenshot({ path: OUT + '/game-play.png' });

  // trickshot: bounce off wall then hit
  await page.evaluate(() => { game.zones = [{ x: 225, y: 300, r: 25, val: 50, c: '#ffffff' }]; game.obstacles = []; game.wallHit = true; });
  // miss 5 times quickly: tiny flick
  for (let i = 0; i < 5; i++) {
    await page.evaluate(() => { game.zones = [{ x: 60, y: 60, r: 5, val: 50, c: '#ffffff' }]; game.obstacles = []; });
    await dragMouse(page, { x: 225, y: 650 }, { x: 225, y: 640 }); // vy=+1 => falls out
    await page.waitForFunction(() => game.mode === 'READY', null, { timeout: 8000 }).catch(() => {});
    await sleep(200);
  }
  const over = await page.evaluate(() => ({ lives: state.lives, active: document.getElementById('gameOverScreen').classList.contains('active'), adCount: document.getElementById('adCount').textContent, adShown: getComputedStyle(document.getElementById('adBtn')).display }));
  rec(F, '5 misses -> game over screen with 3 revives', over.active && over.lives === 0 && over.adCount === '3' && over.adShown !== 'none', JSON.stringify(over));
  await page.screenshot({ path: OUT + '/game-over.png' });
  // revive 3 times
  for (let r = 0; r < 3; r++) {
    await page.click('#adBtn', { force: true });
    await sleep(200);
    await dragMouse(page, { x: 225, y: 650 }, { x: 225, y: 640 });
    await page.waitForFunction(() => game.mode === 'READY', null, { timeout: 8000 }).catch(() => {});
    await sleep(200);
  }
  const over2 = await page.evaluate(() => ({ adShown: getComputedStyle(document.getElementById('adBtn')).display, adCount: document.getElementById('adCount').textContent, lives: state.lives, revives: state.revivesUsed }));
  rec(F, 'after 3 revives the ad button is hidden', over2.adShown === 'none' && over2.revives === 3, JSON.stringify(over2));
  // leaderboard + XSS check
  await page.evaluate(() => { state.username = '<img src=x onerror="window.__xss=1">'; gameOver(); });
  await page.evaluate(() => showLeaderboard());
  await sleep(300);
  const xss = await page.evaluate(() => window.__xss === 1);
  rec(F, 'leaderboard escapes username (no HTML injection)', !xss, xss ? 'username rendered as HTML via innerHTML' : '');
  const lbCount = await page.locator('.lb-item').count();
  rec(F, 'leaderboard lists entries', lbCount >= 1, `${lbCount} entries`);
  // state persistence & no-ads
  await page.evaluate(() => goHome());
  await page.click('#noAdsBtn', { force: true });
  await sleep(200);
  const noAds = await page.evaluate(() => state.noAds && JSON.parse(localStorage.getItem('saved_state')).noAds);
  rec(F, 'buyNoAds persists to localStorage', noAds === true);
  await page.reload(); await sleep(400);
  const persisted = await page.evaluate(() => ({ best: state.best, noAds: state.noAds, btn: document.getElementById('noAdsBtn').textContent.trim() }));
  rec(F, 'reload: best score persisted', persisted.best === 100, JSON.stringify(persisted));
  rec(F, 'reload: noAds button reflects purchase', persisted.btn.includes('REMOVED'), `button text "${persisted.btn}"`);
  // audio init on start without gesture error?
  rec(F, 'no JS errors', errors.length === 0, errors.join(' | '));
}

async function testProto(browser) {
  const F = 'prototype.html';
  const { page, errors } = await openPage(browser, F, { width: 700, height: 900 });
  await page.screenshot({ path: OUT + '/proto-home.png' });
  const sc = await page.evaluate(() => { const c = document.getElementById('gameCanvas'); const r = c.getBoundingClientRect(); return `canvas ${c.width}x${c.height} css ${Math.round(r.width)}x${Math.round(r.height)}`; });
  rec(F, 'canvas unscaled at desktop (604 = 600 + 2px border)', sc.includes('600x800 css 604x804'), sc);
  await page.evaluate(() => { zones = [{ x: 300, y: 250, radius: 40, value: 100, color: '#ffffff', scored: false }]; obstacles = []; });
  await dragMouse(page, { x: 300, y: 550 }, { x: 300, y: 750 }); // vy=-20
  await page.waitForFunction(() => totalScore > 0, null, { timeout: 8000 }).catch(() => {});
  await sleep(100);
  const mid = await page.evaluate(() => ({ score: totalScore, level: currentLevel, lives, state: gameState }));
  rec(F, 'hit single zone -> +100, level advances', mid.score === 100 && mid.level === 2, JSON.stringify(mid));
  await page.waitForFunction(() => gameState === 'READY', null, { timeout: 10000 }).catch(() => {});
  await sleep(300);
  const after = await page.evaluate(() => ({ lives, state: gameState, level: currentLevel }));
  rec(F, 'no life lost after completing level (ball falling during transition)', after.lives === 5, JSON.stringify(after) + ' (started with 5)');
  await page.screenshot({ path: OUT + '/proto-play.png' });
  // lose all lives
  await page.evaluate(() => { gameState = 'READY'; resetPlayer(); });
  for (let i = 0; i < 6 && (await page.evaluate(() => lives)) > 0; i++) {
    await page.evaluate(() => { zones = [{ x: 50, y: 50, radius: 5, value: 10, color: '#ffffff', scored: false }]; obstacles = []; });
    await dragMouse(page, { x: 300, y: 550 }, { x: 300, y: 540 });
    await page.waitForFunction(() => gameState !== 'FLYING', null, { timeout: 8000 }).catch(() => {});
    await sleep(100);
  }
  const go = await page.evaluate(() => ({ lives, state: gameState, panel: document.getElementById('gameOverPanel').classList.contains('show'), best: localStorage.getItem('bestScore') }));
  rec(F, 'game over panel after lives exhausted', go.panel && go.state === 'GAMEOVER', JSON.stringify(go));
  rec(F, 'best score saved', go.best === '100', `bestScore=${go.best}`);
  await page.screenshot({ path: OUT + '/proto-over.png' });
  await page.click('.restartButton', { force: true }); await sleep(200);
  const rs = await page.evaluate(() => ({ lives, level: currentLevel, score: totalScore, state: gameState }));
  rec(F, 'restart resets state', rs.lives === 5 && rs.level === 1 && rs.score === 0 && rs.state === 'READY', JSON.stringify(rs));
  // mobile viewport: canvas scaled -> offsetX mismatch?
  const m = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const mp = await m.newPage(); await mp.goto('file://' + path.join(REPO, F)); await sleep(300);
  const msc = await mp.evaluate(() => { const c = document.getElementById('gameCanvas'); const r = c.getBoundingClientRect(); return { w: c.width, css: Math.round(r.width), overflow: document.documentElement.scrollWidth > innerWidth }; });
  rec(F, 'mobile (390px): canvas fits viewport without horizontal overflow', !msc.overflow && msc.css <= 390, JSON.stringify(msc));
  await mp.screenshot({ path: OUT + '/proto-mobile.png' });
  rec(F, 'no JS errors', errors.length === 0, errors.join(' | '));
}

async function testUltra(browser) {
  const F = 'one_more_move_test.html';
  const { page, errors } = await openPage(browser, F, { width: 450, height: 800 });
  await page.screenshot({ path: OUT + '/ultra-home.png' });
  await page.click('text=START GAME', { force: true }); await sleep(300);
  const hud = await page.evaluate(() => ({ mode: gameMode, hud: document.getElementById('hud').style.display, timer: timeLeft, targets: targets.length, lvl: state.level }));
  rec(F, 'start game: HUD shown, timer 22s at level 1', hud.mode === 'PLAYING' && hud.hud === 'flex' && hud.timer === 22, JSON.stringify(hud));
  const cw = await page.evaluate(() => ({ w: canvas.width, h: canvas.height }));
  await page.evaluate(() => { targets = [{ x: canvas.width / 2, y: 300, r: 38, val: 50, hit: false, scale: 1, color: '#ffffff', tier: POINT_TIERS[0] }]; obstacles = []; });
  // ball at (w/2, 0.8h); drag start must be in lower half; pull down 100px => vy=-11
  await dragMouse(page, { x: cw.w / 2, y: cw.h * 0.8 }, { x: cw.w / 2, y: cw.h * 0.8 + 150 }); // vy=-16.5
  await page.waitForFunction(() => document.getElementById('completeScreen').classList.contains('active') || !ball.active, null, { timeout: 8000 }).catch(() => {});
  await sleep(300);
  const s1 = await page.evaluate(() => ({ score: state.score, mode: gameMode, lives: state.lives, shots: shotsThisLevel, complete: document.getElementById('completeScreen').classList.contains('active'), stars: document.querySelectorAll('#stars span').length }));
  rec(F, 'hit target -> +50 and level-complete screen with 5 stars', s1.score === 50 && s1.complete && s1.lives === 5, JSON.stringify(s1));
  await page.screenshot({ path: OUT + '/ultra-complete.png' });
  await page.click('text=CONTINUE', { force: true }); await sleep(300);
  const l2 = await page.evaluate(() => ({ level: state.level, timer: timeLeft, mode: gameMode }));
  rec(F, 'continue -> level 2, timer 24s', l2.level === 2 && l2.timer === 24 && l2.mode === 'PLAYING', JSON.stringify(l2));
  // timer expiry -> game over
  await page.evaluate(() => { timeLeft = 1; });
  await sleep(2500);
  const to = await page.evaluate(() => ({ mode: gameMode, over: document.getElementById('gameOverScreen').classList.contains('active'), revive: document.getElementById('reviveCounter').textContent, lives: state.lives }));
  rec(F, 'timer runs out -> game over screen', to.mode === 'OVER' && to.over, JSON.stringify(to));
  // revive after timeout: does the timer get reset?
  await page.evaluate(() => watchAd()); await sleep(1500);
  const rv = await page.evaluate(() => ({ mode: gameMode, timeLeft, lives: state.lives, over: document.getElementById('gameOverScreen').classList.contains('active') }));
  rec(F, 'revive after time-out gives playable time (timer reset)', rv.mode === 'PLAYING' && rv.timeLeft > 0 && !rv.over, JSON.stringify(rv));
  await page.screenshot({ path: OUT + '/ultra-after-revive.png' });
  // lives persist across home
  await page.evaluate(() => { gameMode = 'PLAYING'; state.lives = 2; goHome(); });
  await page.reload(); await sleep(400);
  const pers = await page.evaluate(() => ({ lives: state.lives, level: state.level, score: state.score }));
  rec(F, 'home + reload keeps progress (lives/level/score)', pers.lives === 2 && pers.level === 2, JSON.stringify(pers));
  // XSS via username in leaderboard
  await page.fill('#usernameInp', '<img src=x onerror="window.__xss=1">');
  await page.evaluate(() => { startGame(); gameOver(); showLeaderboard(); });
  await sleep(300);
  rec(F, 'leaderboard escapes username', !(await page.evaluate(() => window.__xss === 1)), 'innerHTML with raw username');
  // premium purchase
  await page.evaluate(() => goHome());
  await page.click('#sub-3', { force: true }); await sleep(200);
  const prem = await page.evaluate(() => ({ p: state.isPremium, gold: state.isGoldActive, area: document.getElementById('premiumToggleArea').style.display }));
  rec(F, 'buySub sets premium and shows gold toggle', prem.p && prem.gold && prem.area !== 'none', JSON.stringify(prem));
  // resize mid-flight
  await page.evaluate(() => { startGame(); ball.active = true; ball.x = 100; ball.y = 100; ball.vx = 0; ball.vy = 0; });
  await page.setViewportSize({ width: 400, height: 700 }); await sleep(200);
  const rs = await page.evaluate(() => ({ x: ball.x, y: ball.y, active: ball.active, cw: canvas.width }));
  rec(F, 'resize while ball in flight does not reset ball', rs.active && rs.x === 100, JSON.stringify(rs));
  rec(F, 'no JS errors', errors.length === 0, errors.join(' | '));
}

(async () => {
  const browser = await chromium.launch();
  for (const t of [testGame, testProto, testUltra]) { try { await t(browser); } catch (e) { rec(t.name, 'crashed', false, e.message); } }
  await browser.close();
  const fails = results.filter(r => !r.ok);
  console.log(`\n${results.length - fails.length}/${results.length} passed`);
  require('fs').writeFileSync(__dirname + '/results.json', JSON.stringify(results, null, 2));
})();
