// ===== State =====
let currentMode = 'explain';
let spinInt;

// ===== Snippet Library =====
const snippets = {
  binary: `def binary_search(arr, target):
    left, right = 0, len(arr) - 1
    while left <= right:
        mid = (left + right) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    return -1

# Example usage
arr = [1, 3, 5, 7, 9, 11, 13]
print(binary_search(arr, 7))  # Output: 3`,

  fib: `def fibonacci(n, memo={}):
    if n in memo:
        return memo[n]
    if n <= 1:
        return n
    memo[n] = fibonacci(n-1, memo) + fibonacci(n-2, memo)
    return memo[n]

for i in range(10):
    print(f"fib({i}) = {fibonacci(i)}")`,

  bubble: `def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        swapped = False
        for j in range(0, n-i-1):
            if arr[j] > arr[j+1]:
                arr[j], arr[j+1] = arr[j+1], arr[j]
                swapped = True
        if not swapped:
            break
    return arr

data = [64, 34, 25, 12, 22, 11, 90]
print(bubble_sort(data))`,

  linked: `class Node:
    def __init__(self, data):
        self.data = data
        self.next = None

class LinkedList:
    def __init__(self):
        self.head = None

    def append(self, data):
        new_node = Node(data)
        if not self.head:
            self.head = new_node
            return
        current = self.head
        while current.next:
            current = current.next
        current.next = new_node

    def display(self):
        elements = []
        current = self.head
        while current:
            elements.append(current.data)
            current = current.next
        return ' -> '.join(map(str, elements))`
};

// ===== Snippet Loader =====
function loadSnippet(key) {
  document.getElementById('code-input').value = snippets[key];
  document.getElementById('lang').value = 'python';
  updateCounter();
}

// ===== Counter =====
function updateCounter() {
  const lines = document.getElementById('code-input').value.split('\n').length;
  document.getElementById('counter').textContent = lines + ' line' + (lines === 1 ? '' : 's');
}

// ===== Mode Toggle =====
function setMode(mode) {
  currentMode = mode;
  document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('active'));
  document.getElementById('mode-' + mode).classList.add('active');
}

// ===== Loading State =====
const spinMsgs = {
  explain:  ['Reading your code…', 'Tracing execution flow…', 'Identifying patterns…', 'Writing explanation…'],
  debug:    ['Scanning for issues…', 'Checking logic…', 'Finding bugs…'],
  optimize: ['Analysing complexity…', 'Finding bottlenecks…', 'Generating suggestions…']
};

function startLoading() {
  document.getElementById('empty-state').style.display = 'none';
  document.getElementById('result-area').style.display = 'none';
  document.getElementById('error-banner').style.display = 'none';
  const ls = document.getElementById('loading-state');
  ls.classList.add('show');
  let i = 0;
  const msgs = spinMsgs[currentMode] || spinMsgs.explain;
  const el = document.getElementById('spin-txt');
  el.textContent = msgs[0];
  spinInt = setInterval(() => { i = (i + 1) % msgs.length; el.textContent = msgs[i]; }, 1300);
  document.getElementById('out-dot').className = 'out-dot';
  document.getElementById('out-status').textContent = 'Analyzing…';
}

function stopLoading() {
  clearInterval(spinInt);
  document.getElementById('loading-state').classList.remove('show');
}

// ===== Prompts =====
const prompts = {
  explain: (code, lang) => `You are an expert programming teacher. Explain this ${lang} code clearly.

Code:
\`\`\`
${code}
\`\`\`

Return ONLY valid JSON with no markdown or code fences:
{"language":"detected language","title":"what this code does in 5 words","complexity":"easy|medium|hard","overview":"2-3 sentence overview of what this code does","steps":["step 1 description","step 2 description","step 3 description","step 4 description"],"concepts":["key concept 1","key concept 2","key concept 3"],"time_complexity":"O(?) with explanation","space_complexity":"O(?) with explanation"}`,

  debug: (code, lang) => `You are an expert debugger. Analyze this ${lang} code for bugs, errors, and issues.

Code:
\`\`\`
${code}
\`\`\`

Return ONLY valid JSON:
{"language":"detected language","has_bugs":true|false,"issues":["issue 1 with line reference","issue 2"],"fixes":["how to fix issue 1","how to fix issue 2"],"corrected_snippet":"the key corrected line(s) as a string","suggestions":["best practice suggestion 1","suggestion 2"]}`,

  optimize: (code, lang) => `You are a performance expert. Analyze this ${lang} code for optimization opportunities.

Code:
\`\`\`
${code}
\`\`\`

Return ONLY valid JSON:
{"language":"detected language","current_complexity":"O(?) description","optimized_complexity":"O(?) description","bottlenecks":["bottleneck 1","bottleneck 2"],"optimizations":["optimization 1","optimization 2","optimization 3"],"optimized_snippet":"key improved code as a string (short)","gains":"expected performance gain description"}`
};

