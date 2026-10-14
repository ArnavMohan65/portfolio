import { ProjectItem, ExperienceItem, SkillDomain } from '../types/portfolio';

export const PROFILE_DATA = {
  name: 'Arnav Mohan',
  introLabel: 'COMPUTER SCIENCE ENGINEER // SOFTWARE DEVELOPER',
  primaryHeadline: 'I BUILD SYSTEMS THAT SCALE.',
  supportingHeadline: 'Backend Engineering. Cloud Infrastructure. AI/ML. Systems Programming.',
  heroDescription:
    "I'm Arnav Mohan, a software engineer focused on building reliable backend services, scalable cloud applications, full-stack products, and practical AI/ML systems.",
  location: 'Hyderabad, India',
  email: 'arnavmohan65@gmail.com',
  githubUrl: 'https://github.com/ArnavMohan65',
  themeReferenceRepo: 'https://github.com/ArnavMohan65/persona5-website-theme',
  linkedinUrl: 'https://www.linkedin.com/in/arnav-mohan',
  resumePdfPath: '/Arnav_Mohan_Resume.pdf',
  education: {
    institution: 'Vellore Institute of Technology-AP University',
    location: 'Vijayawada, India',
    degree: 'B.Tech. in Computer Science Engineering',
    cgpa: '9.2 / 10.0',
    cgpaNote: 'Reported through the 6th semester',
    dates: 'September 2022 – July 2026',
  },
  professionalSummary: [
    'Software engineer specializing in building resilient backend architectures, distributed cloud data pipelines, and responsive full-stack web applications.',
    'Experienced in designing real-time event processing workflows on Google Cloud Platform at Deloitte USI, architecting RESTful and Socket.IO services in Node.js, and deploying multi-modal computer vision systems in Python.',
    'Grounded in computer science fundamentals, OWASP security practices, and observable systems engineering.',
  ],
  engineeringPhilosophy: [
    {
      code: 'PRIN-01',
      title: 'Build for reliability, not just the happy path.',
      detail: 'Design systems that anticipate network partitions, malformed payloads, and downstream latency spikes without cascading failures.',
    },
    {
      code: 'PRIN-02',
      title: 'Make systems observable and debuggable.',
      detail: 'Structured logging, distributed tracing, and actionable alerting are first-class architectural requirements, not post-incident patches.',
    },
    {
      code: 'PRIN-03',
      title: 'Prefer clear architecture over unnecessary complexity.',
      detail: 'Write decoupled, maintainable modules with explicit data boundaries so future engineers can reason about state effortlessly.',
    },
    {
      code: 'PRIN-04',
      title: 'Treat security as an engineering requirement.',
      detail: 'Embed OWASP Top 10 mitigations, least-privilege access, and Zero Trust assumptions directly into the software development lifecycle.',
    },
    {
      code: 'PRIN-05',
      title: 'Measure performance instead of guessing.',
      detail: 'Profile query execution paths, frame processing latency, and memory allocations before introducing caching or concurrency layers.',
    },
  ],
};

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: 'visiontrack',
    number: '01',
    name: 'VisionTrack',
    slug: 'visiontrack',
    tagline: 'AI-Powered Automated Smart Attendance & Access Control System',
    description:
      'An end-to-end computer vision and automated authentication pipeline combining CNN/YOLO facial recognition with Tesseract OCR license plate detection for real-time enterprise access control.',
    categories: ['AI/ML Engineering', 'Backend Engineering', 'Real-Time Systems'],
    techStack: ['Python', 'Computer Vision', 'CNN', 'YOLO', 'OpenCV', 'Tesseract OCR'],
    featured: true,
    problemStatement:
      'Manual security checkpoints and badge-only attendance systems suffer from entry bottlenecks, tailgating risks, and a lack of synchronized vehicle-to-personnel verification.',
    goalsAndConstraints: [
      'Process multi-stream video inputs with low latency suitable for active entry gates.',
      'Combine dual-modality biometrics (facial identity via CNN/YOLO) and vehicular identity (license plate extraction via Tesseract OCR) in one software pipeline.',
      'Maintain high recognition accuracy across varying lighting conditions and camera angles.',
    ],
    contributions: [
      'Architected the distributed video frame ingestion and preprocessing pipeline in Python using OpenCV.',
      'Integrated YOLO object detection and Convolutional Neural Networks (CNNs) for multi-stage facial detection and feature embedding verification.',
      'Implemented license plate localization and character extraction using Tesseract OCR with custom image thresholding and contour filtering.',
      'Built the authentication decision engine linking recognition confidence thresholds directly to automated attendance logging and access control triggers.',
    ],
    architectureSummary:
      'Distributed video capture feeds into an OpenCV frame normalization layer, bifurcating into parallel YOLO/CNN facial recognition and Tesseract OCR plate extraction workers before converging at the real-time authentication state machine.',
    architectureNodes: [
      {
        id: 'v1',
        label: 'OpenCV Frame Ingest',
        sublabel: 'ROI Crop & Normalization',
        role: 'input',
        technicalSpec:
          'Captures RTSP/camera frames, performs grayscale conversion, bilateral noise filtering, and adaptive histogram equalization to stabilize varying gate lighting.',
      },
      {
        id: 'v2',
        label: 'YOLO + CNN Facial Pass',
        sublabel: 'Detection & Embedding Match',
        role: 'process',
        technicalSpec:
          'YOLO isolates face bounding boxes in real time; cropped tensors are passed to a CNN classifier achieving a resume-reported 98% facial recognition accuracy.',
      },
      {
        id: 'v3',
        label: 'Tesseract OCR Plate Pass',
        sublabel: 'Contour & Alphanumeric OCR',
        role: 'process',
        technicalSpec:
          'Localizes rectangular vehicle plate contours, applies morphological thresholding, and extracts registration strings at a resume-reported 92% plate detection accuracy.',
      },
      {
        id: 'v4',
        label: 'Auth Decision Engine',
        sublabel: 'Attendance & Gate Trigger',
        role: 'output',
        technicalSpec:
          'Correlates facial identity and vehicle plate records against authorized employee directories, logging timestamped attendance with low end-to-end latency.',
      },
    ],
    technicalArtifact: {
      title: 'Dual-Modality Frame Processing & Verification Pipeline (Conceptual Architecture)',
      language: 'python',
      explanation:
        'Illustrates how VisionTrack decouples frame preprocessing from parallel YOLO/CNN facial verification and Tesseract OCR license plate extraction.',
      code: `def process_gate_frame(frame, auth_registry):
    # 1. OpenCV Normalization & ROI Isolation
    normalized = cv2.bilateralFilter(frame, d=9, sigmaColor=75, sigmaSpace=75)
    
    # 2. Facial Detection (YOLO) + Identity Classification (CNN)
    face_boxes = yolo_detector.detect_faces(normalized)
    face_match = cnn_verifier.classify_embedding(normalized, face_boxes)
    
    # 3. License Plate Contour Localization + Tesseract OCR
    plate_roi = extract_plate_contour(normalized)
    plate_text = pytesseract.image_to_string(plate_roi, config='--psm 7').strip()
    
    # 4. Dual-Factor Access Control & Attendance Logging
    if face_match.confidence >= 0.95 and auth_registry.is_valid(face_match.emp_id, plate_text):
        return record_attendance(emp_id=face_match.emp_id, plate=plate_text, status="GRANTED")
    return {"status": "DENIED", "reason": "THRESHOLD_OR_REGISTRY_MISMATCH"}`,
    },
    implementationDetails: [
      'Frame decimation and Region of Interest (ROI) cropping to avoid running heavy CNN inference on static background pixels.',
      'Bilateral filtering and adaptive histogram equalization in OpenCV prior to Tesseract OCR execution to handle glare on metallic license plates.',
      'Decoupled inference workers from the camera capture loop to prevent I/O frame drops during simultaneous employee arrivals.',
    ],
    challengesAndTradeoffs: [
      'Balanced spatial resolution against inference latency: downscaling frames sped up YOLO bounding-box detection while retaining high-resolution crops specifically for the secondary CNN and OCR passes.',
      'Tuned confidence thresholds to minimize false positives in access control while preserving smooth gate throughput.',
    ],
    metrics: [
      {
        label: 'Facial Recognition Accuracy',
        value: '98%',
        context: 'Resume-reported verification accuracy using combined YOLO detection and CNN classification.',
      },
      {
        label: 'License Plate Detection Accuracy',
        value: '92%',
        context: 'Resume-reported extraction rate across vehicle entry streams using OpenCV + Tesseract OCR.',
      },
    ],
    repoUrl: 'https://github.com/ArnavMohan65',
  },
  {
    id: 'food-for-all',
    number: '02',
    name: 'Food For All',
    slug: 'food-for-all',
    tagline: 'Real-Time Full-Stack Food Donation & Redistribution Platform',
    description:
      'A high-availability full-stack platform connecting surplus food donors with NGOs and volunteers in real time using Node.js, Express.js, MongoDB, RESTful APIs, and Socket.IO.',
    categories: ['Full-Stack Development', 'Backend Engineering', 'Real-Time Systems', 'Cloud & Infrastructure'],
    techStack: ['React', 'Node.js', 'Express.js', 'MongoDB', 'Socket.IO', 'REST APIs', 'Heroku'],
    featured: true,
    achievementBadge: 'Top 15 Finish — Hackfest2k24',
    problemStatement:
      'Perishable surplus food from restaurants and events often goes to waste due to fragmented communication channels and stale inventory listings between donors and local distribution networks.',
    goalsAndConstraints: [
      'Deliver immediate, low-latency notifications when perishable donations are posted or claimed.',
      'Prevent race conditions when multiple volunteers attempt to claim the same donation batch simultaneously.',
      'Ensure continuous uptime and fast database retrieval under live Hackfest2k24 evaluation traffic.',
    ],
    contributions: [
      'Designed and implemented the RESTful API layer in Node.js and Express.js for donor listings, user authentication, and claim lifecycle management.',
      'Engineered bidirectional event broadcasting with Socket.IO so active clients see live donation availability updates without HTTP polling.',
      'Structured MongoDB schemas and compound indexes to accelerate status-based and regional donation queries.',
      'Managed cloud deployment, environment configuration, and live performance monitoring on Heroku during Hackfest2k24.',
    ],
    architectureSummary:
      'React clients communicate with a Node.js/Express REST API for transactional state transitions and maintain persistent Socket.IO WebSocket connections for instant inventory broadcasts backed by indexed MongoDB collections.',
    architectureNodes: [
      {
        id: 'f1',
        label: 'React Client Layer',
        sublabel: 'Donor & NGO Live Feeds',
        role: 'input',
        technicalSpec:
          'Subscribes to Socket.IO room broadcasts for instant UI state reconciliation while issuing authenticated REST mutations for posting or claiming listings.',
      },
      {
        id: 'f2',
        label: 'Node.js + Express REST API',
        sublabel: 'Atomic Claim Controllers',
        role: 'process',
        technicalSpec:
          'Handles stateless JWT authentication, input validation, and atomic claim transitions, contributing to a resume-reported 60% server performance improvement.',
      },
      {
        id: 'f3',
        label: 'Socket.IO Event Bus',
        sublabel: 'Bidirectional Pub/Sub',
        role: 'process',
        technicalSpec:
          'Pushes lightweight delta payloads (donation:created, donation:claimed) to connected NGOs, driving a resume-reported 50% improvement in user retention.',
      },
      {
        id: 'f4',
        label: 'MongoDB + Heroku Host',
        sublabel: 'Compound Indexed Store',
        role: 'storage',
        technicalSpec:
          'Uses compound indexes on status and expiration timestamps for 70% faster retrieval while maintaining 99.9% uptime on Heroku during Hackfest2k24.',
      },
    ],
    technicalArtifact: {
      title: 'Atomic MongoDB Claim Transition + Socket.IO Real-Time Broadcast',
      language: 'javascript',
      explanation:
        'Demonstrates how Food For All prevents double-claiming race conditions using an atomic MongoDB filter before broadcasting the state change over Socket.IO.',
      code: `// POST /api/donations/:id/claim — Atomic transition + real-time Socket.IO emit
app.post('/api/donations/:id/claim', authenticateNGO, async (req, res) => {
  const { id } = req.params;
  const ngoId = req.user.id;

  // Atomic check-and-set: only transitions if status is currently 'AVAILABLE'
  const updatedListing = await Donation.findOneAndUpdate(
    { _id: id, status: 'AVAILABLE' },
    { $set: { status: 'CLAIMED', claimedBy: ngoId, claimedAt: new Date() } },
    { new: true, projection: { title: 1, status: 1, location: 1, claimedBy: 1 } }
  ).lean();

  if (!updatedListing) {
    return res.status(409).json({ error: 'LISTING_ALREADY_CLAIMED' });
  }

  // Broadcast delta event to all active clients via Socket.IO
  io.emit('donation:status_updated', { id, status: 'CLAIMED', claimedBy: ngoId });
  return res.status(200).json(updatedListing);
});`,
    },
    implementationDetails: [
      'Implemented atomic state updates in MongoDB when transitioning food listings from AVAILABLE to CLAIMED to eliminate double-booking.',
      'Separated REST payload hydration from lightweight Socket.IO delta events to minimize bandwidth overhead.',
      'Optimized Express middleware chains and database query projections (.lean() and selective field projection) to reduce server response times.',
    ],
    challengesAndTradeoffs: [
      'Under strict hackathon deadlines, prioritized a unified Node.js server housing both REST endpoints and the Socket.IO instance to simplify session sharing and deployment on Heroku.',
      'Designed schema indexes around the most frequent read patterns (active unclaimed donations) at the minor cost of slightly heavier write operations.',
    ],
    metrics: [
      {
        label: 'Database Retrieval Speed',
        value: '+70%',
        context: 'Resume-reported improvement in query retrieval speed via MongoDB schema and index optimization.',
      },
      {
        label: 'Server Performance',
        value: '+60%',
        context: 'Resume-reported improvement in backend response handling and payload processing.',
      },
      {
        label: 'Event Uptime',
        value: '99.9%',
        context: 'Resume-reported availability maintained on Heroku throughout Hackfest2k24 evaluation.',
      },
      {
        label: 'User Retention',
        value: '+50%',
        context: 'Resume-reported increase driven by real-time Socket.IO status updates and responsive UX.',
      },
    ],
    repoUrl: 'https://github.com/ArnavMohan65',
  },
  {
    id: 'india-watch-news',
    number: '03',
    name: 'India Watch News Application',
    slug: 'india-watch-news',
    tagline: 'High-Performance Bilingual News Aggregator with Infinite Scroll',
    description:
      'A performance-engineered React and TypeScript web application delivering continuous news feeds with seamless English and Hindi localization and strict client-side resource management.',
    categories: ['Full-Stack Development'],
    techStack: ['React', 'TypeScript', 'Frontend Engineering', 'Internationalization'],
    featured: true,
    problemStatement:
      'Content-heavy news portals frequently suffer from layout thrashing, memory spikes during long scrolling sessions, and jarring page reloads when switching between regional languages.',
    goalsAndConstraints: [
      'Support seamless switching between English and Hindi without losing scroll context or application state.',
      'Implement smooth infinite scrolling capable of handling continuous article batches without degrading DOM responsiveness.',
      'Enforce strict TypeScript contracts for external news feed payloads to prevent runtime rendering crashes.',
    ],
    contributions: [
      'Built the modular frontend architecture in React and strict TypeScript with strongly typed data adapters.',
      'Implemented IntersectionObserver-driven infinite scrolling with debounced fetch triggers and pagination cursors.',
      'Engineered the bilingual internationalization (i18n) state layer supporting dynamic English and Hindi typography and UI labels.',
      'Optimized component re-render boundaries and image lazy-loading to sustain smooth frame rates on mobile and desktop browsers.',
    ],
    architectureSummary:
      'Typed API ingestion layer normalizes external article payloads into a centralized React state store, feeding an IntersectionObserver infinite-scroll viewport and dynamic EN/HI localization dictionary.',
    architectureNodes: [
      {
        id: 'n1',
        label: 'Typed Feed Adapter',
        sublabel: 'Strict TS Validation',
        role: 'input',
        technicalSpec:
          'Validates and normalizes external news payloads into strict TypeScript interfaces with safe fallback values for missing media assets.',
      },
      {
        id: 'n2',
        label: 'Bilingual i18n Engine',
        sublabel: 'Instant EN / HI Context',
        role: 'process',
        technicalSpec:
          'Switches locale dictionaries and Devanagari/Latin typographic line-height tokens without unmounting the active scroll container.',
      },
      {
        id: 'n3',
        label: 'IntersectionObserver',
        sublabel: 'Non-Blocking Prefetch',
        role: 'process',
        technicalSpec:
          'Observes a sentinel DOM element near the viewport bottom to trigger cursor-based pagination off the main scroll thread.',
      },
      {
        id: 'n4',
        label: 'Memoized Feed DOM',
        sublabel: 'Zero-Reflow Batch Append',
        role: 'output',
        technicalSpec:
          'Uses React.memo and stable article keys so appending page N+1 never forces re-renders across previously mounted article cards.',
      },
    ],
    technicalArtifact: {
      title: 'Type-Safe IntersectionObserver Infinite Scroll Hook',
      language: 'typescript',
      explanation:
        'Keeps scroll performance smooth by decoupling pagination triggers from high-frequency window scroll events.',
      code: `export function useInfiniteFeed<T>(fetchNextPage: () => Promise<void>, hasMore: boolean) {
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const isFetching = useRef(false);

  useEffect(() => {
    if (!hasMore || !sentinelRef.current) return;
    const observer = new IntersectionObserver(
      async ([entry]) => {
        if (entry.isIntersecting && !isFetching.current) {
          isFetching.current = true;
          await fetchNextPage();
          isFetching.current = false;
        }
      },
      { rootMargin: '280px 0px' } // Prefetch before user hits bottom
    );
    observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, [fetchNextPage, hasMore]);

  return sentinelRef;
}`,
    },
    implementationDetails: [
      'Utilized native IntersectionObserver APIs rather than scroll-event listeners to keep the main UI thread unblocked.',
      'Applied React memoization and stable key partitioning so appending new article batches never re-renders existing DOM nodes.',
      'Created fallback UI skeletons and graceful error boundaries for malformed upstream article imagery.',
    ],
    challengesAndTradeoffs: [
      'Devanagari (Hindi) script requires different line-height and vertical rhythm tolerances than Latin text; engineered adaptive CSS typography tokens that adjust automatically upon language toggle.',
    ],
    metrics: [
      {
        label: 'Language Support',
        value: 'EN / HI',
        context: 'Full bilingual support for English and Hindi readers with zero-reload state switching.',
      },
      {
        label: 'Feed Architecture',
        value: 'Infinite Scroll',
        context: 'Non-blocking IntersectionObserver pagination with strict TypeScript data safety.',
      },
    ],
    repoUrl: 'https://github.com/ArnavMohan65',
  },
];

