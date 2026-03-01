/*
- push method
- pop methd
*/
// type compareFnType = (a: T, b: T) => boolean;
var Heap = /** @class */ (function () {
    function Heap(compareFn) {
        this.heap = [];
        this.compareFn = compareFn;
    }
    Heap.prototype.push = function (val) {
        this.heap.push(val);
        this.heapifyUp(this.heap.length - 1);
    };
    Heap.prototype.pop = function () {
        if (!this.heap.length)
            return undefined;
        if (this.heap.length === 1)
            return this.heap[0];
        var val = this.heap[0];
        this.heap[0] = this.heap.pop();
        this.heapifyDown(0);
        return val;
    };
    Heap.prototype.heapifyUp = function (index) {
        while (index > 0) {
            var parentIndex = this.parent(index);
            if (this.compareFn(this.heap[index], this.heap[parentIndex])) {
                this.swap(index, parentIndex);
            }
            index = parentIndex;
        }
    };
    Heap.prototype.heapifyDown = function (index) {
        while (true) {
            var swapIndex = index;
            var left = this.left(index);
            var right = this.right(index);
            if (left < this.heap.length && this.compareFn(this.heap[left], this.heap[swapIndex])) {
                swapIndex = left;
            }
            if (right < this.heap.length && this.compareFn(this.heap[right], this.heap[swapIndex])) {
                swapIndex = right;
            }
            if (swapIndex === index) {
                break;
            }
            this.swap(index, swapIndex);
            index = swapIndex;
        }
    };
    Heap.prototype.parent = function (index) {
        return Math.floor((index - 1) / 2);
    };
    Heap.prototype.left = function (index) {
        return 2 * index + 1;
    };
    Heap.prototype.right = function (index) {
        return 2 * index + 2;
    };
    Heap.prototype.swap = function (index1, index2) {
        var _a;
        _a = [this.heap[index2], this.heap[index1]], this.heap[index1] = _a[0], this.heap[index2] = _a[1];
    };
    Heap.prototype.peek = function () {
        return this.heap[0];
    };
    return Heap;
}());
var minHeap = new Heap(function (a, b) { return a > b; });
console.log(minHeap);
minHeap.push(10);
minHeap.push(9);
minHeap.push(2);
minHeap.push(23);
minHeap.push(15);
console.log(minHeap.peek());
console.log(minHeap.pop());
console.log(minHeap.peek());
