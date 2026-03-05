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
Perform a DFS from root to find p, storing the path as a list of nodes.
Similarly find the path to q.
Iterate through both paths simultaneously until they differ. The last matching node is the LCA.
*/
// function getPath(node: TreeNode | null, dest: TreeNode, path: TreeNode[]) {
//     if(node === null) return false;

//     path.push(node);

//     if(node === dest) return true;

//     if(getPath(node.left, dest, path) || getPath(node.right, dest, path)) return true;

//     path.pop();

//     return false;
// }

// function lowestCommonAncestor(root: TreeNode | null, p: TreeNode | null, q: TreeNode | null): TreeNode | null {
// 	if(root === null) return null;
//     if(p === root || q === root) return root;
//     if(p === null || q === null) return p || q;

//     const pathToReachP: TreeNode[] = [];
//     const pathToReachQ: TreeNode[] = [];

//     getPath(root, p, pathToReachP);
//     getPath(root, q, pathToReachQ);

//     let minIdx = Math.min(pathToReachP.length, pathToReachQ.length);
//     for(let i = minIdx - 1; i >= 0; i--) {
//         if(pathToReachP[i] === pathToReachQ[i]) return pathToReachP[i];
//     }

//     return null;
// };


function lowestCommonAncestor(root: TreeNode | null, p: TreeNode | null, q: TreeNode | null): TreeNode | null {
    if(root === null) return null;

    const queue: TreeNode[] = [root];
    const parentMap = new Map<TreeNode, TreeNode | null>();
    parentMap.set(root, null);
    while(queue.length) {
        const node = queue.shift()!;

        if(node.left) {
            queue.push(node.left);
            parentMap.set(node.left, node);
        }
        if(node.right) {
            queue.push(node.right);
            parentMap.set(node.right, node);
        }
    }

    const ancestors = new Set<TreeNode>();
    let currNode: TreeNode | null = p;
    while(currNode) {
        ancestors.add(currNode);
        currNode = parentMap.get(currNode)!;
    }

    currNode = q;
    while(currNode) {
        if(ancestors.has(currNode)) return currNode;

        currNode = parentMap.get(currNode)!;
    }

    return null;
};


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

console.log(lowestCommonAncestor(tree1, tree1!.left!.left, tree1!.left!.right!.left));

