const _counter = new WeakMap();
const _name = new WeakMap();

class CountDown {
    constructor(counter, name) {
        _counter.set(this, counter);
        _name.set(this, name);
    }
    dec() {
        let counter = _counter.get(this);
        console.log('xcounter', counter);
        if (counter < 1) return;
        counter--;
        _counter.set(this, counter);
        if (counter === 0) {
            _name.get(this)();
        }
    }
}

const c = new CountDown(2, () => console.log('done', 10));

c.dec();
c.dec();