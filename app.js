// ==========================================================================
// Projects Data & Rendering
// ==========================================================================
const projects = [
    {
        title: "NewTech GraphRAG System",
        desc: "Multi-agent GraphRAG chatbot for internal document QA, leveraging LangGraph, Qdrant, Neo4j, and MCP to query Odoo ERP and BigQuery data.",
        tech: ["Python", "LangGraph", "Neo4j", "Qdrant", "MCP", "FastAPI", "Docker Compose", "Nginx"],
        category: "ai-nlp",
        github: "https://github.com/anhnguyenvv/NewTech-Graphrag",
        stars: 5,
        forks: 0
    },
    {
        title: "Enterprise MCP Servers Suite",
        desc: "Model Context Protocol (MCP) servers linking LLMs to VoIP communications (CCall), Accounting ERPs, and GDT invoices.",
        tech: ["Python", "FastAPI", "MCP", "Odoo", "Docker", "REST APIs"],
        category: "ai-nlp",
        github: "https://github.com/anhnguyenvv/ccall-mcp",
        stars: 4,
        forks: 0
    },
    {
        title: "NewTech Ads Analyzer",
        desc: "Automated Facebook Ads marketing agent featuring real-time campaign analytics, ROI tracking, and budget safety alerts.",
        tech: ["Python", "FastAPI", "Facebook Ads API", "BigQuery", "Docker", "Nginx"],
        category: "ai-nlp",
        github: "https://github.com/anhnguyenvv/ads-analyze",
        stars: 4,
        forks: 0
    },
    {
        title: "RAG Chatbot for FIT-HCMUS Academic Advising",
        desc: "Engineered hybrid RAG chatbot offering Classic and Agentic (ReAct) pipelines, achieving 92% context recall, 90% faithfulness, and 71% factual correctness on the Ragas benchmark.",
        tech: ["Python", "LangChain", "Qdrant", "FastAPI", "React", "MongoDB", "Prometheus", "Grafana"],
        category: "ai-nlp",
        github: "https://github.com/anhnguyenvv/RAG_Chatbot",
        stars: 3,
        forks: 1
    },
    {
        title: "Vietnamese Text Processing & Labeling Platform",
        desc: "Built web-based Vietnamese NLP platform integrating summarization, NER, POS tagging, sentiment analysis, and TTS. Fine-tuned PhoBERT, ViSoBERT, ViT5, and trained Piper TTS.",
        tech: ["PyTorch", "Transformers", "PhoBERT", "ViSoBERT", "ViT5", "Piper", "Flask", "React.js"],
        category: "ai-nlp",
        github: "https://github.com/anhnguyenvv/vietnamese-text-analyzer",
        stars: 2,
        forks: 0
    },
    {
        title: "CUDA Fashion-MNIST ANN",
        desc: "High-performance GPU-accelerated Artificial Neural Network (ANN) trained on Fashion-MNIST using CUDA C/C++.",
        tech: ["CUDA C/C++", "GPU Computing", "Parallel Programming", "Neural Networks"],
        category: "hpc",
        github: "https://github.com/anhnguyenvv/Parallel_Programming_final",
        stars: 4,
        forks: 0
    },
    {
        title: "Chess Game OOP",
        desc: "Desktop interactive chess game built using C++ and OOP principles, featuring move validation and local multiplayer.",
        tech: ["C++", "GUI", "OOP Design", "Game Logic"],
        category: "other",
        github: "https://github.com/anhnguyenvv/ChessGame",
        stars: 3,
        forks: 1
    },
    {
        title: "Meeting Transcriber",
        desc: "Offline meeting transcription and summarization tool using Faster-Whisper, Pyannote for speaker diarization, and Qwen2.5 (Ollama).",
        tech: ["Python", "Faster-Whisper", "Pyannote Audio", "Ollama", "Gradio"],
        category: "ai-nlp",
        github: "https://github.com/anhnguyenvv/meeting-transcriber",
        stars: 2,
        forks: 0
    }
];

