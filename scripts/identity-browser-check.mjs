import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';

const base = process.env.PROTOTYPE_URL || 'http://localhost:3000';
const debug = process.env.CHROME_DEBUG_URL || 'http://127.0.0.1:9334';
const captures = path.join(os.tmpdir(), 'nasir-identity-captures');
await fs.mkdir(captures, { recursive: true });
const target = await (await fetch(`${debug}/json/new?${encodeURIComponent(base)}`, { method: 'PUT' })).json();
const ws = new WebSocket(target.webSocketDebuggerUrl);
await new Promise(resolve => ws.addEventListener('open', resolve, { once: true }));
let sequence = 0; const pending = new Map(); const errors = [];
ws.addEventListener('message', ({ data }) => {
  const message = JSON.parse(data);
  if(message.method === 'Runtime.exceptionThrown') errors.push(message.params.exceptionDetails);
  if(message.id) { const call=pending.get(message.id); pending.delete(message.id); if(message.error)call.reject(message.error);else call.resolve(message.result); }
});
const send = (method,params={}) => new Promise((resolve,reject)=>{const id=++sequence;pending.set(id,{resolve,reject});ws.send(JSON.stringify({id,method,params}));});
const evaluate = async expression => (await send('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true})).result.value;
const wait = ms => new Promise(resolve=>setTimeout(resolve,ms));
async function until(expression){for(let i=0;i<80;i++){if(await evaluate(expression))return;await wait(100);}assert.fail(`Timed out: ${expression}`);}
async function navigate(url){await send('Page.navigate',{url});await until(`!!document.getElementById('contact')`);await evaluate('document.fonts.ready');await wait(150);}
async function capture(name){await send('Page.bringToFront');const {data}=await send('Page.captureScreenshot',{format:'png'});await fs.writeFile(path.join(captures,`${name}.png`),Buffer.from(data,'base64'));}

try {
  await send('Page.enable'); await send('Runtime.enable');
  const sections = ['about','experience','expertise','education','certificates','channel','resume','contact'];
  for(const [width,height] of [[1440,1000],[1280,720],[1024,768],[768,1024],[390,844],[320,740],[640,450]]){
    await send('Emulation.setDeviceMetricsOverride',{width,height,deviceScaleFactor:1,mobile:width<=800});
    await navigate(`${base}?identity-check=${width}#about`);
    assert.equal(await evaluate('document.documentElement.scrollWidth>innerWidth'),false,`overflow at ${width}`);
    assert.equal(await evaluate(`document.querySelectorAll('#experience ol > li > div:first-child > span:first-child').length`),4);
    const roles = await evaluate(`Array.from(document.querySelectorAll('#experience h3')).map(e=>e.textContent)`);
    assert.deepEqual(roles,['AXAON','GLOWSIMS','Crifly','Crifly','NIZAAM']);
    const experience = await evaluate(`document.getElementById('experience').textContent`);
    assert.ok(experience.includes('2026 - Present (Current)'));
    assert.ok(experience.includes('22 Feb 2026 - 22 May 2026 (3 months)'));
    assert.ok(experience.includes('Jan 2025 - Feb 2026'));
    assert.ok(experience.includes('GotCakey') && experience.includes('Shoutsy'));
    assert.doesNotMatch(experience,/62%|95%|10K\+|100\+/);
    const education = await evaluate(`document.getElementById('education').textContent`);
    assert.match(education,/Bachelor of Science in Computer Science/);
    assert.match(education,/COMSATS University Islamabad/);
    assert.doesNotMatch(education,/Verified|Grade A|6\.5/);
    assert.equal(await evaluate(`document.querySelectorAll('#education a[href]').length`),4);
    assert.equal(await evaluate(`document.querySelector('#resume button[aria-label="Résumé PDF unavailable"]').disabled`),true);
    assert.equal(await evaluate(`document.querySelectorAll('#resume a[download]').length`),0);
    assert.equal(await evaluate(`document.querySelectorAll('#contact form').length`),0);
    if(width===1440||width===390) await capture(`about-${width}`);
    for(const id of sections){
      await evaluate(`document.querySelector('nav[aria-label="Professional profile sections"] a[href="#${id}"]').click()`);await wait(60);
      assert.ok(Math.abs(await evaluate(`document.getElementById('${id}').getBoundingClientRect().top`))<=26,`anchor ${id} at ${width}`);
      assert.equal(await evaluate('document.documentElement.scrollWidth>innerWidth'),false);
      if((width===1440||width===390)&&['experience','resume','contact'].includes(id))await capture(`${id}-${width}`);
    }
    const emailLinks = await evaluate(`Array.from(document.querySelectorAll('#contact a[href^="mailto:"]')).map(a=>a.href)`);
    assert.ok(emailLinks.some(href=>decodeURIComponent(href).includes('Freelance project inquiry')));
    assert.ok(emailLinks.some(href=>decodeURIComponent(href).includes('Software engineering role')));
    assert.equal(await evaluate(`document.querySelector('#contact a[href^="tel:"]').getAttribute('href')`),'tel:+923137576531');
    console.log(`PASS ${width}x${height}: responsive sections, record fidelity, honest asset states, native anchors, contact links`);
  }
  const profiles=await evaluate(`Array.from(document.querySelectorAll('#resume ul li a')).map(a=>({href:a.href,rel:a.rel}))`);
  assert.deepEqual(profiles.map(p=>p.href),['https://github.com/nasirbhotta','https://linkedin.com/in/me-bhotta','https://www.instagram.com/vibecode_unpacked/']);
  assert.ok(profiles.every(p=>p.rel.includes('noopener')));
  assert.ok(await evaluate(`document.getElementById('resume').textContent.includes('@vibecode_unpacked')`));
  await evaluate(`Object.defineProperty(navigator,'clipboard',{configurable:true,value:{writeText:async()=>{throw new Error('Permission denied')}}});document.querySelector('#contact button[aria-label="Copy email address"]').click()`);
  await until(`document.querySelector('#contact [role="status"]').textContent.includes('Copy unavailable')`);
  assert.equal(await evaluate(`document.querySelector('#contact button[aria-label="Copy email address"]').textContent.includes('Copied')`),false);
  await evaluate(`Object.defineProperty(navigator,'clipboard',{configurable:true,value:{writeText:async(text)=>{window.__copiedAddress=text}}});document.querySelector('#contact button[aria-label="Copy email address"]').click()`);
  await until(`document.querySelector('#contact [role="status"]').textContent.includes('copied to clipboard')`);
  assert.equal(await evaluate('window.__copiedAddress'),'dev.nasirbhutta@gmail.com');
  await evaluate(`document.querySelector('#contact button[class*="contactAssistant"]').focus();document.querySelector('#contact button[class*="contactAssistant"]').click()`);
  await until(`!!document.querySelector('dialog[open]')`);
  assert.match(await evaluate(`document.querySelector('dialog[open]').textContent`),/Hugging Face assistant/);
  assert.equal(await evaluate(`document.activeElement===document.querySelector('dialog[open] textarea')`),true);
  await send('Input.dispatchKeyEvent',{type:'keyDown',key:'Escape',code:'Escape',windowsVirtualKeyCode:27});
  await send('Input.dispatchKeyEvent',{type:'keyUp',key:'Escape',code:'Escape',windowsVirtualKeyCode:27});
  await until(`!document.querySelector('dialog[open]')`);
  assert.equal(await evaluate(`document.activeElement?.className.includes('contactAssistant')`),true);
  await send('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'reduce'}]});
  await navigate(`${base}#about`);
  assert.equal(await evaluate(`getComputedStyle(document.getElementById('about')).opacity`),'1');
  const duplicates=await evaluate(`(()=>{const ids=[...document.querySelectorAll('[id]')].map(e=>e.id);return ids.filter((id,i)=>ids.indexOf(id)!==i)})()`);assert.deepEqual(duplicates,[]);
  await send('Emulation.setScriptExecutionDisabled',{value:true});await send('Page.navigate',{url:`${base}#contact`});await wait(700);await send('Emulation.setScriptExecutionDisabled',{value:false});
  assert.match(await evaluate(`document.getElementById('contact').textContent`),/dev.nasirbhutta@gmail.com/);
  assert.equal(errors.length,0,JSON.stringify(errors));
  console.log('PASS social URLs, copy failure/success, shared assistant, keyboard restoration, reduced motion, no-JS email access, unique IDs, no runtime exceptions');
  console.log(`Captures: ${captures}`);
} finally { ws.close(); }
