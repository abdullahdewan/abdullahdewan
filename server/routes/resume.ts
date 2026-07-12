import { defineEventHandler } from 'h3';

export default defineEventHandler(() => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Resume - Abdullah Dewan</title>
  <!-- Tailwind CSS Play CDN for printing -->
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
    body {
      font-family: 'Inter', sans-serif;
    }
    @media print {
      body {
        background-color: #ffffff;
        color: #000000;
      }
      .no-print {
        display: none !important;
      }
      .print-shadow-none {
        box-shadow: none !important;
      }
      .page-break {
        page-break-before: always;
      }
    }
  </style>
</head>
<body class="bg-zinc-50 text-zinc-900 min-h-screen py-10 print:py-0">

  <!-- Print floating toolbar -->
  <div class="no-print max-w-3xl mx-auto mb-6 flex justify-between items-center px-4">
    <a href="/" class="text-xs font-bold text-zinc-500 hover:text-zinc-900 transition-colors uppercase tracking-wider font-mono">
      ← Return to Terminal Dashboard
    </a>
    <button 
      onclick="window.print()" 
      class="bg-cyan-500 hover:bg-cyan-600 text-white font-bold text-xs uppercase tracking-wider py-2.5 px-5 rounded-lg shadow-md hover:shadow-lg transition-all cursor-pointer"
    >
      Print / Save as PDF
    </button>
  </div>

  <!-- Resume Document Sheet -->
  <div class="max-w-3xl mx-auto bg-white p-12 border border-zinc-200 rounded-2xl shadow-sm print:shadow-none print:border-none print:p-0">
    
    <!-- Header Section -->
    <header class="border-b border-zinc-200 pb-6">
      <div class="flex flex-col sm:flex-row justify-between sm:items-end gap-4">
        <div>
          <h1 class="text-3xl font-extrabold tracking-tight text-zinc-900">Abdullah Dewan</h1>
          <p class="text-sm font-semibold text-cyan-600 uppercase tracking-widest mt-1">Backend & Full-Stack Engineer</p>
        </div>
        <div class="text-right sm:text-right text-xs text-zinc-500 space-y-1 font-mono">
          <div><a href="mailto:hello@abdullahdewan.com" class="hover:underline">hello@abdullahdewan.com</a></div>
          <div><a href="https://abdullahdewan.com" target="_blank" class="hover:underline">abdullahdewan.com</a></div>
          <div><a href="https://github.com/abdullahdewan" target="_blank" class="hover:underline">github.com/abdullahdewan</a></div>
          <div>Dhaka, Bangladesh</div>
        </div>
      </div>
    </header>

    <!-- Professional Summary -->
    <section class="py-6 border-b border-zinc-200">
      <h2 class="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-3">Professional Summary</h2>
      <p class="text-sm text-zinc-700 leading-relaxed">
        Backend-focused Full-Stack Engineer with over 3 years of commercial experience designing high-performance database architectures, secure API gateways, and real-time client-side dashboards. Proficient in database query optimization, server containerization, and modern JavaScript/TypeScript architectures.
      </p>
    </section>

    <!-- Skills Matrix -->
    <section class="py-6 border-b border-zinc-200">
      <h2 class="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-4">Skills Matrix</h2>
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
        <div>
          <h3 class="font-bold text-zinc-900 uppercase tracking-wider mb-2">// Languages</h3>
          <ul class="space-y-1 text-zinc-600">
            <li>JavaScript (ESNext)</li>
            <li>TypeScript</li>
            <li>PHP</li>
            <li>SQL (Postgres/MySQL)</li>
            <li>Python</li>
          </ul>
        </div>
        <div>
          <h3 class="font-bold text-zinc-900 uppercase tracking-wider mb-2">// Databases & Backend</h3>
          <ul class="space-y-1 text-zinc-600">
            <li>PostgreSQL (JSONB index tuning)</li>
            <li>MySQL (Sub-ms optimization)</li>
            <li>MongoDB (Aggregation models)</li>
            <li>Node.js / Express</li>
            <li>RESTful API Architectures</li>
          </ul>
        </div>
        <div>
          <h3 class="font-bold text-zinc-900 uppercase tracking-wider mb-2">// Client & DevOps</h3>
          <ul class="space-y-1 text-zinc-600">
            <li>Vue.js (Composition API)</li>
            <li>Nuxt.js (SSR & SEO)</li>
            <li>Tailwind CSS</li>
            <li>Docker & Containerization</li>
            <li>Git & CI/CD Pipelines</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Professional Experience -->
    <section class="py-6 border-b border-zinc-200">
      <h2 class="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-4">Work Experience</h2>
      
      <div class="space-y-5">
        <div>
          <div class="flex justify-between items-start">
            <h3 class="text-sm font-bold text-zinc-900">Backend & Full-Stack Engineer</h3>
            <span class="text-xs text-zinc-500 font-mono">2021 — Present</span>
          </div>
          <p class="text-xs font-semibold text-cyan-600 mt-0.5">Commercial Contracts & Independent Projects</p>
          <ul class="list-disc list-outside ml-4 mt-2 text-xs text-zinc-600 space-y-1 leading-relaxed">
            <li>Architected and optimized secure server-side routes and API endpoints, handling millions of database transactions.</li>
            <li>Tuned relational query execution structures in MySQL and PostgreSQL, improving performance times by up to 80%.</li>
            <li>Configured containerized application environments utilizing Docker, streamlining local setup and staging deployments.</li>
            <li>Built high-end, responsive single-page and server-side rendered clients in Vue 3 and Nuxt 3, achieving Lighthouse scores above 95.</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Key Projects -->
    <section class="py-6 border-b border-zinc-200">
      <h2 class="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-4">Key Projects</h2>
      
      <div class="space-y-4">
        <div>
          <div class="flex justify-between items-start">
            <h3 class="text-sm font-bold text-zinc-900">traininfo</h3>
            <a href="https://github.com/abdullahdewan/traininfo" target="_blank" class="text-xs text-cyan-600 font-mono hover:underline">github.com/abdullahdewan/traininfo</a>
          </div>
          <p class="text-xs text-zinc-700 mt-1">
            A specialized tracking platform for Bangladesh Railway. Fetches live telemetry, parses schedules, and serves local users with a clean, cached, SSR-optimized Nuxt client interface.
          </p>
        </div>

        <div>
          <div class="flex justify-between items-start">
            <h3 class="text-sm font-bold text-zinc-900">tictactoe (Multiplayer)</h3>
            <a href="https://github.com/abdullahdewan/tictactoe" target="_blank" class="text-xs text-cyan-600 font-mono hover:underline">github.com/abdullahdewan/tictactoe</a>
          </div>
          <p class="text-xs text-zinc-700 mt-1">
            Real-time multiplayer gaming lobby. Integrates WebSockets via Socket.IO, manages game rooms, tracks win/draw states, and uses MongoDB for persistence. Fully Dockerized.
          </p>
        </div>

        <div>
          <div class="flex justify-between items-start">
            <h3 class="text-sm font-bold text-zinc-900">renpy-to-md</h3>
            <a href="https://github.com/abdullahdewan/renpy-to-md" target="_blank" class="text-xs text-cyan-600 font-mono hover:underline">github.com/abdullahdewan/renpy-to-md</a>
          </div>
          <p class="text-xs text-zinc-700 mt-1">
            A CLI tool written in Python to parse complex Visual Novel scripting trees and export them to structured Markdown files for localization and script editing.
          </p>
        </div>
      </div>
    </section>

    <!-- Education -->
    <section class="py-6">
      <h2 class="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-3">Education</h2>
      <div class="flex justify-between items-start">
        <div>
          <h3 class="text-sm font-bold text-zinc-900">B.Sc. in Computer Science & Engineering</h3>
          <p class="text-xs text-zinc-500 mt-0.5">Independent University, Bangladesh</p>
        </div>
        <span class="text-xs text-zinc-500 font-mono">Completed</span>
      </div>
    </section>

  </div>

  <script>
    // Automatic print trigger on load
    window.addEventListener('DOMContentLoaded', () => {
      setTimeout(() => {
        window.print();
      }, 500);
    });
  </script>
</body>
</html>
  `;
});