// ===== Renderers =====
function renderExplain(d) {
  const compCls = d.complexity === 'easy' ? 'easy' : d.complexity === 'hard' ? 'hard' : 'medium';
  return `
    <div class="result-block">
      <div class="block-title"><span>📋</span> Overview</div>
      <div class="complexity-badge ${compCls}">Complexity: ${(d.complexity || 'medium').toUpperCase()}</div>
      <div class="block-body">${d.overview || ''}</div>
      <div class="tag-row">${(d.concepts || []).map(c => `<span class="tag">${c}</span>`).join('')}</div>
    </div>
    <div class="result-block">
      <div class="block-title"><span>🔢</span> Step-by-Step Walkthrough</div>
      ${(d.steps || []).map((s, i) => `<div class="step"><div class="step-num">${i + 1}</div><div class="step-text">${s}</div></div>`).join('')}
    </div>
    <div class="result-block">
      <div class="block-title"><span>⚡</span> Complexity Analysis</div>
      <div class="block-body"><strong>Time:</strong> <code>${d.time_complexity || '—'}</code><br><br><strong>Space:</strong> <code>${d.space_complexity || '—'}</code></div>
    </div>`;
}

function renderDebug(d) {
  return `
    <div class="result-block">
      <div class="block-title"><span>${d.has_bugs ? '🐛' : '✅'}</span> ${d.has_bugs ? 'Issues Found' : 'No Critical Bugs'}</div>
      ${(d.issues || []).map(s => `<div class="step"><div class="step-num" style="background:rgba(248,81,73,0.15);color:var(--red)">!</div><div class="step-text">${s}</div></div>`).join('')}
    </div>
    <div class="result-block">
      <div class="block-title"><span>🔧</span> Fixes</div>
      ${(d.fixes || []).map(s => `<div class="step"><div class="step-num" style="background:rgba(63,185,80,0.15);color:var(--green)">✓</div><div class="step-text">${s}</div></div>`).join('')}
    </div>
    ${d.corrected_snippet ? `<div class="result-block"><div class="block-title"><span>📝</span> Corrected Code</div><div class="block-body"><code>${escHtml(d.corrected_snippet)}</code></div></div>` : ''}
    <div class="result-block">
      <div class="block-title"><span>💡</span> Best Practices</div>
      ${(d.suggestions || []).map(s => `<div class="step"><div class="step-num" style="background:rgba(188,140,255,0.15);color:var(--purple)">★</div><div class="step-text">${s}</div></div>`).join('')}
    </div>`;
}

function renderOptimize(d) {
  return `
    <div class="result-block">
      <div class="block-title"><span>📊</span> Complexity Comparison</div>
      <div class="block-body"><strong>Current:</strong> <code>${d.current_complexity || '—'}</code><br><br><strong>Optimized:</strong> <code>${d.optimized_complexity || '—'}</code><br><br>${d.gains || ''}</div>
    </div>
    <div class="result-block">
      <div class="block-title"><span>⚠️</span> Bottlenecks</div>
      ${(d.bottlenecks || []).map(s => `<div class="step"><div class="step-num" style="background:rgba(210,153,34,0.15);color:var(--yellow)">▲</div><div class="step-text">${s}</div></div>`).join('')}
    </div>
    <div class="result-block">
      <div class="block-title"><span>🚀</span> Optimizations</div>
      ${(d.optimizations || []).map(s => `<div class="step"><div class="step-num" style="background:rgba(88,166,255,0.15);color:var(--accent)">→</div><div class="step-text">${s}</div></div>`).join('')}
    </div>
    ${d.optimized_snippet ? `<div class="result-block"><div class="block-title"><span>💻</span> Improved Code</div><div class="block-body"><code>${escHtml(d.optimized_snippet)}</code></div></div>` : ''}`;
}

// ===== Helpers =====
function escHtml(s) {
  return (s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// ===== Main API Call =====
async function explain() {
  const code = document.getElementById('code-input').value.trim();
  if (!code) return;
  const lang = document.getElementById('lang').value;
  document.getElementById('explain-btn').disabled = true;
  startLoading();

  try {
    const res = await fetch('/api/explain', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1000,
        messages: [{ role: 'user', content: prompts[currentMode](code.slice(0, 2500), lang) }]
      })
    });

    const data = await res.json();
    if (data.error) throw new Error(data.error.message);

    let raw = '';
    for (const b of (data.content || [])) if (b.type === 'text') raw += b.text;
    raw = raw.replace(/```json|```/gi, '').trim();

    const s = raw.indexOf('{'), e = raw.lastIndexOf('}');
    if (s < 0 || e < 0) throw new Error('Invalid JSON response');
    const parsed = JSON.parse(raw.slice(s, e + 1));

    stopLoading();
    const ra = document.getElementById('result-area');
    ra.innerHTML = currentMode === 'explain'
      ? renderExplain(parsed)
      : currentMode === 'debug'
        ? renderDebug(parsed)
        : renderOptimize(parsed);
    ra.style.display = 'block';
    document.getElementById('out-dot').className = 'out-dot active';
    document.getElementById('out-status').textContent = `${parsed.language || lang} · ${currentMode} complete`;

  } catch (err) {
    stopLoading();
    const eb = document.getElementById('error-banner');
    eb.textContent = '⚠ ' + err.message;
    eb.style.display = 'block';
    document.getElementById('out-status').textContent = 'Error';
  }

  document.getElementById('explain-btn').disabled = false;
}
