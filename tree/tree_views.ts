/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     val: number
 *     left: TreeNode | null
 *     right: TreeNode | null
 *     constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.left = (left===undefined ? null : left)
 *         this.right = (right===undefined ? null : right)
 *     }
 * }
 */

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
  if (!arr.length || arr[0] === null) return null;

  let root: TreeNode = new TreeNode(arr[0]);

  let queue: TreeNode[] = [];
  queue.push(root);

  let i = 1;
  while (queue.length && i < arr.length) {
    let node = queue.shift()!;

    if (i < arr.length) {
      if (arr[i]) {
        node.left = new TreeNode(arr[i]!);
        queue.push(node.left);
      }
      i += 1;
    }

    if (i < arr.length) {
      if (arr[i]) {
        node.right = new TreeNode(arr[i]!);
        queue.push(node.right);
      }
      i += 1;
    }
  }

  return root;
}

function printTree(
  root: TreeNode | null,
  prefix: string = "",
  isLeft: boolean = true,
): void {
  if (!root) return;

  console.log(prefix + (isLeft ? "├── " : "└── ") + root.val);
  printTree(root.left, prefix + (isLeft ? "│   " : "    "), true);
  printTree(root.right, prefix + (isLeft ? "│   " : "    "), false);
}

function leftView(root: TreeNode | null): number[] {
    if(root === null) return [];

    const result: number[] = [];
    const queue: TreeNode[] = [root];
    while(queue.length) {
        const levelSize = queue.length;
        for(let i = 0; i < levelSize; i++) {
            const node = queue.shift()!;
            if(i === 0) {
                result.push(node.val);
            }

            if(node.left) queue.push(node.left);
            if(node.right) queue.push(node.right);
        }

    }

    return result;
}

function rightView(root: TreeNode | null): number[] {
    if(root === null) return [];

    const result: number[] = [];
    const queue: TreeNode[] = [root];
    while(queue.length) {
        const levelSize = queue.length;
        for(let i = 0; i < levelSize; i++) {
            const node = queue.shift()!;

            if(i === levelSize - 1) {
                result.push(node.val);
            }

            if(node.left) queue.push(node.left);
            if(node.right) queue.push(node.right);
        }
    }

    return result;
}

function topView(root: TreeNode | null): number[] {
    if(root === null) return [];

    const result: number[] = [];
    const queue: TreeNode[] = [root];
    while(queue.length) {
        const levelSize = queue.length;

        for(let i = 0; i < levelSize; i++) {
            const node = queue.shift()!;

            if(i === 0) {
                result.push(node.val);
            } else if (i === levelSize - 1) {
                result.push(node.val);
            }

            if(node.left) queue.push(node.left);
            if(node.right) queue.push(node.right);
        }
    }

    return result;
}

function bottomView(root: TreeNode | null): number[] {
    if(root === null) return [];

    const result: number[] = [];
    const queue: TreeNode[] = [root];
    while(queue.length) {
        const levelSize = queue.length;

        for(let i = 0; i < levelSize; i++) {
            const node = queue.shift()!;

            if(node.left === null && node.right === null) {
                result.push(node.val);
                continue;
            }

            if(node.left) queue.push(node.left);
            if(node.right) queue.push(node.right);
        }
    }

    return result;
}

let arr = [3, 9, 20, null, null, 15, 7];
arr = [1,2,2,3,3,null,null,4,4]
arr = [1, 2, 3, null, 5, null, 4]
arr = [1, 2, 3, 6, 5, 8, 4]
arr = [4, 2, 1, 3, 11]
arr = [4, 5, 6, 3, 11]

const tree1 = buildTree(arr);

printTree(tree1);

console.log('Top View: ', topView(tree1));
console.log('Left View: ', leftView(tree1));
console.log('Bottom View: ', bottomView(tree1));
console.log('Right View: ', rightView(tree1));

