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

function recursivePreorder(root: TreeNode | null) {
    if(root === null) return;

    console.log(root.val);

    recursivePreorder(root.left);
    recursivePreorder(root.right);
}

function recursivePostorder(root: TreeNode | null) {
    if(root === null) return;

    recursivePostorder(root.left);
    recursivePostorder(root.right);
    console.log(root.val);
}

function recursiveInorder(root: TreeNode | null) {
    if(root === null) return;

    recursiveInorder(root.left);
    console.log(root.val);
    recursiveInorder(root.right);
}

function iterativePreoroder(root: TreeNode | null) {
  if(root === null) return null;

  const stack: TreeNode[] = [root];
  while(stack.length) {
    const node = stack.pop()!;

    console.log(node.val);

    if(node.right) stack.push(node.right);
    if(node.left) stack.push(node.left);
  }
}

function iterativeInorder(root: TreeNode | null) {
  if(root === null) return;

  const stack: TreeNode[] = [];
  let current: TreeNode = root;

  while(current || stack.length) {
    while(current) {
      stack.push(current);
      current = current.left!;
    }

    const node = stack.pop()!;
    console.log(node.val);

    current = node.right!;
  }

}

function iterativePostorder(root: TreeNode | null) {
  if(root === null) return;

  const stack: TreeNode[] = [root];
  const result: number[] = [];
  while(stack.length) {
    const node = stack.pop()!;

    result.push(node.val);

    if(node.left) stack.push(node.left);
    if(node.right) stack.push(node.right);
  }

  console.log(JSON.stringify(result.reverse()));
}

function levelOrder(root: TreeNode | null) {
  if(root === null) return;

  const result: number[] = [];
  const queue: TreeNode[] = [root];

  while(queue.length) {
    const node = queue.shift()!;

    result.push(node.val);

    if(node.left) queue.push(node.left);
    if(node.right) queue.push(node.right);
  }

  console.log(JSON.stringify(result));
}

let arr = [1, 2, 3, 4, 5, null, null, 6, 7, 8, null];

const tree1 = buildTree(arr);

// recursivePreorder(tree1);
// recursivePostorder(tree1);
// recursiveInorder(tree1);

// iterativePreoroder(tree1)
// iterativeInorder(tree1)
// iterativePostorder(tree1)

levelOrder(tree1)