function renderProjects(projectsToRender) {
    const grid = document.getElementById("projects-grid");
    grid.innerHTML = "";

    if (projectsToRender.length === 0) {
        grid.innerHTML = `
            <div class="empty-state" style="grid-column: 1/-1; text-align: center; padding: var(--space-2xl) 0; color: var(--color-text-muted);">
                <i data-lucide="folder-open" style="width: 48px; height: 48px; margin-bottom: var(--space-md); color: var(--color-primary);"></i>
                <h3>No projects found</h3>
                <p>Try searching with another keyword</p>
            </div>
        `;
        lucide.createIcons();
        return;
    }

    projectsToRender.forEach(p => {
        const card = document.createElement("div");
        card.className = "project-card glass-card";
        card.innerHTML = `
            <div class="project-icon-row">
                <div class="project-icon-wrapper">
                    <i data-lucide="${p.category === 'ai-nlp' ? 'brain-circuit' : (p.category === 'hpc' ? 'cpu' : 'folder')}"></i>
                </div>
                <div class="project-links">
                    <a href="${p.github}" target="_blank" rel="noopener" class="project-link-btn" aria-label="View source code on GitHub">
                        <i data-lucide="github"></i>
                    </a>
                </div>
            </div>
            <h3 class="project-title">${p.title}</h3>
            <p class="project-desc">${p.desc}</p>
            <div class="project-meta">
                <div class="project-tech-list">
                    ${p.tech.map(t => `<span class="project-badge">${t}</span>`).join("")}
                </div>
                <div class="project-stats">
                    <span class="project-stat-item"><i data-lucide="star"></i> ${p.stars}</span>
                    <span class="project-stat-item"><i data-lucide="git-fork"></i> ${p.forks}</span>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });

    // Re-initialize Lucide Icons for dynamic content
    lucide.createIcons();
}

// Search and Filter Handling
document.addEventListener("DOMContentLoaded", () => {
    renderProjects(projects);

    const searchInput = document.getElementById("project-search");
    const filterButtons = document.querySelectorAll(".filter-btn");

    function filterAndSearch() {
        const query = searchInput.value.toLowerCase().trim();
        const activeFilter = document.querySelector(".filter-btn.active").getAttribute("data-filter");

        const filtered = projects.filter(p => {
            const matchesSearch = p.title.toLowerCase().includes(query) || 
                                  p.desc.toLowerCase().includes(query) || 
                                  p.tech.some(t => t.toLowerCase().includes(query));
            
            const matchesCategory = activeFilter === "all" || p.category === activeFilter;

            return matchesSearch && matchesCategory;
        });

        renderProjects(filtered);
    }

    searchInput.addEventListener("input", filterAndSearch);

    filterButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            filterButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            filterAndSearch();
        });
    });

    // Mobile Navbar Menu Toggle
    const mobileMenuBtn = document.getElementById("mobile-menu-btn");
    const navMenu = document.getElementById("nav-menu");
    const navLinks = document.querySelectorAll(".nav-link");

    mobileMenuBtn.addEventListener("click", () => {
        navMenu.classList.toggle("active");
        const icon = mobileMenuBtn.querySelector("i");
        if (navMenu.classList.contains("active")) {
            icon.setAttribute("data-lucide", "x");
        } else {
            icon.setAttribute("data-lucide", "menu");
        }
        lucide.createIcons();
    });

    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            navMenu.classList.remove("active");
            mobileMenuBtn.querySelector("i").setAttribute("data-lucide", "menu");
            lucide.createIcons();
        });
    });
});

// ==========================================================================
// Simulated AI Chatbot Agent
// ==========================================================================
const chatMessages = document.getElementById("chat-messages");
const chatForm = document.getElementById("chat-form");
const chatInput = document.getElementById("chat-input");
const clearChatBtn = document.getElementById("clear-chat");
const suggestionChips = document.querySelectorAll(".suggestion-chip");

// Pre-defined knowledge base based on CV details
const botKnowledge = {
    newtech: "At <strong>Newtech Shop</strong>, Lan Anh has been working as an **AI Agent Developer** (Jan 2026 – Present). Her achievements include:<br>" +
             "1. **GraphRAG System**: Developed a multi-agent GraphRAG chatbot for internal document QA using **LangGraph**, **Qdrant**, **Neo4j** and **MCP** to integrate data from **Odoo ERP** and **BigQuery**.<br>" +
             "2. **Marketing Automation**: Engineered an automated Facebook Ads agent processing 10+ campaigns daily.<br>" +
             "3. **MCP Infrastructure**: Managed an internal AI gateway routing 20+ LLMs (GPT-5, Claude) and operated 4+ MCP servers to unify access across Odoo, BigQuery, and OmniChat.",
    rag: "Lan Anh has strong expertise in RAG:<br>" +
         "- **GraphRAG (Newtech Shop)**: Connected LLMs to structured databases (Odoo ERP, BigQuery) using **LangGraph**, **Qdrant**, **Neo4j**, and **MCP** servers.<br>" +
         "- **Academic advising RAG (HCMUS)**: Built a hybrid Classic + Agentic (ReAct) RAG chatbot. Achieved **92% context recall** and **90% faithfulness** on the Ragas benchmark. Powered by LangChain, Qdrant, BM25 + cross-encoder reranking, and monitored via Prometheus & Grafana.",
    nlp: "For her **Vietnamese Text Processing Platform**, Lan Anh built a modular NLP system including summarization, NER, POS tagging, and sentiment analysis. She fine-tuned **PhoBERT**, **ViSoBERT**, and **ViT5** models, and trained a **Piper (VITS-based) TTS** engine on custom Vietnamese speech datasets.",
    skills: "Lan Anh's technical skills include:<br>" +
             "- **Languages**: Python (Proficient), SQL, Java, C++ (CUDA)<br>" +
             "- **AI & Agents**: LangGraph, LangChain, MCP, PyTorch, Ragas Evaluation, Prompt Engineering, LLM Observability<br>" +
             "- **Data**: Neo4j, Qdrant Vector DB, BigQuery, MySQL, PostgreSQL, MongoDB, ETL pipelines<br>" +
             "- **Cloud & DevOps**: Google Cloud Platform (GCP), GitHub Actions (CI/CD), Docker, Nginx, Prometheus, Grafana, Linux, Git",
    contact: "You can connect with Lan Anh Nguyen via:<br>" +
             "📧 **Email**: <a href='mailto:anhnguyenvv0605@gmail.com'>anhnguyenvv0605@gmail.com</a><br>" +
             "💻 **GitHub**: <a href='https://github.com/anhnguyenvv' target='_blank'>github.com/anhnguyenvv</a><br>" +
             "📍 **Location**: Ho Chi Minh City, Vietnam<br>" +
             "You can also use the contact form below to send an email inquiry directly!",
    greeting: "Hi there! I can help you with:<br>" +
              "1. Lan Anh's experience at **Newtech Shop** (GraphRAG, MCP, Ads Automation).<br>" +
              "2. Her **FIT-HCMUS Advising RAG Chatbot** or **Vietnamese Text Analyzer** projects.<br>" +
              "3. Her core skills, education (HCMUS BCS), and **contact details**."
};

function getBotResponse(message) {
    const msg = message.toLowerCase();
    
    if (msg.includes("newtech") || msg.includes("work") || msg.includes("job") || msg.includes("experience") || msg.includes("company")) {
        if (msg.includes("rag") || msg.includes("graph")) {
            return botKnowledge.rag;
        }
        return botKnowledge.newtech;
    }
    if (msg.includes("rag") || msg.includes("chatbot") || msg.includes("retrieval") || msg.includes("graphrag")) {
        return botKnowledge.rag;
    }
    if (msg.includes("nlp") || msg.includes("vietnamese") || msg.includes("text") || msg.includes("phobert") || msg.includes("tts")) {
        return botKnowledge.nlp;
    }
    if (msg.includes("skill") || msg.includes("stack") || msg.includes("tech") || msg.includes("language") || msg.includes("database")) {
        return botKnowledge.skills;
    }
    if (msg.includes("contact") || msg.includes("reach") || msg.includes("email") || msg.includes("phone") || msg.includes("location")) {
        return botKnowledge.contact;
    }
    if (msg.includes("hi") || msg.includes("hello") || msg.includes("hey") || msg.includes("greet")) {
        return botKnowledge.greeting;
    }
    
    return "I recorded your query. Feel free to ask more specifically about: 'Newtech experience', 'HCMUS RAG chatbot', 'Vietnamese Text Analyzer', 'Technical skills', or 'How to contact Lan Anh'.";
}

function appendMessage(text, isUser = false) {
    const messageDiv = document.createElement("div");
    messageDiv.className = `message ${isUser ? "user-message" : "bot-message"}`;
    
    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    messageDiv.innerHTML = `
        <div class="message-content">${text}</div>
        <span class="message-time">${timeStr}</span>
    `;
    
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function showTypingIndicator() {
    const indicator = document.createElement("div");
    indicator.className = "message bot-message temp-indicator";
    indicator.innerHTML = `
        <div class="message-content typing-indicator">
            <span></span><span></span><span></span>
        </div>
    `;
    chatMessages.appendChild(indicator);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    return indicator;
}

function handleUserMessage(messageText) {
    if (!messageText.trim()) return;
    
    // User message
    appendMessage(messageText, true);
    
    // Show typing indicator
    const indicator = showTypingIndicator();
    
    // Simulate delay
    setTimeout(() => {
        indicator.remove();
        const responseText = getBotResponse(messageText);
        appendMessage(responseText, false);
    }, 1000);
}

// Form submit event
chatForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const text = chatInput.value;
    chatInput.value = "";
    handleUserMessage(text);
});

// Click suggestions
suggestionChips.forEach(chip => {
    chip.addEventListener("click", () => {
        handleUserMessage(chip.textContent);
    });
});

// Clear chat history
clearChatBtn.addEventListener("click", () => {
    chatMessages.innerHTML = `
        <div class="message bot-message">
            <div class="message-content">
                Chat history has been cleared. How can I help you find out more about Lan Anh Nguyen?
            </div>
            <span class="message-time">just now</span>
        </div>
    `;
});

// ==========================================================================
// Contact Form Submission (Simulation)
// ==========================================================================
const contactForm = document.getElementById("contact-form");
const formFeedback = document.getElementById("form-feedback");

contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const submitBtn = contactForm.querySelector("button[type='submit']");
    const originalText = submitBtn.innerHTML;
    
    submitBtn.innerHTML = `<i data-lucide="loader-2" class="btn-icon animate-spin"></i> Sending...`;
    submitBtn.disabled = true;
    lucide.createIcons();

    // Mock API request
    setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        lucide.createIcons();
        
        formFeedback.className = "form-feedback success";
        formFeedback.textContent = "Thank you! Your message has been sent successfully. Lan Anh will reply via email shortly.";
        
        contactForm.reset();
        
        // Hide feedback after 5 seconds
        setTimeout(() => {
            formFeedback.style.display = "none";
        }, 5000);
    }, 1500);
});
