class TreeNode {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
        this.x = 0;
        this.y = 0;
        this.element = null; // link to div for visualization
    }
}

let root = null;

// Add node from input
function addNode() {
    const input = document.getElementById('nodeInput');
    const value = input.value.trim();
    if (!value) return;

    root = insertNode(root, parseInt(value));

    const container = document.getElementById('treeContainer');
    const containerWidth = container.clientWidth;

    layoutTree(root, 0, containerWidth, 50, 80);
    visualizeTree();
    input.value = '';
}

// Enter key support
document.getElementById('nodeInput').addEventListener('keyup', event => {
    if (event.key === 'Enter') addNode();
});

// Insert node into BST
function insertNode(node, value) {
    if (!node) return new TreeNode(value);
    if (value < node.value) node.left = insertNode(node.left, value);
    else node.right = insertNode(node.right, value);
    return node;
}

// Layout tree nodes
function layoutTree(node, minX, maxX, y, ySpacing) {
    if (!node) return;
    node.y = y;

    if (!node.left && !node.right) {
        node.x = (minX + maxX) / 2;
        return;
    }

    if (node.left) layoutTree(node.left, minX, (minX + maxX) / 2, y + ySpacing, ySpacing);
    if (node.right) layoutTree(node.right, (minX + maxX) / 2, maxX, y + ySpacing, ySpacing);

    node.x = node.left && node.right
        ? (node.left.x + node.right.x) / 2
        : node.left ? node.left.x : node.right.x;
}

// Visualize the tree
function visualizeTree() {
    const container = document.getElementById('treeContainer');
    container.innerHTML = '';
    container.style.position = 'relative';

    // Calculate horizontal offset to center tree
    const allX = [];
    function collectX(node) {
        if (!node) return;
        allX.push(node.x);
        collectX(node.left);
        collectX(node.right);
    }
    collectX(root);

    if (allX.length === 0) return;

    const minX = Math.min(...allX);
    const maxX = Math.max(...allX);
    const containerWidth = container.clientWidth;
    const offset = (containerWidth - (maxX - minX)) / 2 - minX;

    // Draw nodes with offset
    function drawNodeWithOffset(node) {
        if (!node) return;
        const nodeDiv = document.createElement('div');
        nodeDiv.className = 'node';
        nodeDiv.textContent = node.value;
        nodeDiv.style.position = 'absolute';
        nodeDiv.style.left = node.x + offset + 'px';
        nodeDiv.style.top = node.y + 'px';
        container.appendChild(nodeDiv);
        node.element = nodeDiv;

        if (node.left) {
            drawLine(container, node.x + offset + 35, node.y + 35, node.left.x + offset + 35, node.left.y + 35);
            drawNodeWithOffset(node.left);
        }
        if (node.right) {
            drawLine(container, node.x + offset + 35, node.y + 35, node.right.x + offset + 35, node.right.y + 35);
            drawNodeWithOffset(node.right);
        }
    }

    drawNodeWithOffset(root);
}

// Draw line between two points
function drawNode(node, container) {
    if (!node) return;

    // Draw lines first
    if (node.left) {
        drawLine(container, node.x + 35, node.y + 35, node.left.x + 35, node.left.y + 35);
        drawNode(node.left, container);
    }
    if (node.right) {
        drawLine(container, node.x + 35, node.y + 35, node.right.x + 35, node.right.y + 35);
        drawNode(node.right, container);
    }

    // Then draw the node on top
    const nodeDiv = document.createElement('div');
    nodeDiv.className = 'node';
    nodeDiv.textContent = node.value;
    nodeDiv.style.position = 'absolute';
    nodeDiv.style.left = node.x + 'px';
    nodeDiv.style.top = node.y + 'px';
    nodeDiv.style.zIndex = '1'; // ensures node is above lines
    container.appendChild(nodeDiv);
    node.element = nodeDiv;
}

function drawLine(container, x1, y1, x2, y2) {
    const line = document.createElement('div');
    const length = Math.hypot(x2 - x1, y2 - y1);
    const angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;

    line.style.position = 'absolute';
    line.style.width = length + 'px';
    line.style.height = '2px';
    line.style.backgroundColor = '#00adee';
    line.style.left = x1 + 'px';
    line.style.top = y1 + 'px';
    line.style.transformOrigin = '0 0';
    line.style.transform = `rotate(${angle}deg)`;
    line.style.zIndex = '0'; // behind nodes
    container.appendChild(line);
}


// Find node by value
function findNodeByValue(node, value) {
    if (!node) return null;
    if (node.value === value) return node;
    return findNodeByValue(node.left, value) || findNodeByValue(node.right, value);
}

// Animate traversal
async function animateTraversal(orderArray, label) {
    document.getElementById('traversalOutput').textContent = `${label}: ` + orderArray.join(', ');
    for (let val of orderArray) {
        const node = findNodeByValue(root, val);
        if (node && node.element) {
            node.element.style.backgroundColor = 'red';
            await sleep(500);
            node.element.style.backgroundColor = '#e8ffe8';
        }
    }
}

// Traversal functions
async function preOrder() {
    const result = [];
    traversePreOrder(root, result);
    await animateTraversal(result, 'Pre-Order');
}

async function inOrder() {
    const result = [];
    traverseInOrder(root, result);
    await animateTraversal(result, 'In-Order');
}

async function postOrder() {
    const result = [];
    traversePostOrder(root, result);
    await animateTraversal(result, 'Post-Order');
}

// Recursive traversals
function traversePreOrder(node, result) {
    if (!node) return;
    result.push(node.value);
    traversePreOrder(node.left, result);
    traversePreOrder(node.right, result);
}

function traverseInOrder(node, result) {
    if (!node) return;
    traverseInOrder(node.left, result);
    result.push(node.value);
    traverseInOrder(node.right, result);
}

function traversePostOrder(node, result) {
    if (!node) return;
    traversePostOrder(node.left, result);
    traversePostOrder(node.right, result);
    result.push(node.value);
}

// Sleep helper
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Clear tree
function clearTree() {
    root = null;
    document.getElementById('treeContainer').innerHTML = '';
    document.getElementById('traversalOutput').textContent = '';
}

