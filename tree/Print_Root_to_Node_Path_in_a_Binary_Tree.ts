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

function dfs(node: TreeNode | null, value: number, path: number[]) {
    if(node === null) return false;

    path.push(node.val);

    if(node.val === value) return true;
    
    let found = dfs(node.left, value, path);
    if(found) return true;

    found = dfs(node.right, value, path);
    if(found) return true;

    path.pop();

    return false;
}

function printPathFromRootToLeafNode(root: TreeNode | null, value: number) {
    if(root === null) return [];

    let path: number[] = [];
    dfs(root, value, path);

    return path;
}

let arr = [3, 9, 20, null, null, 15, 7];
arr = [1,2,3,4,5,6,7,null,null,8,9];
// arr = [1,null,2,null,3,null,4,null,null]
// arr = [1,2,3,4,5,null,null,null,null,6,7]

let tree1 = buildTree(arr);
let value = 6

printTree(tree1);

console.log(printPathFromRootToLeafNode(tree1, value));

