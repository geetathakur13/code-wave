// ============================================================
// STUDYHOUSE — Complete Subject, Quiz & Flashcard Data
// University: RGPV (Rajiv Gandhi Proudyogiki Vishwavidyalaya)
// Branch: CSE & Allied
// ============================================================

export const semesters = [
  { id: 1, name: 'Semester 1', label: 'First Year — Common', active: true },
  { id: 2, name: 'Semester 2', label: 'First Year — Common', active: true },
  { id: 3, name: 'Semester 3', label: 'CSE Core', active: true },
  { id: 4, name: 'Semester 4', label: 'CSE Core', active: true },
  { id: 5, name: 'Semester 5', label: 'Core + Specialization', active: true },
  { id: 6, name: 'Semester 6', label: 'Core + Specialization', active: true },
  { id: 7, name: 'Semester 7', label: 'Advanced', active: true },
  { id: 8, name: 'Semester 8', label: 'Project & Internship', active: true },
];

export const subjects = [
  // ---- SEMESTER 1 ----
  {
    slug: 'engineering-chemistry',
    name: 'Engineering Chemistry',
    semester: 1,
    code: 'BT-101',
    description: 'Fundamentals of chemistry applied to engineering including electrochemistry, polymers, and water treatment.',
    units: [
      { id: 1, name: 'Electrochemistry & Batteries', topics: ['Electrochemical cells', 'Nernst equation', 'Batteries & fuel cells', 'Corrosion and protection'] },
      { id: 2, name: 'Water Treatment', topics: ['Hardness of water', 'Softening methods', 'Desalination', 'Boiler problems'] },
      { id: 3, name: 'Polymers', topics: ['Classification of polymers', 'Polymerization methods', 'Plastics and rubber', 'Conducting polymers'] },
      { id: 4, name: 'Spectroscopy', topics: ['UV-Vis spectroscopy', 'IR spectroscopy', 'NMR basics', 'Applications'] },
      { id: 5, name: 'Engineering Materials', topics: ['Cement and concrete', 'Lubricants', 'Fuels and combustion', 'Nanomaterials'] },
    ],
  },
  {
    slug: 'mathematics-1',
    name: 'Mathematics-I',
    semester: 1,
    code: 'BT-102',
    description: 'Calculus, matrices, and ordinary differential equations for engineers.',
    units: [
      { id: 1, name: 'Matrices', topics: ['Rank of matrix', 'Eigen values & vectors', 'Cayley-Hamilton theorem', 'Diagonalization'] },
      { id: 2, name: 'Differential Calculus', topics: ['Successive differentiation', "Leibnitz's theorem", "Taylor's & Maclaurin's series", 'Curvature'] },
      { id: 3, name: 'Integral Calculus', topics: ['Beta & Gamma functions', 'Double integrals', 'Triple integrals', 'Applications of integration'] },
      { id: 4, name: 'Differential Equations', topics: ['First-order ODE', 'Higher-order linear ODE', 'Method of variation of parameters', "Cauchy-Euler equation"] },
      { id: 5, name: 'Vector Calculus', topics: ['Gradient, divergence, curl', 'Line integrals', "Green's theorem", "Stokes' theorem"] },
    ],
  },
  {
    slug: 'basic-electrical-electronics',
    name: 'Basic Electrical & Electronics Engineering',
    semester: 1,
    code: 'BT-103',
    description: 'Fundamentals of electrical circuits, machines, and basic electronics.',
    units: [
      { id: 1, name: 'DC Circuits', topics: ['KVL and KCL', 'Network theorems', 'Superposition theorem', 'Thevenin & Norton'] },
      { id: 2, name: 'AC Circuits', topics: ['Phasor representation', 'RLC circuits', 'Power factor', 'Resonance'] },
      { id: 3, name: 'Transformers & Machines', topics: ['Single-phase transformer', 'DC motors', 'Induction motors', 'Working principles'] },
      { id: 4, name: 'Semiconductor Devices', topics: ['PN junction diode', 'Zener diode', 'BJT', 'FET basics'] },
      { id: 5, name: 'Digital Electronics Intro', topics: ['Number systems', 'Logic gates', 'Boolean algebra', 'Combinational circuits'] },
    ],
  },
  {
    slug: 'engineering-graphics',
    name: 'Engineering Graphics',
    semester: 1,
    code: 'BT-104',
    description: 'Technical drawing including projections, sections, and CAD basics.',
    units: [
      { id: 1, name: 'Projection of Points & Lines', topics: ['First angle projection', 'Third angle projection', 'Projection of lines', 'True length & inclination'] },
      { id: 2, name: 'Projection of Planes', topics: ['Plane perpendicular to HP', 'Plane perpendicular to VP', 'Oblique planes', 'Traces'] },
      { id: 3, name: 'Projection of Solids', topics: ['Prisms and pyramids', 'Cylinders and cones', 'Axis inclined to planes', 'Section of solids'] },
      { id: 4, name: 'Isometric Projection', topics: ['Isometric scale', 'Isometric view', 'Isometric projection of solids', 'Conversion methods'] },
      { id: 5, name: 'CAD Basics', topics: ['Introduction to AutoCAD', '2D drawing commands', 'Dimensioning', 'Layer management'] },
    ],
  },
  {
    slug: 'manufacturing-practices',
    name: 'Manufacturing Practices',
    semester: 1,
    code: 'BT-105',
    description: 'Overview of manufacturing processes including casting, welding, and machining.',
    units: [
      { id: 1, name: 'Casting', topics: ['Sand casting', 'Pattern making', 'Moulding processes', 'Casting defects'] },
      { id: 2, name: 'Welding', topics: ['Arc welding', 'Gas welding', 'Resistance welding', 'Welding defects'] },
      { id: 3, name: 'Machining', topics: ['Lathe operations', 'Drilling', 'Milling', 'Grinding'] },
      { id: 4, name: 'Fitting & Sheet Metal', topics: ['Fitting tools', 'Sheet metal operations', 'Bending & forming', 'Soldering & brazing'] },
      { id: 5, name: 'Carpentry & Smithy', topics: ['Wood working tools', 'Joints in carpentry', 'Forging operations', 'Smith tools'] },
    ],
  },

  // ---- SEMESTER 2 ----
  {
    slug: 'engineering-physics',
    name: 'Engineering Physics',
    semester: 2,
    code: 'BT-201',
    description: 'Applied physics including optics, quantum mechanics, and semiconductor physics.',
    units: [
      { id: 1, name: 'Optics', topics: ['Interference', 'Diffraction', 'Polarization', 'Laser fundamentals'] },
      { id: 2, name: 'Quantum Mechanics', topics: ['Wave-particle duality', "De Broglie hypothesis", "Schrödinger equation", 'Uncertainty principle'] },
      { id: 3, name: 'Solid State Physics', topics: ['Crystal structure', 'X-ray diffraction', 'Band theory', 'Semiconductors'] },
      { id: 4, name: 'Electromagnetic Theory', topics: ["Maxwell's equations", 'EM wave propagation', 'Poynting vector', 'Wave guides'] },
      { id: 5, name: 'Nanotechnology', topics: ['Nanoscale physics', 'Carbon nanotubes', 'Quantum dots', 'Applications'] },
    ],
  },
  {
    slug: 'mathematics-2',
    name: 'Mathematics-II',
    semester: 2,
    code: 'BT-202',
    description: 'Laplace transforms, Fourier series, complex analysis, and partial differential equations.',
    units: [
      { id: 1, name: 'Laplace Transform', topics: ['Definition & properties', 'Inverse Laplace', 'Convolution theorem', 'Applications to ODE'] },
      { id: 2, name: 'Fourier Series', topics: ['Fourier series expansion', 'Half-range series', 'Parseval\'s theorem', 'Harmonic analysis'] },
      { id: 3, name: 'Complex Analysis', topics: ['Analytic functions', 'Cauchy-Riemann equations', "Cauchy's integral theorem", 'Residue theorem'] },
      { id: 4, name: 'Partial Differential Equations', topics: ['Formation of PDE', 'Method of separation', 'Heat equation', 'Wave equation'] },
      { id: 5, name: 'Statistics & Probability', topics: ['Probability distributions', 'Binomial & Poisson', 'Normal distribution', 'Curve fitting'] },
    ],
  },
  {
    slug: 'basic-computer-engineering',
    name: 'Basic Computer Engineering',
    semester: 2,
    code: 'BT-203',
    description: 'Introduction to computers, programming in C, and basics of data representation.',
    units: [
      { id: 1, name: 'Computer Fundamentals', topics: ['Computer architecture', 'Memory hierarchy', 'I/O devices', 'Operating system basics'] },
      { id: 2, name: 'Number Systems', topics: ['Binary, octal, hex', 'Conversions', 'Binary arithmetic', 'Complements'] },
      { id: 3, name: 'C Programming Basics', topics: ['Variables & data types', 'Operators', 'Control structures', 'Functions'] },
      { id: 4, name: 'Arrays & Strings', topics: ['1D and 2D arrays', 'String operations', 'Pointers', 'Dynamic memory'] },
      { id: 5, name: 'Structures & Files', topics: ['Structures & unions', 'File handling', 'Command line args', 'Preprocessor directives'] },
    ],
  },
  {
    slug: 'english-communication',
    name: 'English for Communication',
    semester: 2,
    code: 'BT-204',
    description: 'Communication skills, grammar, vocabulary, and professional writing.',
    units: [
      { id: 1, name: 'Grammar & Usage', topics: ['Tenses', 'Subject-verb agreement', 'Active & passive voice', 'Reported speech'] },
      { id: 2, name: 'Vocabulary Building', topics: ['Word formation', 'Synonyms & antonyms', 'One-word substitutes', 'Idioms & phrases'] },
      { id: 3, name: 'Writing Skills', topics: ['Paragraph writing', 'Essay writing', 'Précis writing', 'Letter & email writing'] },
      { id: 4, name: 'Oral Communication', topics: ['Presentation skills', 'Group discussion', 'Interview skills', 'Public speaking'] },
      { id: 5, name: 'Technical Writing', topics: ['Report writing', 'Proposal writing', 'Technical descriptions', 'Documentation'] },
    ],
  },
  {
    slug: 'workshop-practice',
    name: 'Workshop Practice',
    semester: 2,
    code: 'BT-205',
    description: 'Hands-on workshop skills including basic electrical wiring, fitting, and computer practices.',
    units: [
      { id: 1, name: 'Electrical Wiring', topics: ['Domestic wiring', 'Safety precautions', 'Testing instruments', 'Earthing'] },
      { id: 2, name: 'Electronics Workshop', topics: ['Soldering techniques', 'PCB fabrication', 'Component identification', 'Circuit assembly'] },
      { id: 3, name: 'Computer Workshop', topics: ['Hardware assembly', 'OS installation', 'Networking basics', 'Troubleshooting'] },
      { id: 4, name: 'Fitting Workshop', topics: ['Measuring tools', 'Marking tools', 'Filing operations', 'Assembly practice'] },
      { id: 5, name: 'Safety & Practices', topics: ['Workshop safety', 'First aid', 'Tool maintenance', 'Quality control'] },
    ],
  },

  // ---- SEMESTER 3 ----
  {
    slug: 'discrete-structure',
    name: 'Discrete Structure',
    semester: 3,
    code: 'CS-301',
    description: 'Mathematical foundations for computer science including set theory, logic, relations, graphs, and combinatorics.',
    units: [
      { id: 1, name: 'Set Theory & Logic', topics: ['Sets and operations', 'Propositional logic', 'Predicate logic', 'Logical equivalences'] },
      { id: 2, name: 'Relations & Functions', topics: ['Types of relations', 'Equivalence relations', 'Partial orders', 'Functions & compositions'] },
      { id: 3, name: 'Combinatorics', topics: ['Permutations', 'Combinations', 'Pigeonhole principle', 'Recurrence relations'] },
      { id: 4, name: 'Graph Theory', topics: ['Graph terminology', 'Euler & Hamiltonian paths', 'Graph coloring', 'Planar graphs'] },
      { id: 5, name: 'Algebraic Structures', topics: ['Groups', 'Rings', 'Fields', 'Lattices & Boolean algebra'] },
    ],
  },
  {
    slug: 'data-structure',
    name: 'Data Structure',
    semester: 3,
    code: 'CS-302',
    description: 'Core data structures and algorithms including arrays, linked lists, trees, graphs, and sorting algorithms.',
    units: [
      { id: 1, name: 'Arrays & Linked Lists', topics: ['Array operations', 'Singly linked list', 'Doubly linked list', 'Circular linked list'] },
      { id: 2, name: 'Stacks & Queues', topics: ['Stack operations & applications', 'Infix to postfix', 'Queue types', 'Priority queue'] },
      { id: 3, name: 'Trees', topics: ['Binary tree', 'BST operations', 'AVL tree', 'B-tree & B+ tree'] },
      { id: 4, name: 'Graphs', topics: ['Graph representation', 'BFS & DFS', 'Shortest path (Dijkstra)', 'Minimum spanning tree'] },
      { id: 5, name: 'Sorting & Hashing', topics: ['Bubble, selection, insertion sort', 'Merge sort & quick sort', 'Heap sort', 'Hashing techniques'] },
    ],
  },
  {
    slug: 'digital-systems',
    name: 'Digital Systems',
    semester: 3,
    code: 'CS-303',
    description: 'Digital logic design including combinational and sequential circuits, and memory systems.',
    units: [
      { id: 1, name: 'Number Systems & Codes', topics: ['Binary codes', 'BCD and Gray code', 'Error detection', 'Parity bits'] },
      { id: 2, name: 'Combinational Logic', topics: ['Karnaugh maps', 'Multiplexers', 'Decoders & encoders', 'Adders & subtractors'] },
      { id: 3, name: 'Sequential Logic', topics: ['Flip-flops (SR, JK, D, T)', 'Registers', 'Counters', 'State diagrams'] },
      { id: 4, name: 'Memory & PLDs', topics: ['RAM and ROM', 'PLDs and PALs', 'FPGAs', 'Memory organization'] },
      { id: 5, name: 'Digital System Design', topics: ['ASM charts', 'Control unit design', 'Microprogramming', 'Digital system examples'] },
    ],
  },
  {
    slug: 'oop-methodology',
    name: 'Object-Oriented Programming & Methodology',
    semester: 3,
    code: 'CS-304',
    description: 'OOP concepts with C++ and Java including inheritance, polymorphism, and design patterns.',
    units: [
      { id: 1, name: 'OOP Fundamentals', topics: ['Classes & objects', 'Encapsulation', 'Constructors & destructors', 'Access specifiers'] },
      { id: 2, name: 'Inheritance & Polymorphism', topics: ['Types of inheritance', 'Function overloading', 'Operator overloading', 'Virtual functions'] },
      { id: 3, name: 'Templates & Exception Handling', topics: ['Function templates', 'Class templates', 'Try-catch blocks', 'Custom exceptions'] },
      { id: 4, name: 'Java Fundamentals', topics: ['Java basics', 'Interfaces & packages', 'Multithreading', 'Collections framework'] },
      { id: 5, name: 'File I/O & STL', topics: ['File streams', 'STL containers', 'Iterators', 'Algorithms library'] },
    ],
  },
  {
    slug: 'energy-environmental-engineering',
    name: 'Energy & Environmental Engineering',
    semester: 3,
    code: 'CS-305',
    description: 'Energy resources, environmental pollution, and sustainable engineering practices.',
    units: [
      { id: 1, name: 'Energy Resources', topics: ['Conventional energy', 'Solar energy', 'Wind energy', 'Nuclear energy'] },
      { id: 2, name: 'Environmental Pollution', topics: ['Air pollution', 'Water pollution', 'Soil pollution', 'Noise pollution'] },
      { id: 3, name: 'Ecology & Ecosystems', topics: ['Ecosystem components', 'Food chains', 'Biodiversity', 'Conservation'] },
      { id: 4, name: 'Environmental Laws', topics: ['Environment Protection Act', 'Air & Water Acts', 'EIA', 'ISO 14000'] },
      { id: 5, name: 'Sustainable Development', topics: ['Green technology', 'Waste management', 'Carbon footprint', 'Circular economy'] },
    ],
  },

  // ---- SEMESTER 4 ----
  {
    slug: 'analysis-design-algorithms',
    name: 'Analysis & Design of Algorithms',
    semester: 4,
    code: 'CS-401',
    description: 'Algorithm design paradigms including divide-and-conquer, greedy, dynamic programming, and complexity analysis.',
    units: [
      { id: 1, name: 'Algorithm Basics', topics: ['Asymptotic notation', 'Recurrence relations', 'Master theorem', 'Amortized analysis'] },
      { id: 2, name: 'Divide & Conquer', topics: ['Merge sort', 'Quick sort', 'Binary search', 'Strassen matrix multiplication'] },
      { id: 3, name: 'Greedy Algorithms', topics: ['Activity selection', 'Huffman coding', 'Knapsack (fractional)', 'Job scheduling'] },
      { id: 4, name: 'Dynamic Programming', topics: ['0/1 Knapsack', 'Longest common subsequence', 'Matrix chain multiplication', 'Floyd-Warshall'] },
      { id: 5, name: 'NP-Completeness & Backtracking', topics: ['P vs NP', 'NP-complete problems', 'N-Queens', 'Graph coloring'] },
    ],
  },
  {
    slug: 'operating-systems',
    name: 'Operating Systems',
    semester: 4,
    code: 'CS-402',
    description: 'OS fundamentals: process management, memory management, file systems, and synchronization.',
    units: [
      { id: 1, name: 'Introduction & Process Management', topics: ['OS types & structure', 'Process states & PCB', 'Threads', 'Context switching'] },
      { id: 2, name: 'CPU Scheduling', topics: ['FCFS, SJF, Priority', 'Round Robin', 'Multilevel queue', 'Real-time scheduling'] },
      { id: 3, name: 'Synchronization & Deadlocks', topics: ['Critical section', 'Semaphores & mutex', 'Deadlock conditions', 'Deadlock prevention & avoidance'] },
      { id: 4, name: 'Memory Management', topics: ['Paging', 'Segmentation', 'Virtual memory', 'Page replacement algorithms'] },
      { id: 5, name: 'File Systems & I/O', topics: ['File allocation methods', 'Directory structure', 'Disk scheduling', 'I/O management'] },
    ],
  },
  {
    slug: 'computer-organization-architecture',
    name: 'Computer Organization & Architecture',
    semester: 4,
    code: 'CS-403',
    description: 'Computer architecture including ALU, control unit, memory hierarchy, and pipelining.',
    units: [
      { id: 1, name: 'Basic Structure', topics: ['Von Neumann architecture', 'Bus structure', 'Instruction cycle', 'Addressing modes'] },
      { id: 2, name: 'ALU & Arithmetic', topics: ['Fixed-point arithmetic', 'Floating-point arithmetic', 'ALU design', 'Booth\'s algorithm'] },
      { id: 3, name: 'Control Unit', topics: ['Hardwired control', 'Microprogrammed control', 'Instruction pipelining', 'Hazards'] },
      { id: 4, name: 'Memory Organization', topics: ['Cache memory', 'Cache mapping', 'Virtual memory', 'Memory interleaving'] },
      { id: 5, name: 'I/O Organization', topics: ['I/O techniques', 'DMA', 'Interrupts', 'Bus arbitration'] },
    ],
  },
  {
    slug: 'data-communication-networks',
    name: 'Data Communication & Networks',
    semester: 4,
    code: 'CS-404',
    description: 'Computer networking fundamentals from physical layer to application layer.',
    units: [
      { id: 1, name: 'Introduction & Physical Layer', topics: ['Network types', 'OSI & TCP/IP models', 'Transmission media', 'Multiplexing'] },
      { id: 2, name: 'Data Link Layer', topics: ['Framing', 'Error detection & correction', 'Flow control', 'MAC protocols'] },
      { id: 3, name: 'Network Layer', topics: ['IP addressing', 'Subnetting', 'Routing algorithms', 'IPv4 & IPv6'] },
      { id: 4, name: 'Transport Layer', topics: ['TCP', 'UDP', 'Congestion control', 'Flow control'] },
      { id: 5, name: 'Application Layer', topics: ['DNS', 'HTTP/HTTPS', 'FTP & SMTP', 'Network security basics'] },
    ],
  },
  {
    slug: 'software-engineering',
    name: 'Software Engineering',
    semester: 4,
    code: 'CS-405',
    description: 'Software development lifecycle, models, testing, and project management.',
    units: [
      { id: 1, name: 'Software Process', topics: ['SDLC models', 'Waterfall model', 'Agile methodology', 'Spiral model'] },
      { id: 2, name: 'Requirements Engineering', topics: ['Requirements gathering', 'SRS document', 'Use case diagrams', 'Data flow diagrams'] },
      { id: 3, name: 'Software Design', topics: ['Design principles', 'Architectural design', 'UML diagrams', 'Design patterns'] },
      { id: 4, name: 'Testing & Quality', topics: ['Unit testing', 'Integration testing', 'Black-box & white-box', 'Software metrics'] },
      { id: 5, name: 'Project Management', topics: ['Project planning', 'Risk management', 'Cost estimation', 'Configuration management'] },
    ],
  },

  // ---- SEMESTER 5 ----
  {
    slug: 'machine-learning',
    name: 'Machine Learning',
    semester: 5,
    code: 'CS-501',
    description: 'Supervised and unsupervised learning, regression, classification, clustering, and neural networks.',
    units: [
      { id: 1, name: 'Introduction to ML', topics: ['Types of learning', 'Hypothesis space', 'Bias-variance tradeoff', 'Cross-validation'] },
      { id: 2, name: 'Regression', topics: ['Linear regression', 'Polynomial regression', 'Regularization (L1, L2)', 'Gradient descent'] },
      { id: 3, name: 'Classification', topics: ['Logistic regression', 'Decision trees', 'Random forests', 'SVM'] },
      { id: 4, name: 'Unsupervised Learning', topics: ['K-means clustering', 'Hierarchical clustering', 'PCA', 'Association rules'] },
      { id: 5, name: 'Neural Networks', topics: ['Perceptron', 'Backpropagation', 'Activation functions', 'CNN & RNN basics'] },
    ],
  },
  {
    slug: 'database-management-systems',
    name: 'Database Management Systems',
    semester: 5,
    code: 'CS-502',
    description: 'Relational database design, SQL, normalization, transactions, and indexing.',
    units: [
      { id: 1, name: 'Introduction & ER Model', topics: ['Database concepts', 'ER diagrams', 'Relational model', 'Keys'] },
      { id: 2, name: 'SQL', topics: ['DDL & DML', 'Joins', 'Subqueries', 'Views & indexes'] },
      { id: 3, name: 'Normalization', topics: ['Functional dependencies', '1NF, 2NF, 3NF', 'BCNF', 'Decomposition'] },
      { id: 4, name: 'Transaction Management', topics: ['ACID properties', 'Serializability', 'Concurrency control', 'Deadlock handling'] },
      { id: 5, name: 'Indexing & Recovery', topics: ['B-tree indexing', 'Hashing', 'Log-based recovery', 'RAID'] },
    ],
  },
  {
    slug: 'compiler-design',
    name: 'Compiler Design',
    semester: 5,
    code: 'CS-503',
    description: 'Compiler construction phases: lexical analysis, parsing, semantic analysis, and code generation.',
    units: [
      { id: 1, name: 'Lexical Analysis', topics: ['Tokens & patterns', 'Regular expressions', 'Finite automata', 'LEX tool'] },
      { id: 2, name: 'Syntax Analysis', topics: ['Context-free grammars', 'Top-down parsing', 'Bottom-up parsing', 'YACC tool'] },
      { id: 3, name: 'Semantic Analysis', topics: ['Syntax-directed translation', 'Type checking', 'Symbol table', 'Attribute grammars'] },
      { id: 4, name: 'Intermediate Code', topics: ['Three-address code', 'Quadruples & triples', 'DAG representation', 'Backpatching'] },
      { id: 5, name: 'Code Optimization & Generation', topics: ['Local optimization', 'Loop optimization', 'Register allocation', 'Target code generation'] },
    ],
  },
  {
    slug: 'theory-of-computation',
    name: 'Theory of Computation',
    semester: 5,
    code: 'CS-504',
    description: 'Formal languages, automata theory, Turing machines, and computability.',
    units: [
      { id: 1, name: 'Finite Automata', topics: ['DFA & NFA', 'NFA to DFA conversion', 'Minimization', 'Regular expressions'] },
      { id: 2, name: 'Regular Languages', topics: ['Pumping lemma', 'Closure properties', 'Myhill-Nerode theorem', 'Decision properties'] },
      { id: 3, name: 'Context-Free Languages', topics: ['CFG', 'PDA', 'CNF & GNF', 'CFL pumping lemma'] },
      { id: 4, name: 'Turing Machines', topics: ['TM definition', 'Variations of TM', 'Universal TM', 'Church-Turing thesis'] },
      { id: 5, name: 'Undecidability', topics: ['Halting problem', 'Reducibility', "Rice's theorem", 'Recursive & RE languages'] },
    ],
  },
  {
    slug: 'computer-graphics',
    name: 'Computer Graphics',
    semester: 5,
    code: 'CS-505E',
    description: 'Graphics fundamentals: line drawing, transformations, clipping, curves, and 3D rendering.',
    units: [
      { id: 1, name: 'Scan Conversion', topics: ['Line drawing (DDA, Bresenham)', 'Circle generation', 'Ellipse generation', 'Polygon filling'] },
      { id: 2, name: '2D Transformations', topics: ['Translation, rotation, scaling', 'Homogeneous coordinates', 'Composite transformations', 'Reflection & shearing'] },
      { id: 3, name: 'Clipping', topics: ['Cohen-Sutherland', 'Sutherland-Hodgman', 'Window to viewport', 'Cyrus-Beck'] },
      { id: 4, name: '3D Graphics', topics: ['3D transformations', 'Projection types', '3D viewing pipeline', 'Hidden surface removal'] },
      { id: 5, name: 'Curves & Rendering', topics: ['Bezier curves', 'B-spline curves', 'Illumination models', 'Shading techniques'] },
    ],
  },

  // ---- SEMESTER 6 ----
  {
    slug: 'software-architecture',
    name: 'Software Architecture',
    semester: 6,
    code: 'CS-601',
    description: 'Design patterns, architectural styles, microservices, and system design principles.',
    units: [
      { id: 1, name: 'Architectural Styles', topics: ['Layered architecture', 'Client-server', 'Pipe-filter', 'Event-driven'] },
      { id: 2, name: 'Design Patterns', topics: ['Creational patterns', 'Structural patterns', 'Behavioral patterns', 'MVC & MVVM'] },
      { id: 3, name: 'Microservices', topics: ['Monolithic vs microservices', 'Service discovery', 'API gateway', 'Containerization'] },
      { id: 4, name: 'Quality Attributes', topics: ['Performance', 'Scalability', 'Reliability', 'Security patterns'] },
      { id: 5, name: 'Architecture Documentation', topics: ['4+1 view model', 'UML diagrams', 'Architecture evaluation', 'Trade-off analysis'] },
    ],
  },
  {
    slug: 'artificial-intelligence',
    name: 'Artificial Intelligence',
    semester: 6,
    code: 'CS-602',
    description: 'AI fundamentals including search, knowledge representation, reasoning, and expert systems.',
    units: [
      { id: 1, name: 'Problem Solving', topics: ['State space search', 'BFS & DFS', 'A* algorithm', 'Heuristic search'] },
      { id: 2, name: 'Knowledge Representation', topics: ['Propositional logic', 'First-order logic', 'Semantic nets', 'Frames'] },
      { id: 3, name: 'Reasoning', topics: ['Forward chaining', 'Backward chaining', 'Probabilistic reasoning', 'Bayesian networks'] },
      { id: 4, name: 'Machine Learning in AI', topics: ['Learning from examples', 'Reinforcement learning', 'Genetic algorithms', 'Fuzzy logic'] },
      { id: 5, name: 'NLP & Expert Systems', topics: ['NLP basics', 'Text processing', 'Expert system architecture', 'Applications of AI'] },
    ],
  },
  {
    slug: 'information-security',
    name: 'Information Security',
    semester: 6,
    code: 'CS-603',
    description: 'Cryptography, network security, authentication, and cyber security fundamentals.',
    units: [
      { id: 1, name: 'Security Fundamentals', topics: ['Security goals (CIA)', 'Threat models', 'Attack types', 'Security services'] },
      { id: 2, name: 'Symmetric Encryption', topics: ['DES', 'AES', 'Block cipher modes', 'Stream ciphers'] },
      { id: 3, name: 'Asymmetric Encryption', topics: ['RSA', 'Diffie-Hellman', 'Digital signatures', 'Elliptic curve crypto'] },
      { id: 4, name: 'Network Security', topics: ['Firewalls', 'IDS/IPS', 'VPN', 'SSL/TLS'] },
      { id: 5, name: 'Application Security', topics: ['Web security', 'SQL injection', 'XSS & CSRF', 'Secure coding'] },
    ],
  },
  {
    slug: 'web-technology',
    name: 'Web Technology',
    semester: 6,
    code: 'CS-604',
    description: 'Frontend and backend web development with HTML, CSS, JavaScript, and server-side technologies.',
    units: [
      { id: 1, name: 'HTML & CSS', topics: ['HTML5 elements', 'CSS3 & Flexbox', 'Grid layout', 'Responsive design'] },
      { id: 2, name: 'JavaScript', topics: ['ES6+ features', 'DOM manipulation', 'Async/Await', 'Fetch API'] },
      { id: 3, name: 'Frontend Frameworks', topics: ['React basics', 'Component lifecycle', 'State management', 'Routing'] },
      { id: 4, name: 'Backend Development', topics: ['Node.js', 'Express.js', 'RESTful APIs', 'Database integration'] },
      { id: 5, name: 'Web Services', topics: ['REST vs SOAP', 'JSON & XML', 'Authentication (JWT)', 'Deployment'] },
    ],
  },
  {
    slug: 'cloud-computing',
    name: 'Cloud Computing',
    semester: 6,
    code: 'CS-605E',
    description: 'Cloud service models, virtualization, deployment, and major cloud platforms.',
    units: [
      { id: 1, name: 'Cloud Fundamentals', topics: ['IaaS, PaaS, SaaS', 'Cloud deployment models', 'Cloud economics', 'Service providers'] },
      { id: 2, name: 'Virtualization', topics: ['Hypervisors', 'VM management', 'Containers & Docker', 'Kubernetes basics'] },
      { id: 3, name: 'Cloud Storage & Databases', topics: ['Object storage', 'Block storage', 'Cloud databases', 'Data management'] },
      { id: 4, name: 'Cloud Security', topics: ['IAM', 'Encryption in cloud', 'Compliance', 'Security best practices'] },
      { id: 5, name: 'Cloud Applications', topics: ['Serverless computing', 'Auto-scaling', 'CI/CD in cloud', 'Multi-cloud strategies'] },
    ],
  },

  // ---- SEMESTER 7 ----
  {
    slug: 'computational-intelligence',
    name: 'Computational Intelligence',
    semester: 7,
    code: 'CS-701',
    description: 'Soft computing techniques including fuzzy logic, genetic algorithms, and swarm intelligence.',
    units: [
      { id: 1, name: 'Fuzzy Logic', topics: ['Fuzzy sets', 'Membership functions', 'Fuzzy rules', 'Defuzzification'] },
      { id: 2, name: 'Neural Networks', topics: ['ANN architectures', 'Learning algorithms', 'RBF networks', 'Self-organizing maps'] },
      { id: 3, name: 'Genetic Algorithms', topics: ['GA operators', 'Selection methods', 'Crossover & mutation', 'Multi-objective optimization'] },
      { id: 4, name: 'Swarm Intelligence', topics: ['Particle swarm optimization', 'Ant colony optimization', 'Bee algorithm', 'Applications'] },
      { id: 5, name: 'Hybrid Systems', topics: ['Neuro-fuzzy systems', 'ANFIS', 'Evolutionary neural networks', 'Applications'] },
    ],
  },
  {
    slug: 'cryptography-information-security',
    name: 'Cryptography & Information Security',
    semester: 7,
    code: 'CS-702',
    description: 'Advanced cryptographic algorithms, protocols, and information security management.',
    units: [
      { id: 1, name: 'Classical Cryptography', topics: ['Caesar cipher', 'Playfair cipher', 'Hill cipher', 'Vigenere cipher'] },
      { id: 2, name: 'Modern Cryptography', topics: ['AES internals', 'RSA algorithm', 'ECC', 'Hash functions (SHA)'] },
      { id: 3, name: 'Authentication Protocols', topics: ['Kerberos', 'X.509 certificates', 'PKI', 'Digital signatures'] },
      { id: 4, name: 'Network Security Protocols', topics: ['IPSec', 'SSL/TLS handshake', 'HTTPS', 'SSH'] },
      { id: 5, name: 'Security Management', topics: ['Risk assessment', 'Security policies', 'Incident response', 'Forensics basics'] },
    ],
  },
  {
    slug: 'deep-reinforcement-learning',
    name: 'Deep & Reinforcement Learning',
    semester: 7,
    code: 'CS-703',
    description: 'Deep learning architectures and reinforcement learning fundamentals.',
    units: [
      { id: 1, name: 'Deep Learning Foundations', topics: ['Deep neural networks', 'Optimization techniques', 'Batch normalization', 'Dropout'] },
      { id: 2, name: 'CNNs', topics: ['Convolutional layers', 'Pooling layers', 'LeNet, AlexNet, VGG', 'Transfer learning'] },
      { id: 3, name: 'RNNs & Transformers', topics: ['Vanilla RNN', 'LSTM & GRU', 'Attention mechanism', 'Transformer architecture'] },
      { id: 4, name: 'Generative Models', topics: ['Autoencoders', 'VAE', 'GAN', 'Diffusion models basics'] },
      { id: 5, name: 'Reinforcement Learning', topics: ['MDP', 'Q-learning', 'Policy gradient', 'Deep Q-Network (DQN)'] },
    ],
  },
  {
    slug: 'big-data-analytics',
    name: 'Big Data Analytics',
    semester: 7,
    code: 'CS-704',
    description: 'Big data technologies: Hadoop, MapReduce, Spark, and data analytics techniques.',
    units: [
      { id: 1, name: 'Big Data Basics', topics: ['5 Vs of big data', 'Data types', 'Big data challenges', 'Ecosystem overview'] },
      { id: 2, name: 'Hadoop Ecosystem', topics: ['HDFS', 'MapReduce', 'YARN', 'Hive & Pig'] },
      { id: 3, name: 'Apache Spark', topics: ['RDDs', 'Spark SQL', 'Spark Streaming', 'MLlib'] },
      { id: 4, name: 'NoSQL Databases', topics: ['MongoDB', 'Cassandra', 'HBase', 'Neo4j'] },
      { id: 5, name: 'Data Analytics', topics: ['Data preprocessing', 'Visualization tools', 'Predictive analytics', 'Real-time analytics'] },
    ],
  },
  {
    slug: 'departmental-elective-7',
    name: 'Departmental Elective',
    semester: 7,
    code: 'CS-705E',
    description: 'Elective subject — topics vary by department offering.',
    units: [
      { id: 1, name: 'Unit 1', topics: ['Topic A', 'Topic B', 'Topic C', 'Topic D'] },
      { id: 2, name: 'Unit 2', topics: ['Topic A', 'Topic B', 'Topic C', 'Topic D'] },
      { id: 3, name: 'Unit 3', topics: ['Topic A', 'Topic B', 'Topic C', 'Topic D'] },
      { id: 4, name: 'Unit 4', topics: ['Topic A', 'Topic B', 'Topic C', 'Topic D'] },
      { id: 5, name: 'Unit 5', topics: ['Topic A', 'Topic B', 'Topic C', 'Topic D'] },
    ],
  },

  // ---- SEMESTER 8 ----
  {
    slug: 'major-project',
    name: 'Major Project',
    semester: 8,
    code: 'CS-801',
    description: 'Final year project demonstrating comprehensive knowledge and skills.',
    units: [
      { id: 1, name: 'Project Planning', topics: ['Problem identification', 'Literature survey', 'Feasibility study', 'Project proposal'] },
      { id: 2, name: 'System Design', topics: ['Architecture design', 'Database design', 'UI/UX design', 'API design'] },
      { id: 3, name: 'Implementation', topics: ['Coding standards', 'Version control', 'Testing strategy', 'Integration'] },
      { id: 4, name: 'Documentation', topics: ['Technical report', 'User manual', 'Code documentation', 'Presentation prep'] },
      { id: 5, name: 'Evaluation', topics: ['Project demo', 'Viva voce', 'Peer review', 'Final submission'] },
    ],
  },
  {
    slug: 'industrial-internship',
    name: 'Industrial Internship',
    semester: 8,
    code: 'CS-802',
    description: 'Industry exposure through internship at IT companies or research labs.',
    units: [
      { id: 1, name: 'Industry Exposure', topics: ['Company overview', 'Team structure', 'Work culture', 'Tools & technologies'] },
      { id: 2, name: 'Project Work', topics: ['Problem statement', 'Solution approach', 'Implementation', 'Results'] },
      { id: 3, name: 'Skills Development', topics: ['Technical skills', 'Soft skills', 'Communication', 'Teamwork'] },
      { id: 4, name: 'Report & Presentation', topics: ['Internship report', 'Weekly logs', 'Final presentation', 'Feedback'] },
      { id: 5, name: 'Career Preparation', topics: ['Resume building', 'Interview prep', 'LinkedIn optimization', 'Professional networking'] },
    ],
  },
  {
    slug: 'technical-seminar',
    name: 'Technical Seminar',
    semester: 8,
    code: 'CS-803',
    description: 'Research-based seminar on emerging technology topics.',
    units: [
      { id: 1, name: 'Topic Selection', topics: ['Research area identification', 'Literature review', 'Gap analysis', 'Topic finalization'] },
      { id: 2, name: 'Research Methodology', topics: ['Research design', 'Data collection', 'Analysis methods', 'Tools'] },
      { id: 3, name: 'Paper Writing', topics: ['Abstract writing', 'Introduction & background', 'Results & discussion', 'References'] },
      { id: 4, name: 'Presentation Skills', topics: ['Slide design', 'Delivery techniques', 'Handling Q&A', 'Time management'] },
      { id: 5, name: 'Evaluation', topics: ['Peer review', 'Faculty evaluation', 'Originality check', 'Final submission'] },
    ],
  },
  {
    slug: 'open-elective-8',
    name: 'Open Elective',
    semester: 8,
    code: 'CS-804E',
    description: 'Open elective from other departments to broaden knowledge.',
    units: [
      { id: 1, name: 'Unit 1', topics: ['Topic A', 'Topic B', 'Topic C', 'Topic D'] },
      { id: 2, name: 'Unit 2', topics: ['Topic A', 'Topic B', 'Topic C', 'Topic D'] },
      { id: 3, name: 'Unit 3', topics: ['Topic A', 'Topic B', 'Topic C', 'Topic D'] },
      { id: 4, name: 'Unit 4', topics: ['Topic A', 'Topic B', 'Topic C', 'Topic D'] },
      { id: 5, name: 'Unit 5', topics: ['Topic A', 'Topic B', 'Topic C', 'Topic D'] },
    ],
  },
  {
    slug: 'comprehensive-viva',
    name: 'Comprehensive Viva',
    semester: 8,
    code: 'CS-805',
    description: 'Comprehensive oral examination covering all CSE core subjects.',
    units: [
      { id: 1, name: 'Core Subjects Review', topics: ['DSA review', 'OS review', 'DBMS review', 'CN review'] },
      { id: 2, name: 'Advanced Topics', topics: ['ML review', 'AI review', 'Compiler Design review', 'Software Engineering review'] },
      { id: 3, name: 'Problem Solving', topics: ['Coding problems', 'Design problems', 'Analysis problems', 'Optimization'] },
      { id: 4, name: 'Current Trends', topics: ['Latest tech', 'Industry trends', 'Research directions', 'Emerging tools'] },
      { id: 5, name: 'Soft Skills', topics: ['Communication', 'Critical thinking', 'Ethics', 'Professional conduct'] },
    ],
  },
];

