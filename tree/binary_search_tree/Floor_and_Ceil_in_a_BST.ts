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

// floor val - the greatest prev value than the given node value
// ceil val - the smallest next value than the given node value
function findFloorAndCeil(root: TreeNode | null, key: number): (TreeNode | null | number)[] {
    let floor = findFloor(root, key);
    let ceil = findCeil(root, key);

    return [floor, ceil];
}

function findFloor(root: TreeNode | null, key: number) {
    if(root === null) return null;

    let floor = Number.NEGATIVE_INFINITY;
    let curr: TreeNode | null = root;
    while(curr) {
        console.log(key, curr.val, floor)
        if(key >= curr.val && curr.val >= floor) {
            floor = curr.val;
            curr = curr.right;
        } else {
            curr = curr.left;
        }
    }

    console.log('floor, ', floor)

    return floor;
}

function findCeil(root: TreeNode | null, key: number) {
    if(root === null) return null;

    let ceil = Number.POSITIVE_INFINITY;
    let curr: TreeNode | null = root;
    while(curr) {
        if(key <= curr.val && curr.val <= ceil) {
            ceil = curr.val;
            curr = curr.left;
        } else {
            curr = curr.right;
        }
    }

    return ceil;
}

let arr = [8, 4, 12, 2, 6, 10, 14]

let key = 11
key = 15
key = 1

let tree1 = buildTree(arr);

printTree(tree1)

let result = findFloorAndCeil(tree1, key);

console.log(result)