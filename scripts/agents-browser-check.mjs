import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
const base=process.env.PORTFOLIO_URL||'http://localhost:3002';
const target=await(await fetch('http://127.0.0.1:9336/json/new?'+encodeURIComponent(base),{method:'PUT'})).json();
const ws=new WebSocket(target.webSocketDebuggerUrl);
await new Promise(resolve=>ws.addEventListener('open',resolve,{once:true}));
let sequence=0;const pending=new Map();
ws.addEventListener('message',({data})=>{const message=JSON.parse(data);if(message.id){const call=pending.get(message.id);pending.delete(message.id);message.error?call.reject(message.error):call.resolve(message.result);}});
const send=(method,params={})=>new Promise((resolve,reject)=>{const id=++sequence;pending.set(id,{resolve,reject});ws.send(JSON.stringify({id,method,params}));});
const evaluate=async expression=>(await send('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true})).result.value;
const delay=ms=>new Promise(resolve=>setTimeout(resolve,ms));
async function until(expression){for(let i=0;i<240;i++){if(await evaluate(expression))return;await delay(100);}assert.fail('Timed out: '+expression);}
try{
  await send('Page.enable');await send('Runtime.enable');
  for(const width of [1440,390]){
    await send('Emulation.setDeviceMetricsOverride',{width,height:950,deviceScaleFactor:1,mobile:width<800});
    await send('Page.navigate',{url:base+'/#agent-projects'});
    await until("!!document.getElementById('agent-projects')");
    assert.equal(await evaluate("document.querySelectorAll('#agent-projects > div > article').length"),4);
    await evaluate("document.querySelector('#agent-projects details').open=true");
    assert.equal(await evaluate("document.querySelectorAll('#agent-projects details article').length"),12);
    assert.equal(await evaluate('document.documentElement.scrollWidth>innerWidth'),false);
    await evaluate("document.getElementById('agent-projects').scrollIntoView();document.fonts.ready");await delay(250);
    const {data}=await send('Page.captureScreenshot',{format:'png'});await fs.writeFile(`.brud/agents-${width}.png`,Buffer.from(data,'base64'));
    console.log(`PASS ${width}px: 4 featured and 12 additional agents, no horizontal overflow`);
  }
  await evaluate("document.querySelector('button[aria-label=\"Ask my assistant\"]').click()");
  await until("!!document.querySelector('dialog[open]')");
  await evaluate("const select=document.querySelector('dialog[open] select');select.value='deep-research';select.dispatchEvent(new Event('change',{bubbles:true}));document.querySelector('dialog[open] textarea').focus()");
  await send('Input.insertText',{text:'What does this project do? Answer briefly.'});
  await evaluate("document.querySelector('dialog[open] button[aria-label=\"Send question\"]').click()");
  await until("!!document.querySelector('dialog[open] [data-role=\"assistant\"]')");
  const reply=await evaluate("document.querySelector('dialog[open] [data-role=\"assistant\"]').textContent");
  assert.doesNotMatch(reply,/LOCAL PORTFOLIO GUIDE|service was unavailable/i);
  assert.match(reply,/research|search|report/i);
  console.log('PASS browser chat received a live research-project answer:',reply);
  await send('Page.navigate',{url:base+'/agents/model-adapter'});await until("!!document.querySelector('h1')");
  assert.match(await evaluate("document.querySelector('h1').textContent"),/Antigravity Model Adapter/);
  assert.equal(await evaluate('document.documentElement.scrollWidth>innerWidth'),false);
  console.log('PASS mobile agent case study');
}finally{ws.close();}
