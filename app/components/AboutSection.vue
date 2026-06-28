<template>
  <div class="space-y-6">
    <div class="border-b-2 border-foreground pb-4">
      <h2 class="text-xl uppercase font-bold tracking-tight">OPERATOR_PROFILE.md</h2>
      <p class="text-xs text-muted-foreground uppercase font-mono mt-1">
        Status: Classified // Clearance Level: Guest
      </p>
    </div>
    <div class="space-y-6">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
        <!-- ASCII Anonymous Operator Avatar -->
        <div
          class="border-2 border-foreground p-4 bg-muted font-mono text-[9px] leading-tight select-none overflow-x-auto text-center col-span-1"
        >
          <pre class="inline-block text-left text-foreground font-bold">
 _____________________
&lt; ANONYMOUS OPERATOR  &gt;
 ---------------------
        \   ^__^
         \  (oo)\_______
            (__)\       )\/\
                ||----w |
                ||     ||
          
      .::::::::::.
    .::::::::::::::::.
   .::::::::::::::::::.
   ::::::::::::::::::::
   ::::::::::::::::::::
   ::::'   '::'   '::::
   ::::     ::     ::::
   ::::.   .::.   .::::
   :::::::;;;;;;:::::::
   ::::::::::::::::::::
   '::::::::::::::::::'
     '::::::::::::::'
        '::::::::'
          </pre>
          <div
            class="mt-4 text-[10px] uppercase font-bold tracking-wider text-center text-foreground/80"
          >
            [ ID: DEWAN_ABDULLAH ]
          </div>
          <div class="text-[9px] text-muted-foreground text-center mt-1">
            LOC: DHAKA, BD // IP: *.*.*.*
          </div>
        </div>

        <!-- Bio Content -->
        <div class="col-span-1 md:col-span-2 space-y-4">
          <div class="space-y-2">
            <h3
              class="text-lg font-bold uppercase tracking-tight text-foreground flex items-center gap-2"
            >
              <span class="inline-block w-2 h-4 bg-foreground"></span>
              BIO_READOUT
            </h3>
            <p class="text-sm leading-relaxed text-foreground/90 font-mono">
              Mainly a full-stack developer with a deep interest and expertise in backend systems.
              Initiated commercial operations in the year 2021. Designed and deployed multiple
              high-performance database architectures, server nodes, and terminal dashboards.
            </p>
          </div>

          <div class="border-t border-dashed border-foreground/30 pt-4 space-y-3 font-mono text-sm">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div>
                <span class="text-muted-foreground uppercase text-xs block">Role:</span>
                <span class="font-bold text-foreground">Backend & Full-Stack Engineer</span>
              </div>
              <div>
                <span class="text-muted-foreground uppercase text-xs block">Experience:</span>
                <span class="font-bold text-foreground"
                  >Since 2021 ({{ new Date().getFullYear() - 2021 }}+ Years)</span
                >
              </div>
              <div>
                <span class="text-muted-foreground uppercase text-xs block">Location:</span>
                <span class="font-bold text-foreground">Dhaka, Bangladesh</span>
              </div>
              <div>
                <span class="text-muted-foreground uppercase text-xs block">Primary Status:</span>
                <span class="font-bold text-green-500 dark:text-green-400">ACTIVE_FOR_HIRE</span>
              </div>
            </div>
          </div>

          <div class="bg-foreground/5 dark:bg-foreground/10 border-l-4 border-foreground p-3">
            <p class="text-xs font-mono text-muted-foreground italic leading-normal">
              "We build clean paths through complex data. In backend, we trust. Security,
              optimization, and maintainability are not choices, they are the baseline
              configuration."
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
