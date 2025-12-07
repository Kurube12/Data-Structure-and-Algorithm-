/* ================= STACK ================== */
let stack = [];

function updateStackOutput() {
    const output = document.getElementById("stackOutputBox");
    if (stack.length === 0) {
        output.textContent = "Stack is empty.";
    } else {
        output.textContent =
            "Stack: " + stack.join(", ") +
            "\nTop Element: " + stack[stack.length - 1];
    }
}

function pushNumber() {
    const input = document.getElementById("stack-numbers").value.trim();
    if (input === "") return alert("Enter a number.");
    const num = Number(input);
    if (isNaN(num)) return alert("Invalid number.");

    stack.push(num);
    document.getElementById("stack-numbers").value = "";
    updateStackOutput();
}

function popNumber() {
    if (stack.length === 0) return alert("Stack empty.");
    stack.pop();
    updateStackOutput();
}

/* ================= QUEUE ================== */

let queue = [];

function updateQueueOutput() {
    const output = document.getElementById("queueOutputBox");
    if (queue.length === 0) {
        output.textContent = "Queue is empty.";
    } else {
        output.textContent =
            "Queue: " + queue.join(", ") +
            "\nFront: " + queue[0] +
            "\nRear: " + queue[queue.length - 1];
    }
}

function enqueueNumber() {
    const input = document.getElementById("queue-numbers").value.trim();
    if (input === "") return alert("Enter a number.");

    const num = Number(input);
    if (isNaN(num)) return alert("Invalid number.");

    queue.push(num);
    document.getElementById("queue-numbers").value = "";
    updateQueueOutput();
}

function dequeueNumber() {
    if (queue.length === 0) return alert("Queue empty.");
    queue.shift();
    updateQueueOutput();
}

/* ================= BINARY TREE ================== */

class TreeNode {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
        this.x = 0;
        this.y = 0;
    }
}

let treeRoot = null;

function addTreeNode() {
    const input = document.getElementById("treeNodeInput");
    const value = input.value.trim();
    if (!value) return;

    treeRoot = insertTreeNode(treeRoot, Number(value));
    layoutTreeNodes(treeRoot, 0, 600, 40, 90);
    visualizeTreeNodes();
    input.value = "";
}

document.getElementById("treeNodeInput").addEventListener("keyup", e => {
    if (e.key === "Enter") addTreeNode();
});

function insertTreeNode(node, value) {
    if (!node) return new TreeNode(value);
    if (value < node.value) node.left = insertTreeNode(node.left, value);
    else node.right = insertTreeNode(node.right, value);
    return node;
}

function layoutTreeNodes(node, minX, maxX, y, spacing) {
    if (!node) return;
    node.y = y;

    if (!node.left && !node.right) {
        node.x = (minX + maxX) / 2;
        return;
    }

    if (node.left) layoutTreeNodes(node.left, minX, (minX + maxX) / 2, y + spacing, spacing);
    if (node.right) layoutTreeNodes(node.right, (minX + maxX) / 2, maxX, y + spacing, spacing);

    node.x = node.left && node.right
        ? (node.left.x + node.right.x) / 2
        : node.left ? node.left.x : node.right.x;
}

function visualizeTreeNodes() {
    const container = document.getElementById("treeContainer");
    container.innerHTML = "";
    drawTreeNode(treeRoot, container);
}

function drawTreeNode(node, container) {
    if (!node) return;

    const element = document.createElement("div");
    element.className = "node";
    element.style.left = node.x + "px";
    element.style.top = node.y + "px";
    element.style.position = "absolute";
    element.textContent = node.value;
    container.appendChild(element);

    if (node.left) {
        drawTreeLine(container, node.x + 30, node.y + 30, node.left.x + 30, node.left.y + 30);
        drawTreeNode(node.left, container);
    }
    if (node.right) {
        drawTreeLine(container, node.x + 30, node.y + 30, node.right.x + 30, node.right.y + 30);
        drawTreeNode(node.right, container);
    }
}

