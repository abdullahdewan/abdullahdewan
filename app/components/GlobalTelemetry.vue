<script setup lang="ts">
import { ref, onMounted } from 'vue';
import {
  Activity,
  RefreshCw,
  CloudRain,
  Sun,
  Cloud,
  Thermometer,
  Wind,
  Compass,
  TrendingUp,
  TrendingDown,
  Coins,
  Database,
  CheckCircle2,
} from 'lucide-vue-next';

interface WeatherData {
  temp: number;
  feel: number;
  humidity: number;
  windSpeed: number;
  windDir: number;
  desc: string;
  isDay: boolean;
}

interface CryptoToken {
  symbol: string;
  name: string;
  price: number;
  change: number;
  volume: number;
}

const activeTab = ref<'weather' | 'crypto' | 'network'>('weather');
const isLoading = ref(false);
const lastUpdated = ref('NEVER');

// Weather State
const weather = ref<WeatherData>({
  temp: 28.5,
  feel: 31.2,
  humidity: 74,
  windSpeed: 12.4,
  windDir: 180,
  desc: 'Partly Cloudy',
  isDay: true,
});

// Crypto State
const tokens = ref<CryptoToken[]>([
  { symbol: 'BTC', name: 'Bitcoin', price: 64250, change: 1.45, volume: 28450000 },
  { symbol: 'ETH', name: 'Ethereum', price: 3450, change: -0.85, volume: 15400000 },
  { symbol: 'SOL', name: 'Solana', price: 142.5, change: 5.12, volume: 4800000 },
]);

// Latency Node State
const pings = ref([
  { name: 'Local Gateway', url: '/robots.txt', ms: 0, ok: true },
  { name: 'GitHub Nodes', url: 'https://github.com', ms: 0, ok: true },
  { name: 'Cloudflare Edge', url: 'https://cloudflare.com/cdn-cgi/trace', ms: 0, ok: true },
]);

const { playClick, playTick, playScan, playSuccessLog } = useAudio();

// Geolocation Weather Fetch
const fetchWeather = async (useGeolocation = false) => {
  let lat = 23.811; // Dhaka default
  let lon = 90.412;

  // Ask for browser geolocation if possible
  if (useGeolocation && navigator.geolocation) {
    const pos = await new Promise<GeolocationPosition | null>((resolve) => {
      navigator.geolocation.getCurrentPosition(
        (position) => resolve(position),
        () => resolve(null),
        { timeout: 3000 }
      );
    });
    if (pos) {
      lat = pos.coords.latitude;
      lon = pos.coords.longitude;
    }
  }

  try {
    const res = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,weather_code,wind_speed_10m,wind_direction_10m`
    );
    if (!res.ok) throw new Error();
    const data = await res.json();

    // Simple weather code interpreter
    const code = data.current.weather_code;
    let desc = 'Clear';
    if (code > 0 && code <= 3) desc = 'Partly Cloudy';
    else if (code >= 45 && code <= 48) desc = 'Foggy';
    else if (code >= 51 && code <= 67) desc = 'Rainy';
    else if (code >= 71 && code <= 77) desc = 'Snowy';
    else if (code >= 80 && code <= 99) desc = 'Thunderstorm';

    weather.value = {
      temp: data.current.temperature_2m,
      feel: data.current.apparent_temperature,
      humidity: data.current.relative_humidity_2m,
      windSpeed: data.current.wind_speed_10m,
      windDir: data.current.wind_direction_10m,
      desc,
      isDay: data.current.is_day === 1,
    };
  } catch {
    console.warn('Weather API failed');
  }
};

interface BinanceTicker {
  symbol: string;
  lastPrice: string;
  priceChangePercent: string;
  volume: string;
}

// Binance Ticker Price Fetch (Zero rate limit, extremely fast)
const fetchCrypto = async () => {
  try {
    const symbols = ['BTCUSDT', 'ETHUSDT', 'SOLUSDT'];
    const res = await fetch(
      `https://api.binance.com/api/v3/ticker/24hr?symbols=${JSON.stringify(symbols)}`
    );
    if (!res.ok) throw new Error();
    const data = (await res.json()) as BinanceTicker[];

    tokens.value = data.map((item: BinanceTicker): CryptoToken => {
      const isBTC = item.symbol.startsWith('BTC');
      const isETH = item.symbol.startsWith('ETH');
      return {
        symbol: isBTC ? 'BTC' : isETH ? 'ETH' : 'SOL',
        name: isBTC ? 'Bitcoin' : isETH ? 'Ethereum' : 'Solana',
        price: parseFloat(item.lastPrice),
        change: parseFloat(item.priceChangePercent),
        volume: Math.round(parseFloat(item.volume)),
      };
    });
  } catch {
    console.warn('Crypto API failed');
  }
};

