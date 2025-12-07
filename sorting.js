/* ================= Bubble Sort ================= */
const bubbleInput = document.getElementById('bubbleInput');
const bubbleSortBtn = document.getElementById('bubbleSortBtn');
const bubbleArrayContainer = document.getElementById('bubbleArrayContainer');
const bubbleOutput = document.getElementById('bubbleOutput'); // NEW OUTPUT ELEMENT
let bubbleArray = [];
const bubbleDelay = 120;

// Bubble Sort display
function displayBubbleArray(highlight = []) {
    bubbleArrayContainer.innerHTML = '';
    bubbleArray.forEach((value, idx) => {
        const bar = document.createElement('div');
        bar.classList.add('bar');
        bar.style.height = `${value * 3}px`;
        if (highlight.includes(idx)) bar.classList.add('active');

        const label = document.createElement('span');
        label.textContent = value;

        bar.appendChild(label);
        bubbleArrayContainer.appendChild(bar);
    });

    // Update output at the top
    bubbleOutput.textContent = 'Current Array: ' + bubbleArray.join(', ');
}

async function bubbleSortVisual() {
    let n = bubbleArray.length;
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            displayBubbleArray([j, j + 1]);
            await sleep(bubbleDelay);
            if (bubbleArray[j] > bubbleArray[j + 1]) {
                [bubbleArray[j], bubbleArray[j + 1]] = [bubbleArray[j + 1], bubbleArray[j]];
                displayBubbleArray([j, j + 1]);
                await sleep(bubbleDelay);
            }
        }
    }
    displayBubbleArray();
}

bubbleSortBtn.addEventListener('click', () => {
    const values = bubbleInput.value.split(',').map(n => parseInt(n.trim())).filter(n => !isNaN(n));
    if (values.length === 0) {
        alert('Enter valid integers separated by commas.');
        return;
    }
    bubbleArray = values;
    displayBubbleArray();
    bubbleSortVisual();
});

/* ================= Quick Sort ================= */
const quickInput = document.getElementById('quickInput');
const quickSortBtn = document.getElementById('quickSortBtn');
const quickArrayContainer = document.getElementById('quickArrayContainer');
const quickOutput = document.getElementById('quickOutput'); // NEW OUTPUT ELEMENT
let quickArray = [];
const quickDelay = 120;

function displayQuickArray(highlight = [], pivotIndex = null) {
    quickArrayContainer.innerHTML = '';
    quickArray.forEach((value, idx) => {
        const bar = document.createElement('div');
        bar.classList.add('bar');
        bar.style.height = `${value * 3}px`;
        if (highlight.includes(idx)) bar.classList.add('active');
        if (idx === pivotIndex) bar.classList.add('pivot');

        const label = document.createElement('span');
        label.textContent = value;

        bar.appendChild(label);
        quickArrayContainer.appendChild(bar);
    });

    // Update output at the top
    quickOutput.textContent = 'Current Array: ' + quickArray.join(', ');
}

async function quickSortVisual(start = 0, end = quickArray.length - 1) {
    if (start >= end) return;

    let pivotIndex = await partition(start, end);
    await quickSortVisual(start, pivotIndex - 1);
    await quickSortVisual(pivotIndex + 1, end);
}

async function partition(start, end) {
    let pivotValue = quickArray[end];
    let i = start;

    displayQuickArray([], end);
    await sleep(quickDelay);

    for (let j = start; j < end; j++) {
        displayQuickArray([j, i], end);
        await sleep(quickDelay);
        if (quickArray[j] < pivotValue) {
            [quickArray[i], quickArray[j]] = [quickArray[j], quickArray[i]];
            i++;
            displayQuickArray([j, i], end);
            await sleep(quickDelay);
        }
    }

    [quickArray[i], quickArray[end]] = [quickArray[end], quickArray[i]];
    displayQuickArray([], i);
    await sleep(quickDelay);

    return i;
}

quickSortBtn.addEventListener('click', () => {
    const values = quickInput.value.split(',').map(n => parseInt(n.trim())).filter(n => !isNaN(n));
    if (values.length === 0) {
        alert('Enter valid integers separated by commas.');
        return;
    }
    quickArray = values;
    displayQuickArray();
    quickSortVisual();
});

/* ================= Helper ================= */
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

document.getElementById('sortAll').addEventListener('click', () => {
    bubbleSortBtn.click();
    quickSortBtn.click();
});

document.getElementById('bubbleQuickInput').addEventListener('input', (e) => {
    const value = e.target.value;
    bubbleInput.value = value;
    quickInput.value = value;
});

document.getElementById('clearAll').addEventListener('click', (e) => {
    bubbleArray = []; 
    quickArray = [];
    
});

/* ================= BINARY TREE TRAVERSAL ANIMATION ================= */



