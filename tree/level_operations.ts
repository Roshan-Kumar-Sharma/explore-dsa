class TreeNode {
    val: number;
    left: TreeNode | null;
    right: TreeNode | null;

    constructor(val: number) {
        this.val = val;
        this.left = null;
        this.right = null;
    }
}

function buildTree(arr: (number | null)[]): TreeNode | null {
    if(!arr.length || !arr[0]) return null;

    let root = new TreeNode(arr[0]);
    let queue: TreeNode[] = [root];
    let i = 1;
    while(queue.length) {
        const node = queue.shift()!;

        if(i < arr.length && arr[i]) {
            node.left = new TreeNode(arr[i]!);
            queue.push(node.left);
        }
        i += 1;

        if(i < arr.length && arr[i]) {
            node.right = new TreeNode(arr[i]!);
            queue.push(node.right);
        }
        i += 1;
    }

    return root;
}

function printTree(root: TreeNode | null, prefix: string = "", isLeft: boolean = true): void {
  if (!root) return;

  console.log(prefix + (isLeft ? "├── " : "└── ") + root.val);
  printTree(root.left, prefix + (isLeft ? "│   " : "    "), true);
  printTree(root.right, prefix + (isLeft ? "│   " : "    "), false);
}

function groupByLevel(root: TreeNode | null) {
    if(root === null) return null;

    const result: number[][] = [];
    const queue: TreeNode[] = [root];
    while(queue.length) {
        const levelSize = queue.length;
        const levelVals: number[] = [];

        for(let i = 0; i < levelSize; i++) {
            const node = queue.shift()!;

            levelVals.push(node.val);

            if(node.left) queue.push(node.left);
            if(node.right) queue.push(node.right);
        }

        result.push(levelVals);
    }

    return result;
}

function zigzagLevelOrder(root: TreeNode | null) {
    if(root === null) return null;

    const queue: TreeNode[] = [root];
    const result: number[] = [];
    let flip = false;
    while(queue.length) {
        let levelSize = queue.length;
        let vals: number[] = [];

        for(let i = 0; i < levelSize; i++) {
            const node = queue.shift()!;

            let index = i;
            if(flip) index = levelSize - 1 - i;

            vals[index] = node.val;

            if(node.left) queue.push(node.left);
            if(node.right) queue.push(node.right);
        }

        result.push(...vals);
        flip = !flip;
    }

    return result;
}


const arr = [1, 3, -4, 10, 3, -7, null, 8, 12, 5, null];

let tree1 = buildTree(arr);

printTree(tree1)

// console.log(JSON.stringify(groupByLevel(tree1)));
console.log(JSON.stringify(zigzagLevelOrder(tree1)));