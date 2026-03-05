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

/*
However, indices can grow very large (exponential with depth). For a tree of height 3000, indices can be up to 2^3000, which doesn't fit in JavaScript numbers (which are 64‑bit floats, safe integer up to 2^53-1). This can cause overflow. The problem guarantees the answer fits in 32 bits, but intermediate index calculations might exceed safe integer limits. We need to handle this.
*/

// function widthOfBinaryTree(root: TreeNode | null): number {
//   if (!root) return 0;

//   // Queue stores [node, index]
//   const queue: [TreeNode, number][] = [[root, 1]];
//   let maxWidth = 0;

//   while (queue.length) {
//     const levelSize = queue.length;
//     let firstIndex = queue[0][1];
//     let lastIndex = queue[levelSize - 1][1];

//     maxWidth = Math.max(maxWidth, lastIndex - firstIndex + 1);

//     for (let i = 0; i < levelSize; i++) {
//       const [node, index] = queue.shift()!;
//       if (node.left) queue.push([node.left, 2 * index]);
//       if (node.right) queue.push([node.right, 2 * index + 1]);
//     }
//   }
//   return maxWidth;
// }


/*
Algorithm Modification

At the start of each level, record the firstIndex of that level.

When pushing children, use (index - firstIndex) * 2 and (index - firstIndex) * 2 + 1? Actually, we can store relative indices: for a node with normalized index norm = index - firstIndex, its left child gets 2 * norm, right child 2 * norm + 1. This keeps all indices within a manageable range (at most the width of the level times 2).
*/
function widthOfBinaryTree(root: TreeNode | null): number {
    if(root === null) return 0;

    const queue: { node: TreeNode, index: number }[] = [{ node: root, index: 0 }];
    let maxWidth: number = 0;
    while(queue.length) {
        const levelSize: number = queue.length;
        const firstIndex: number = queue[0].index;
        const lastIndex: number = queue[queue.length - 1].index;

        maxWidth = Math.max(maxWidth, lastIndex - firstIndex + 1);

        for(let i = 0; i < levelSize; i++) {
            const { node, index } = queue.shift()!;

            let normalizedIdx = index - firstIndex;
            
            if(node.left) queue.push({ node: node.left, index: 2 * normalizedIdx });
            if(node.right) queue.push({ node: node.right, index: 2 * normalizedIdx + 1 });
        }
    }

    return maxWidth;
}

let arr = [3, 9, 20, null, null, 15, 7];
arr = [1,2,3,4,5,6,7,null,null,8,9];
arr = [1,null,2,null,3,null,4,null,null]
arr = [1,2,3,4,5,null,null,null,null,6,7]
arr = [1,3,2,5,3,null,9]
arr = [1,3,2,5,null,null,9,6,null,7]
arr = [1,3,2,5]

let tree1 = buildTree(arr);

printTree(tree1);

console.log(widthOfBinaryTree(tree1));

