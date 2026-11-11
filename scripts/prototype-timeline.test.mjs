import assert from 'node:assert/strict';
import test from 'node:test';
import { sceneAt } from '../src/components/prototype/timeline.ts';

test('the single reveal opens fully without a second assembly sequence', () => {
  assert.equal(sceneAt(0).spread, 0);
  assert.equal(sceneAt(1).spread, 1);
  let previous = 0;
  for (let i = 0; i <= 100; i++) {
    const { spread } = sceneAt(i / 100);
    assert.ok(spread >= previous);
    previous = spread;
  }
});

test('fast jumps and reverse traversal have no history-dependent state', () => {
  const positions = Array.from({ length: 201 }, (_, i) => i / 200);
  const forward = positions.map(sceneAt);
  const reverse = [...positions].reverse().map(sceneAt).reverse();
  assert.deepEqual(reverse, forward);
  assert.deepEqual(sceneAt(-10), sceneAt(0));
  assert.deepEqual(sceneAt(10), sceneAt(1));
});

test('motion remains bounded and continuous across chapter transitions', () => {
  let previous = sceneAt(0);
  for (let i = 1; i <= 1000; i++) {
    const current = sceneAt(i / 1000);
    for (const [key, value] of Object.entries(current)) {
      if (key === 'chapter') continue;
      assert.ok(Number.isFinite(value) && value >= 0 && value <= 1, key);
      assert.ok(Math.abs(value - previous[key]) < 0.025, `${key} has a discontinuity`);
    }
    previous = current;
  }
});
