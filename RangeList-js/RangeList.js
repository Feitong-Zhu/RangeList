class RangeList {
    constructor(initialRanges = []) {
        this.ranges = [];
    }

    add(range) {
        let [start, end] = range;

        // start <= end
        if (start > end) {
            [start, end] = [end, start];
        }

        // the ranges are sorted from min to max
        // merge [[1,3],[6,9]]+[2,8] to [1,9]
        let i = 0;
        // find the first position x that range[x][1]>=start
        while (i < this.ranges.length && this.ranges[i][1] < start) {
            i++;
        }
        // find the last position y that range[y][0]<=end, delete the range pairs from x to y
        while (i < this.ranges.length && this.ranges[i][0] <= end) {
            start = Math.min(start, this.ranges[i][0]);
            end = Math.max(end, this.ranges[i][1]);
            this.ranges.splice(i, 1);
        }
        // add back the range[ min(r[x][0],start),max(r[y][1],end) ]
        this.ranges.splice(i, 0, [start, end]);
    }

    remove(range) {
        let [start, end] = range;
        if (start > end) {
            [start, end] = [end, start];
        }
        // find the ranges that intersects with target removed range
        let i = 0;
        while (i < this.ranges.length) {
            if (this.ranges[i][0] < end && this.ranges[i][1] > start) {
                // partly intersect, add new range
                if (this.ranges[i][0] < start) {
                    this.ranges.splice(i, 0, [this.ranges[i][0], start]);
                    i++;
                }
                if (this.ranges[i][1] > end) {
                    this.ranges.splice(i + 1, 0, [end, this.ranges[i][1]]);
                }
                // fully intersect, delete this range
                this.ranges.splice(i, 1);
            } else {
                i++;
            }
        }
    }

    toString() {
        let resultString = "";
        for (let i = 0; i < this.ranges.length; i++) {
            const range = this.ranges[i];
                resultString += `[${range[0]}, ${range[1]})`;

            if (i < this.ranges.length - 1) {
                resultString += ' ';
            }
        }

        return resultString;

    }
}

module.exports = RangeList; 

/*
// Example run
const rl = new RangeList(); 
console.log(rl.toString()); // Should be ""
rl.add([1, 5]);
console.log(rl.toString())// Should be: "[1, 5)"
rl.add([10, 20]);
console.log(rl.toString()) // Should be: "[1, 5) [10, 20)"
rl.add([20, 20]);
console.log(rl.toString())// Should be: "[1, 5) [10, 20)"
rl.add([20, 21]);
console.log(rl.toString())// Should be: "[1, 5) [10, 21)"
rl.add([2, 4]);
console.log(rl.toString())// Should be: "[1, 5) [10, 21)"
rl.add([3, 8]);
console.log(rl.toString()) // Should be: "[1, 8) [10, 21)"
rl.remove([10, 10]);
console.log(rl.toString())// Should be: "[1, 8) [10, 21)"
rl.remove([10, 11]);
console.log(rl.toString())// Should be: "[1, 8) [11, 21)"
rl.remove([15, 17]);
console.log(rl.toString()) // Should be: "[1, 8) [11, 15) [17, 21)"
rl.remove([3, 19]);
console.log(rl.toString()) // Should be: "[1, 3) [19, 21)"
*/
