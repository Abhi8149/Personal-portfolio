export const profile = {
  name: 'Abhinav Shivkumar',
  fullName: 'Abhinav Shivkumar Ovhal',
  email: 'abhinavshivkumar03@gmail.com',
  resume: '/Abhinav_Shivkumar_Resume.pdf',
  github: 'https://github.com/Abhi8149',
  linkedin: 'https://linkedin.com/in/abhinav-shivkumar-a00b35290',
  medium: 'https://medium.com/@abhinavjyoti09',
  youtube: 'https://www.youtube.com/@Abhinav-m2i4w',
  codolio: 'https://codolio.com/profile/zujIx7WJ',
} as const;

export interface Project {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  category: 'featured' | 'web' | 'ai' | 'system';
  status: 'shipped' | 'live' | 'deployed' | 'research';
  tech: string[];
  github?: string;
  live?: string;
  liveLabel?: string;
  quote?: string;
  featured?: boolean;
  videoId?: string;
  videoTitle?: string;
  duration?: string;
  highlights?: string[];
  metric?: string;
  secondaryGithub?: string;
  secondaryGithubLabel?: string;
  portraitVideo?: boolean;
}

export interface SystemProject {
  id: string;
  name: string;
  description: string;
  patterns: string[];
  github: string;
  focus?: string;
}

export interface AIProject {
  id: string;
  name: string;
  tagline: string;
  description: string;
  approach: string;
  tech: string[];
  github?: string;
  stats?: { value: string; label: string }[];
}

export const projects: Project[] = [
  {
    id: 'abhiclaw',
    name: 'AbhiClaw',
    description: 'A human-in-the-loop AI coding agent.',
    longDescription:
      'An OpenClaw-inspired coding agent that can plan, research, edit, and manage tasks without taking control away from the developer.',
    category: 'featured',
    status: 'shipped',
    tech: ['TypeScript', 'Bun', 'Vercel AI SDK', 'OpenRouter', 'SQLite'],
    github: 'https://github.com/Abhi8149/Openclaw-MVP-build-from-scratch',
    videoId: 'uewKXN6FbbI',
    videoTitle: 'AbhiClaw — AI coding agent demo',
    duration: '2:44',
    highlights: [
      'Agent, Plan, and read-only Ask modes',
      'Approval gates with risk-tiered actions',
      'Resilient edits, web research, and Git checkpoints',
    ],
    metric: 'Human-approved mutations',
    featured: true,
  },
  {
    id: 'ethereum-phishing',
    name: 'Ethereum Wallet Risk Checker',
    description: 'Graph-based phishing detection for Ethereum accounts.',
    longDescription:
      'An ML research project and Streamlit application that analyzes transaction behavior to estimate phishing risk for Ethereum wallet addresses.',
    category: 'ai',
    status: 'research',
    tech: ['Python', 'PyTorch', 'Streamlit', 'scikit-learn', 'Etherscan API'],
    github: 'https://github.com/Abhi8149/Ethereum-phishing-website',
    secondaryGithub: 'https://github.com/Abhi8149/Attention-Fusion-phishing-comparison',
    secondaryGithubLabel: 'Research code',
    videoId: 'ENWCKQAHcHU',
    videoTitle: 'Ethereum phishing account detection demo',
    duration: '2:56',
    highlights: [
      'Cross-stream fusion of DA-HGNN and GAE pipelines',
      'Chronological splits across 44,000+ edge timestamps',
      'Interactive wallet-risk predictions with Etherscan data',
    ],
    metric: '0.850 AUC-ROC',
    featured: true,
  },
  {
    id: 'availo',
    name: 'Availo',
    description: 'Local commerce, built around neighborhoods.',
    longDescription:
      'A cross-platform app connecting local shopkeepers and customers through nearby discovery, live product availability, offers, and orders.',
    category: 'featured',
    status: 'live',
    tech: ['React Native', 'Expo', 'Convex', 'Clerk', 'OneSignal', 'Cloudinary'],
    github: 'https://github.com/Abhi8149/Availo-1.0',
    live: 'https://play.google.com/store/apps/details?id=com.shopstatus.app',
    liveLabel: 'Get it on Google Play',
    videoId: 'WdehRd6Qqn8',
    videoTitle: 'Availo — local shop discovery app demo',
    duration: '1:39',
    portraitVideo: true,
    highlights: [
      'Nearby shop and product discovery with availability',
      'Shopkeeper tools for inventory, orders, and offers',
      'Pickup, delivery, and local notification workflows',
    ],
    metric: '100+ Play Store downloads',
    featured: true,
  },
  {
    id: 'abhidocs',
    name: 'AbhiDocs',
    description: 'Real-time collaborative document editing with secure sharing.',
    longDescription:
      'A Google Docs-like application where multiple users can edit documents simultaneously with real-time synchronization.',
    category: 'web',
    status: 'live',
    tech: ['Next.js', 'TypeScript', 'MongoDB', 'NextAuth.js', 'WebSockets'],
    github: 'https://github.com/Abhi8149/abhidocs',
    live: 'https://abhidocs.vercel.app',
  },
  {
    id: 'true-feedback',
    name: 'True Feedback',
    description: 'Anonymous messaging designed for honest conversations.',
    longDescription:
      'A platform for creating a unique feedback link and receiving genuine, anonymous thoughts from friends and colleagues.',
    category: 'web',
    status: 'live',
    tech: ['Next.js', 'TypeScript', 'MongoDB', 'Resend', 'ShadCN UI'],
    github: 'https://github.com/Abhi8149/true-feedback',
    live: 'https://true-feedback-six.vercel.app',
  },
  {
    id: 'chat-app',
    name: 'Real-Time Chat',
    description: 'Low-latency messaging with presence and persistent history.',
    longDescription:
      'A full-stack chat application with WebSocket messaging, user presence, authentication, and persistent conversations.',
    category: 'web',
    status: 'shipped',
    tech: ['React', 'Node.js', 'Express', 'Socket.io', 'MongoDB'],
    github: 'https://github.com/Abhi8149/chat-app',
  },
];