export function getSubjectsBySemester(sem) {
  return subjects.filter(s => s.semester === sem);
}

export function getSubjectBySlug(slug) {
  return subjects.find(s => s.slug === slug);
}

export function getAllSubjectSlugs() {
  return subjects.map(s => s.slug);
}

// ============================================================
// QUIZ DATA
// ============================================================

export const quizData = {
  'data-structure': [
    { q: 'What is the time complexity of searching in a balanced BST?', options: ['O(n)', 'O(log n)', 'O(n log n)', 'O(1)'], answer: 1 },
    { q: 'Which data structure uses LIFO?', options: ['Queue', 'Stack', 'Linked List', 'Tree'], answer: 1 },
    { q: 'What is the worst-case time complexity of Quick Sort?', options: ['O(n log n)', 'O(n)', 'O(n²)', 'O(log n)'], answer: 2 },
    { q: 'Which traversal of BST gives sorted order?', options: ['Preorder', 'Postorder', 'Inorder', 'Level order'], answer: 2 },
    { q: 'A full binary tree with n leaves has how many total nodes?', options: ['2n', '2n - 1', '2n + 1', 'n + 1'], answer: 1 },
    { q: 'Which algorithm is used for finding shortest path in a weighted graph?', options: ['DFS', 'BFS', 'Dijkstra', 'Prim'], answer: 2 },
    { q: 'Hash collision can be resolved by:', options: ['Chaining', 'Open addressing', 'Both A and B', 'Neither'], answer: 2 },
    { q: 'The number of edges in a complete graph with n vertices is:', options: ['n(n-1)', 'n(n-1)/2', 'n²', '2n'], answer: 1 },
    { q: 'Which sorting algorithm is stable?', options: ['Quick Sort', 'Heap Sort', 'Merge Sort', 'Selection Sort'], answer: 2 },
    { q: 'AVL tree is a:', options: ['Complete binary tree', 'Self-balancing BST', 'Full binary tree', 'Threaded tree'], answer: 1 },
  ],
  'operating-systems': [
    { q: 'Which scheduling algorithm may cause starvation?', options: ['FCFS', 'Round Robin', 'SJF', 'None'], answer: 2 },
    { q: 'Deadlock requires how many conditions simultaneously?', options: ['2', '3', '4', '5'], answer: 2 },
    { q: 'Which page replacement algorithm is optimal?', options: ['FIFO', 'LRU', 'Optimal (Belady)', 'Clock'], answer: 2 },
    { q: 'What is thrashing?', options: ['CPU overuse', 'Excessive paging', 'Disk failure', 'Memory leak'], answer: 1 },
    { q: 'Semaphore was introduced by:', options: ['Dijkstra', 'Knuth', 'Turing', 'Ritchie'], answer: 0 },
    { q: 'Which is NOT a process state?', options: ['Running', 'Ready', 'Blocked', 'Compiled'], answer: 3 },
    { q: "Banker's algorithm is used for:", options: ['Scheduling', 'Deadlock avoidance', 'Memory allocation', 'Disk management'], answer: 1 },
    { q: 'Virtual memory uses:', options: ['RAM only', 'Disk only', 'Both RAM and disk', 'Cache only'], answer: 2 },
    { q: 'A context switch involves saving:', options: ['PCB', 'File table', 'Disk blocks', 'Network packets'], answer: 0 },
    { q: 'Round Robin uses which data structure for scheduling?', options: ['Stack', 'Queue', 'Priority Queue', 'Tree'], answer: 1 },
  ],
  'database-management-systems': [
    { q: 'Which normal form eliminates partial dependency?', options: ['1NF', '2NF', '3NF', 'BCNF'], answer: 1 },
    { q: 'ACID stands for:', options: ['Atomicity, Consistency, Isolation, Durability', 'Access, Control, Identity, Data', 'Aggregate, Commit, Index, Distributed', 'None'], answer: 0 },
    { q: 'Which SQL command is used to remove a table?', options: ['DELETE', 'REMOVE', 'DROP', 'TRUNCATE'], answer: 2 },
    { q: 'A foreign key references:', options: ['Same table', 'Primary key of another table', 'Any column', 'Index'], answer: 1 },
    { q: 'Which join returns all rows when there is a match in either table?', options: ['INNER JOIN', 'LEFT JOIN', 'FULL OUTER JOIN', 'CROSS JOIN'], answer: 2 },
    { q: 'B+ tree is used for:', options: ['Sorting', 'Indexing', 'Hashing', 'Caching'], answer: 1 },
    { q: 'Relational algebra operation for combining two tables?', options: ['Select', 'Project', 'Join', 'Divide'], answer: 2 },
    { q: 'Serializability ensures:', options: ['Speed', 'Consistency', 'Availability', 'Partition'], answer: 1 },
    { q: 'Which is a DDL command?', options: ['SELECT', 'INSERT', 'CREATE', 'UPDATE'], answer: 2 },
    { q: '3NF eliminates:', options: ['Partial dependency', 'Transitive dependency', 'Multi-valued dependency', 'All of above'], answer: 1 },
  ],
  'machine-learning': [
    { q: 'Which is a supervised learning algorithm?', options: ['K-Means', 'PCA', 'Linear Regression', 'DBSCAN'], answer: 2 },
    { q: 'Overfitting can be reduced by:', options: ['Adding more features', 'Regularization', 'Reducing training data', 'Ignoring validation'], answer: 1 },
    { q: 'In K-Means, K represents:', options: ['Features', 'Clusters', 'Data points', 'Iterations'], answer: 1 },
    { q: 'SVM finds the:', options: ['Decision tree', 'Optimal hyperplane', 'Cluster centers', 'Probability'], answer: 1 },
    { q: 'Activation function in neural networks provides:', options: ['Linearity', 'Non-linearity', 'Speed', 'Memory'], answer: 1 },
    { q: 'Gradient descent minimizes:', options: ['Accuracy', 'Loss function', 'Data size', 'Features'], answer: 1 },
    { q: 'Random Forest is an ensemble of:', options: ['SVMs', 'Neural networks', 'Decision trees', 'Linear models'], answer: 2 },
    { q: 'PCA is used for:', options: ['Classification', 'Regression', 'Dimensionality reduction', 'Clustering'], answer: 2 },
    { q: 'Bias-variance tradeoff aims to:', options: ['Maximize bias', 'Minimize both', 'Maximize variance', 'Ignore errors'], answer: 1 },
    { q: 'Cross-validation helps in:', options: ['Feature selection', 'Model evaluation', 'Data cleaning', 'Visualization'], answer: 1 },
  ],
  'analysis-design-algorithms': [
    { q: 'The Master theorem is used to solve:', options: ['Linear equations', 'Recurrence relations', 'Graph problems', 'String matching'], answer: 1 },
    { q: 'Which paradigm does Huffman coding use?', options: ['Dynamic Programming', 'Divide & Conquer', 'Greedy', 'Backtracking'], answer: 2 },
    { q: 'Time complexity of merge sort is:', options: ['O(n)', 'O(n²)', 'O(n log n)', 'O(log n)'], answer: 2 },
    { q: '0/1 Knapsack is solved using:', options: ['Greedy', 'Dynamic Programming', 'Brute force only', 'BFS'], answer: 1 },
    { q: 'Which problem is NP-Complete?', options: ['Sorting', 'Binary search', 'Travelling Salesman', 'Matrix multiplication'], answer: 2 },
    { q: 'Floyd-Warshall finds:', options: ['Single-source shortest path', 'All-pairs shortest path', 'MST', 'Topological sort'], answer: 1 },
    { q: 'Big-O of binary search:', options: ['O(n)', 'O(log n)', 'O(n log n)', 'O(1)'], answer: 1 },
    { q: 'N-Queens problem uses:', options: ['Greedy', 'DP', 'Backtracking', 'Divide & Conquer'], answer: 2 },
  ],
  'data-communication-networks': [
    { q: 'TCP operates at which layer?', options: ['Network', 'Transport', 'Application', 'Data Link'], answer: 1 },
    { q: 'IP address is how many bits (IPv4)?', options: ['16', '32', '64', '128'], answer: 1 },
    { q: 'Which protocol is connectionless?', options: ['TCP', 'UDP', 'FTP', 'SMTP'], answer: 1 },
    { q: 'OSI model has how many layers?', options: ['4', '5', '6', '7'], answer: 3 },
    { q: 'Subnet mask 255.255.255.0 means:', options: ['/8', '/16', '/24', '/32'], answer: 2 },
    { q: 'ARP resolves:', options: ['IP to MAC', 'MAC to IP', 'URL to IP', 'IP to URL'], answer: 0 },
    { q: 'Which device operates at Network layer?', options: ['Hub', 'Switch', 'Router', 'Repeater'], answer: 2 },
    { q: 'HTTP uses port:', options: ['21', '22', '80', '443'], answer: 2 },
    { q: 'DNS resolves:', options: ['IP to domain', 'Domain to IP', 'MAC to IP', 'Port to IP'], answer: 1 },
    { q: 'Which is a reliable transport protocol?', options: ['UDP', 'ICMP', 'TCP', 'ARP'], answer: 2 },
  ],
};

