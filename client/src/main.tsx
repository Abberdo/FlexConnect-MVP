import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Import Inter font for use in the app
const fontLink = document.createElement("link");
fontLink.rel = "stylesheet";
fontLink.href = "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap";
document.head.appendChild(fontLink);

// Add a title to the document
const title = document.createElement("title");
title.textContent = "SASSED - Freelancer Connect Concierge";
document.head.appendChild(title);

createRoot(document.getElementById("root")!).render(<App />);