export const aiProjects: AIProject[] = [
  {
    id: 'ethereum-research',
    name: 'Ethereum Phishing Detection',
    tagline: 'Finding illicit signals inside transaction graphs.',
    description:
      'A graph-machine-learning pipeline built for extreme class imbalance, combining wallet behavior with transaction topology instead of relying on account features alone.',
    approach:
      'Cross-stream attention combines DA-HGNN and GAE embeddings. Strict chronological node splits prevent temporal leakage, while the Streamlit app turns the research into an address-checking workflow.',
    tech: ['PyTorch', 'PyTorch Geometric', 'Streamlit', 'scikit-learn', 'Etherscan'],
    github: 'https://github.com/Abhi8149/Attention-Fusion-phishing-comparison',
    stats: [
      { value: '7.2×', label: 'F1-score improvement' },
      { value: '0.850', label: 'AUC-ROC' },
      { value: '44K+', label: 'edge timestamps' },
      { value: '40:1', label: 'imbalance ratio' },
    ],
  },
  {
    id: 'ai-image-detection',
    name: 'AI vs Real Image Detection',
    tagline: 'Can you still tell what is real?',
    description:
      'A full-stack deep-learning tool for drag-and-drop binary classification of AI-generated images and real photographs.',
    approach:
      'A custom Inception-based CNN sits behind a Flask REST API, with automated 224×224 resizing, normalization, and RGB preprocessing.',
    tech: ['TensorFlow', 'Keras', 'Flask', 'React', 'CNN'],
    github: 'https://github.com/Abhi8149/Real-Vs-AI-generated-image-checker',
  },
  {
    id: 'gan-mnist',
    name: 'GAN Image Generator',
    tagline: 'Teaching machines to imagine.',
    description:
      'A Generative Adversarial Network trained on MNIST to generate handwritten digits through an adversarial training loop.',
    approach:
      'The generator learns to create images from random noise while the discriminator learns to distinguish generated samples from real digits.',
    tech: ['TensorFlow', 'Keras', 'GAN', 'Python', 'NumPy'],
    github: 'https://github.com/Abhi8149/MNIST-Image-generator',
  },
  {
    id: 'rag-chat',
    name: 'RAG Document Chat',
    tagline: 'Chat with the knowledge inside a document.',
    description:
      'A retrieval-augmented generation workflow for asking contextual questions across uploaded documents.',
    approach:
      'Documents are chunked and embedded, relevant passages are retrieved through semantic search, and an LLM responds with that context.',
    tech: ['LangChain', 'RAG', 'Vector Search', 'Python', 'LLMs'],
    github: 'https://github.com/Abhi8149/Chat-with-documents',
  },
];

