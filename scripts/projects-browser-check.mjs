// Local integration checks. Start Chrome with --remote-debugging-port=9333 first.
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';

const base = process.env.PROTOTYPE_URL || 'http://localhost:3000';
const debug = process.env.CHROME_DEBUG_URL || 'http://127.0.0.1:9333';
const captures = path.join(os.tmpdir(), 'nasir-projects-captures');
await fs.mkdir(captures, { recursive: true });
const projects = ['brainbee', 'nizaam', 'talib', 'gotcakey', 'shoutsy', '24ifix', 'ors-map'];
const target = await (await fetch(`${debug}/json/new?${encodeURIComponent(base)}`, { method: 'PUT' })).json();
const socket = new WebSocket(target.webSocketDebuggerUrl);
await new Promise(resolve => socket.addEventListener('open', resolve, { once: true }));
let sequence = 0;
const pending = new Map();
const exceptions = [];
socket.addEventListener('message', ({ data }) => {
  const message = JSON.parse(data);
  if (message.method === 'Runtime.exceptionThrown') exceptions.push(message.params.exceptionDetails);
  if (message.id) {
    const call = pending.get(message.id); pending.delete(message.id);
    if (message.error) call.reject(message.error); else call.resolve(message.result);
  }
});
const send = (method, params = {}) => new Promise((resolve, reject) => {
  const id = ++sequence; pending.set(id, { resolve, reject }); socket.send(JSON.stringify({ id, method, params }));
});
const evaluate = async expression => (await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true })).result.value;
const wait = ms => new Promise(resolve => setTimeout(resolve, ms));
async function navigate(url, selector) {
  await send('Page.navigate', { url });
  for (let i = 0; i < 80; i++) {
    if (await evaluate(`document.readyState !== 'loading' && !!document.querySelector(${JSON.stringify(selector)})`)) break;
    await wait(100);
  }
  assert.equal(await evaluate(`!!document.querySelector(${JSON.stringify(selector)})`), true, `${url}: missing ${selector}`);
  await evaluate('document.fonts.ready'); await wait(100);
}
async function capture(name) {
  const { data } = await send('Page.captureScreenshot', { format: 'png' });
  await fs.writeFile(path.join(captures, `${name}.png`), Buffer.from(data, 'base64'));
}
try {
  await send('Page.enable'); await send('Runtime.enable');
  for (const [width, height] of [[1440, 1000], [1024, 768], [768, 1024], [390, 844], [320, 740]]) {
    await send('Emulation.setDeviceMetricsOverride', { width, height, deviceScaleFactor: 1, mobile: width <= 800 });
    await navigate(`${base}#selected-work`, '#selected-work');
    assert.equal(await evaluate('document.documentElement.scrollWidth > innerWidth'), false);
    const links = await evaluate(`Array.from(document.querySelectorAll('nav[aria-label="Jump to a project"] a')).map(a=>a.getAttribute('href'))`);
    assert.deepEqual(links, projects.map(slug => `#work-${slug}`));
    assert.deepEqual(await evaluate(`Array.from(document.querySelectorAll('#selected-work article')).map(e=>e.id)`), projects.map(slug => `work-${slug}`));
    const missing = await evaluate(`Array.from(document.querySelectorAll('#selected-work a[href^="#"]')).filter(a=>!document.getElementById(a.hash.slice(1))).map(a=>a.hash)`);
    assert.deepEqual(missing, []);
    if (width === 1440 || width === 390) await capture(`gallery-${width}`);
    await evaluate(`document.querySelector('a[href="#work-shoutsy"]').click()`); await wait(100);
    assert.ok(Math.abs(await evaluate(`document.getElementById('work-shoutsy').getBoundingClientRect().top`)) <= 31);
    await evaluate(`document.querySelector('#work-brainbee h3 a').click()`);
    for (let i=0;i<60;i++) { if(await evaluate(`location.pathname.endsWith('/work/brainbee') && !!document.getElementById('outcome')`)) break; await wait(100); }
    assert.equal(await evaluate(`document.querySelector('h1').textContent`), 'BrainBee');
    assert.equal(await evaluate('document.documentElement.scrollWidth > innerWidth'), false);
    if (width === 1440 || width === 390) await capture(`case-${width}`);
    await evaluate(`document.querySelector('a[href="#decisions"]').click()`); await wait(100);
    assert.ok(Math.abs(await evaluate(`document.getElementById('decisions').getBoundingClientRect().top`)) <= 31);
    console.log(`PASS gallery and case navigation at ${width}x${height}`);
  }
  await send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 1000, deviceScaleFactor: 1, mobile: false });
  for (const slug of projects) {
    assert.equal((await fetch(`${base}/work/${slug}`)).status, 200);
    await navigate(`${base}/work/${slug}`, '#outcome');
    assert.equal(await evaluate('document.documentElement.scrollWidth > innerWidth'), false);
    const text = await evaluate(`document.querySelector('main').innerText`);
    assert.ok(!/3,000|100\+|62%|40%|95%|10K\+|118\+/.test(text), `${slug}: unsupported metric`);
    if (['talib','gotcakey','shoutsy','24ifix'].includes(slug)) assert.ok(text.includes('Company contribution'));
    if (slug === 'brainbee') assert.ok(text.includes('Co-developed'));
    if (slug === 'nizaam') assert.ok(text.includes('Independent commercial product'));
    assert.equal(await evaluate(`Array.from(document.querySelectorAll('main a[href^="#"]')).every(a=>document.getElementById(a.hash.slice(1)))`), true);
    console.log(`PASS ${slug}: direct URL, sections, attribution, metric hygiene`);
  }
  await navigate(`${base}/work/gotcakey`, '#outcome');
  await evaluate(`document.querySelector('header button').click()`); await wait(250);
  assert.equal(await evaluate(`document.body.innerText.includes("Nasir's AI Twin")`), true);
  await navigate(`${base}/work/project-that-does-not-exist`, 'h1');
  assert.ok((await evaluate('document.body.innerText')).includes('Another way'));
  await send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] });
  await navigate(`${base}#selected-work`, '#selected-work');
  assert.equal(await evaluate(`getComputedStyle(document.querySelector('#selected-work article')).opacity`), '1');
  await send('Emulation.setScriptExecutionDisabled', { value: true });
  await send('Page.navigate', { url: `${base}/work/nizaam` }); await wait(800);
  await send('Emulation.setScriptExecutionDisabled', { value: false });
  assert.equal(await evaluate(`!!document.getElementById('outcome')`), true);
  assert.equal(exceptions.length, 0, JSON.stringify(exceptions));
  console.log('PASS preserved assistant, missing-project fallback, reduced motion, no-JS case content, no runtime exceptions');
  console.log(`Screenshots: ${captures}`);
} finally {
  socket.close();
}
