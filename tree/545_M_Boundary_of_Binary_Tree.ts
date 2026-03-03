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

const isLeafNode = (node: TreeNode) => node.left === null && node.right === null;

function addLeftNodes(node: TreeNode | null, result: number[]) {
    while(node) {
        if(!isLeafNode(node)) result.push(node.val);

        if(node.left) node = node.left;
        else node = node.right;
    }
}

function addLeafNodes(node: TreeNode | null, result: number[]) {
    const stack: TreeNode[] = [];
    let currNode = node;

    while(currNode || stack.length) {
        while(currNode) {
            stack.push(currNode);
            currNode = currNode.left;
        }

        const node = stack.pop()!;
        if(isLeafNode(node)) result.push(node.val);
        currNode = node.right;
    }
}

function addRightNodes(node: TreeNode | null, result: number[]) {
    const tempResult: number[] = [];
    while(node) {
        if(!isLeafNode(node)) tempResult.push(node.val);

        if(node.right) node = node.right;
        else node = node.left;
    }

    result.push(...tempResult.reverse());
}

function boundaryTraversal(root: TreeNode | null) {
    if(root === null) return [];

    const result: number[] = [];

    result.push(root.val);

    addLeftNodes(root.left, result);
    addLeafNodes(root, result);
    addRightNodes(root.right, result);

    return result;
}

let arr = [3, 9, 20, null, null, 15, 7];
arr = [1,2,2,3,3,null,null,4,4];
arr = [1,2,3,4,5,6,7,null,null,8,9];
// arr = [1,null,2,null,3,null,4,null,null]

const tree1 = buildTree(arr);

printTree(tree1);

console.log(boundaryTraversal(tree1));

