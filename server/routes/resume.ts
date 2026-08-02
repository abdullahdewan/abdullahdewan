import { defineEventHandler } from 'h3';

export default defineEventHandler(() => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>RESUME // ABDULLAH DEWAN - FULL-STACK ENGINEER</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700;800&family=Plus+Jakarta+Sans:wght@500;700;800;900&display=swap');
    
    body {
      font-family: 'Plus Jakarta Sans', sans-serif;
      background-color: #fffdf5;
      color: #000000;
    }
    
    .font-mono {
      font-family: 'JetBrains Mono', monospace;
    }

    .neo-border {
      border: 3px solid #000000;
    }
    
    .neo-border-sm {
      border: 2px solid #000000;
    }

    .neo-shadow {
      box-shadow: 6px 6px 0px 0px #000000;
    }

    .neo-shadow-sm {
      box-shadow: 3px 3px 0px 0px #000000;
    }

    .neo-shadow-xs {
      box-shadow: 2px 2px 0px 0px #000000;
    }

    @media print {
      body {
        background-color: #ffffff !important;
        color: #000000 !important;
      }
      .no-print {
        display: none !important;
      }
      .print-shadow-none {
        box-shadow: none !important;
      }
      .print-border-thin {
        border-width: 1.5px !important;
        border-color: #000000 !important;
      }
      .page-break {
        page-break-before: always;
      }
    }
  </style>
</head>
<body class="min-h-screen py-8 px-4 print:py-0 print:px-0">

  <!-- Print Floating Toolbar -->
  <div class="no-print max-w-4xl mx-auto mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
    <a 
      href="/" 
      class="neo-border-sm bg-yellow-400 text-black font-mono font-black text-xs uppercase tracking-wider py-2.5 px-4 neo-shadow-sm hover:-translate-y-0.5 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all flex items-center gap-2"
    >
      <span>← RETURN TO TERMINAL DASHBOARD</span>
    </a>
    
    <div class="flex items-center gap-3">
      <span class="font-mono text-[10px] font-black uppercase bg-white neo-border-sm px-3 py-2 neo-shadow-xs">
        STATUS: READY_FOR_EXPORT
      </span>
      <button 
        onclick="window.print()" 
        class="neo-border-sm bg-cyan-400 text-black font-mono font-black text-xs uppercase tracking-wider py-2.5 px-5 neo-shadow-sm hover:-translate-y-0.5 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all cursor-pointer flex items-center gap-2"
      >
        <span>🖨️ PRINT / SAVE AS PDF</span>
      </button>
    </div>
  </div>

  <!-- Resume Document Sheet -->
  <div class="max-w-4xl mx-auto bg-white neo-border neo-shadow p-8 md:p-12 print-shadow-none print-border-thin print:p-4">
    
    <!-- Header Section -->
    <header class="border-b-3 border-black print-border-thin pb-6">
      <div class="flex flex-col sm:flex-row justify-between sm:items-start gap-4">
        <div>
          <div class="inline-block bg-yellow-400 text-black neo-border-sm px-2.5 py-0.5 font-mono text-[10px] font-black uppercase tracking-widest mb-2 neo-shadow-xs">
            // CURRICULUM_VITAE.pdf
          </div>
          <h1 class="text-3xl md:text-4xl font-black uppercase tracking-tight text-black font-mono">
            ABDULLAH DEWAN
          </h1>
          <p class="text-xs font-black text-black font-mono uppercase tracking-widest bg-cyan-300 border-2 border-black inline-block px-2 py-1 mt-2 neo-shadow-xs">
            BACKEND & FULL-STACK ENGINEER // ARCHITECT
          </p>
        </div>

        <div class="text-left sm:text-right font-mono text-xs font-bold space-y-1.5 shrink-0">
          <div class="bg-zinc-100 neo-border-sm px-2.5 py-1 text-black neo-shadow-xs">
            📧 <a href="mailto:hello@abdullahdewan.com" class="hover:underline font-black">hello@abdullahdewan.com</a>
          </div>
          <div class="bg-zinc-100 neo-border-sm px-2.5 py-1 text-black neo-shadow-xs">
            🌐 <a href="https://abdullahdewan.com" target="_blank" class="hover:underline font-black">abdullahdewan.com</a>
          </div>
          <div class="bg-zinc-100 neo-border-sm px-2.5 py-1 text-black neo-shadow-xs">
            💻 <a href="https://github.com/abdullahdewan" target="_blank" class="hover:underline font-black">github.com/abdullahdewan</a>
          </div>
          <div class="bg-yellow-300 neo-border-sm px-2.5 py-1 text-black font-black neo-shadow-xs">
            📍 DHAKA, BANGLADESH
          </div>
        </div>
      </div>
    </header>

    <!-- Executive Summary -->
    <section class="py-6 border-b-3 border-black print-border-thin">
      <h2 class="text-xs font-black uppercase tracking-widest bg-black text-white px-3 py-1 inline-block neo-border-sm font-mono mb-3 neo-shadow-xs">
        01 // EXECUTIVE_SUMMARY
      </h2>
      <p class="text-xs md:text-sm text-black font-semibold leading-relaxed">
        Backend-focused Full-Stack Engineer with over 3 years of commercial experience designing high-performance database architectures, secure API gateways, and real-time client-side dashboards. Proficient in database query optimization, server containerization, and modern JavaScript/TypeScript/PHP architectures.
      </p>
    </section>

    <!-- Skills Matrix -->
    <section class="py-6 border-b-3 border-black print-border-thin">
      <h2 class="text-xs font-black uppercase tracking-widest bg-yellow-400 text-black px-3 py-1 inline-block neo-border-sm font-mono mb-4 neo-shadow-xs">
        02 // CORE_SKILLS_MATRIX
      </h2>
      
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs">
        <div class="bg-zinc-50 neo-border-sm p-3.5 neo-shadow-xs print-shadow-none">
          <h3 class="font-black text-black uppercase tracking-wider mb-2 text-[11px] bg-cyan-300 border border-black px-2 py-0.5 inline-block">
            // LANGUAGES
          </h3>
          <ul class="space-y-1.5 font-bold text-black text-[11px]">
            <li class="flex items-center gap-1.5"><span class="text-pink-600 font-black">»</span> JavaScript (ESNext)</li>
            <li class="flex items-center gap-1.5"><span class="text-pink-600 font-black">»</span> TypeScript</li>
            <li class="flex items-center gap-1.5"><span class="text-pink-600 font-black">»</span> PHP</li>
            <li class="flex items-center gap-1.5"><span class="text-pink-600 font-black">»</span> SQL (Postgres / MySQL)</li>
            <li class="flex items-center gap-1.5"><span class="text-pink-600 font-black">»</span> Python 3</li>
          </ul>
        </div>

        <div class="bg-zinc-50 neo-border-sm p-3.5 neo-shadow-xs print-shadow-none">
          <h3 class="font-black text-black uppercase tracking-wider mb-2 text-[11px] bg-pink-300 border border-black px-2 py-0.5 inline-block">
            // DATABASES & BACKEND
          </h3>
          <ul class="space-y-1.5 font-bold text-black text-[11px]">
            <li class="flex items-center gap-1.5"><span class="text-cyan-600 font-black">»</span> PostgreSQL (JSONB Indexing)</li>
            <li class="flex items-center gap-1.5"><span class="text-cyan-600 font-black">»</span> MySQL (Sub-ms Tuning)</li>
            <li class="flex items-center gap-1.5"><span class="text-cyan-600 font-black">»</span> MongoDB (Aggregation)</li>
            <li class="flex items-center gap-1.5"><span class="text-cyan-600 font-black">»</span> Node.js / Express / H3</li>
            <li class="flex items-center gap-1.5"><span class="text-cyan-600 font-black">»</span> REST & WebSocket APIs</li>
          </ul>
        </div>

        <div class="bg-zinc-50 neo-border-sm p-3.5 neo-shadow-xs print-shadow-none">
          <h3 class="font-black text-black uppercase tracking-wider mb-2 text-[11px] bg-emerald-300 border border-black px-2 py-0.5 inline-block">
            // CLIENT & DEVOPS
          </h3>
          <ul class="space-y-1.5 font-bold text-black text-[11px]">
            <li class="flex items-center gap-1.5"><span class="text-purple-600 font-black">»</span> Vue.js 3 (Composition API)</li>
            <li class="flex items-center gap-1.5"><span class="text-purple-600 font-black">»</span> Nuxt.js 3 (SSR & SEO)</li>
            <li class="flex items-center gap-1.5"><span class="text-purple-600 font-black">»</span> Tailwind CSS / Neubrutalism</li>
            <li class="flex items-center gap-1.5"><span class="text-purple-600 font-black">»</span> Docker Containerization</li>
            <li class="flex items-center gap-1.5"><span class="text-purple-600 font-black">»</span> Git & CI/CD Workflows</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Work Experience -->
    <section class="py-6 border-b-3 border-black print-border-thin">
      <h2 class="text-xs font-black uppercase tracking-widest bg-cyan-400 text-black px-3 py-1 inline-block neo-border-sm font-mono mb-4 neo-shadow-xs">
        03 // WORK_EXPERIENCE
      </h2>
      
      <div class="space-y-4">
        <div class="bg-zinc-50 neo-border-sm p-4 neo-shadow-xs print-shadow-none">
          <div class="flex flex-col sm:flex-row justify-between sm:items-center gap-1 border-b border-black pb-2 mb-2">
            <div>
              <h3 class="text-sm font-black text-black uppercase font-mono">BACKEND & FULL-STACK ENGINEER</h3>
              <p class="text-xs font-bold text-pink-600 font-mono">// Commercial Contracts & Independent Software Engineering</p>
            </div>
            <span class="text-xs font-black text-black font-mono bg-yellow-300 border border-black px-2 py-0.5 inline-block shrink-0">
              2021 — PRESENT
            </span>
          </div>

          <ul class="space-y-1.5 text-xs text-black font-semibold leading-relaxed pl-1">
            <li class="flex items-start gap-1.5">
              <span class="font-black text-cyan-600">■</span>
              <span>Architected and optimized secure server-side routes and API endpoints handling high-frequency database operations.</span>
            </li>
            <li class="flex items-start gap-1.5">
              <span class="font-black text-cyan-600">■</span>
              <span>Tuned relational query execution structures in MySQL and PostgreSQL, improving transaction speeds by up to 80%.</span>
            </li>
            <li class="flex items-start gap-1.5">
              <span class="font-black text-cyan-600">■</span>
              <span>Configured containerized micro-environments using Docker to ensure seamless local debugging and staging deployments.</span>
            </li>
            <li class="flex items-start gap-1.5">
              <span class="font-black text-cyan-600">■</span>
              <span>Built responsive SPA and SSR Web Applications with Vue 3 and Nuxt 3, achieving 100/100 Lighthouse benchmark scores.</span>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Key Repositories / Projects -->
    <section class="py-6 border-b-3 border-black print-border-thin">
      <h2 class="text-xs font-black uppercase tracking-widest bg-pink-400 text-black px-3 py-1 inline-block neo-border-sm font-mono mb-4 neo-shadow-xs">
        04 // KEY_REPOSITORIES
      </h2>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="bg-zinc-50 neo-border-sm p-3.5 neo-shadow-xs print-shadow-none flex flex-col justify-between">
          <div>
            <div class="flex items-center justify-between border-b border-black pb-1.5 mb-2">
              <h3 class="text-xs font-black text-black uppercase font-mono">traininfo</h3>
              <span class="text-[9px] font-black bg-cyan-300 text-black border border-black px-1.5 py-0.2">NUXT 3</span>
            </div>
            <p class="text-xs text-black font-medium leading-normal mb-3">
              Specialized tracking platform for Bangladesh Railway with live telemetry, schedule parsing, and local caching.
            </p>
          </div>
          <a href="https://github.com/abdullahdewan/traininfo" target="_blank" class="text-[10px] font-black font-mono text-black hover:bg-yellow-300 border border-black px-2 py-1 inline-block text-center uppercase">
            🔗 github / traininfo
          </a>
        </div>

        <div class="bg-zinc-50 neo-border-sm p-3.5 neo-shadow-xs print-shadow-none flex flex-col justify-between">
          <div>
            <div class="flex items-center justify-between border-b border-black pb-1.5 mb-2">
              <h3 class="text-xs font-black text-black uppercase font-mono">tictactoe</h3>
              <span class="text-[9px] font-black bg-pink-300 text-black border border-black px-1.5 py-0.2">SOCKET.IO</span>
            </div>
            <p class="text-xs text-black font-medium leading-normal mb-3">
              Real-time multiplayer gaming lobby using WebSockets, dynamic rooms, win/draw detection, and MongoDB.
            </p>
          </div>
          <a href="https://github.com/abdullahdewan/tictactoe" target="_blank" class="text-[10px] font-black font-mono text-black hover:bg-yellow-300 border border-black px-2 py-1 inline-block text-center uppercase">
            🔗 github / tictactoe
          </a>
        </div>

        <div class="bg-zinc-50 neo-border-sm p-3.5 neo-shadow-xs print-shadow-none flex flex-col justify-between">
          <div>
            <div class="flex items-center justify-between border-b border-black pb-1.5 mb-2">
              <h3 class="text-xs font-black text-black uppercase font-mono">renpy-to-md</h3>
              <span class="text-[9px] font-black bg-emerald-300 text-black border border-black px-1.5 py-0.2">PYTHON 3</span>
            </div>
            <p class="text-xs text-black font-medium leading-normal mb-3">
              CLI tool written in Python to parse complex Visual Novel scripts (.rpy) and generate clean Markdown docs.
            </p>
          </div>
          <a href="https://github.com/abdullahdewan/renpy-to-md" target="_blank" class="text-[10px] font-black font-mono text-black hover:bg-yellow-300 border border-black px-2 py-1 inline-block text-center uppercase">
            🔗 github / renpy-to-md
          </a>
        </div>
      </div>
    </section>

    <!-- Education -->
    <section class="pt-6">
      <h2 class="text-xs font-black uppercase tracking-widest bg-emerald-400 text-black px-3 py-1 inline-block neo-border-sm font-mono mb-3 neo-shadow-xs">
        05 // ACADEMIC_CREDENTIALS
      </h2>
      <div class="bg-zinc-50 neo-border-sm p-4 neo-shadow-xs print-shadow-none flex flex-col sm:flex-row justify-between sm:items-center gap-2">
        <div>
          <h3 class="text-xs font-black text-black uppercase font-mono">B.SC. IN COMPUTER SCIENCE & ENGINEERING</h3>
          <p class="text-xs font-bold text-zinc-700">Independent University, Bangladesh</p>
        </div>
        <span class="text-xs font-black text-black font-mono bg-yellow-300 border border-black px-2.5 py-1 inline-block">
          STATUS: COMPLETED
        </span>
      </div>
    </section>

  </div>
</body>
</html>
  `;
});