export const EXPERIENCE_DATA: ExperienceItem[] = [
  {
    id: 'deloitte-usi',
    company: 'Deloitte USI',
    role: 'BTA Intern',
    period: 'January 2026 – Present',
    location: 'Hyderabad, India',
    arrangement: 'On-site / Hybrid',
    domainFocus: 'Real-Time Cloud Analytics Pipelines, Distributed Event Systems & Observability',
    responsibilities: [
      'Designed and maintained real-time analytics pipelines using Python on Google Cloud Platform (GCP).',
      'Engineered data processing workflows handling large-scale event datasets under high-availability requirements.',
      'Contributed to distributed event technology infrastructure with a focus on fault tolerance and low-latency processing.',
      'Implemented and managed structured logging, distributed tracing, and automated alerting to reinforce production reliability.',
      'Collaborated within an Agile engineering team while applying secure coding standards and system-hardening practices.',
    ],
    technologies: [
      'Python',
      'Google Cloud Platform (GCP)',
      'Distributed Event Systems',
      'Distributed Tracing & Logging',
      'Production Alerting',
      'Secure SDLC',
    ],
    architectureNodes: [
      {
        id: 'd1',
        label: 'High-Volume Event Stream',
        sublabel: 'Distributed Event Ingest',
        role: 'input',
        technicalSpec:
          'Ingests large-scale distributed event datasets designed for high availability and fault-tolerant buffering on GCP.',
      },
      {
        id: 'd2',
        label: 'Python GCP Pipeline',
        sublabel: 'Real-Time Analytics Workers',
        role: 'process',
        technicalSpec:
          'Executes stateless and windowed Python transformation logic on Google Cloud Platform with strict schema validation and secure coding practices.',
      },
      {
        id: 'd3',
        label: 'Observability & Tracing',
        sublabel: 'Logs, Traces & Alerting',
        role: 'process',
        technicalSpec:
          'Emits structured telemetry, distributed trace spans, and automated anomaly alerts to ensure rapid root-cause isolation and high availability.',
      },
      {
        id: 'd4',
        label: 'Analytics Sink & Consumers',
        sublabel: 'Reliable Downstream State',
        role: 'output',
        technicalSpec:
          'Delivers processed analytics datasets to downstream enterprise consumers under hardened security controls.',
      },
    ],
    engineeringDeepDive: {
      title: 'Cloud Reliability & Observability Engineering Highlights',
      points: [
        'Pipeline Resilience: Built Python data-processing stages on GCP tailored for high-availability event streams.',
        'Full-Stack Observability: Integrated structured logging, distributed tracing across asynchronous boundaries, and proactive alerting to minimize Mean Time to Detect (MTTD).',
        'Security Hardening: Applied secure SDLC and system-hardening principles within an enterprise Agile workflow.',
      ],
    },
  },
  {
    id: 'bolt-innovative',
    company: 'Bolt Innovative Transformations India Pvt. Ltd.',
    role: 'Salesforce Developer Intern',
    period: 'July 2025 – December 2025',
    location: 'India',
    arrangement: 'Remote',
    domainFocus: 'Enterprise Cloud Applications, Workflow Automation & CRM Data Modeling',
    responsibilities: [
      'Built and configured enterprise business applications across Salesforce Sales Cloud and Service Cloud.',
      'Designed automated multi-step business workflows using Lightning App Builder and Flow Automation.',
      'Earned Expeditioner Rank on Salesforce Trailhead with 25+ verified badges across CRM architecture, process automation, and cloud application development.',
      'Developed production relational data models, role hierarchies, and cloud-based business solutions.',
    ],
    technologies: [
      'Salesforce Sales & Service Cloud',
      'Lightning App Builder',
      'Flow Automation',
      'Relational Data Modeling',
      'Enterprise Cloud Workflows',
    ],
    architectureNodes: [
      {
        id: 'b1',
        label: 'CRM Relational Schema',
        sublabel: 'Custom Objects & Security',
        role: 'storage',
        technicalSpec:
          'Models enterprise entities, lookup/master-detail relationships, and role-based field-level security.',
      },
      {
        id: 'b2',
        label: 'Flow Automation Engine',
        sublabel: 'Declarative Business Logic',
        role: 'process',
        technicalSpec:
          'Orchestrates record-triggered and scheduled automation flows across Sales Cloud and Service Cloud.',
      },
      {
        id: 'b3',
        label: 'Lightning App Builder',
        sublabel: 'Enterprise UI Composition',
        role: 'output',
        technicalSpec:
          'Delivers tailored, role-specific cloud workspaces backed by 25+ Trailhead-verified CRM & automation competencies.',
      },
      {
        id: 'b4',
        label: 'Sales & Service Cloud',
        sublabel: 'Production CRM Workflows',
        role: 'output',
        technicalSpec:
          'Supports end-to-end customer lifecycle and case resolution workflows in a cloud-native environment.',
      },
    ],
    engineeringDeepDive: {
      title: 'Enterprise Data Modeling & Workflow Engineering',
      points: [
        'Relational Modeling: Structured multi-tenant data schemas with clean validation rules and access hierarchies.',
        'Process Automation: Replaced manual multi-step operations with deterministic Flow Automation pipelines.',
      ],
    },
  },
];

