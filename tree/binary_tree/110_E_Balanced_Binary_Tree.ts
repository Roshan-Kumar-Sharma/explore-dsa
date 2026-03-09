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

// if the height of leaf node is considered to be 0
function checkHeight(root: TreeNode | null): number {
    if(root === null) return 0;

    let left = checkHeight(root.left);
    if(left === -1) return -1;

    let right = checkHeight(root.right);
    if(right === -1) return -1;

    if(Math.abs(left - right) > 1) return -1;

    return 1 + Math.max(left, right);
}

// if the height of the leaf node is considered to be -1
// function checkHeight(root: TreeNode | null): number {
//     if(root === null) return -1;

//     let left = checkHeight(root.left) + 1;
//     if(left === -1) return -1;

//     let right = checkHeight(root.right) + 1;
//     if(right === -1) return -1;

//     if(Math.abs(left - right) > 1) return -1;

//     return Math.max(left, right);
// }

function isBalanced(root: TreeNode | null): boolean {
    if(root === null) return true;

    return checkHeight(root) !== -1;
};

let arr = [3, 9, 20, null, null, 15, 7];
arr = [1,2,2,3,3,null,null,4,4]

const tree1 = buildTree(arr);

printTree(tree1);

console.log(isBalanced(tree1));

