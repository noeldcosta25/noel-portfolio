export const siteConfig = {
    name: "Noel Francis D'costa",
    domain: "noeldcosta.com", // change later if needed
    role: "Data Scientist",
    email: "noeldcosta36@gmail.com",
    description:
        "I build intelligent systems that turn data into actionable insight and scalable AI solutions, specializing in Python, Machine Learning, Deep Learning, and Generative AI.",
    baseUrl:
        process.env.NEXT_PUBLIC_BASE_URL ??
        (process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL
            ? `https://${process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL}`
            : "http://localhost:3000"),
    availableForHire: true,
    handle: "noeldcosta25",

    sameAs: [
        "https://github.com/noeldcosta25",
        "https://www.linkedin.com/in/noel-francis-dcosta",
    ] as const,

    resumeURL:
        "https://github.com/noeldcosta25/noel-resume/releases/latest/download/resume.pdf",

    nav: [
        { href: "/ml-lab", label: "ML Lab"},
        { href: "/ai-demo", label: "AI Demo"},
        { href: "/certifications", label: "Certifications"},
        { href: "/resume", label: "Resume" },
    ] as const,

    social: [
        {
            platform: "github",
            href: "https://github.com/noeldcosta25",
            label: "GitHub",
        },
        {
            platform: "linkedin",
            href: "https://www.linkedin.com/in/noel-francis-dcosta",
            label: "LinkedIn",
        },
        {
            platform: "discord",
            href: "https://discord.com/users/noel06472",
            label: "Discord",
        }
    ] as const,
} as const;

export const projects = [
    {
        title: "Breast Cancer Survival Mortality Prediction",
        description:
            "Machine learning system predicting survival outcomes in breast cancer patients using structured clinical and diagnostic data.",
        highlights: ["Python", "Random Forest", "Pandas", "PowerBI"],
        live: "https://breast-cancer-2l0t.onrender.com/",
        github: "https://github.com/noeldcosta25/breast-cancer-survival-prediction",
    },
    {
        title: "Sentiment Analysis using NLP",
        description:
            "Supervised NLP pipeline using TF-IDF vectorization and machine learning to classify Twitter posts into positive and negative sentiment.",
        highlights: ["TF-IDF", "BERT", "Scikit-learn", "Python"],
        live: null,
        github: "https://github.com/noeldcosta25/Sentiment-Analysis-NLP",
    },
    {
        title: "Telecom Customer Churn Prediction",
        description:
            "A Discord bot supporting 600+ programming languages. Slightly over-engineered. Definitely useful. Probably unnecessary.",
        highlights: ["Classification", "Feature Engineering", "Python", "Customer Analytics"],
        live: null,
        github: "https://github.com/noeldcosta25/Sentiment-Analysis-NLP",
    },
    {
        title: "RAG-Based Document Chatbot",
        description:
            "AI assistant that reads PDF documents and answers contextual questions using Retrieval-Augumented Generation with Mistral 7B and FAISS.",
        highlights: ["Mistral 7B Instruct", "all-MiniLM-L6-v2", "RAG Architecture", "LLM Pipeline"],
        live: null,
        github: "https://github.com/noeldcosta25/RAG-Document-Chatbot",
    },
];
