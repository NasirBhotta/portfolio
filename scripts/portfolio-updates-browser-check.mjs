import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
const base = process.env.PORTFOLIO_URL || 'http://localhost:3001';
const target = await (await fetch('http://127.0.0.1:9335/json/new?' + encodeURIComponent(base), { method: 'PUT' })).json();
const ws = new WebSocket(target.webSocketDebuggerUrl);
await new Promise(resolve => ws.addEventListener('open', resolve, { once: true }));
let sequence = 0;
const pending = new Map();
ws.addEventListener('message', ({data}) => { const message=JSON.parse(data); if(message.id){const call=pending.get(message.id);pending.delete(message.id);message.error?call.reject(message.error):call.resolve(message.result);} });
const send=(method,params={})=>new Promise((resolve,reject)=>{const id=++sequence;pending.set(id,{resolve,reject});ws.send(JSON.stringify({id,method,params}));});
const evaluate=async expression=>(await send('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true})).result.value;
const delay=ms=>new Promise(resolve=>setTimeout(resolve,ms));
try {
  await send('Page.enable');await send('Runtime.enable');
  for(const width of [1440,390]){
    await send('Emulation.setDeviceMetricsOverride',{width,height:950,deviceScaleFactor:1,mobile:width<800});
    await send('Page.navigate',{url:base+'/#certificates'});
    for(let i=0;i<80&&!await evaluate("!!document.getElementById('channel')");i++)await delay(100);
    assert.ok(await evaluate("document.getElementById('experience').textContent.includes('20 Jun 2024 - 20 Sep 2024')"));
    assert.equal(await evaluate("document.querySelectorAll('#certificates article').length"),4);
    assert.equal(await evaluate("document.querySelectorAll('#certificates a[download]').length"),4);
    assert.ok(await evaluate("document.getElementById('channel').textContent.includes('Vibecode')"));
    assert.equal(await evaluate('document.documentElement.scrollWidth > innerWidth'),false);
    await evaluate("document.getElementById('certificates').scrollIntoView();document.fonts.ready");await delay(500);
    const {data}=await send('Page.captureScreenshot',{format:'png'});
    await fs.writeFile(`.brud/certificates-${width}.png`,Buffer.from(data,'base64'));
    console.log(`PASS ${width}px: internship, 4 certificates, downloads, channel, no overflow`);
  }
  const hrefs=await evaluate("Array.from(document.querySelectorAll('#certificates a[download]')).map(a=>a.getAttribute('href'))");
  for(const href of hrefs){const response=await fetch(base+href);assert.equal(response.status,200);assert.ok((await response.text()).startsWith('%PDF-'));}
  const start=Date.now();
  const response=await fetch(base+'/api/assistant',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({question:'Tell me about the Crifly internship',history:[]})});
  const reply=await response.json();assert.equal(response.status,200);assert.ok(reply.text);assert.ok(Date.now()-start<26000);
  if(reply.fallback){assert.match(reply.text,/20 Jun 2024/);const retryStart=Date.now();const retry=await fetch(base+'/api/assistant',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({question:'What certificates do you have?',history:[]})});const next=await retry.json();assert.equal(retry.status,200);assert.equal(next.fallback,true);assert.ok(Date.now()-retryStart<2000);assert.match(next.text,/micro1/);}
  console.log(`PASS certificate PDFs and assistant HTTP 200 in ${Date.now()-start}ms (fallback=${reply.fallback===true})`);
} finally { ws.close(); }
