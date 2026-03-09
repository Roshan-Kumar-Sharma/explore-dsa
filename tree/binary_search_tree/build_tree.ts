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
    if(!arr.length) return null;

    const rootNode = new TreeNode(arr[0] as number);
    for(let i = 1; i < arr.length; i++) {
        if(!arr[i]) continue;
        let node = new TreeNode(arr[i] as number);
        let parent: TreeNode | null = null;
        let curr: TreeNode | null = rootNode;
        while(curr) {
            parent = curr;
            if(node.val < curr.val) {
                curr = curr.left;
            } else {
                curr = curr.right;
            }
        }

        console.log(node, parent)

        if(node.val < parent!.val) parent!.left = node;
        else parent!.right = node;
    }

    return rootNode;
}

function printTree(root: TreeNode| null, prefix: string = "", isLeft: boolean = true): void {
  if (!root) return;

  console.log(prefix + (isLeft ? "├── " : "└── ") + root.val);
  printTree(root.left, prefix + (isLeft ? "│   " : "    "), true);
  printTree(root.right, prefix + (isLeft ? "│   " : "    "), false);
}

function inorder(node: TreeNode | null) {
    if(node === null) return;
    
    inorder(node.left)
    console.log(node.val)
    inorder(node.right)
}

let arr = [10,5,15,2,6,null,null]
// arr = [8,5,12,4,7,10,14,null,null,6,null,null,null,13]


let tree1 = buildTree(arr);

printTree(tree1);

inorder(tree1)