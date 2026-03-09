class TreeNode {
    val: number
    left: TreeNode | null
    right: TreeNode | null

    constructor(val: number, left: TreeNode | null, right: TreeNode | null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

function buildTree(arr: (number | null)[]): TreeNode | null {
    if(!arr.length || !arr[0]) return null;

    let root = new TreeNode(arr[0]);
    for(let i = 0; i < arr.length; i++) {
        if(!arr[i]) continue;

        let node = new TreeNode(arr[i]);
        
    }
}