export const SKILL_DOMAINS: SkillDomain[] = [
  {
    id: 'languages',
    title: 'Programming Languages',
    code: 'DOM-01',
    description: 'Core languages used for systems programming, backend services, data pipelines, and type-safe web applications.',
    skills: ['Java', 'C++', 'SQL', 'JavaScript', 'TypeScript', 'Python'],
    connectedDomains: ['backend', 'systems', 'aiml'],
  },
  {
    id: 'backend',
    title: 'Backend & Web Development',
    code: 'DOM-02',
    description: 'Event-driven server runtimes, RESTful API design, bidirectional WebSockets, and modern reactive frontends.',
    skills: ['Node.js', 'Express.js', 'RESTful APIs', 'Socket.IO', 'React'],
    connectedDomains: ['languages', 'databases', 'cloud'],
  },
  {
    id: 'cloud',
    title: 'Cloud & Deployment',
    code: 'DOM-03',
    description: 'Cloud-native infrastructure, real-time analytics hosting, observability, and application deployment platforms.',
    skills: ['Google Cloud Platform (GCP)', 'AWS', 'Heroku'],
    connectedDomains: ['backend', 'databases', 'systems'],
  },
  {
    id: 'aiml',
    title: 'AI/ML & Computer Vision',
    code: 'DOM-04',
    description: 'Deep learning architectures, real-time object detection, optical character recognition, and scientific computing.',
    skills: ['TensorFlow', 'OpenCV', 'YOLO', 'CNNs', 'Tesseract OCR', 'Pandas', 'NumPy', 'Matplotlib'],
    connectedDomains: ['languages', 'backend'],
  },
  {
    id: 'databases',
    title: 'Databases & Persistence',
    code: 'DOM-05',
    description: 'Relational SQL engines and document-oriented NoSQL stores optimized for high-throughput retrieval.',
    skills: ['MongoDB', 'MySQL', 'PostgreSQL'],
    connectedDomains: ['backend', 'cloud', 'systems'],
  },
  {
    id: 'systems',
    title: 'Systems, Security & Fundamentals',
    code: 'DOM-06',
    description: 'Computer science foundations combined with defensive engineering, OWASP mitigations, and Zero Trust principles.',
    skills: [
      'Data Structures and Algorithms',
      'Operating Systems',
      'Computer Networks',
      'Database Management Systems',
      'Software Engineering',
      'OWASP Top 10',
      'Secure SDLC',
      'Zero Trust Architecture',
    ],
    connectedDomains: ['languages', 'backend', 'cloud'],
  },
  {
    id: 'tools',
    title: 'Developer Tools & Workflow',
    code: 'DOM-07',
    description: 'Version control, interactive notebooks, and AI-augmented engineering environments.',
    skills: ['Git', 'GitHub', 'VS Code', 'Jupyter Notebook', 'OpenAI Codex', 'GitHub Copilot'],
    connectedDomains: ['languages', 'backend', 'aiml'],
  },
];