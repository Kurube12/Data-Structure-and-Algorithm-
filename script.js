/* ================= STACK ================== */
let stack = [];

function updateOutput() {
    const output = document.getElementById("stackOutputBox");
    if (stack.length === 0) {
        output.textContent = "Stack is empty.";
    } else {
        output.textContent = "Stack: " + stack.join(", ") +
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
    updateOutput();
}

function popNumber() {
    if (stack.length === 0) return alert("Stack empty.");
    stack.pop();
    updateOutput();
}

/* ================= QUEUE ================== */
let queue = [];

function updateQueueOutput() {
    const output = document.getElementById("queueOutputBox");
    if (queue.length === 0) {
        output.textContent = "Queue is empty.";
    } else {
        output.textContent = "Queue: " + queue.join(", ") +
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
let root = null;

function addNode() {
    const input = document.getElementById("nodeInput");
    const value = input.value.trim();
    if (!value) return;

    root = insertNode(root, Number(value));
    layoutTree(root, 0, 600, 40, 90);
    visualizeTree();
    input.value = "";
}

function insertNode(node, value) {
    if (!node) return new TreeNode(value);
    if (value < node.value) node.left = insertNode(node.left, value);
    else node.right = insertNode(node.right, value);
    return node;
}

function layoutTree(node, minX, maxX, y, spacing) {
    if (!node) return;
    node.y = y;

    if (!node.left && !node.right) {
        node.x = (minX + maxX) / 2;
        return;
    }

    if (node.left) layoutTree(node.left, minX, (minX + maxX) / 2, y + spacing, spacing);
    if (node.right) layoutTree(node.right, (minX + maxX) / 2, maxX, y + spacing, spacing);

    node.x = node.left && node.right ? (node.left.x + node.right.x) / 2 :
        node.left ? node.left.x : node.right.x;
}

function visualizeTree() {
    const container = document.getElementById("treeContainer");
    container.innerHTML = "";
    drawNode(root, container);
}

function drawNode(node, container) {
    if (!node) return;

    const element = document.createElement("div");
    element.className = "node";
    element.style.position = "absolute";
    element.style.left = node.x + "px";
    element.style.top = node.y + "px";
    element.textContent = node.value;
    container.appendChild(element);

    if (node.left) {
        drawLine(container, node.x + 30, node.y + 30, node.left.x + 30, node.left.y + 30);
        drawNode(node.left, container);
    }
    if (node.right) {
        drawLine(container, node.x + 30, node.y + 30, node.right.x + 30, node.right.y + 30);
        drawNode(node.right, container);
    }
}

function drawLine(container, x1, y1, x2, y2) {
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

function clearBtn() {
    root = null;
    document.getElementById("treeContainer").innerHTML = "";
}

/* ================= ALL INPUT FIELD ================== */
document.addEventListener("DOMContentLoaded", () => {
    const allInputField = document.getElementById("allInputField");
    const allInputBtn = document.getElementById("allInputBtn");
    const allDeleteBtn = document.getElementById("allDeleteBtn");

    allInputField.addEventListener("input", (e) => {
        const value = e.target.value.trim();
        document.getElementById("stack-numbers").value = value;
        document.getElementById("queue-numbers").value = value;
        document.getElementById("nodeInput").value = value;
    });

    allInputBtn.addEventListener("click", () => {
        pushNumber();
        enqueueNumber();
        addNode();

        allInputField.value = "";
    });

    allDeleteBtn.addEventListener("click", () => {
        popNumber();
        dequeueNumber();
        clearBtn();
    });
});
