export interface Project {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  category: "featured" | "web" | "ai" | "system";
  status: "shipped" | "live" | "deployed" | "research";
  tech: string[];
  github?: string;
  live?: string;
  quote?: string;
  featured?: boolean;
  image?: string;
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
  metrics?: string;
}

export const projects: Project[] = [
  {
    id: "availo",
    name: "Availo",
    description: "Connecting local shopkeepers with local customers",
    longDescription: "A mobile app that bridges the gap between local businesses and their neighborhood customers. Shopkeepers can manage their inventory, receive orders, and track deliveries — all from their phone.",
    category: "featured",
    status: "shipped",
    tech: ["React Native", "Convex db", "google maps api", "expo", "oneSignal"],
    live: "https://play.google.com/store/apps/details?id=com.shopstatus.app&pcampaignid=web_share",
    quote: "I saw local shopkeepers struggling to reach customers. I built the bridge.",
    featured: true,
  },
  {
    id: "abhidocs",
    name: "AbhiDocs",
    description: "Real-time collaborative document editor",
    longDescription: "A Google Docs-like application where multiple users can edit documents simultaneously. Built with real-time WebSocket synchronization and secure sharing controls.",
    category: "web",
    status: "live",
    tech: ["Next.js", "TypeScript", "MongoDB", "NextAuth.js", "WebSockets", "Quill.js"],
    github: "https://github.com/Abhi8149/abhidocs",
    live: "https://abhidocs.vercel.app",
    quote: "Collaboration shouldn't require a subscription.",
  },
  {
    id: "true-feedback",
    name: "True Feedback",
    description: "Anonymous messaging platform for honest feedback",
    longDescription: "A platform that lets people share honest, anonymous feedback with friends and colleagues. Create your unique link, share it, and receive genuine thoughts.",
    category: "web",
    status: "live",
    tech: ["Next.js", "TypeScript", "MongoDB", "NextAuth.js", "Resend", "ShadCN UI"],
    github: "https://github.com/Abhi8149/true-feedback",
    live: "https://true-feedback-six.vercel.app",
    quote: "Sometimes the truth needs anonymity to be free.",
  },
  {
    id: "chat-app",
    name: "Real-Time Chat",
    description: "Scalable messaging with live presence",
    longDescription: "A full-stack real-time chat application with WebSocket-based messaging, user presence tracking, and persistent message history.",
    category: "web",
    status: "live",
    tech: ["Node.js", "Express.js", "Socket.io", "MongoDB", "React.js", "JWT"],
    github: "https://github.com/Abhi8149/chat-app",
    live: "https://github.com/Abhi8149/chat-app",
    quote: "Messages that arrive instantly feel more like conversations.",
  },
];

export const aiProjects: AIProject[] = [
  {
    id: "ethereum-phishing",
    name: "Ethereum Phishing Detection",
    tagline: "The blockchain has no police. I built one.",
    description: "An weighted score of Graph Autoencoder + Randomforest(for classification of node) and Data Augmented Hybrid Graph Neural Network is used for predicting whether the wallet address is phishing or legitimate",
    approach: "Feature extraction from transaction patterns, account age, contract interactions, and behavioral signals. GAE and DA-GNN architecture for pattern recognition across these features.",
    tech: ["TensorFlow", "Keras", "CNN", "Python", "Blockchain APIs"],
    metrics: "Accuracy: 94.2%",
    github: "https://ethereum-phishing-website.onrender.com/",
  },
  {
    id: "gan-mnist",
    name: "GAN Image Generator",
    tagline: "Teaching machines to imagine.",
    description: "A Generative Adversarial Network trained on MNIST to generate realistic handwritten digits. The generator learns to create images while the discriminator learns to distinguish fake from real.",
    approach: "Deep dive into GAN architecture: Generator produces from random noise, discriminator evaluates authenticity. Adversarial training loop with alternating updates.",
    tech: ["TensorFlow", "Keras", "GAN", "Python", "NumPy"],
    metrics: "Stable convergence achieved",
    github: "https://github.com/Abhi8149/MNIST-Image-generator",
  },
  {
    id: "rag-chat",
    name: "RAG Document Chat",
    tagline: "Chat with any document using AI.",
    description: "A Retrieval-Augmented Generation application that lets users upload documents and chat with them. Uses LangChain for orchestration and vector stores for semantic search.",
    approach: "Documents are chunked and embedded using OpenAI's embeddings. User queries find relevant chunks via similarity search, and an LLM generates context-aware responses.",
    tech: ["LangChain", "OpenAI", "Vector Stores", "Python", "Next.js"],
    github: "https://github.com/Abhi8149/Chat-with-documents",
  },
  {
    id: "ai-image-detection",
    name: "AI vs Real Image Detection",
    tagline: "Can you tell what's real anymore?",
    description: "A CNN-based system that distinguishes AI-generated images from real photographs. Essential for combating misinformation in the age of generative AI.",
    approach: "Convolutional neural network trained on diverse dataset of real photos and AI-generated images. Preprocessing pipeline for resize, normalize, and RGB conversion.",
    tech: ["TensorFlow", "Keras", "CNN", "Flask", "React (TypeScript)"],
    metrics: "Binary classification | High accuracy",
    github: "https://github.com/Abhi8149/Real-Vs-AI-generated-image-checker",
  },
  {
    id: "small-language-model",
    name: "Small Language Model",
    tagline: "Training from scratch to understand how LLMs really work.",
    description: "A compact decoder-style language model built for experimentation with tokenization, training loops, and generation behavior. Focused on understanding mechanics, not just API usage.",
    approach: "From data preprocessing to batching, transformer blocks, and autoregressive decoding. Instrumented with training curves and validation checkpoints for transparent learning.",
    tech: ["PyTorch", "Transformers", "Tokenization", "Python", "Jupyter"],
    metrics: "End-to-end training pipeline | from-scratch experiments",
    github: "https://github.com/Abhi8149",
  },
];