// Ping Latency Fetch
const fetchLatency = async () => {
  for (const node of pings.value) {
    const start = performance.now();
    try {
      const sep = node.url.includes('?') ? '&' : '?';
      await fetch(`${node.url}${sep}t=${Date.now()}`, {
        method: 'HEAD',
        mode: 'no-cors',
        cache: 'no-store',
      });
      node.ms = Math.round(performance.now() - start);
      node.ok = true;
    } catch {
      node.ms = 0;
      node.ok = false;
    }
  }
};

const refreshTelemetry = async () => {
  if (isLoading.value) return;
  isLoading.value = true;
  playScan();

  if (activeTab.value === 'weather') {
    await fetchWeather(true);
  } else if (activeTab.value === 'crypto') {
    await fetchCrypto();
  } else if (activeTab.value === 'network') {
    await fetchLatency();
  }

  const d = new Date();
  lastUpdated.value = d.toLocaleTimeString('en-US', { hour12: false });
  isLoading.value = false;
  playSuccessLog();
};

onMounted(() => {
  // Autoload all telemetry APIs on mount
  fetchWeather(false);
  fetchCrypto();
  fetchLatency();
  const d = new Date();
  lastUpdated.value = d.toLocaleTimeString('en-US', { hour12: false });
});
</script>

