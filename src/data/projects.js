// Single source of truth for project content: home page cards, case-study pages
// (/work/<slug>/), SEO tags, the sitemap, and the portfolio assistant.
// Order matters: the first INITIAL_PROJECTS are shown before "Show all projects".
//
// Accuracy rules (from the project brief): no invented metrics, user counts or
// features; separate what is live from product direction; repo claims below were
// checked against the public GitHub repositories (Nov 2026).

const GH = "https://github.com/FearlessBigJay";

export const INITIAL_PROJECTS = 3;

export const projects = [
  {
    slug: "formchat",
    title: "FormChat",
    tagline: "Build forms. Start conversations.",
    category: "AI · Full-stack · SaaS",
    seoTitle: "FormChat: AI conversational form platform",
    seoDescription:
      "FormChat is an AI-powered conversational form platform by BigJay: describe what you need, AI structures the questions, and respondents answer in a chat.",
    image: "/formchat.jpg",
    imageAlt: "FormChat landing page with a sample conversational registration form",
    width: 1200,
    height: 568,
    link: "https://formchat.lovable.app/",
    linkLabel: "formchat.lovable.app",
    repo: "",
    card: {
      problem:
        "Traditional online forms feel tedious and impersonal, and businesses struggle to collect structured information through a more engaging experience.",
      built:
        "An AI-powered conversational form platform. Businesses describe what they want to collect, AI structures the questions, respondents answer in a chat, and a dashboard organises submissions and insights.",
    },
    tech: ["React", "TypeScript", "Vite", "Tailwind CSS", "Lovable Cloud", "Google Authentication", "AI integration"],
    overview: [
      "FormChat is an AI-powered conversational form platform designed to change how businesses collect information from people.",
      "Traditional forms often present long lists of fields that feel impersonal, repetitive, and hard to complete. FormChat takes a conversational approach: instead of filling out a static form, respondents talk to an AI-guided chat that walks them through the questions.",
      "Businesses create a form by describing the information they want to collect. The platform helps turn that description into relevant questions, respondents answer them in a chat, and the responses are organised in a management dashboard.",
    ],
    problem: {
      intro:
        "Traditional online forms put unnecessary friction between businesses and the people they want to hear from.",
      points: [
        "Long, repetitive forms discourage people from finishing.",
        "Static question layouts offer little guidance along the way.",
        "Creating and structuring the questions takes time.",
        "Reviewing and managing submitted responses is slow.",
        "There is limited insight into the information collected.",
      ],
    },
    solution: [
      "FormChat introduces an AI-assisted conversational form experience. Businesses describe their information-collection needs and AI structures the questions; respondents answer those questions through a chat interface; and businesses review every submission from one dashboard.",
    ],
    features: [
      "AI-assisted form creation from a plain-language description",
      "Conversational form-filling experience for respondents",
      "Structured question generation",
      "Form management dashboard",
      "Response and submission management",
      "Conversation history for each respondent",
      "AI-generated insights into collected responses",
      "User authentication with Google",
    ],
    approach: [
      "FormChat combines a conventional web application with an AI-assisted workflow. The business-facing side (creating and managing forms) is kept separate from the respondent-facing side (the conversation), and the product moves through four stages: form creation, question presentation, conversation handling, and response management.",
    ],
    considerations: [
      "Turning AI-generated questions into usable, structured form data.",
      "Keeping context throughout a respondent's conversation.",
      "Converting conversational answers into structured submissions.",
      "Managing authentication and access to each business's dashboard.",
      "Designing one interface that works for both form creators and respondents.",
    ],
    outcome: [
      "FormChat applies AI to a familiar business workflow. It explores how a conversational interface can make giving information feel more natural, while keeping the structure and organisation businesses need.",
    ],
    highlights: ["AI integration", "Conversational UX", "SaaS product development", "Full-stack architecture"],
  },
  {
    slug: "unidwell",
    title: "UniDwell",
    tagline: "Smarter student accommodation, built around trust and community.",
    category: "Full-stack · Platform · EdTech / PropTech",
    seoTitle: "UniDwell: student accommodation platform",
    seoDescription:
      "UniDwell by BigJay helps Nigerian university students find hostels and lodges, compatible roommates, and trusted local services around their institutions.",
    image: "/unidwell.jpg",
    imageAlt: "UniDwell home page: find your perfect student home, over an aerial view of a campus",
    width: 1200,
    height: 568,
    link: "https://unidwell.netlify.app/",
    linkLabel: "unidwell.netlify.app",
    repo: "",
    card: {
      problem:
        "Students struggle to find verified hostels, compatible roommates, and trusted service providers around their institutions.",
      built:
        "A student accommodation platform connecting students (Dwellers) with accommodation scouts, hostels and lodges, potential roommates, and local artisans.",
    },
    tech: ["React", "TypeScript", "Tailwind CSS", "Supabase", "Google OAuth", "Brevo SMTP"],
    overview: [
      "UniDwell is a student accommodation platform that makes finding reliable accommodation around tertiary institutions easier and more organised.",
      "Finding somewhere to live is hard, especially for students who are new to an institution or the surrounding community. They may struggle to identify trustworthy hostels, compare options, find compatible roommates, or reach reliable local services.",
      "UniDwell is built around three groups: Dwellers (students), accommodation scouts, and tertiary institutions. Beyond accommodation discovery, the concept extends to roommate matching, local artisans, and institution-related services.",
    ],
    problem: {
      intro:
        "Student accommodation discovery often means fragmented information, unreliable listings, and few trusted local connections.",
      points: [
        "Verified hostels and lodges are hard to find.",
        "Reliable accommodation information is scattered.",
        "Finding a compatible roommate is a gamble.",
        "Trustworthy local service providers are hard to reach.",
        "There is no central accommodation resource around each institution.",
      ],
    },
    solution: [
      "UniDwell brings accommodation discovery and related student services into one platform. It connects students with accommodation scouts and available hostels, and creates room for roommate matching and access to local artisans.",
      "The broader vision is a more connected, trustworthy student-living community around each tertiary institution.",
    ],
    featuresNote:
      "UniDwell is in early access (the live site runs a waitlist), so this list covers both what is live and where the platform is heading.",
    features: [
      "Student accommodation discovery",
      "Hostel and lodge listings",
      "Connections with accommodation scouts",
      "Verified-accommodation concept",
      "Smart roommate matching",
      "Student-focused community services",
      "Local artisan discovery",
      "Institution-oriented accommodation ecosystem",
      "Google sign-in",
    ],
    approach: [
      "UniDwell pairs a React and TypeScript frontend with Supabase-powered backend services. Google OAuth handles sign-in, and Brevo SMTP handles transactional email.",
    ],
    considerations: [
      "Organising accommodation information so it is easy to search and compare.",
      "Designing the experience around different platform roles (Dwellers, scouts, institutions).",
      "Supporting secure authentication.",
      "Structuring the platform so new student services can be added later.",
      "Building an interface that can grow beyond listings into a wider student ecosystem.",
    ],
    outcome: [
      "UniDwell explores how technology can simplify student accommodation while encouraging trust and community. Rather than treating housing as an isolated transaction, it considers the wider needs of students living around tertiary institutions.",
    ],
    highlights: [
      "Full-stack development",
      "Authentication",
      "Supabase integration",
      "Platform design",
      "Student-focused product",
    ],
  },
  {
    slug: "floodsense",
    title: "FloodSense",
    tagline: "Flood awareness for at-risk communities.",
    category: "Data-driven · Full-stack · Social impact",
    seoTitle: "FloodSense: flood-awareness platform for Nigerian communities",
    seoDescription:
      "FloodSense by BigJay is a flood-awareness dashboard with weather data, maps, risk indicators and safety guidance. 5th place, 3MTT Imo State pitch.",
    image: "https://official-floodsense.netlify.app/images/logo.png",
    imageAlt: "FloodSense logo",
    imageFit: "contain",
    link: "https://official-floodsense.netlify.app/",
    linkLabel: "official-floodsense.netlify.app",
    repo: `${GH}/floodsense-frontend`,
    repos: [
      { label: "Frontend", url: `${GH}/floodsense-frontend` },
      { label: "Backend", url: `${GH}/floodSenseBackend` },
    ],
    award: "5th place, Imo State pitch competition · 3MTT Cohort 3, Resilience Through Innovation",
    card: {
      problem:
        "People in flood-prone areas need local, readable warning signs and clear guidance before water becomes an emergency.",
      built:
        "A flood-awareness platform with a risk dashboard, map view, and safety guidance. A separate Express API pulls weather data from OpenWeatherMap for the frontend.",
    },
    tech: ["React", "React Leaflet", "Chart.js", "Node.js", "Express", "OpenWeatherMap API"],
    overview: [
      "FloodSense is a flood-awareness and early-warning platform that helps communities, particularly rural and flood-prone communities in Nigeria, stay informed about potential flooding risks.",
      "Flooding can be devastating, especially where timely weather information and emergency guidance are hard to get. FloodSense explores how weather data, location-based information, interactive maps, and plain safety guidance can help people understand conditions and prepare.",
      "The platform provides a dashboard for weather indicators, location information, estimated risk levels, and practical safety guidance. It was developed for the 3MTT Cohort 3 Resilience Through Innovation initiative and placed fifth in the Imo State pitch competition.",
    ],
    problem: {
      intro: "Flood-prone communities often face:",
      points: [
        "Limited access to timely weather information.",
        "Difficulty understanding changing environmental conditions.",
        "Low awareness of potential flood risks.",
        "Little practical emergency-preparedness information.",
        "Difficulty finding information relevant to their location.",
      ],
    },
    solution: [
      "FloodSense combines weather information, location-based maps, risk awareness, and safety resources in one accessible platform. It uses weather indicators to communicate an estimated risk level, alongside a map interface, a weather dashboard, and safety guidance.",
    ],
    note: "FloodSense's risk indicators are for awareness and preparedness only. They are not guaranteed flood predictions and do not replace official emergency alerts.",
    features: [
      "Flood-awareness dashboard",
      "Weather information integration",
      "Estimated flood-risk indicators",
      "Interactive map with React Leaflet and OpenStreetMap",
      "Location-based information",
      "Weather visualisation with Chart.js",
      "Safety and emergency-preparedness guidance",
      "Safety toolkit",
    ],
    stack: [
      "React",
      "JavaScript",
      "React Leaflet",
      "Leaflet",
      "OpenStreetMap",
      "Chart.js",
      "Material UI",
      "Zustand",
      "Node.js",
      "Express",
      "OpenWeatherMap API",
    ],
    approach: [
      "The React frontend presents weather and location information in a dashboard built for quick reading. An Express backend prototype calls the OpenWeatherMap API and serves weather data to the frontend, which keeps the API key off the client.",
      "React Leaflet with OpenStreetMap tiles powers the interactive map, and Chart.js visualises the weather indicators.",
    ],
    considerations: [
      "Integrating external weather data through a small backend.",
      "Presenting environmental information in a way non-specialists understand.",
      "Working with geographic coordinates and map data.",
      "Communicating risk without overstating prediction accuracy.",
      "Making safety guidance easy to find and act on.",
    ],
    outcome: [
      "FloodSense shows how software and accessible environmental information can support community resilience. It was built for the 3MTT Resilience Through Innovation initiative and placed fifth in the Imo State pitch competition.",
      "It reflects a wider interest in applying technology to practical problems affecting Nigerian communities.",
    ],
    highlights: [
      "Social impact",
      "Weather API integration",
      "Geospatial visualisation",
      "React Leaflet",
      "Node.js backend",
      "3MTT Cohort 3",
    ],
  },
  {
    slug: "xzmovies",
    title: "XZMovies",
    tagline: "Movie discovery with a personal watchlist.",
    category: "Full-stack · Entertainment",
    seoTitle: "XZMovies: movie discovery app with watchlist",
    seoDescription:
      "XZMovies by BigJay is a React and Redux Toolkit movie discovery app on TMDB data, with search, detail pages, trailers, and a personal watchlist.",
    image: "/xzmovies.jpg",
    imageAlt: "XZMovies home screen with a grid of movie posters",
    width: 1200,
    height: 568,
    link: "https://xzmovies.vercel.app/",
    linkLabel: "xzmovies.vercel.app",
    repo: `${GH}/movie-app`,
    repos: [
      { label: "Frontend", url: `${GH}/movie-app` },
      { label: "Backend API", url: `${GH}/backend-movie-app` },
    ],
    card: {
      problem:
        "Browsing a large movie catalogue is clumsy without good search, detail pages, and a place to save what you want to watch.",
      built:
        "A movie discovery app with search, detail pages, trailers, and a watchlist, built with React, Redux Toolkit, and TMDB data, plus a companion Express and MongoDB API for accounts.",
    },
    tech: ["React", "Redux Toolkit", "Tailwind CSS", "TMDB API", "Node.js", "Express", "MongoDB"],
    overview: [
      "XZMovies is a movie discovery application that makes exploring films and managing a personal watchlist easier.",
      "It pulls movie information from The Movie Database (TMDB) so users can browse titles, search, open detailed movie pages, watch trailers, and keep track of what they want to see. The focus is a smooth discovery experience on top of a reusable component architecture.",
    ],
    problem: {
      intro: "Finding something to watch in a huge catalogue is harder than it should be. People want to:",
      points: [
        "Discover movies from reliable information.",
        "Search for a specific title quickly.",
        "Explore details before deciding what to watch.",
        "Keep track of movies they want to see.",
        "Watch trailers and related media in one place.",
      ],
    },
    solution: [
      "XZMovies provides one discovery interface powered by TMDB. Users browse and search films, open detailed movie pages, and manage a personal watchlist. Redux Toolkit manages application state, and the watchlist persists in local storage between sessions.",
    ],
    features: [
      "Movie discovery and browsing",
      "Movie search",
      "Movie detail pages with TMDB information",
      "Trailer and video integration (YouTube)",
      "Personal watchlist",
      "Local-storage persistence",
      "Responsive interface",
    ],
    stack: ["React", "Vite", "JavaScript", "Redux Toolkit", "Tailwind CSS", "TMDB API", "YouTube embeds"],
    backendStack: ["Node.js", "Express", "MongoDB (Mongoose)", "JWT", "bcrypt"],
    note: "A companion repository, backend-movie-app, contains an Express and MongoDB API with JWT authentication, watchlist, and review endpoints. The frontend's watchlist falls back to local storage when that API is not connected, so the localStorage experience is what the live demo is built around.",
    approach: [
      "The frontend is organised into reusable React components (movie cards, rows, detail sections) with Redux Toolkit slices for state. TMDB supplies the movie data, and local storage keeps the watchlist between visits.",
      "Watchlist actions are written so they can sync with the companion API when a user is signed in, and fall back to local storage otherwise.",
    ],
    considerations: [
      "Consuming a third-party API and handling asynchronous data.",
      "Handling search and filtering interactions.",
      "Keeping application state predictable with Redux Toolkit.",
      "Persisting the watchlist between sessions.",
      "Designing reusable components for cards and detail pages.",
    ],
    outcome: [
      "XZMovies is a data-driven entertainment app that combines third-party API integration, frontend state management, and persistent user interactions, with a backend foundation ready for accounts and synced watchlists.",
    ],
    highlights: ["React", "Redux Toolkit", "API integration", "State management", "Local storage", "Responsive design"],
  },
  {
    slug: "clipit",
    title: "Clipit",
    tagline: "Identify a movie from a short clip.",
    category: "AI · Full-stack · Entertainment tech",
    seoTitle: "Clipit: identify a movie from a short clip with AI",
    seoDescription:
      "Clipit by BigJay identifies a movie from a clip link using AI inference in a Supabase Edge Function, then enriches the result with TMDB metadata.",
    image: "https://official-clipit.netlify.app/images/clipit-logo.png",
    imageAlt: "Clipit logo",
    imageFit: "contain",
    link: "https://official-clipit.netlify.app/",
    linkLabel: "official-clipit.netlify.app",
    repo: `${GH}/Clipit`,
    card: {
      problem: "You see a few seconds of a film online and have no idea what it is or where to watch it.",
      built:
        "Paste a clip link and get the movie back. Identification runs in a Supabase Edge Function that calls an AI model and enriches the match with TMDB metadata.",
    },
    tech: ["React", "TypeScript", "Supabase Edge Functions", "AI inference", "TMDB API", "Tailwind CSS"],
    overview: [
      "Clipit is an AI-powered app that helps people identify a movie from a video clip.",
      "Everyone has seen a short scene online without knowing which film it came from, and finding the source is hard when the clip has little identifying information. Clipit explores how AI can simplify that.",
      "Users submit a clip link, the request runs through an AI identification workflow, and the result is enriched with movie metadata so they can learn more about the film.",
    ],
    problem: {
      intro: "Identifying a movie from a short clip is frustrating:",
      points: [
        "You meet scenes with no title attached.",
        "Searching with a vague description rarely works.",
        "Reliable movie information is scattered.",
        "You have to jump between platforms to identify and then explore a film.",
      ],
    },
    solution: [
      "Clipit provides a focused interface for submitting a clip link and identifying the movie. The AI inference runs server-side in a Supabase Edge Function, and TMDB metadata enriches the result.",
    ],
    note: "AI identification is not always correct; Clipit is designed to handle uncertain or unsuccessful matches rather than present every result as certain.",
    features: [
      "Movie identification from a submitted clip link",
      "AI-powered identification workflow",
      "Result enrichment with TMDB metadata",
      "Clear results presentation",
      "Responsive interface",
    ],
    stack: ["React", "TypeScript", "Tailwind CSS", "Supabase", "Supabase Edge Functions", "AI inference", "TMDB API"],
    approach: [
      "The React frontend handles link submission and results. A Supabase Edge Function (identify-movie) does the AI-powered processing on the server, so model calls and API keys stay off the client, and TMDB adds the movie details.",
    ],
    considerations: [
      "Handling user-submitted video links.",
      "Coordinating frontend and server-side processing.",
      "Integrating AI inference into a real product workflow.",
      "Enriching results with external movie data.",
      "Handling uncertain or failed identifications gracefully.",
      "Managing asynchronous responses in the UI.",
    ],
    outcome: [
      "Clipit puts AI inference to work in a consumer-facing app. Rather than an isolated experiment, it applies AI to a familiar discovery problem and combines it with external data services.",
    ],
    highlights: ["AI integration", "Supabase Edge Functions", "Third-party APIs", "Full-stack development"],
  },
  {
    slug: "codequest",
    title: "Code Quest",
    tagline: "Gamified STEM practice for young learners.",
    category: "Frontend · EdTech · Gamification",
    seoTitle: "Code Quest: gamified STEM learning for ages 10–15",
    seoDescription:
      "Code Quest by BigJay is a gamified learning interface that introduces 10–15 year olds to coding, maths, robotics and AI through quests and progress tracking.",
    image: "/codequest.jpg",
    imageAlt: "Code Quest learning dashboard",
    width: 1200,
    height: 569,
    link: "https://codequest-gaming.netlify.app/",
    linkLabel: "codequest-gaming.netlify.app",
    repo: "",
    card: {
      problem:
        "Students aged 10–15 in underserved communities need a more engaging way to practise coding, maths, robotics, and AI basics.",
      built:
        "A gamified learning interface with topic quests, progress tracking, and charts, designed around clear, playful screens for younger users.",
    },
    tech: ["React", "Tailwind CSS", "Framer Motion", "Chart.js"],
    overview: [
      "Code Quest is a gamified learning interface that makes STEM more engaging and accessible for young learners aged 10 to 15.",
      "It explores how gamification can spark curiosity and make technical subjects feel less intimidating, introducing coding, mathematics, robotics, and artificial intelligence through quests, progress tracking, and visual feedback.",
    ],
    problem: {
      intro: "Technical subjects are hard to approach when learning is purely theoretical. Young learners often face:",
      points: [
        "Little exposure to practical STEM concepts.",
        "Difficulty staying interested in technical subjects.",
        "Learning interfaces that don't encourage exploration.",
        "Little visual feedback on their progress.",
      ],
    },
    solution: [
      "Code Quest presents STEM topics as organised learning quests, supported by progress indicators and visual feedback. The goal is to make STEM exploration approachable, particularly for learners in underserved communities.",
    ],
    features: [
      "Gamified learning interface",
      "STEM categories: coding, mathematics, robotics, and AI basics",
      "Topic-based learning quests",
      "Learning progress tracking",
      "Progress visualisation with charts",
      "Interactive, animated feedback",
      "Responsive design",
    ],
    stack: ["React", "JavaScript", "Tailwind CSS", "Framer Motion", "Chart.js"],
    approach: [
      "The interface is organised into reusable React components. Tailwind CSS handles responsive styling, Framer Motion adds animation and interaction feedback, and Chart.js turns learning progress into visuals young learners can read at a glance.",
    ],
    considerations: [
      "Designing an age-appropriate learning interface.",
      "Structuring topics into navigable categories and quests.",
      "Using animation to give feedback without distracting.",
      "Presenting progress visually.",
      "Keeping the experience usable on any screen size.",
    ],
    outcome: [
      "Code Quest shows how frontend engineering, animation, and data visualisation can combine into an engaging educational experience, and reflects an interest in making learning more interactive and accessible.",
    ],
    highlights: ["EdTech", "Gamification", "React", "Framer Motion", "Data visualisation", "Responsive UI"],
  },
  {
    slug: "users-api",
    title: "Users API",
    tagline: "A clean REST backend for user records.",
    category: "Backend · API development",
    seoTitle: "Users API: REST API with Node.js, Express and PostgreSQL",
    seoDescription:
      "Users API by BigJay is a RESTful Node.js and Express backend with PostgreSQL for creating, reading, updating and deleting user records.",
    image: "/backend.jpg",
    imageAlt: "Illustration for the users API project",
    imageFit: "illustration",
    width: 390,
    height: 360,
    link: "",
    linkLabel: "github.com/FearlessBigJay/crud-with-node",
    repo: `${GH}/crud-with-node`,
    card: {
      problem:
        "Most apps need a dependable way to create, read, update, and delete user data, with code that stays readable as it grows.",
      built:
        "A REST API for full CRUD on users with Node.js, Express, and PostgreSQL, using parameterised queries and consistent JSON responses.",
    },
    tech: ["Node.js", "Express", "PostgreSQL", "REST API"],
    overview: [
      "Users API is a backend project: a RESTful API for managing user records.",
      "It covers the fundamentals of backend engineering (API design, database integration, routing, and CRUD operations) with Node.js and Express handling HTTP requests and PostgreSQL storing the data.",
    ],
    problem: {
      intro:
        "Any app that manages user information needs a reliable way to create, read, update, and delete records. Without a structured backend:",
      points: [
        "Data management becomes hard to maintain.",
        "Application logic gets tightly coupled.",
        "Database access is scattered and hard to follow.",
        "Frontends lack consistent endpoints to work with.",
      ],
    },
    solution: [
      "Users API exposes REST endpoints for CRUD operations on user records. Express handles routing and request processing, and PostgreSQL stores the data.",
    ],
    features: [
      "REST endpoints under /users",
      "Create, read, update, and delete user records",
      "PostgreSQL integration with a schema file (database.sql)",
      "Parameterised SQL queries",
      "Consistent JSON responses and HTTP status codes (e.g. 404 for a missing user)",
    ],
    stack: ["Node.js", "Express", "PostgreSQL (pg)", "JavaScript", "REST API"],
    approach: [
      "The user routes live in their own Express router module (routes/users.js), and the database connection is isolated in db.js, so the entry point stays small. Each handler runs a parameterised query through that shared connection and returns a consistent JSON shape with an appropriate status code.",
    ],
    considerations: [
      "Designing clear, predictable REST endpoints.",
      "Keeping routing separate from the server entry point and database setup.",
      "Connecting to PostgreSQL through a single shared module.",
      "Using parameterised queries to avoid SQL injection.",
      "Returning appropriate HTTP status codes and error messages.",
    ],
    outcome: [
      "Users API demonstrates foundational backend skills and an understanding of how web applications talk to a relational database through a RESTful service, beyond frontend interfaces.",
    ],
    highlights: ["Backend development", "REST API design", "Node.js", "Express", "PostgreSQL", "CRUD"],
  },
];

export const projectPath = (project) => `/work/${project.slug}/`;

export const findProject = (slug) => projects.find((project) => project.slug === slug);

/** Flattened view for the portfolio assistant (client fallback + Netlify function). */
export const portfolioProjects = projects.map((project, index) => ({
  name: project.title,
  featured: index < INITIAL_PROJECTS,
  summary: [project.card.built, project.award, project.note].filter(Boolean).join(" "),
  tech: (project.stack || project.tech).join(", "),
  url: project.link || "",
  repo: project.repo || "",
  path: projectPath(project),
}));
