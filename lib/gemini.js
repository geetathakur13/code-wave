const GEMINI_API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

// Try current-generation models first; fall back to older ones automatically.
// Older projects may only have access to 1.5; newer keys should hit 2.0-flash.
const GEMINI_MODELS = ['gemini-2.0-flash', 'gemini-1.5-flash'];
const geminiUrl = (model) =>
  `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`;

const STUDYBOT_SYSTEM = `You are StudyBot, an AI study assistant for RGPV engineering students studying CSE. Help with doubts about subjects including DSA, OS, DBMS, ML, Compiler Design, Computer Networks, AI, Web Technology, and more. Give concise, exam-focused answers. If asked about non-academic topics, politely redirect to academic help.`;

// --- Fallback responses ---------------------------------------------------
// Used when no API key is set or the API call fails. Ordered by specificity.
const FALLBACK_ENTRIES = [
  { keys: ['hello', 'hi ', 'hey', 'hii', 'namaste'], text: "Hello! I'm StudyBot, your AI study assistant for RGPV CSE subjects. Ask me anything about your coursework!" },
  { keys: ['binary search'], text: "Binary Search works on a sorted array by repeatedly halving the search range. Compare the target with the middle element; if smaller, search the left half, otherwise the right. Time complexity: O(log n), Space: O(1) iterative / O(log n) recursive." },
  { keys: ['linked list'], text: "A Linked List is a linear data structure where each node stores data and a pointer to the next node. Types: singly, doubly, circular. Insertion/deletion at head is O(1); access by index is O(n)." },
  { keys: ['tree', 'binary tree', 'bst'], text: "A Binary Search Tree (BST) is a tree where each node's left subtree contains smaller values and right subtree contains larger. Search/insert/delete are O(log n) average, O(n) worst (unbalanced). AVL and Red-Black trees keep it balanced." },
  { keys: ['graph', 'bfs', 'dfs'], text: "Graphs are collections of nodes (vertices) connected by edges. BFS uses a queue and explores level-by-level (shortest path in unweighted graphs). DFS uses a stack/recursion and goes deep first. Both are O(V+E)." },
  { keys: ['dynamic programming', 'dp', 'memoization'], text: "Dynamic Programming solves problems by breaking them into overlapping subproblems and storing results (memoization or tabulation). Classic examples: Fibonacci, Knapsack, LCS, Matrix Chain Multiplication." },
  { keys: ['sort', 'sorting', 'quick sort', 'merge sort'], text: "Common sorting algorithms:\n• Bubble/Selection/Insertion — O(n²), simple\n• Merge Sort — O(n log n), stable, O(n) space\n• Quick Sort — O(n log n) average, O(n²) worst, in-place\n• Heap Sort — O(n log n), in-place, not stable" },
  { keys: ['data structure', 'dsa'], text: "Data Structures & Algorithms is fundamental to CSE. Key topics: arrays, linked lists, stacks, queues, trees, graphs, hashing, sorting, searching, and dynamic programming. Which topic would you like to explore?" },

  { keys: ['deadlock'], text: "A Deadlock occurs when processes are blocked waiting for each other's resources. The 4 Coffman conditions must hold: Mutual Exclusion, Hold & Wait, No Preemption, Circular Wait. Handling: Prevention, Avoidance (Banker's Algorithm), Detection & Recovery, or Ignore (Ostrich)." },
  { keys: ['semaphore', 'mutex', 'synchron'], text: "Semaphores are synchronization primitives with wait(P) and signal(V) operations. Binary semaphore = mutex (0 or 1). Counting semaphore allows multiple accesses. Used to solve producer-consumer, reader-writer, and dining philosophers problems." },
  { keys: ['scheduling', 'fcfs', 'sjf', 'round robin'], text: "CPU Scheduling algorithms:\n• FCFS — simple, high avg wait time\n• SJF — optimal avg wait but starvation\n• Round Robin — fair, uses time quantum\n• Priority — may cause starvation\n• Multilevel Queue — separate queues per priority" },
  { keys: ['paging', 'virtual memory', 'page fault'], text: "Virtual Memory uses paging to give each process its own address space. Pages are loaded on demand; a page fault triggers loading from disk. Replacement algorithms: FIFO, LRU, Optimal, Clock. TLB caches recent translations." },
  { keys: ['operating system', ' os ', 'os?'], text: "Operating Systems covers process management, memory management, file systems, and synchronization. Key exam topics: deadlocks, scheduling, paging, virtual memory, and synchronization primitives." },

  { keys: ['normaliz', '1nf', '2nf', '3nf', 'bcnf'], text: "Normalization reduces redundancy in databases:\n• 1NF — atomic values, no repeating groups\n• 2NF — 1NF + no partial dependency on composite key\n• 3NF — 2NF + no transitive dependency\n• BCNF — every determinant is a candidate key" },
  { keys: ['acid', 'transaction'], text: "ACID properties of database transactions:\n• Atomicity — all or nothing\n• Consistency — DB remains valid\n• Isolation — concurrent txns don't interfere\n• Durability — committed changes persist after crashes" },
  { keys: ['sql', 'join'], text: "SQL JOINs combine rows from multiple tables:\n• INNER JOIN — only matching rows\n• LEFT/RIGHT JOIN — all from one side + matches\n• FULL OUTER — all from both sides\n• CROSS JOIN — Cartesian product" },
  { keys: ['database', 'dbms'], text: "DBMS topics: ER modeling, relational algebra, normalization (1NF-BCNF), SQL, transactions (ACID), indexing (B-trees, hashing), and concurrency control. Which area do you need help with?" },

  { keys: ['machine learning', ' ml ', 'ml?', 'supervised', 'unsupervised'], text: "Machine Learning has 3 main paradigms:\n• Supervised — labeled data (regression, classification)\n• Unsupervised — unlabeled data (clustering, dimensionality reduction)\n• Reinforcement — learn via rewards\nKey algorithms: Linear/Logistic Regression, Decision Trees, SVM, k-NN, k-Means, Neural Networks." },
  { keys: ['gradient descent'], text: "Gradient Descent is an optimization algorithm that minimizes a loss function by iteratively moving in the direction of the negative gradient. Variants: Batch GD (all data), Stochastic GD (one sample), Mini-batch GD. Learning rate controls step size." },
  { keys: ['neural network', 'deep learning', 'cnn', 'rnn'], text: "Neural Networks are layers of interconnected neurons with weights and activations (ReLU, sigmoid, tanh). Trained via backpropagation + gradient descent. CNNs excel at images (convolution + pooling), RNNs/LSTMs at sequences." },

  { keys: ['tcp', 'udp'], text: "TCP vs UDP:\n• TCP — connection-oriented, reliable, ordered, flow/congestion control (used by HTTP, FTP, SMTP)\n• UDP — connectionless, unreliable, low-overhead, faster (used by DNS, VoIP, streaming)" },
  { keys: ['osi', 'tcp/ip model'], text: "The OSI model has 7 layers: Physical, Data Link, Network, Transport, Session, Presentation, Application. TCP/IP model combines them into 4: Link, Internet, Transport, Application." },
  { keys: ['subnet', 'cidr', 'ip address'], text: "Subnetting divides a network into smaller subnets using a subnet mask. CIDR notation (e.g., 192.168.1.0/24) means the first 24 bits are the network portion. IPv4 has 32 bits, IPv6 has 128 bits." },
  { keys: ['network', 'routing'], text: "Computer Networks covers the OSI model, TCP/IP, routing (RIP, OSPF, BGP), subnetting, and application protocols (HTTP, DNS, SMTP). Which area do you want to discuss?" },

  { keys: ['compiler', 'lexical', 'parser', 'syntax analysis'], text: "Compiler phases: Lexical Analysis (tokens) → Syntax Analysis (parse tree) → Semantic Analysis → Intermediate Code → Optimization → Code Generation. Parsing techniques: Top-down (Recursive Descent, LL) and Bottom-up (LR, SLR, LALR)." },
];