<template>
  <div
    class="border border-border bg-card/60 backdrop-blur-md p-4 rounded-2xl font-mono text-[10px] leading-relaxed select-none relative shadow-lg text-foreground"
  >
    <!-- HUD Corners decors -->
    <div class="absolute top-0 left-0 w-2 h-2 border-t border-l border-primary/60"></div>
    <div class="absolute top-0 right-0 w-2 h-2 border-t border-r border-primary/60"></div>
    <div class="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-primary/60"></div>
    <div class="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-primary/60"></div>

    <!-- Header readout -->
    <div class="border-b border-border/60 pb-2 mb-3 flex items-center justify-between">
      <span class="font-bold text-primary uppercase flex items-center gap-1.5">
        <Activity class="size-3.5 text-primary animate-pulse" />
        GLOBAL EDGE TELEMETRY
      </span>
      <span class="text-[8px] text-muted-foreground">SYNC: {{ lastUpdated }}</span>
    </div>

    <!-- Telemetry Navigation Tabs -->
    <div class="flex gap-1 mb-3.5">
      <button
        class="flex-1 py-1 px-1.5 border transition-all rounded-md text-[8px] font-bold text-center cursor-pointer uppercase flex items-center justify-center gap-1"
        :class="
          activeTab === 'weather'
            ? 'border-primary bg-primary/10 text-primary shadow-[0_0_8px_var(--glow-color)]'
            : 'border-border text-muted-foreground bg-muted/20 hover:bg-muted/60 hover:text-foreground'
        "
        @click="
          activeTab = 'weather';
          playClick();
        "
        @mouseenter="playTick()"
      >
        <CloudRain class="size-2.5" />
        Weather
      </button>
      <button
        class="flex-1 py-1 px-1.5 border transition-all rounded-md text-[8px] font-bold text-center cursor-pointer uppercase flex items-center justify-center gap-1"
        :class="
          activeTab === 'crypto'
            ? 'border-primary bg-primary/10 text-primary shadow-[0_0_8px_var(--glow-color)]'
            : 'border-border text-muted-foreground bg-muted/20 hover:bg-muted/60 hover:text-foreground'
        "
        @click="
          activeTab = 'crypto';
          playClick();
        "
        @mouseenter="playTick()"
      >
        <Coins class="size-2.5" />
        Markets
      </button>
      <button
        class="flex-1 py-1 px-1.5 border transition-all rounded-md text-[8px] font-bold text-center cursor-pointer uppercase flex items-center justify-center gap-1"
        :class="
          activeTab === 'network'
            ? 'border-primary bg-primary/10 text-primary shadow-[0_0_8px_var(--glow-color)]'
            : 'border-border text-muted-foreground bg-muted/20 hover:bg-muted/60 hover:text-foreground'
        "
        @click="
          activeTab = 'network';
          playClick();
        "
        @mouseenter="playTick()"
      >
        <Database class="size-2.5" />
        Network
      </button>
    </div>

    <!-- Display Screens -->
    <div
      class="bg-muted/30 dark:bg-slate-950 p-3 rounded-xl border border-border min-h-[110px] flex flex-col justify-between"
    >
      <!-- SCREEN 1: WEATHER -->
      <div v-if="activeTab === 'weather'" class="flex-1 flex flex-col justify-between">
        <div class="flex justify-between items-start border-b border-border/40 pb-1.5 mb-1.5">
          <div>
            <span class="text-[8px] text-muted-foreground block">GEOGRAPHIC NODE UPLINK:</span>
            <span class="font-bold text-foreground text-xs uppercase">{{ weather.desc }}</span>
          </div>
          <div class="flex items-center gap-1 text-primary">
            <Sun
              v-if="weather.isDay"
              class="size-3.5 text-amber-500 dark:text-amber-400 animate-spin-slow"
            />
            <Cloud v-else class="size-3.5 text-slate-500 dark:text-slate-400" />
            <span class="text-[9px] font-bold">{{ weather.temp }}°C</span>
          </div>
        </div>

        <div class="grid grid-cols-3 gap-2 py-1 items-center">
          <div class="flex items-center gap-1.5">
            <Thermometer class="size-3.5 text-primary/70" />
            <div>
              <span class="text-[7px] text-muted-foreground block">FEELS:</span>
              <span class="font-bold text-foreground">{{ weather.feel }}°C</span>
            </div>
          </div>
          <div class="flex items-center gap-1.5">
            <CloudRain class="size-3.5 text-primary/70" />
            <div>
              <span class="text-[7px] text-muted-foreground block">HUMIDITY:</span>
              <span class="font-bold text-foreground">{{ weather.humidity }}%</span>
            </div>
          </div>
          <div class="flex items-center gap-1.5">
            <Wind class="size-3.5 text-primary/70" />
            <div>
              <span class="text-[7px] text-muted-foreground block">WIND SPEED:</span>
              <span class="font-bold text-foreground">{{ weather.windSpeed }} km/h</span>
            </div>
          </div>
        </div>

        <div class="flex items-center justify-between border-t border-border/40 pt-1.5 mt-1">
          <span class="text-[7px] text-muted-foreground flex items-center gap-0.5">
            <Compass class="size-3" />
            WIND ANGLE: {{ weather.windDir }}°
          </span>
          <!-- Interactive rotating compass arrow -->
          <svg
            class="size-4 text-primary transition-transform duration-1000"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            :style="`transform: rotate(${weather.windDir}deg)`"
          >
            <line x1="12" y1="22" x2="12" y2="2" />
            <polyline points="5 9 12 2 19 9" />
          </svg>
        </div>
      </div>

      <!-- SCREEN 2: MARKETS -->
      <div v-else-if="activeTab === 'crypto'" class="flex-1 flex flex-col justify-between">
        <div class="text-[8px] text-muted-foreground border-b border-border/40 pb-1 mb-1.5">
          LIVE INDEX TICKERS // FROM BINANCE EDGE API
        </div>
        <div class="space-y-1.5">
          <div
            v-for="token in tokens"
            :key="token.symbol"
            class="flex justify-between items-center text-[9px]"
          >
            <div class="flex items-center gap-1.5">
              <span class="font-bold text-foreground">{{ token.symbol }}</span>
              <span class="text-[7px] text-muted-foreground uppercase">{{ token.name }}</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="font-mono text-foreground font-bold tabular-nums">
                ${{
                  token.price.toLocaleString('en-US', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })
                }}
              </span>
              <span
                class="font-mono font-bold flex items-center gap-0.5"
                :class="
                  token.change >= 0
                    ? 'text-green-600 dark:text-green-400'
                    : 'text-red-600 dark:text-red-400'
                "
              >
                <TrendingUp v-if="token.change >= 0" class="size-2.5" />
                <TrendingDown v-else class="size-2.5" />
                {{ token.change >= 0 ? '+' : '' }}{{ token.change }}%
              </span>
            </div>
          </div>
        </div>
        <div
          class="text-[7px] text-muted-foreground border-t border-border/40 pt-1 mt-1 flex justify-between"
        >
          <span>CURRENCY: USD</span>
          <span>MARKET RATE: NOMINAL</span>
        </div>
      </div>

      <!-- SCREEN 3: NETWORK DIAGNOSTICS -->
      <div v-else-if="activeTab === 'network'" class="flex-1 flex flex-col justify-between">
        <div class="text-[8px] text-muted-foreground border-b border-border/40 pb-1 mb-1.5">
          LOCAL & REMOTE GATEWAY LATENCIES
        </div>
        <div class="space-y-2">
          <div
            v-for="node in pings"
            :key="node.name"
            class="flex justify-between items-center text-[9px]"
          >
            <span class="font-bold text-foreground">{{ node.name }}</span>
            <div class="flex items-center gap-1.5 font-mono">
              <span
                :class="
                  node.ok
                    ? 'text-green-600 dark:text-green-400 animate-pulse'
                    : 'text-red-600 dark:text-red-400'
                "
                class="font-bold"
              >
                {{ node.ok ? 'ONLINE' : 'FAILED' }}
              </span>
              <span v-if="node.ok" class="text-slate-500 dark:text-slate-400"
                >({{ node.ms }}ms)</span
              >
            </div>
          </div>
        </div>
        <div
          class="text-[7px] text-muted-foreground border-t border-border/40 pt-1 mt-1 flex justify-between"
        >
          <span>PORT: HTTPS/443</span>
          <span class="text-green-600 dark:text-green-400 font-bold flex items-center gap-0.5">
            <CheckCircle2 class="size-2.5" />
            SECURE
          </span>
        </div>
      </div>
    </div>

    <!-- Action Trigger button -->
    <div class="pt-3">
      <button
        class="w-full py-2 bg-primary/10 border border-primary/45 hover:border-primary/80 hover:bg-primary/20 transition-all rounded-lg text-[9px] font-bold text-center tracking-widest cursor-pointer uppercase flex items-center justify-center gap-1.5"
        :disabled="isLoading"
        @click="refreshTelemetry"
        @mouseenter="playTick()"
      >
        <RefreshCw class="size-3 text-primary" :class="isLoading ? 'animate-spin' : ''" />
        {{ isLoading ? 'FETCHING TELEMETRY DATA...' : 'REFRESH EDGE DATA' }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.animate-spin-slow {
  animation: spin 8s linear infinite;
}
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