// ============================================================
// FLASHCARD DATA
// ============================================================

export const flashcardData = {
  'data-structure': [
    { front: 'What is a stack?', back: 'A linear data structure that follows LIFO (Last In, First Out) principle. Elements are added and removed from the same end called the top.' },
    { front: 'Difference between BFS and DFS?', back: 'BFS uses a queue and explores level by level (breadth-first). DFS uses a stack (or recursion) and explores as deep as possible before backtracking.' },
    { front: 'What is a hash collision?', back: 'When two different keys produce the same hash index. Resolved using chaining (linked lists at each index) or open addressing (probing for next slot).' },
    { front: 'Time complexity of Heap Sort?', back: 'O(n log n) in all cases (best, average, worst). It builds a heap in O(n) and extracts elements in O(n log n).' },
    { front: 'What is an AVL tree?', back: 'A self-balancing BST where the height difference between left and right subtrees of any node is at most 1. Uses rotations to maintain balance.' },
    { front: 'What is a B-tree?', back: 'A self-balancing search tree with multiple keys per node. Used in databases and file systems. Every node can have more than 2 children.' },
    { front: 'What is amortized analysis?', back: 'A method to analyze the average time per operation over a worst-case sequence of operations, even though a single operation may be expensive.' },
  ],
  'operating-systems': [
    { front: 'What are the 4 conditions for deadlock?', back: '1. Mutual Exclusion 2. Hold & Wait 3. No Preemption 4. Circular Wait — All four must hold simultaneously for deadlock.' },
    { front: 'What is virtual memory?', back: 'A memory management technique that uses disk space as an extension of RAM. It allows processes larger than physical memory to execute using page swapping.' },
    { front: 'Difference between process and thread?', back: 'A process is an independent program with its own memory space. A thread is a lightweight unit within a process sharing the same memory. Thread creation is faster.' },
    { front: 'What is a semaphore?', back: 'A synchronization tool that uses an integer variable accessed via wait() and signal() operations. Binary semaphore (0/1) acts as a mutex.' },
    { front: 'What is paging?', back: 'Memory management scheme that divides physical memory into fixed-size frames and logical memory into same-size pages. Eliminates external fragmentation.' },
    { front: "Explain Banker's algorithm", back: 'A deadlock avoidance algorithm that checks if granting a resource request will leave the system in a safe state (where all processes can complete).' },
  ],
  'database-management-systems': [
    { front: 'What are ACID properties?', back: 'Atomicity (all-or-nothing), Consistency (valid state), Isolation (concurrent txns independent), Durability (committed data persists).' },
    { front: 'What is normalization?', back: 'Process of organizing data to reduce redundancy. 1NF (atomic values), 2NF (no partial dependency), 3NF (no transitive dependency), BCNF (strict 3NF).' },
    { front: 'Difference between DELETE and TRUNCATE?', back: 'DELETE removes rows one by one (can have WHERE clause, logged). TRUNCATE removes all rows at once (faster, minimal logging, resets identity).' },
    { front: 'What is a join?', back: 'SQL operation combining rows from 2+ tables based on a related column. Types: INNER, LEFT, RIGHT, FULL OUTER, CROSS, SELF join.' },
    { front: 'What is indexing?', back: 'Data structure (usually B-tree) that speeds up data retrieval. Trade-off: faster reads but slower writes due to index maintenance.' },
    { front: 'What is a view?', back: 'A virtual table based on a SQL query. Does not store data itself. Used for security, simplification, and data abstraction.' },
  ],
  'machine-learning': [
    { front: 'What is overfitting?', back: 'When a model learns noise in training data and performs well on training but poorly on unseen data. Fixed by regularization, cross-validation, or more data.' },
    { front: 'What is gradient descent?', back: 'An optimization algorithm that iteratively adjusts parameters in the direction of steepest descent of the loss function to find the minimum.' },
    { front: 'Difference between classification and regression?', back: 'Classification predicts discrete labels (spam/not spam). Regression predicts continuous values (house price). Both are supervised learning.' },
    { front: 'What is the bias-variance tradeoff?', back: 'Bias: error from wrong assumptions (underfitting). Variance: sensitivity to training data (overfitting). Goal: minimize both for good generalization.' },
    { front: 'What is cross-validation?', back: 'Technique to evaluate model performance by splitting data into k folds, training on k-1 folds and testing on the remaining. Averages results across all folds.' },
    { front: 'What is PCA?', back: 'Principal Component Analysis reduces dimensionality by projecting data onto directions of maximum variance. Preserves most information with fewer features.' },
  ],
  'data-communication-networks': [
    { front: 'Difference between TCP and UDP?', back: 'TCP: connection-oriented, reliable, ordered delivery, flow control. UDP: connectionless, unreliable, faster, no overhead. TCP for web/email, UDP for streaming/gaming.' },
    { front: 'What is subnetting?', back: 'Dividing a network into smaller sub-networks using a subnet mask. Improves security, reduces congestion, and makes IP management efficient.' },
    { front: 'What are the OSI layers?', back: '7 layers: Physical, Data Link, Network, Transport, Session, Presentation, Application. "Please Do Not Throw Sausage Pizza Away."' },
    { front: 'What is ARP?', back: 'Address Resolution Protocol maps IP addresses to MAC addresses on a local network. Device broadcasts ARP request, target responds with its MAC.' },
    { front: 'What is DNS?', back: 'Domain Name System translates human-readable domain names (google.com) to IP addresses. Uses hierarchical distributed database.' },
    { front: 'What is NAT?', back: 'Network Address Translation maps private IP addresses to public IPs. Allows multiple devices to share one public IP. Conserves IPv4 addresses.' },
  ],
};