function drawTreeLine(container, x1, y1, x2, y2) {
    const line = document.createElement("div");
    const length = Math.hypot(x2 - x1, y2 - y1);
    const angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;

    line.style.position = "absolute";
    line.style.width = length + "px";
    line.style.height = "2px";
    line.style.left = x1 + "px";
    line.style.top = y1 + "px";
    line.style.transformOrigin = "0 0";
    line.style.transform = `rotate(${angle}deg)`;
    line.style.background = "#000";

    container.appendChild(line);
}

function clearTree() {
    treeRoot = null;
    document.getElementById("treeContainer").innerHTML = "";
}

/* ================= GRAPH ================== */

let graphRoot = null;

function addGraphNode() {
    const input = document.getElementById("graphInput");
    const value = input.value.trim();
    if (!value) return;

    graphRoot = insertGraphNode(graphRoot, Number(value));
    layoutGraphNodes(graphRoot, 0, 600, 40, 90);
    visualizeGraphNodes();
    input.value = "";
}

function insertGraphNode(node, value) {
    if (!node) return new TreeNode(value);
    if (value < node.value) node.left = insertGraphNode(node.left, value);
    else node.right = insertGraphNode(node.right, value);
    return node;
}

function layoutGraphNodes(node, minX, maxX, y, spacing) {
    if (!node) return;
    node.y = y;

    if (!node.left && !node.right) {
        node.x = (minX + maxX) / 2;
        return;
    }

    if (node.left) layoutGraphNodes(node.left, minX, (minX + maxX) / 2, y + spacing, spacing);
    if (node.right) layoutGraphNodes(node.right, (minX + maxX) / 2, maxX, y + spacing, spacing);

    node.x = node.left && node.right
        ? (node.left.x + node.right.x) / 2
        : node.left ? node.left.x : node.right.x;
}

function visualizeGraphNodes() {
    const container = document.getElementById("graphContainer");
    container.innerHTML = "";
    drawGraphNode(graphRoot, container);
}

function drawGraphNode(node, container) {
    if (!node) return;

    const element = document.createElement("div");
    element.className = "node";
    element.style.left = node.x + "px";
    element.style.top = node.y + "px";
    element.style.position = "absolute";
    element.textContent = node.value;
    container.appendChild(element);

    if (node.left) {
        drawGraphLine(container, node.x + 30, node.y + 30, node.left.x + 30, node.left.y + 30);
        drawGraphNode(node.left, container);
    }
    if (node.right) {
        drawGraphLine(container, node.x + 30, node.y + 30, node.right.x + 30, node.right.y + 30);
        drawGraphNode(node.right, container);
    }
}

function drawGraphLine(container, x1, y1, x2, y2) {
    const line = document.createElement("div");
    const length = Math.hypot(x2 - x1, y2 - y1);
    const angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;

    line.style.position = "absolute";
    line.style.width = length + "px";
    line.style.height = "2px";
    line.style.left = x1 + "px";
    line.style.top = y1 + "px";
    line.style.transformOrigin = "0 0";
    line.style.transform = `rotate(${angle}deg)`;
    line.style.background = "#000";

    container.appendChild(line);
}

function clearGraph() {
    graphRoot = null;
    document.getElementById("graphContainer").innerHTML = "";
}

/* ================= ALL INPUT CONTROLLER ================== */

document.addEventListener("DOMContentLoaded", () => {
    const allInputField = document.getElementById("allInputField");
    const allInputBtn = document.getElementById("allInputBtn");
    const allDeleteBtn = document.getElementById("allDeleteBtn");

    allInputField.addEventListener("input", e => {
        const value = e.target.value.trim();
        document.getElementById("stack-numbers").value = value;
        document.getElementById("queue-numbers").value = value;
        document.getElementById("treeNodeInput").value = value;
        document.getElementById("graphInput").value = value;
    });

    allInputBtn.addEventListener("click", () => {
        pushNumber();
        enqueueNumber();
        addTreeNode();
        addGraphNode();
        allInputField.value = "";
    });

    allDeleteBtn.addEventListener("click", () => {
        popNumber();
        dequeueNumber();
        clearTree();
        clearGraph();
    });
});
