import { defineEventHandler } from 'h3';

export default defineEventHandler(() => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Resume — Abdullah Dewan</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <style>
    body {
      font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background-color: #030305;
      color: #ededed;
    }
    
    .font-mono {
      font-family: 'JetBrains Mono', monospace;
    }

    .doc-sheet {
      background-color: #09090b;
      border: 1px solid rgba(255, 255, 255, 0.08);
      box-shadow: 0 0 50px rgba(0, 0, 0, 0.6);
    }

    @media print {
      @page {
        margin: 0;
        size: A4 portrait;
      }
      *, *:before, *:after {
        box-sizing: border-box !important;
      }
      html, body {
        background-color: #ffffff !important;
        color: #09090b !important;
        font-size: 10pt !important;
        line-height: 1.4 !important;
        margin: 0 !important;
        padding: 12mm 15mm !important;
        height: 100% !important;
        width: 100% !important;
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
      }
      .no-print {
        display: none !important;
      }
      .doc-sheet {
        background-color: #ffffff !important;
        border: none !important;
        box-shadow: none !important;
        padding: 0 !important;
        margin: 0 !important;
        max-width: 100% !important;
        width: 100% !important;
      }
      .print-border-b {
        border-bottom: 1.5px solid #e4e4e7 !important;
      }
      .print-text-dark {
        color: #09090b !important;
      }
      .print-text-muted {
        color: #52525b !important;
      }
      .print-bg-subtle {
        background-color: #f8fafc !important;
        border: 1px solid #e2e8f0 !important;
        color: #09090b !important;
      }
      a {
        text-decoration: none !important;
        color: #09090b !important;
      }
    }
  </style>
</head>
<body class="min-h-screen py-8 px-4 print:py-0 print:px-0">

  <!-- Print / Action Toolbar -->
  <div class="no-print max-w-4xl mx-auto mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
    <a 
      href="/" 
      class="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-zinc-900 border border-white/10 hover:border-white/20 text-zinc-300 hover:text-white text-xs font-mono transition-all"
    >
      <span>← Return to Portfolio</span>
    </a>
    
    <div class="flex items-center gap-3">
      <span class="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-400 bg-zinc-900 border border-white/10 px-3 py-1.5 rounded-lg">
        <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
        Full-Page A4 Sheet
      </span>
      <button 
        onclick="printClean()" 
        class="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white text-black hover:bg-zinc-200 text-xs font-semibold transition-all cursor-pointer shadow-sm"
      >
        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"></path>
        </svg>
        <span>Print Full-Page A4 PDF</span>
      </button>
    </div>
  </div>

  <!-- Document Sheet Container (Full A4 Balanced Proportion) -->
  <div class="doc-sheet max-w-4xl mx-auto rounded-2xl p-8 sm:p-12 space-y-6 print:space-y-4">
    
    <!-- Header Section -->
    <header class="border-b border-white/10 print-border-b pb-4">
      <div class="flex flex-col sm:flex-row justify-between sm:items-baseline gap-3">
        <div>
          <h1 class="text-3xl sm:text-4xl font-extrabold tracking-tight text-white print-text-dark">
            Abdullah Dewan
          </h1>
          <p class="text-sm sm:text-base font-semibold text-cyan-400 print:text-zinc-800 mt-1">
            Full-Stack Engineer &amp; Backend Systems Architect
          </p>
        </div>

        <div class="text-left sm:text-right font-mono text-xs text-zinc-400 print-text-muted space-y-1 shrink-0">
          <div class="flex sm:justify-end items-center gap-2">
            <a href="mailto:hello@abdullahdewan.com" class="hover:text-cyan-400 print:text-zinc-900 font-medium">hello@abdullahdewan.com</a>
            <span>·</span>
            <a href="https://abdullahdewan.com" target="_blank" class="hover:text-cyan-400 print:text-zinc-900 font-medium">abdullahdewan.com</a>
          </div>
          <div class="flex sm:justify-end items-center gap-2">
            <a href="https://github.com/abdullahdewan" target="_blank" class="hover:text-cyan-400 print:text-zinc-900 font-medium">github.com/abdullahdewan</a>
            <span>·</span>
            <span>Dhaka, Bangladesh</span>
          </div>
        </div>
      </div>
    </header>

    <!-- Professional Summary -->
    <section class="space-y-1.5">
      <h2 class="text-xs font-mono font-bold tracking-widest text-zinc-400 print-text-muted uppercase">
        01 // SUMMARY
      </h2>
      <p class="text-xs sm:text-sm text-zinc-300 print-text-dark leading-relaxed">
        Full-Stack Engineer and Systems Architect with 3+ years of commercial experience designing high-throughput relational database architectures, asynchronous API gateways, and real-time client applications. Specialized in PostgreSQL/MySQL query tuning, containerized staging pipelines, and modern TypeScript, Nuxt 3, and PHP ecosystems.
      </p>
    </section>

    <!-- Technical Capabilities -->
    <section class="space-y-2 border-t border-white/10 print-border-b pt-3.5">
      <h2 class="text-xs font-mono font-bold tracking-widest text-zinc-400 print-text-muted uppercase">
        02 // TECHNICAL CAPABILITIES
      </h2>
      
      <div class="grid grid-cols-3 gap-3.5 font-mono text-xs">
        <div class="bg-zinc-950/60 print-bg-subtle border border-white/5 p-3 rounded-xl space-y-1">
          <div class="font-bold text-white print-text-dark font-sans text-xs">Languages &amp; Core</div>
          <div class="text-zinc-400 print-text-muted text-[11px] leading-snug">TypeScript, JavaScript, PHP 8.x, SQL, Python 3</div>
        </div>

        <div class="bg-zinc-950/60 print-bg-subtle border border-white/5 p-3 rounded-xl space-y-1">
          <div class="font-bold text-white print-text-dark font-sans text-xs">Databases &amp; Systems</div>
          <div class="text-zinc-400 print-text-muted text-[11px] leading-snug">PostgreSQL, MySQL, MongoDB, Redis, Node.js</div>
        </div>

        <div class="bg-zinc-950/60 print-bg-subtle border border-white/5 p-3 rounded-xl space-y-1">
          <div class="font-bold text-white print-text-dark font-sans text-xs">Frontend &amp; DevOps</div>
          <div class="text-zinc-400 print-text-muted text-[11px] leading-snug">Vue 3, Nuxt 3, Tailwind CSS, Docker, Linux</div>
        </div>
      </div>
    </section>

    <!-- Work Experience -->
    <section class="space-y-2.5 border-t border-white/10 print-border-b pt-3.5">
      <h2 class="text-xs font-mono font-bold tracking-widest text-zinc-400 print-text-muted uppercase">
        03 // WORK EXPERIENCE
      </h2>
      
      <div class="space-y-3">
        <!-- Exp 1 -->
        <div class="space-y-1">
          <div class="flex justify-between items-baseline">
            <div class="text-xs sm:text-sm font-bold text-white print-text-dark">
              Senior Systems Architect &amp; Full-Stack Engineer <span class="font-normal text-zinc-400 print-text-muted text-xs">· Independent Client Deployments</span>
            </div>
            <span class="text-xs font-mono text-cyan-400 print:text-zinc-700 font-semibold shrink-0">
              2025 — Present
            </span>
          </div>
          <ul class="space-y-1 text-xs text-zinc-300 print-text-dark leading-relaxed pl-1">
            <li class="flex items-start gap-2">
              <span class="text-zinc-500">•</span>
              <span>Architected and deployed high-concurrency SSR applications utilizing Nuxt 3, Vue 3, and Node.js microservices.</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-zinc-500">•</span>
              <span>Constructed transport tracking data scrapers with sub-second caching layers and optimized PostgreSQL query indexes.</span>
            </li>
          </ul>
        </div>

        <!-- Exp 2 -->
        <div class="space-y-1">
          <div class="flex justify-between items-baseline">
            <div class="text-xs sm:text-sm font-bold text-white print-text-dark">
              Full-Stack Systems Consultant <span class="font-normal text-zinc-400 print-text-muted text-xs">· Client Engineering &amp; Product Teams</span>
            </div>
            <span class="text-xs font-mono text-zinc-400 print-text-muted font-semibold shrink-0">
              2023 — 2024
            </span>
          </div>
          <ul class="space-y-1 text-xs text-zinc-300 print-text-dark leading-relaxed pl-1">
            <li class="flex items-start gap-2">
              <span class="text-zinc-500">•</span>
              <span>Engineered real-time multiplayer lobbies using Socket.IO, clustered Express backends, and MongoDB synchronization.</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-zinc-500">•</span>
              <span>Containerized full-stack applications with Docker Compose and implemented automated staging workflows.</span>
            </li>
          </ul>
        </div>

        <!-- Exp 3 -->
        <div class="space-y-1">
          <div class="flex justify-between items-baseline">
            <div class="text-xs sm:text-sm font-bold text-white print-text-dark">
              Full-Stack Web Developer <span class="font-normal text-zinc-400 print-text-muted text-xs">· Commercial Systems Initiation</span>
            </div>
            <span class="text-xs font-mono text-zinc-400 print-text-muted font-semibold shrink-0">
              2021 — 2022
            </span>
          </div>
          <ul class="space-y-1 text-xs text-zinc-300 print-text-dark leading-relaxed pl-1">
            <li class="flex items-start gap-2">
              <span class="text-zinc-500">•</span>
              <span>Built custom administrative platforms with PHP 8, MySQL, and responsive Vue.js client interfaces.</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-zinc-500">•</span>
              <span>Configured Linux server environments with Nginx reverse proxies, SSL management, and database backup routines.</span>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Key Repositories & Education Row -->
    <div class="grid grid-cols-1 sm:grid-cols-12 gap-3.5 border-t border-white/10 print-border-b pt-3.5">
      
      <!-- Key Projects (8 cols) -->
      <section class="sm:col-span-8 space-y-2">
        <h2 class="text-xs font-mono font-bold tracking-widest text-zinc-400 print-text-muted uppercase">
          04 // FEATURED OPEN SOURCE
        </h2>
        <div class="grid grid-cols-3 gap-2.5">
          <div class="bg-zinc-950/60 print-bg-subtle border border-white/5 p-2.5 rounded-xl space-y-1">
            <div class="flex justify-between items-center">
              <span class="text-xs font-bold text-white print-text-dark">traininfo</span>
              <span class="text-[10px] font-mono text-cyan-400 print:text-zinc-700">Nuxt 3</span>
            </div>
            <p class="text-[11px] text-zinc-400 print-text-muted leading-tight">
              Live transit tracking &amp; train schedules platform.
            </p>
          </div>

          <div class="bg-zinc-950/60 print-bg-subtle border border-white/5 p-2.5 rounded-xl space-y-1">
            <div class="flex justify-between items-center">
              <span class="text-xs font-bold text-white print-text-dark">tictactoe</span>
              <span class="text-[10px] font-mono text-cyan-400 print:text-zinc-700">Socket.IO</span>
            </div>
            <p class="text-[11px] text-zinc-400 print-text-muted leading-tight">
              Real-time multiplayer lobby &amp; state sync.
            </p>
          </div>

          <div class="bg-zinc-950/60 print-bg-subtle border border-white/5 p-2.5 rounded-xl space-y-1">
            <div class="flex justify-between items-center">
              <span class="text-xs font-bold text-white print-text-dark">renpy-to-md</span>
              <span class="text-[10px] font-mono text-cyan-400 print:text-zinc-700">Python 3</span>
            </div>
            <p class="text-[11px] text-zinc-400 print-text-muted leading-tight">
              Visual novel parser generating Markdown trees.
            </p>
          </div>
        </div>
      </section>

      <!-- Education (4 cols) -->
      <section class="sm:col-span-4 space-y-2">
        <h2 class="text-xs font-mono font-bold tracking-widest text-zinc-400 print-text-muted uppercase">
          05 // EDUCATION
        </h2>
        <div class="bg-zinc-950/60 print-bg-subtle border border-white/5 p-2.5 rounded-xl space-y-1">
          <div class="text-xs font-bold text-white print-text-dark">B.Sc. in Computer Science &amp; Eng.</div>
          <div class="text-[11px] text-zinc-400 print-text-muted">Independent University, BD</div>
          <div class="text-[10px] font-mono text-emerald-400 print:text-zinc-800 font-semibold">Graduated / Completed</div>
        </div>
      </section>

    </div>

  </div>

  <script>
    function printClean() {
      const originalTitle = document.title;
      document.title = "";
      window.print();
      setTimeout(() => {
        document.title = originalTitle;
      }, 1000);
    }
  </script>
</body>
</html>
  `;
});