// ============================================================
// PYQ DATA (placeholders)
// ============================================================

export const pyqData = [
  { id: 1, subject: 'Data Structure', semester: 3, year: 2024, type: 'End Sem', slug: 'data-structure' },
  { id: 2, subject: 'Data Structure', semester: 3, year: 2023, type: 'End Sem', slug: 'data-structure' },
  { id: 3, subject: 'Operating Systems', semester: 4, year: 2024, type: 'End Sem', slug: 'operating-systems' },
  { id: 4, subject: 'Operating Systems', semester: 4, year: 2023, type: 'Mid Sem', slug: 'operating-systems' },
  { id: 5, subject: 'DBMS', semester: 5, year: 2024, type: 'End Sem', slug: 'database-management-systems' },
  { id: 6, subject: 'DBMS', semester: 5, year: 2023, type: 'End Sem', slug: 'database-management-systems' },
  { id: 7, subject: 'Machine Learning', semester: 5, year: 2024, type: 'End Sem', slug: 'machine-learning' },
  { id: 8, subject: 'Machine Learning', semester: 5, year: 2023, type: 'Mid Sem', slug: 'machine-learning' },
  { id: 9, subject: 'Computer Networks', semester: 4, year: 2024, type: 'End Sem', slug: 'data-communication-networks' },
  { id: 10, subject: 'Computer Networks', semester: 4, year: 2022, type: 'End Sem', slug: 'data-communication-networks' },
  { id: 11, subject: 'ADA', semester: 4, year: 2024, type: 'End Sem', slug: 'analysis-design-algorithms' },
  { id: 12, subject: 'ADA', semester: 4, year: 2023, type: 'Mid Sem', slug: 'analysis-design-algorithms' },
  { id: 13, subject: 'Compiler Design', semester: 5, year: 2024, type: 'End Sem', slug: 'compiler-design' },
  { id: 14, subject: 'Compiler Design', semester: 5, year: 2023, type: 'End Sem', slug: 'compiler-design' },
  { id: 15, subject: 'AI', semester: 6, year: 2024, type: 'End Sem', slug: 'artificial-intelligence' },
  { id: 16, subject: 'Web Technology', semester: 6, year: 2024, type: 'End Sem', slug: 'web-technology' },
  { id: 17, subject: 'Software Engineering', semester: 4, year: 2024, type: 'End Sem', slug: 'software-engineering' },
  { id: 18, subject: 'TOC', semester: 5, year: 2024, type: 'End Sem', slug: 'theory-of-computation' },
];

