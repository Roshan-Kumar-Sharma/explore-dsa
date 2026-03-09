class TreeNode<T> {
  val: T;
  left: TreeNode<T> | null;
  right: TreeNode<T> | null;

  constructor(val: T) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

function buildTree<T>(arr: T[]): TreeNode<T> {
  let root: TreeNode<T> = new TreeNode(arr[0]);

  let queue: TreeNode<T>[] = [];
  queue.push(root);

  let i = 1;
  while (queue.length && i < arr.length) {
    let node = queue.shift()!;

    if (i < arr.length) {
      if (arr[i]) {
        node.left = new TreeNode(arr[i]);
        queue.push(node.left);
      }
      i += 1;
    }

    if (i < arr.length) {
      if (arr[i]) {
        node.right = new TreeNode(arr[i]);
        queue.push(node.right);
      }
      i += 1;
    }
  }

  return root;
}


function printTree<T>(root: TreeNode<T> | null, prefix: string = "", isLeft: boolean = true): void {
  if (!root) return;

  console.log(prefix + (isLeft ? "├── " : "└── ") + root.val);
  printTree(root.left, prefix + (isLeft ? "│   " : "    "), true);
  printTree(root.right, prefix + (isLeft ? "│   " : "    "), false);
}

let arr = [1, 2, 3, 4, 5, null, null, 6, 7, 8, null];

const tree1 = buildTree<number | null>(arr);

printTree(tree1)