export const systemProjects: SystemProject[] = [
  {
    id: 'zomato-lld',
    name: 'Zomato LLD',
    description: 'Food-delivery architecture covering restaurants, orders, deliveries, and reviews.',
    patterns: ['Observer · Order tracking', 'Factory · Payments', 'Singleton · Restaurant manager'],
    github: 'https://github.com/Abhi8149/Zomato-LLD',
    focus: 'Domain modeling and an event-driven order lifecycle',
  },
  {
    id: 'spotify-lld',
    name: 'Spotify LLD',
    description: 'Music-player architecture with playlists, preferences, and streaming simulation.',
    patterns: ['Strategy · Playback', 'Decorator · Premium features', 'Composite · Playlists'],
    github: 'https://github.com/Abhi8149/Spotify-LLD',
    focus: 'Extensible playback and user personalization',
  },
  {
    id: 'payment-lld',
    name: 'Payment Gateway LLD',
    description: 'Transaction processing with wallets, refunds, validation, and fraud controls.',
    patterns: ['State · Transactions', 'Chain of Responsibility · Validation', 'Builder · Complex objects'],
    github: 'https://github.com/Abhi8149/Payment-Gateway-LLD',
    focus: 'Reliability, validation chains, and payment-state control',
  },
  {
    id: 'zepto-lld',
    name: 'Zepto LLD',
    description: 'Quick-commerce design with inventory, delivery slots, and fulfillment tracking.',
    patterns: ['Repository · Inventory', 'Event Sourcing', 'CQRS'],
    github: 'https://github.com/Abhi8149/Zepto-LLD',
    focus: 'Inventory consistency with fast order orchestration',
  },
  {
    id: 'docs-lld',
    name: 'Google Docs LLD',
    description: 'Collaborative editing with real-time sync, versioning, and access control.',
    patterns: ['Command · Undo/redo', 'Memento · Versioning', 'Proxy · Access control'],
    github: 'https://github.com/Abhi8149/Document-Editor-LLD',
    focus: 'Operational workflows and conflict-safe collaboration',
  },
  {
    id: 'dating-lld',
    name: 'Dating App LLD',
    description: 'A matching system with profiles, swipes, notifications, and compatibility logic.',
    patterns: ['Strategy · Matching', 'Observer · Notifications', 'Facade · User profiles'],
    github: 'https://github.com/Abhi8149/Dating-App-LLD',
    focus: 'Matching pipelines and social-interaction orchestration',
  },
  {
    id: 'snake-ladder-lld',
    name: 'Snake & Ladder LLD',
    description: 'Board-game architecture with deterministic state progression and player turns.',
    patterns: ['State · Turn flow', 'Factory · Board elements', 'Strategy · Dice rules'],
    github: 'https://github.com/Abhi8149',
    focus: 'Core OOP modeling and predictable state transitions',
  },
  {
    id: 'tic-tac-toe-lld',
    name: 'Tic Tac Toe LLD',
    description: 'A reusable game engine for board validation, turns, and win conditions.',
    patterns: ['Template Method', 'Strategy · Win checks', 'Command · Moves'],
    github: 'https://github.com/Abhi8149',
    focus: 'Clean abstractions and testable game logic',
  },
];

export const skills = {
  languages: ['Python', 'TypeScript', 'JavaScript', 'C++', 'C'],
  frontend: ['React', 'Next.js', 'React Native', 'Expo', 'Tailwind CSS'],
  backend: ['Node.js', 'Express', 'Flask', 'REST APIs', 'WebSockets'],
  databases: ['MongoDB', 'PostgreSQL', 'MySQL', 'SQLite', 'Convex', 'Prisma'],
  ml: ['PyTorch', 'TensorFlow', 'Keras', 'scikit-learn', 'LangChain', 'RAG'],
  tools: ['Git', 'Bun', 'Postman', 'Vercel', 'N8N'],
};
