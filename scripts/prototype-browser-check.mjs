// Run against a local preview and Chrome started with --remote-debugging-port=9333.
// Screenshots are written to the system temp directory, outside the build output.
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';

const base = process.env.PROTOTYPE_URL || 'http://localhost:3000';
const debug = process.env.CHROME_DEBUG_URL || 'http://127.0.0.1:9333';
const output = path.join(os.tmpdir(), 'nasir-quiet-prototype-captures');
await fs.mkdir(output, { recursive: true });
const target = await (await fetch(`${debug}/json/new?${encodeURIComponent(base)}`, { method: 'PUT' })).json();
const ws = new WebSocket(target.webSocketDebuggerUrl);
await new Promise(resolve => ws.addEventListener('open', resolve, { once: true }));
let sequence = 0;
const requests = new Map();
const errors = [];
ws.addEventListener('message', ({ data }) => {
  const message = JSON.parse(data);
  if (message.method === 'Runtime.exceptionThrown') errors.push(message.params.exceptionDetails);
  if (!message.id) return;
  const request = requests.get(message.id);
  requests.delete(message.id);
  if (message.error) request.reject(message.error);
  else request.resolve(message.result);
});
const send = (method, params = {}) => new Promise((resolve, reject) => {
  const id = ++sequence;
  requests.set(id, { resolve, reject });
  ws.send(JSON.stringify({ id, method, params }));
});
const evaluate = async expression => (await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true })).result.value;
const wait = ms => new Promise(resolve => setTimeout(resolve, ms));
const capture = async name => {
  const { data } = await send('Page.captureScreenshot', { format: 'png' });
  await fs.writeFile(path.join(output, `${name}.png`), Buffer.from(data, 'base64'));
};
const scrollTo = async y => { await evaluate(`window.scrollTo(0, ${y})`); await wait(100); };
const spread = () => evaluate(`document.querySelector('[data-motion]').style.getPropertyValue('--spread')`);

try {
  await send('Runtime.enable');
  await send('Page.enable');
  for (const [width, height] of [[1440, 1000], [1280, 720], [1024, 768], [768, 1024], [390, 844], [320, 740], [640, 450]]) {
    await send('Emulation.setDeviceMetricsOverride', { width, height, deviceScaleFactor: 1, mobile: width <= 800 });
    await send('Page.navigate', { url: base });
    for (let i = 0; i < 60; i++) {
      if (await evaluate(`!!document.querySelector('[data-motion]')`)) break;
      await wait(100);
    }
    await evaluate('document.fonts.ready');
    await scrollTo(0);
    assert.equal(await evaluate('document.documentElement.scrollWidth > innerWidth'), false, `overflow: ${width}`);
    assert.equal(await evaluate(`getComputedStyle(document.getElementById('architecture')).position`), 'static');
    assert.equal(await evaluate(`getComputedStyle(document.getElementById('nizaam')).position`), 'static');
    if (width === 1440 || width === 390) await capture(`${width}-hero`);
    const sample = width > 800 ? 420 : await evaluate(`document.querySelector('figure').getBoundingClientRect().top + scrollY - innerHeight * .45`);
    await scrollTo(sample); const forward = await spread();
    await scrollTo(sample + 250);
    await scrollTo(sample); const reverse = await spread();
    assert.equal(forward, reverse, `reverse progress: ${width}`);
    if (width === 1440 || width === 390) await capture(`${width}-layers`);
    if (width === 1440) {
      await evaluate(`document.getElementById('architecture').scrollIntoView()`); await wait(100);
      await capture('1440-open');
    }
    await evaluate(`document.querySelector('a[href="#nizaam"]').click()`);
    await wait(100);
    assert.ok(Math.abs(await evaluate(`document.getElementById('nizaam').getBoundingClientRect().top`)) < 30, 'native project anchor');
    assert.equal(await evaluate(`getComputedStyle(document.getElementById('nizaam')).opacity`), '1');
    if (width === 1440 || width === 390) await capture(`${width}-project`);
    console.log(`PASS ${width}x${height}: overflow, native anchor, reversible reveal`);
  }
  await send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] });
  await wait(100);
  assert.equal(await evaluate(`document.querySelector('[data-motion]').dataset.motion`), 'static');
  assert.equal(await evaluate(`getComputedStyle(document.querySelector('figure')).position`), 'relative');
  const staticSpread = await spread(); await scrollTo(300); assert.equal(await spread(), staticSpread);
  await send('Emulation.setEmulatedMedia', { features: [] });
  await send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 1000, deviceScaleFactor: 1, mobile: false });
  await send('Page.navigate', { url: `${base}#nizaam` }); await wait(500);
  assert.ok(Math.abs(await evaluate(`document.getElementById('nizaam').getBoundingClientRect().top`)) < 30);
  await scrollTo(0);
  await evaluate(`document.querySelector('header button').click()`); await wait(200);
  assert.equal(await evaluate(`document.body.innerText.includes("Nasir's AI Twin")`), true);
  assert.equal(errors.length, 0, JSON.stringify(errors));
  await send('Emulation.setScriptExecutionDisabled', { value: true });
  await send('Page.navigate', { url: base }); await wait(500);
  await send('Emulation.setScriptExecutionDisabled', { value: false });
  assert.equal(await evaluate(`!!document.querySelector('[data-motion]')`), false);
  assert.equal(await evaluate(`getComputedStyle(document.getElementById('architecture')).opacity`), '1');
  console.log('PASS reduced motion, incoming hash, preserved assistant, no JS, no runtime exceptions');
  console.log(`Captures: ${output}`);
} finally {
  ws.close();
}