export const systemProjects: SystemProject[] = [
  {
    id: "zomato-lld",
    name: "Zomato LLD",
    description: "Low-level design of a food delivery platform covering restaurants, orders, deliveries, and reviews.",
    patterns: ["Observer (Order Tracking)", "Factory (Payment Processing)", "Singleton (Restaurant Manager)"],
    github: "https://github.com/Abhi8149/Zomato-LLD",
    focus: "Domain modeling and event-driven order lifecycle",
  },
  {
    id: "spotify-lld",
    name: "Spotify LLD",
    description: "Music player architecture with playlist management, user preferences, and streaming simulation.",
    patterns: ["Strategy (Playback)", "Decorator (Premium Features)", "Composite (Playlists)"],
    github: "https://github.com/Abhi8149/Spotify-LLD",
    focus: "Extensible playback architecture and user personalization",
  },
  {
    id: "payment-lld",
    name: "Payment Gateway LLD",
    description: "Transaction processing system similar to Razorpay with wallet, refunds, and fraud detection.",
    patterns: ["State (Transaction)", "Chain of Responsibility (Validation)", "Builder (Complex Objects)"],
    github: "https://github.com/Abhi8149/Payment-Gateway-LLD",
    focus: "Reliability, validation chains, and payment state control",
  },
  {
    id: "zepto-lld",
    name: "Zepto LLD",
    description: "Quick commerce system with inventory, delivery slots, and rapid fulfillment tracking.",
    patterns: ["Repository (Inventory)", "Event Sourcing", "CQRS Pattern"],
    github: "https://github.com/Abhi8149/Zepto-LLD",
    focus: "Inventory consistency with fast order orchestration",
  },
  {
    id: "docs-lld",
    name: "Google Docs LLD",
    description: "Collaborative document editor with real-time sync, versioning, and access control.",
    patterns: ["Command (Undo/Redo)", "Memento (Versioning)", "Proxy (Access Control)"],
    github: "https://github.com/Abhi8149/Document-Editor-LLD",
    focus: "Operational workflows and conflict-safe collaboration",
  },
  {
    id: "dating-lld",
    name: "Dating App LLD",
    description: "Tinder/Hinge-style matching system with profiles, swipes, and compatibility algorithms.",
    patterns: ["Strategy (Matching)", "Observer (Notifications)", "Facade (User Profile)"],
    github: "https://github.com/Abhi8149/Dating-App-LLD",
    focus: "Matching pipelines and social interaction orchestration",
  },
  {
    id: "snake-ladder-lld",
    name: "Snake and Ladder LLD",
    description: "Classic board game architecture with deterministic game state progression and player turns.",
    patterns: ["State (Turn Flow)", "Factory (Board Elements)", "Strategy (Dice Rules)"],
    github: "https://github.com/Abhi8149",
    focus: "Core OOP modeling and immutable state transitions",
  },
  {
    id: "tic-tac-toe-lld",
    name: "Tic Tac Toe LLD",
    description: "Reusable game engine abstraction for board validation, turns, and win conditions.",
    patterns: ["Template Method", "Strategy (Win Check)", "Command (Moves)"],
    github: "https://github.com/Abhi8149",
    focus: "Clean abstractions and testable game logic",
  }
];

export const skills = {
  languages: ["C++", "Python", "JavaScript", "TypeScript", "C"],
  frontend: ["React.js", "Next.js", "Tailwind CSS", "ShadCN UI"],
  backend: ["Node.js", "Express.js", "WebSockets"],
  databases: ["MongoDB", "PostgreSQL", "MySQL","Prisma"],
  ml: ["TensorFlow", "Keras", "PyTorch", "Scikit-learn", "LangChain", "RAG"],
  tools: ["Git","Postman", "Vercel"],
};