// ============================================================
// VIDEO DATA (placeholders)
// ============================================================

export const videoData = [
  { id: 1, title: 'Introduction to Data Structures', subject: 'Data Structure', semester: 3, youtubeId: 'dQw4w9WgXcQ', duration: '45:00' },
  { id: 2, title: 'Arrays and Linked Lists Explained', subject: 'Data Structure', semester: 3, youtubeId: 'dQw4w9WgXcQ', duration: '38:00' },
  { id: 3, title: 'Binary Trees & BST', subject: 'Data Structure', semester: 3, youtubeId: 'dQw4w9WgXcQ', duration: '52:00' },
  { id: 4, title: 'Process Management in OS', subject: 'Operating Systems', semester: 4, youtubeId: 'dQw4w9WgXcQ', duration: '41:00' },
  { id: 5, title: 'Deadlocks Explained', subject: 'Operating Systems', semester: 4, youtubeId: 'dQw4w9WgXcQ', duration: '35:00' },
  { id: 6, title: 'SQL Basics & Advanced Queries', subject: 'DBMS', semester: 5, youtubeId: 'dQw4w9WgXcQ', duration: '48:00' },
  { id: 7, title: 'Normalization (1NF to BCNF)', subject: 'DBMS', semester: 5, youtubeId: 'dQw4w9WgXcQ', duration: '40:00' },
  { id: 8, title: 'Introduction to Machine Learning', subject: 'Machine Learning', semester: 5, youtubeId: 'dQw4w9WgXcQ', duration: '55:00' },
  { id: 9, title: 'Linear Regression Deep Dive', subject: 'Machine Learning', semester: 5, youtubeId: 'dQw4w9WgXcQ', duration: '42:00' },
  { id: 10, title: 'TCP/IP Model Explained', subject: 'Computer Networks', semester: 4, youtubeId: 'dQw4w9WgXcQ', duration: '37:00' },
  { id: 11, title: 'Greedy Algorithms', subject: 'ADA', semester: 4, youtubeId: 'dQw4w9WgXcQ', duration: '44:00' },
  { id: 12, title: 'Compiler Phases Overview', subject: 'Compiler Design', semester: 5, youtubeId: 'dQw4w9WgXcQ', duration: '50:00' },
];

