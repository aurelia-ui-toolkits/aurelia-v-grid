import {ClickCounter} from 'src/click-counter';
import './setup';

describe('Click counter', () => {
  it('increases counter', () => {
    let clickCounter = new ClickCounter();
    clickCounter.count = 0;

    clickCounter.increment();

    expect(clickCounter.count).toBe(1);
  });
});