const FALLBACK_DEFAULT = "I'm StudyBot! I can help you with CSE subjects like DSA, OS, DBMS, Computer Networks, ML, Compiler Design, and more. What topic would you like to explore?";

function getFallbackResponse(message) {
  const lower = ' ' + (message || '').toLowerCase() + ' ';
  for (const entry of FALLBACK_ENTRIES) {
    if (entry.keys.some(k => lower.includes(k))) return entry.text;
  }
  return FALLBACK_DEFAULT;
}
// --------------------------------------------------------------------------

async function callGemini(body) {
  let lastErr;
  for (const model of GEMINI_MODELS) {
    try {
      const res = await fetch(`${geminiUrl(model)}?key=${GEMINI_API_KEY}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      if (res.ok) return await res.json();
      // 404 = model not found for this key; try next one.
      if (res.status !== 404 && res.status !== 400) {
        lastErr = new Error(`Gemini API error ${res.status}`);
        break;
      }
      lastErr = new Error(`Gemini model ${model} unavailable (${res.status})`);
    } catch (e) {
      lastErr = e;
    }
  }
  throw lastErr || new Error('Gemini API failed');
}

export async function chatWithGemini(message, history = []) {
  if (!GEMINI_API_KEY) {
    return getFallbackResponse(message);
  }

  try {
    const contents = [
      { role: 'user', parts: [{ text: STUDYBOT_SYSTEM }] },
      { role: 'model', parts: [{ text: 'Understood. I am StudyBot, ready to help RGPV CSE students.' }] },
      ...history.map(h => ({ role: h.role, parts: [{ text: h.text }] })),
      { role: 'user', parts: [{ text: message }] },
    ];

    const data = await callGemini({ contents });
    return data?.candidates?.[0]?.content?.parts?.[0]?.text || getFallbackResponse(message);
  } catch (e) {
    console.warn('[StudyHouse] chatWithGemini failed, using fallback:', e.message);
    return getFallbackResponse(message);
  }
}

export async function generateQuiz(topic, count = 5) {
  if (!GEMINI_API_KEY) return null;

  try {
    const prompt = `Generate ${count} multiple choice questions about ${topic} for engineering students. Return ONLY a valid JSON array with no other text. Each object must have: "q" (question string), "options" (array of exactly 4 strings), "answer" (integer index 0-3 of correct option).`;

    const data = await callGemini({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
    });
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
    const jsonMatch = text.match(/\[[\s\S]*\]/);
    if (jsonMatch) return JSON.parse(jsonMatch[0]);
    return null;
  } catch (e) {
    console.warn('[StudyHouse] generateQuiz failed:', e.message);
    return null;
  }
}
