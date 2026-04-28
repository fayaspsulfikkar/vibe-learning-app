export const courseData = [
  {
    id: "p1",
    label: "Phase 1",
    color: "#60b8f0",
    bgColor: "rgba(96,184,240,0.12)",
    title: "Core JavaScript — Write code by hand",
    subtitle: "Month 1–2 · Weeks 1–8 · Build real foundations before touching any framework",
    weeks: [
      {
        title: "Setup + Variables, Data Types, Operators",
        tasks: [
          "Install VS Code from code.visualstudio.com. Install Node.js (LTS) from nodejs.org. Verify: open terminal, type node --version. You should see a version number.",
          "Create a GitHub account at github.com. Use a professional username — your real name or close to it. No numbers if possible.",
          "Create a folder called learning-js on your Desktop. Open it in VS Code. Open the terminal inside VS Code with Ctrl+` (backtick).",
          "Create day1.js. Type (do not paste): let name = 'your name'; let age = 22; console.log(name); console.log(age); — Run it with: node day1.js",
          "Complete The Odin Project — Foundations path — Day 1 to 5. Read every word, don't skim.",
          "Learn: var vs let vs const. When to use each. Strings, numbers, booleans, null, undefined — write one example of each in code.",
          "Write 10 small console.log() programs by hand. No copy-paste. No AI autocomplete.",
          "Daily rule: Write all code by hand. No AI for writing. AI only to explain something AFTER you've written it.",
        ],
        resources: [
          { label: "The Odin Project", url: "https://www.theodinproject.com" },
          { label: "javascript.info Ch.1–3", url: "https://javascript.info/first-steps" },
          { label: "Node.js", url: "https://nodejs.org" },
          { label: "VS Code", url: "https://code.visualstudio.com" },
        ],
        rule: "Rule: The discomfort of typing slowly is the learning. It creates muscle memory. Pasting creates nothing.",
      },
      {
        title: "Conditionals, Loops, Functions",
        tasks: [
          "Learn if/else: write 5 programs using if/else. Example: if age > 18, print 'adult', else print 'minor'.",
          "Learn switch statements: rewrite one of your if/else programs using switch.",
          "Learn ternary operator: condition ? valueIfTrue : valueIfFalse. Write 3 examples.",
          "Learn for loops: print numbers 1–100. Print only even numbers. Print numbers in reverse.",
          "Learn while and do-while loops. Write one example of each. Understand when while is better than for.",
          "Learn functions: parameters, return values, calling functions. Write 5 functions that take inputs and return outputs.",
          "Project: Build a number guessing game in the terminal. Computer picks a random number 1–100. User guesses. Game says higher/lower. Count attempts. No libraries.",
          "Push your project to GitHub. Write a README.md explaining what the project does.",
        ],
        resources: [
          { label: "javascript.info — Functions", url: "https://javascript.info/function-basics" },
          { label: "The Odin Project", url: "https://www.theodinproject.com" },
        ],
        rule: "Rule: If you can't explain what a line of code does out loud, rewrite it until you can. Understanding > output.",
      },
      {
        title: "Arrays + Objects",
        tasks: [
          "Learn arrays: push, pop, shift, unshift, splice, slice. Write examples of each. Know the difference between splice (mutates) and slice (doesn't).",
          "Learn array methods: map, filter, reduce, find, findIndex, forEach, some, every. Write one example of each.",
          "Learn objects: key-value pairs, accessing properties with dot and bracket notation, adding/deleting properties.",
          "Learn nested objects: objects inside objects. Write a 'person' object with name, age, address (which is itself an object with city and country).",
          "Learn the 'this' keyword basics — what it refers to inside an object method.",
          "Project: Build a to-do list in the terminal. Features: add task, delete task, mark complete, list all tasks. Store everything in an array of objects.",
          "Commit to GitHub every day. Even if you only wrote 10 lines.",
        ],
        resources: [
          { label: "javascript.info — Arrays", url: "https://javascript.info/array" },
          { label: "javascript.info — Objects", url: "https://javascript.info/object" },
          { label: "MDN Web Docs", url: "https://developer.mozilla.org" },
        ],
      },
      {
        title: "DOM Manipulation — Make things visual",
        tasks: [
          "Learn: document.querySelector(), document.getElementById(), document.createElement(). Write examples of each in the browser console.",
          "Learn: addEventListener() for click, input, submit events. Learn innerHTML, textContent, classList.add/remove/toggle.",
          "Learn: style property — change colors, visibility, sizes with JS.",
          "Learn HTML forms: getting input values with .value, the submit event, preventDefault().",
          "Project: Convert your terminal to-do app into a browser UI. HTML + CSS + vanilla JS only. No frameworks.",
          "Deploy it free on GitHub Pages: Settings → Pages → Deploy from main branch.",
          "Make it look presentable. You don't need to be a designer. Just: readable font, some spacing, functional buttons.",
        ],
        resources: [
          { label: "The Odin Project — DOM", url: "https://www.theodinproject.com/paths/foundations/courses/foundations#dom-manipulation-and-events" },
          { label: "javascript.info — DOM", url: "https://javascript.info/document" },
          { label: "GitHub Pages docs", url: "https://pages.github.com" },
        ],
        info: "Milestone: At the end of this week, you have a real project live on the internet built without any framework. That is more than many people starting bootcamps can say.",
      },
      {
        title: "Revisit your vibe-coded projects",
        tasks: [
          "Pick your best vibe-coded project. Open all the code files.",
          "Read every function line by line. For each one: write in a comment what it does in plain English.",
          "Identify 3–5 small isolated parts you can understand and rewrite manually.",
          "Rewrite those parts from scratch without looking at the original. Put both versions side by side.",
          "Identify things you still don't understand. Write them as questions.",
          "Look up those questions on javascript.info or MDN. Not AI. The docs.",
          "This week has no new project. The project IS understanding what you already built.",
        ],
        resources: [
          { label: "javascript.info", url: "https://javascript.info" },
          { label: "MDN Web Docs", url: "https://developer.mozilla.org" },
        ],
        rule: "Rule: Don't feel embarrassed that you built things you don't understand. Feel proud that you're choosing to understand them now. That's the real pivot.",
      },
      {
        title: "Async JS — Fetch, Promises, Async/Await",
        tasks: [
          "Understand what asynchronous means: JavaScript runs one thing at a time, but some operations (network requests, timers) take time. Async lets you handle that wait.",
          "Learn callbacks first — understand why they lead to 'callback hell'.",
          "Learn Promises: .then(), .catch(), .finally(). Write examples manually.",
          "Learn async/await — the modern clean way to write async code. Rewrite your promise examples using async/await.",
          "Learn fetch(): make a GET request to a public API. Start with: https://jsonplaceholder.typicode.com/posts",
          "Project: Build a weather app. Fetch from OpenWeatherMap API (free tier). Display city, temperature, description on the page. Show a loading state while fetching. Handle errors with try/catch — show a message if the fetch fails.",
          "Push to GitHub. Deploy on GitHub Pages.",
        ],
        resources: [
          { label: "javascript.info — Promises", url: "https://javascript.info/promise-basics" },
          { label: "OpenWeatherMap API", url: "https://openweathermap.org/api" },
          { label: "JSONPlaceholder (practice API)", url: "https://jsonplaceholder.typicode.com" },
        ],
        rule: "Rule: async/await is syntax sugar over Promises. If you don't understand Promises, async/await will confuse you. Learn in order: callbacks → promises → async/await.",
      },
      {
        title: "HTML + CSS Foundations (properly)",
        tasks: [
          "Learn semantic HTML: article, section, header, nav, main, footer, aside. Why these matter for accessibility and SEO.",
          "Learn the CSS Box Model deeply: content, padding, border, margin. Understand box-sizing: border-box.",
          "Learn Flexbox completely: flex-direction, justify-content, align-items, flex-wrap, gap, flex-grow. Build 5 different layouts using only Flexbox.",
          "Learn CSS Grid basics: grid-template-columns, grid-template-rows, grid-gap, placing items.",
          "Learn responsive design: media queries, mobile-first approach, viewport meta tag.",
          "Make your weather app fully responsive. It must work on mobile (375px) and desktop (1280px).",
          "Learn CSS custom properties (variables): --primary-color: #333; and using var(--primary-color).",
        ],
        resources: [
          { label: "Flexbox Froggy (game)", url: "https://flexboxfroggy.com" },
          { label: "CSS Grid Garden (game)", url: "https://cssgridgarden.com" },
          { label: "The Odin Project — HTML/CSS", url: "https://www.theodinproject.com" },
        ],
      },
      {
        title: "Review Week — Consolidate everything",
        tasks: [
          "Redo your to-do app DOM project from scratch without looking at your old code. Time yourself. Notice how much faster you are.",
          "Redo your weather app from scratch without looking. If you get stuck, look at the docs — not your old code.",
          "Start Leetcode: solve these 5 Easy problems (in order): Two Sum, Reverse String, FizzBuzz, Valid Palindrome, Valid Anagram.",
          "For each Leetcode problem: write your solution on paper first. Then type it. Run it. Fix it without looking at hints for at least 30 minutes.",
          "Record yourself on Loom explaining one of your projects: what it does, how you built it, what you learned. Watch it back. This is interview practice.",
          "Update all your GitHub READMEs: add a description, screenshot, and link to the live demo.",
          "Write a honest self-assessment: what do you understand well? What is still unclear? This becomes your Week 9 starting point.",
        ],
        resources: [
          { label: "Leetcode", url: "https://leetcode.com" },
          { label: "Loom (free recorder)", url: "https://loom.com" },
        ],
        rule: "Rule: If rebuilding from scratch reveals gaps — that's good. That's the review working. Gaps found now are cheaper than gaps found in an interview.",
      },
    ],
  },
  {
    id: "p2",
    label: "Phase 2",
    color: "#5dd8a8",
    bgColor: "rgba(93,216,168,0.12)",
    title: "React + Full Stack Projects",
    subtitle: "Month 3–4 · Weeks 9–16 · Learn the tools companies actually use",
    weeks: [
      {
        title: "React Fundamentals — Components + JSX",
        tasks: [
          "Install React using Vite (not Create React App — it's slow and outdated).",
          "Understand what React actually is: a JavaScript library for building UIs. It is NOT magic. It is components + state + props.",
          "Learn JSX: JavaScript + HTML syntax. Understand that JSX compiles to regular JavaScript function calls.",
          "Learn functional components: a function that returns JSX. Build 5 simple components (Button, Card, Header, Avatar, Badge).",
          "Learn props: passing data into components. Build a Card component that accepts title, description, imageUrl as props.",
          "Learn useState: what state is, why it exists, how useState() works. Build a counter, a toggle switch, a like button.",
          "Rebuild your to-do app in React. No backend yet — store tasks in useState array.",
          "Understand: React is just JavaScript. You now have the JavaScript foundations to actually understand what's happening under the hood.",
        ],
        resources: [
          { label: "react.dev (official docs)", url: "https://react.dev" },
          { label: "Vite", url: "https://vitejs.dev" },
          { label: "The Odin Project — React", url: "https://www.theodinproject.com" },
        ],
      },
      {
        title: "React — useEffect, API Calls, Routing",
        tasks: [
          "Learn useEffect: when it runs (after render), the dependency array, and cleanup functions. Understand common mistakes: infinite loops.",
          "Fetch data from an API inside useEffect. Handle 3 states: loading, success, error. Show a spinner/skeleton during loading. Show an error message on failure.",
          "Learn React Router v6: BrowserRouter, Routes, Route, Link, NavLink, useParams, useNavigate.",
          "Build a multi-page React app: Home, About, and a detail page that uses URL params.",
          "Rebuild your weather app in React. Add: a search page, a results page with React Router.",
        ]
      },
      {
        title: "Node.js + Express — Backend Basics",
        tasks: [
          "Understand what a backend server does: listens for HTTP requests, processes them, sends responses.",
          "Build a basic Express server: npm install express. Create server.js.",
          "Learn middleware: what it is, how app.use() works, the next() function.",
          "Build a complete REST API with these routes: GET /tasks, POST /tasks, PUT /tasks/:id, DELETE /tasks/:id.",
        ]
      },
      {
        title: "Databases — MongoDB or PostgreSQL",
        tasks: [
          "Choose your database: MongoDB or PostgreSQL.",
          "Create a free MongoDB Atlas account. Set up a cluster.",
          "Install Mongoose. Connect your Express server to MongoDB.",
          "Learn Mongoose models: define a Schema, create a Model.",
          "Rewrite your REST API to use MongoDB instead of an in-memory array.",
        ]
      },
      {
        title: "Authentication — Login + Signup",
        tasks: [
          "Understand how authentication works conceptually.",
          "Understand JWTs (JSON Web Tokens): header.payload.signature.",
          "Install bcrypt. Hash a password. Verify a password.",
          "Build POST /auth/signup and POST /auth/login routes.",
          "Protect your API routes: only authenticated users can access them."
        ]
      },
      {
        title: "Connect Frontend + Backend (Full Stack)",
        tasks: [
          "Connect your React notes app to your Express + MongoDB backend.",
          "Handle CORS: configure it to allow requests from your React app's URL.",
          "Store JWT in localStorage after login. Send it with every protected API request.",
          "Build a complete auth flow in React: Signup, Login, logout button."
        ]
      },
      {
        title: "Main Portfolio Project — Plan + Build",
        tasks: [
          "Choose ONE project idea. Write a spec before touching code.",
          "Design your database schema first. Draw it on paper.",
          "Build the backend API completely first. Test every single route in Postman before starting the frontend.",
          "Build the React frontend one screen at a time.",
          "Commit to GitHub every day."
        ]
      },
      {
        title: "Main Project — Polish + Leetcode Ramp Up",
        tasks: [
          "Finish all core features. Make it fully mobile responsive.",
          "Add proper error handling everywhere.",
          "Write a detailed README: tech stack, screenshots, live demo.",
          "Leetcode: solve 15 Easy problems total. Focus: arrays, strings, hashmaps."
        ]
      }
    ],
  },
  {
    id: "p3",
    label: "Phase 3",
    color: "#f0a050",
    bgColor: "rgba(240,160,80,0.12)",
    title: "Interview Prep + Applying",
    subtitle: "Month 5–6 · Weeks 17–24 · Get the job",
    weeks: [
      {
        title: "DSA Deep Dive — Arrays, Strings, Hashmaps",
        tasks: [
          "Solve 3 Leetcode Easy/Medium problems per day. No more, no less. Consistency over volume.",
          "Master the two-pointer technique: problems where you move two indices from different positions.",
          "Master the sliding window technique: problems with subarrays/substrings.",
          "Master hashmaps for frequency counting."
        ]
      },
      {
        title: "DSA — Recursion, Stacks, Queues, Linked Lists",
        tasks: [
          "Understand recursion deeply: base case, recursive case, call stack.",
          "Implement a Stack from scratch using an array.",
          "Implement a Queue from scratch. Understand linked lists."
        ]
      },
      {
        title: "DSA — Trees + Binary Search",
        tasks: [
          "Understand binary trees: nodes, root, leaf, height, depth.",
          "Learn tree traversals: in-order, pre-order, post-order.",
          "Solve binary search problems."
        ]
      },
      {
        title: "Portfolio Website + LinkedIn Overhaul",
        tasks: [
          "Build a clean personal portfolio website.",
          "Deploy your portfolio on Vercel.",
          "Update LinkedIn headline. Specific is better than vague.",
          "Add all projects to LinkedIn Projects section with links."
        ]
      },
      {
        title: "Mock Interviews — Practice Out Loud",
        tasks: [
          "Do 1 mock coding interview per day on Pramp.com.",
          "Practice talking while coding: verbalize every decision.",
          "Practice explaining your portfolio project clearly."
        ]
      },
      {
        title: "Start Applying — 10 Applications Per Day",
        tasks: [
          "Apply to remote-friendly small companies or local tech parks.",
          "Platforms to use daily: LinkedIn Jobs, Instahyre, Wellfound, Naukri.",
          "Customize the first 2 sentences of your cover message.",
          "Track every application in a spreadsheet."
        ]
      },
      {
        title: "Interview + Rejection Handling",
        tasks: [
          "For every rejection: email back the same day asking for feedback.",
          "For every interview: write down every question asked within 1 hour.",
          "Keep applying even while waiting for responses."
        ]
      },
      {
        title: "Final Push — Land the Offer",
        tasks: [
          "Total applications sent by now: 100+.",
          "If you have offers: compare on tech stack, team size, salary, and remote flexibility.",
          "Negotiating salary: always negotiate.",
          "Remember: your vibe-coding background means you think in products."
        ]
      }
    ]
  }
];
