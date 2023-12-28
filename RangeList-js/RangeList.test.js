const RangeList = require('./RangeList');

describe('RangeList', () => {

    test('initial list should be empty', () => {
        const rl = new RangeList();
        expect(rl.toString()).toBe("");
    });

    test('adding [1, 5]', () => {
        const rl = new RangeList();
        rl.add([1, 5]);
        expect(rl.toString()).toBe("[1, 5)");
    });

    test('adding [10, 20]', () => {
        const rl = new RangeList();
        rl.add([1, 5]);
        rl.add([10, 20]);
        expect(rl.toString()).toBe("[1, 5) [10, 20)");
    });

    test('adding [20, 20] should have no effect', () => {
        const rl = new RangeList();
        rl.add([1, 5]);
        rl.add([10, 20]);
        rl.add([20, 20]);
        expect(rl.toString()).toBe("[1, 5) [10, 20)");
    });

    test('adding [20, 21]', () => {
        const rl = new RangeList();
        rl.add([1, 5]);
        rl.add([10, 20]);
        rl.add([20, 21]);
        expect(rl.toString()).toBe("[1, 5) [10, 21)");
    });

    test('adding overlapping range [2, 4]', () => {
        const rl = new RangeList();
        rl.add([1, 5]);
        rl.add([10, 21]);
        rl.add([2, 4]);
        expect(rl.toString()).toBe("[1, 5) [10, 21)");
    });

    test('adding overlapping range [3, 8]', () => {
        const rl = new RangeList();
        rl.add([1, 5]);
        rl.add([10, 21]);
        rl.add([3, 8]);
        expect(rl.toString()).toBe("[1, 8) [10, 21)");
    });

    test('removing [10, 10] should have no effect', () => {
        const rl = new RangeList();
        rl.add([1, 8]);
        rl.add([10, 21]);
        rl.remove([10, 10]);
        expect(rl.toString()).toBe("[1, 8) [10, 21)");
    });

    test('removing [10, 11]', () => {
        const rl = new RangeList();
        rl.add([1, 8]);
        rl.add([10, 21]);
        rl.remove([10, 11]);
        expect(rl.toString()).toBe("[1, 8) [11, 21)");
    });

    test('removing [15, 17]', () => {
        const rl = new RangeList();
        rl.add([1, 8]);
        rl.add([11, 21]);
        rl.remove([15, 17]);
        expect(rl.toString()).toBe("[1, 8) [11, 15) [17, 21)");
    });

    test('removing [3, 19]', () => {
        const rl = new RangeList();
        rl.add([1, 8]);
        rl.add([11, 21]);
        rl.remove([3, 19]);
        expect(rl.toString()).toBe("[1, 3) [19, 21)");
    });

    // 根据需要添加更多测试用例
});
