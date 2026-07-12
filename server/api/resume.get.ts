import { defineEventHandler } from 'h3';

export default defineEventHandler(() => {
  return {
    basics: {
      name: 'Abdullah Dewan',
      label: 'Backend & Full-Stack Engineer',
      email: 'hello@abdullahdewan.com',
      url: 'https://abdullahdewan.com',
      summary:
        'Backend-focused Full-Stack Engineer with over 3 years of commercial experience designing high-performance database architectures, secure API gateways, and real-time client-side dashboards. Proficient in database query optimization, server containerization, and modern JavaScript/TypeScript architectures.',
      location: {
        city: 'Dhaka',
        countryCode: 'BD',
        region: 'Dhaka Division',
      },
      profiles: [
        {
          network: 'GitHub',
          username: 'abdullahdewan',
          url: 'https://github.com/abdullahdewan',
        },
      ],
    },
    work: [
      {
        name: 'Independent Software Contractor',
        position: 'Backend & Full-Stack Engineer',
        url: 'https://abdullahdewan.com',
        startDate: '2021-01-01',
        summary: 'Commercial software contracts and full-stack implementations.',
        highlights: [
          'Architected and optimized secure server-side routes and API endpoints, handling millions of database transactions.',
          'Tuned relational query execution structures in MySQL and PostgreSQL, improving performance times by up to 80%.',
          'Configured containerized application environments utilizing Docker, streamlining local setup and staging deployments.',
          'Built high-end, responsive single-page and server-side rendered clients in Vue 3 and Nuxt 3, achieving Lighthouse scores above 95.',
        ],
      },
    ],
    projects: [
      {
        name: 'traininfo',
        description:
          'A specialized tracking platform for Bangladesh Railway. Fetches live telemetry, parses schedules, and serves local users with a clean, cached, SSR-optimized Nuxt client interface.',
        url: 'https://github.com/abdullahdewan/traininfo',
        keywords: ['Nuxt 3', 'TypeScript', 'Vue 3', 'Tailwind', 'SSR'],
      },
      {
        name: 'tictactoe',
        description:
          'Real-time multiplayer gaming lobby. Integrates WebSockets via Socket.IO, manages game rooms, tracks win/draw states, and uses MongoDB for persistence. Fully Dockerized.',
        url: 'https://github.com/abdullahdewan/tictactoe',
        keywords: ['Vue 3', 'Socket.IO', 'Express', 'Node.js', 'MongoDB', 'Docker'],
      },
      {
        name: 'renpy-to-md',
        description:
          'A CLI tool written in Python to parse complex Visual Novel scripting trees and export them to structured Markdown files for localization and script editing.',
        url: 'https://github.com/abdullahdewan/renpy-to-md',
        keywords: ['Python 3', 'AST Parser', 'Markdown', 'CLI'],
      },
    ],
    skills: [
      {
        name: 'Languages',
        level: 'Expert',
        keywords: ['JavaScript (ESNext)', 'TypeScript', 'PHP', 'SQL', 'Python'],
      },
      {
        name: 'Databases & Backend',
        level: 'Expert',
        keywords: ['PostgreSQL', 'MySQL', 'MongoDB', 'Node.js', 'RESTful APIs'],
      },
      {
        name: 'Client & DevOps',
        level: 'Advanced',
        keywords: ['Vue.js 3', 'Nuxt.js', 'Tailwind CSS', 'Docker', 'Git', 'CI/CD'],
      },
    ],
    education: [
      {
        institution: 'Independent University, Bangladesh',
        area: 'Computer Science & Engineering',
        studyType: 'B.Sc.',
        startDate: '2019-01-01',
        endDate: '2023-01-01',
        score: 'Completed',
      },
    ],
  };
});
