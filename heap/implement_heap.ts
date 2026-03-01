/*
- push method
- pop methd

Run: ts-node-esm implement_heap.ts
*/

interface IHeap<T> {
	push: (val: T) => void
	pop: () => T | undefined
}

// type compareFnType = (a: T, b: T) => boolean;

class Heap<T> implements IHeap<T> {
	private heap: Array<T>;
	private compareFn: (a: T, b: T) => boolean;

	constructor(compareFn: (a: T, b: T) => boolean) {
		this.heap = [];
		this.compareFn = compareFn;
	}

	push(val: T): void {
		this.heap.push(val);
		this.heapifyUp(this.heap.length - 1);
	}

	pop(): T | undefined {
		if(!this.heap.length) return undefined;
		if(this.heap.length === 1) return this.heap[0];

		const val = this.heap[0];

		this.heap[0] = this.heap.pop()!;
		this.heapifyDown(0);

		return val;
	}

	heapifyUp(index: number): void {
		while(index > 0) {
			const parentIndex = this.parent(index);

			if(this.compareFn(this.heap[index], this.heap[parentIndex])) {
				this.swap(index, parentIndex);
			}

			index = parentIndex;
		}
	}

	heapifyDown(index: number): void {
		while(true) {
			let swapIndex = index;

			const left = this.left(index);
			const right = this.right(index);

			if(left < this.heap.length && this.compareFn(this.heap[left], this.heap[swapIndex])) {
				swapIndex = left;
			}

			if(right < this.heap.length && this.compareFn(this.heap[right], this.heap[swapIndex])) {
				swapIndex = right;
			}

			if(swapIndex === index) {
				break;
			}

			this.swap(index, swapIndex);
			index = swapIndex;
		}
	}

	parent(index: number): number {
		return Math.floor((index - 1) / 2);
	}

	left(index: number): number {
		return 2 * index + 1;
	}

	right(index: number): number {
		return 2 * index + 2;
	}

	swap(index1: number, index2: number) {
		[this.heap[index1], this.heap[index2]] = [this.heap[index2], this.heap[index1]];
	}

	peek(): T {
		return this.heap[0];
	}

}

const minHeap = new Heap<number>((a, b) => a > b);

console.log(minHeap)


minHeap.push(10);
minHeap.push(9);
minHeap.push(2);
minHeap.push(23);
minHeap.push(15);


console.log(minHeap.peek())

console.log(minHeap.pop()!)

console.log(minHeap.peek())













const maxheap = 