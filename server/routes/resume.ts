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
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap');
    
    body {
      font-family: 'Plus Jakarta Sans', sans-serif;
      background-color: #0d0d0e;
      color: #f4f4f5;
    }
    
    .font-mono {
      font-family: 'JetBrains Mono', monospace;
    }

    @media print {
      body {
        background-color: #ffffff !important;
        color: #000000 !important;
      }
      .no-print {
        display: none !important;
      }
      .sheet {
        border: none !important;
        box-shadow: none !important;
        background-color: #ffffff !important;
        color: #000000 !important;
        padding: 0 !important;
        margin: 0 !important;
        max-width: 100% !important;
      }
      .print-dark {
        color: #000000 !important;
      }
      .print-muted {
        color: #4b5563 !important;
      }
      .print-border {
        border-color: #e5e7eb !important;
      }
      .print-box {
        background-color: #f9fafb !important;
        border-color: #e5e7eb !important;
      }
    }
  </style>
</head>
<body class="min-h-screen py-6 px-4 print:py-0 print:px-0">

  <!-- Top Action Bar -->
  <div class="no-print max-w-3xl mx-auto mb-4 flex items-center justify-between">
    <a 
      href="/" 
      class="text-xs text-zinc-400 hover:text-white transition-colors"
    >
      ← Back to Portfolio
    </a>
    <button 
      onclick="window.print()" 
      class="bg-orange-600 hover:bg-orange-500 text-white font-semibold text-xs px-5 py-2 rounded-full shadow transition-all cursor-pointer"
    >
      Print / PDF
    </button>
  </div>

  <!-- Compact Resume Sheet -->
  <div class="sheet max-w-3xl mx-auto bg-[#151516] border border-white/10 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
    
    <!-- Header -->
    <header class="border-b border-white/10 print-border pb-5">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 class="text-2xl sm:text-3xl font-extrabold tracking-tight text-white print-dark">
            Abdullah Dewan
          </h1>
          <p class="text-xs sm:text-sm font-semibold text-orange-400 mt-0.5">
            Full-Stack Software Engineer & Backend Systems Architect
          </p>
        </div>

        <div class="flex flex-wrap sm:flex-col sm:items-end gap-x-4 gap-y-1 text-xs text-zinc-400 print-muted font-mono">
          <a href="mailto:dewanmohammadabdullah@gmail.com" class="hover:text-orange-400">dewanmohammadabdullah@gmail.com</a>
          <a href="https://github.com/abdullahdewan" target="_blank" class="hover:text-orange-400">github.com/abdullahdewan</a>
          <span>Dhaka, Bangladesh (Remote)</span>
        </div>
      </div>
    </header>

    <!-- Core Competencies / Skills (Linked to Official Web Pages) -->
    <section class="space-y-2">
      <h2 class="text-[11px] font-mono uppercase tracking-wider text-orange-400 font-semibold">
        Skills & Technologies
      </h2>
      <div class="flex flex-wrap gap-1.5 text-xs">
        <a href="https://vuejs.org" target="_blank" class="bg-black/40 hover:bg-orange-600/20 hover:border-orange-500/40 print-box border border-white/5 px-2.5 py-1 rounded-md text-zinc-200 print-dark transition-colors">Vue 3</a>
        <a href="https://nuxt.com" target="_blank" class="bg-black/40 hover:bg-orange-600/20 hover:border-orange-500/40 print-box border border-white/5 px-2.5 py-1 rounded-md text-zinc-200 print-dark transition-colors">Nuxt 4</a>
        <a href="https://www.typescriptlang.org" target="_blank" class="bg-black/40 hover:bg-orange-600/20 hover:border-orange-500/40 print-box border border-white/5 px-2.5 py-1 rounded-md text-zinc-200 print-dark transition-colors">TypeScript</a>
        <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank" class="bg-black/40 hover:bg-orange-600/20 hover:border-orange-500/40 print-box border border-white/5 px-2.5 py-1 rounded-md text-zinc-200 print-dark transition-colors">JavaScript</a>
        <a href="https://nodejs.org" target="_blank" class="bg-black/40 hover:bg-orange-600/20 hover:border-orange-500/40 print-box border border-white/5 px-2.5 py-1 rounded-md text-zinc-200 print-dark transition-colors">Node.js</a>
        <a href="https://expressjs.com" target="_blank" class="bg-black/40 hover:bg-orange-600/20 hover:border-orange-500/40 print-box border border-white/5 px-2.5 py-1 rounded-md text-zinc-200 print-dark transition-colors">Express</a>
        <a href="https://www.php.net" target="_blank" class="bg-black/40 hover:bg-orange-600/20 hover:border-orange-500/40 print-box border border-white/5 px-2.5 py-1 rounded-md text-zinc-200 print-dark transition-colors">PHP</a>
        <a href="https://www.postgresql.org" target="_blank" class="bg-black/40 hover:bg-orange-600/20 hover:border-orange-500/40 print-box border border-white/5 px-2.5 py-1 rounded-md text-zinc-200 print-dark transition-colors">PostgreSQL</a>
        <a href="https://www.mysql.com" target="_blank" class="bg-black/40 hover:bg-orange-600/20 hover:border-orange-500/40 print-box border border-white/5 px-2.5 py-1 rounded-md text-zinc-200 print-dark transition-colors">MySQL</a>
        <a href="https://www.mongodb.com" target="_blank" class="bg-black/40 hover:bg-orange-600/20 hover:border-orange-500/40 print-box border border-white/5 px-2.5 py-1 rounded-md text-zinc-200 print-dark transition-colors">MongoDB</a>
        <a href="https://socket.io" target="_blank" class="bg-black/40 hover:bg-orange-600/20 hover:border-orange-500/40 print-box border border-white/5 px-2.5 py-1 rounded-md text-zinc-200 print-dark transition-colors">Socket.IO</a>
        <a href="https://tailwindcss.com" target="_blank" class="bg-black/40 hover:bg-orange-600/20 hover:border-orange-500/40 print-box border border-white/5 px-2.5 py-1 rounded-md text-zinc-200 print-dark transition-colors">Tailwind CSS</a>
        <a href="https://www.docker.com" target="_blank" class="bg-black/40 hover:bg-orange-600/20 hover:border-orange-500/40 print-box border border-white/5 px-2.5 py-1 rounded-md text-zinc-200 print-dark transition-colors">Docker</a>
        <a href="https://git-scm.com" target="_blank" class="bg-black/40 hover:bg-orange-600/20 hover:border-orange-500/40 print-box border border-white/5 px-2.5 py-1 rounded-md text-zinc-200 print-dark transition-colors">Git</a>
      </div>
    </section>

    <!-- Work Experience (Clean & Concise) -->
    <section class="space-y-3">
      <h2 class="text-[11px] font-mono uppercase tracking-wider text-orange-400 font-semibold">
        Experience
      </h2>
      
      <div class="space-y-4">
        <div class="space-y-1.5">
          <div class="flex items-center justify-between text-xs">
            <span class="font-bold text-white print-dark">Senior Full-Stack & Backend Engineer — Independent Software Engineering</span>
            <span class="text-zinc-400 print-muted font-mono text-[11px]">2021 — Present</span>
          </div>

          <ul class="space-y-1 text-xs text-zinc-300 print-dark list-disc list-inside leading-relaxed">
            <li>Architected production web platforms with Nuxt 4, Vue 3, and Node.js microservices.</li>
            <li>Optimized relational database queries in PostgreSQL & MySQL, reducing response times by up to 70%.</li>
            <li>Engineered high-concurrency WebSocket channels and event-driven architectures.</li>
            <li>Designed and maintained containerized staging & production pipelines with Docker.</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Selected Projects -->
    <section class="space-y-3">
      <h2 class="text-[11px] font-mono uppercase tracking-wider text-orange-400 font-semibold">
        Selected Projects
      </h2>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
        <div class="p-3.5 rounded-xl bg-black/30 print-box border border-white/5 space-y-1">
          <div class="flex items-center justify-between">
            <span class="font-bold text-white print-dark">TrainInfo Live</span>
            <span class="text-[10px] font-mono text-orange-400">Nuxt / Vue / Tailwind</span>
          </div>
          <p class="text-zinc-400 print-muted leading-relaxed">
            Real-time railway timetable and transit telemetry platform with cached server-side rendering.
          </p>
        </div>

        <div class="p-3.5 rounded-xl bg-black/30 print-box border border-white/5 space-y-1">
          <div class="flex items-center justify-between">
            <span class="font-bold text-white print-dark">TicTacToe Realtime</span>
            <span class="text-[10px] font-mono text-orange-400">Socket.IO / Express / Docker</span>
          </div>
          <p class="text-zinc-400 print-muted leading-relaxed">
            Multiplayer web app with instant room synchronization, matchmaking, and state persistence.
          </p>
        </div>
      </div>
    </section>

  </div>
</body>
</html>
  `;
});
