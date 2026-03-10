class TreeNode {
    val: number
    left: TreeNode | null
    right: TreeNode | null

    constructor(val: number, left?: TreeNode | null, right?: TreeNode | null) {
        this.val = val;
        this.left = left || null;
        this.right = right || null;
    }
}

function buildTree(arr: (number | null)[]): TreeNode | null {
    if(!arr.length || !arr[0]) return null;

    let root = new TreeNode(arr[0]);
    for(let i = 1; i < arr.length; i++) {
        if(arr[i] === null) continue;

        let node = new TreeNode(arr[i]!);
        let curr: TreeNode | null = root;
        let parent: TreeNode | null = null;
        while(curr) {
            parent = curr;
            if(node.val < curr.val) {
                curr = curr.left;
            } else {
                curr = curr.right;
            }
        }

        if(parent === null) continue;

        if(node.val < parent.val) parent.left = node;
        else parent.right = node;
    }

    return root;
}

function printTree(root: TreeNode| null, prefix: string = "", isLeft: boolean = true): void {
  if (!root) return;

  console.log(prefix + (isLeft ? "├── " : "└── ") + root.val);
  printTree(root.left, prefix + (isLeft ? "│   " : "    "), true);
  printTree(root.right, prefix + (isLeft ? "│   " : "    "), false);
}

function succPredBST(root: TreeNode | null, key: number) {
    if(root === null) return [null, null];

    let pred: TreeNode | null = null;
    let succ: TreeNode | null = null;
    let curr: TreeNode | null = root;
    while(curr) {
        if(key >= curr.val) {
            curr = curr.right;
        } else {
            succ = curr;
            curr = curr.left;
        }
    }

    curr = root;
    while(curr) {
        if(key <= curr.val) {
            curr = curr.left;
        } else {
            pred = curr;
            curr = curr.right;
        }
    }

    return [pred, succ];
}


let arr = [5, 2, 10, 1, 4, 7, 12]

let key = 10
key = 12
// key = 1

let tree1 = buildTree(arr);

printTree(tree1)

let result = succPredBST(tree1, key);

console.log(result)