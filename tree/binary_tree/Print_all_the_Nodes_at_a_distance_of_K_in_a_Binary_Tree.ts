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
      if (arr[i] !== null) {
        node.left = new TreeNode(arr[i]!);
        queue.push(node.left);
      }
      i += 1;
    }

    if (i < arr.length) {
      if (arr[i] !== null) {
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

function distanceK(root: TreeNode | null, target: TreeNode, k: number): (TreeNode | null)[] {
  if(root === null) return [];

  const parentMap = new Map<TreeNode, TreeNode | null>();
  const dfs = (node: TreeNode | null, parent: TreeNode | null) => {
    if(node === null) return null

    parentMap.set(node, parent);

    dfs(node.left, node);
    dfs(node.right, node);
  }

  dfs(root, null);

  const result: TreeNode[] = [];
  const visited = new Set<TreeNode>();
  const queue: Array<[TreeNode, number]> = [[target, 0]];
  visited.add(target);
  while(queue.length) {
    const [node, dist] = queue.shift()!;

    if(dist === k) {
      result.push(node);
      continue;
    }

    if(node.left && !visited.has(node.left)) {
      visited.add(node.left);
      queue.push([node.left, dist + 1]);
    }

    if(node.right && !visited.has(node.right)) {
      visited.add(node.right);
      queue.push([node.right, dist + 1]);
    }

    if(parentMap.get(node) && !visited.has(parentMap.get(node)!)) {
      visited.add(parentMap.get(node)!);
      queue.push([parentMap.get(node)!, dist + 1]);
    }
  }

  return result;
}



let arr = [3, 9, 20, null, null, 15, 7];
arr = [1,2,3,4,5,6,7,null,null,8,9];
arr = [1,null,2,null,3,null,4,null,null]
arr = [1,2,3,4,5,null,null,null,null,6,7]
arr = [1,3,2,5,3,null,9]
arr = [1,3,2,5,null,null,9,6,null,7]
arr = [1,3,2,5]
arr = [3,5,1,6,2,0,8,null,null,7,4]

let tree1 = buildTree(arr);

printTree(tree1);

// console.log(distanceK(tree1, tree1!.left!, 2));
console.log(distanceK(tree1, tree1!.left!, 3));