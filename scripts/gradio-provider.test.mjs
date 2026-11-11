import test from 'node:test';
import assert from 'node:assert/strict';
import { callGradioChat } from '../src/lib/assistant/gradio.ts';

function mockClient(events) {
  const calls = []; let closed = 0; let cancelled = 0;
  const connect = async (url, options) => {
    calls.push({ url, options });
    return {
      stream_instance: { onerror: () => {} },
      submit(endpoint, payload) {
        calls.push({ endpoint, payload });
        const stream = (async function* () { for (const event of events) yield event; })();
        stream.cancel = async () => { cancelled++; };
        return stream;
      },
      close() { closed++; },
    };
  };
  return { connect, calls, get closed() { return closed; }, get cancelled() { return cancelled; } };
}

test('uses the official chat client and closes its session after the final response', async () => {
  const mock = mockClient([{ type: 'status', stage: 'pending' }, { type: 'data', data: ['Flutter and Firebase'] }, { type: 'status', stage: 'complete' }]);
  assert.equal(await callGradioChat('Which stack?', { baseUrl: 'https://example.test', token: 'hf_test', connect: mock.connect }), 'Flutter and Firebase');
  assert.equal(mock.calls[1].endpoint, '/chat');
  assert.deepEqual(mock.calls[1].payload, { message: 'Which stack?' });
  assert.equal(mock.calls[0].options.token, 'hf_test');
  assert.equal(mock.closed, 1);
});

test('separate requests connect to separate sessions', async () => {
  const mock = mockClient([{type:'data',data:['Reply']}]);
  for (let i=0;i<2;i++) await callGradioChat('Hello', {baseUrl:'https://example.test',connect:mock.connect});
  assert.equal(mock.calls.filter(call=>call.url).length, 2);
  assert.equal(mock.closed, 2);
});

test('generation errors and malformed replies trigger fallback instead of a false live answer', async () => {
  for (const events of [[{type:'status',stage:'error'}],[{type:'data',data:[{}]}],[]]) {
    const mock=mockClient(events);
    await assert.rejects(callGradioChat('Question',{baseUrl:'https://example.test',connect:mock.connect}));
    assert.equal(mock.closed,1);
  }
});

test('an already cancelled request never connects', async () => {
  const controller=new AbortController();controller.abort();
  const mock=mockClient([]);
  await assert.rejects(callGradioChat('Question',{baseUrl:'https://example.test',signal:controller.signal,connect:mock.connect}));
  assert.equal(mock.calls.length,0);
});

test('times out a stalled connection and closes it if it resolves later', async () => {
  let closed=0;
  const pending = new Promise(resolve=>setTimeout(()=>resolve({ close(){closed++;}, submit(){throw new Error('Must not submit after timeout');} }),40));
  await assert.rejects(callGradioChat('Question',{baseUrl:'https://example.test',timeoutMs:10,connect:()=>pending}), /timeout/i);
  await new Promise(resolve=>setTimeout(resolve,50));
  assert.equal(closed,1);
});