// ============================================================
// NAVIGATION ITEMS
// ============================================================

export const navItems = [
  { name: 'Home', path: '/', icon: 'Home' },
  { name: 'Semesters', path: '/semesters', icon: 'BookOpen' },
  { name: 'PYQ', path: '/pyq', icon: 'FileText' },
  { name: 'Videos', path: '/videos', icon: 'Play' },
  { name: 'Quiz', path: '/quiz', icon: 'Brain' },
  { name: 'Flashcards', path: '/flashcards', icon: 'Layers' },
  { name: 'Syllabus', path: '/syllabus', icon: 'ClipboardList' },
  { name: 'Upload Notes', path: '/upload', icon: 'Upload' },
  { name: 'Dashboard', path: '/dashboard', icon: 'LayoutDashboard' },
  { name: 'About', path: '/about', icon: 'Users' },
  { name: 'Contact', path: '/contact', icon: 'Mail' },
  { name: 'AI Agent', path: '/agent', icon: 'Brain' },
  { name: 'Code Playground', path: '/playground', icon: 'FileText' },
  { name: 'YouTube Notes', path: '/youtube-notes', icon: 'Play' },
  { name: 'SRS Flashcards', path: '/flashcards-srs', icon: 'Layers' },
  { name: 'Mock Interview', path: '/mock-interview', icon: 'Users' },
  { name: 'Resume Analyzer', path: '/resume-analyzer', icon: 'FileText' },
];
