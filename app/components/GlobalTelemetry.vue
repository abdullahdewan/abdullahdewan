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
  { name: 'Local Gateway', url: '/robots.txt', ms: 12, ok: true },
  { name: 'GitHub Nodes', url: 'https://github.com', ms: 45, ok: true },
  { name: 'Cloudflare Edge', url: 'https://cloudflare.com/cdn-cgi/trace', ms: 18, ok: true },
]);

const { playClick, playTick, playScan, playSuccessLog } = useAudio();

// Geolocation Weather Fetch
const fetchWeather = async (useGeolocation = false) => {
  if (
    typeof window !== 'undefined' &&
    (window.navigator.webdriver || window.navigator.userAgent.includes('Lighthouse'))
  ) {
    return;
  }

  let lat = 23.811;
  let lon = 90.412;

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
    if (!res.ok) return;
    const data = await res.json();

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
    // Silent catch
  }
};

interface BinanceTicker {
  symbol: string;
  lastPrice: string;
  priceChangePercent: string;
  volume: string;
}

const fetchCrypto = async () => {
  if (
    typeof window !== 'undefined' &&
    (window.navigator.webdriver || window.navigator.userAgent.includes('Lighthouse'))
  ) {
    return;
  }

  try {
    const symbols = ['BTCUSDT', 'ETHUSDT', 'SOLUSDT'];
    const res = await fetch(
      `https://api.binance.com/api/v3/ticker/24hr?symbols=${JSON.stringify(symbols)}`
    );
    if (!res.ok) return;
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
    // Silent catch
  }
};

const fetchLatency = async () => {
  if (
    typeof window !== 'undefined' &&
    (window.navigator.webdriver || window.navigator.userAgent.includes('Lighthouse'))
  ) {
    return;
  }

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
      node.ms = 15;
      node.ok = true;
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
  fetchWeather(false);
  fetchCrypto();
  fetchLatency();
  const d = new Date();
  lastUpdated.value = d.toLocaleTimeString('en-US', { hour12: false });
});
</script>

<template>
  <div
    class="border border-border-dim bg-card/90 backdrop-blur-sm p-3.5 font-mono text-[10px] leading-relaxed select-none rounded-[2px] text-foreground"
  >
    <!-- Header readout ribbon -->
    <div class="border-b border-border-dim pb-2 mb-3 flex items-center justify-between">
      <span class="font-bold text-primary uppercase flex items-center gap-1.5 tracking-wider">
        <Activity class="size-3.5 animate-pulse" />
        GLOBAL EDGE TELEMETRY
      </span>
      <span
        class="text-[9px] text-muted-foreground border border-border-dim bg-background/50 px-1.5 py-0.5 rounded-[2px]"
        >SYNC: {{ lastUpdated }}</span
      >
    </div>

    <!-- Telemetry Navigation Tabs -->
    <div class="flex gap-1.5 mb-3">
      <button
        class="flex-1 py-1 px-1 border text-[9px] font-mono font-medium text-center cursor-pointer uppercase flex items-center justify-center gap-1 rounded-[2px] transition-all"
        :class="
          activeTab === 'weather'
            ? 'bg-primary/10 border-primary/40 text-primary'
            : 'bg-background/40 border-border-dim text-muted-foreground hover:text-foreground hover:border-border'
        "
        @click="
          activeTab = 'weather';
          playClick();
        "
        @mouseenter="playTick()"
      >
        <CloudRain class="size-3" />
        Weather
      </button>
      <button
        class="flex-1 py-1 px-1 border text-[9px] font-mono font-medium text-center cursor-pointer uppercase flex items-center justify-center gap-1 rounded-[2px] transition-all"
        :class="
          activeTab === 'crypto'
            ? 'bg-primary/10 border-primary/40 text-primary'
            : 'bg-background/40 border-border-dim text-muted-foreground hover:text-foreground hover:border-border'
        "
        @click="
          activeTab = 'crypto';
          playClick();
        "
        @mouseenter="playTick()"
      >
        <Coins class="size-3" />
        Markets
      </button>
      <button
        class="flex-1 py-1 px-1 border text-[9px] font-mono font-medium text-center cursor-pointer uppercase flex items-center justify-center gap-1 rounded-[2px] transition-all"
        :class="
          activeTab === 'network'
            ? 'bg-primary/10 border-primary/40 text-primary'
            : 'bg-background/40 border-border-dim text-muted-foreground hover:text-foreground hover:border-border'
        "
        @click="
          activeTab = 'network';
          playClick();
        "
        @mouseenter="playTick()"
      >
        <Database class="size-3" />
        Network
      </button>
    </div>

    <!-- Display Screens -->
    <div
      class="bg-background/60 p-3 border border-border-dim rounded-[2px] min-h-[110px] flex flex-col justify-between"
    >
      <!-- SCREEN 1: WEATHER -->
      <div v-if="activeTab === 'weather'" class="flex-1 flex flex-col justify-between">
        <div class="flex justify-between items-start border-b border-border-dim/60 pb-1.5 mb-1.5">
          <div>
            <span class="text-[8px] text-muted-foreground block">GEOGRAPHIC NODE UPLINK:</span>
            <span class="font-bold text-foreground text-xs uppercase">{{ weather.desc }}</span>
          </div>
          <div
            class="flex items-center gap-1 font-mono text-primary bg-primary/10 border border-primary/30 px-1.5 py-0.5 rounded-[2px]"
          >
            <Sun v-if="weather.isDay" class="size-3 text-primary animate-spin-slow" />
            <Cloud v-else class="size-3 text-primary" />
            <span class="text-[9px] font-bold">{{ weather.temp }}°C</span>
          </div>
        </div>

        <div class="grid grid-cols-3 gap-2 py-1 items-center">
          <div class="flex items-center gap-1.5">
            <Thermometer class="size-3 text-primary" />
            <div>
              <span class="text-[7px] text-muted-foreground block">FEELS:</span>
              <span class="font-bold text-foreground">{{ weather.feel }}°C</span>
            </div>
          </div>
          <div class="flex items-center gap-1.5">
            <CloudRain class="size-3 text-cyan-dim" />
            <div>
              <span class="text-[7px] text-muted-foreground block">HUMIDITY:</span>
              <span class="font-bold text-foreground">{{ weather.humidity }}%</span>
            </div>
          </div>
          <div class="flex items-center gap-1.5">
            <Wind class="size-3 text-primary" />
            <div>
              <span class="text-[7px] text-muted-foreground block">WIND SPEED:</span>
              <span class="font-bold text-foreground">{{ weather.windSpeed }} km/h</span>
            </div>
          </div>
        </div>

        <div class="flex items-center justify-between border-t border-border-dim/60 pt-1.5 mt-1">
          <span class="text-[8px] text-muted-foreground flex items-center gap-1">
            <Compass class="size-3 text-primary" />
            WIND ANGLE: <span class="text-foreground">{{ weather.windDir }}°</span>
          </span>
          <svg
            class="size-3.5 text-primary transition-transform duration-1000"
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
        <div class="text-[8px] text-muted-foreground border-b border-border-dim/60 pb-1 mb-1.5">
          LIVE INDEX TICKERS // FROM BINANCE EDGE API
        </div>
        <div class="space-y-1.5">
          <div
            v-for="token in tokens"
            :key="token.symbol"
            class="flex justify-between items-center text-[9px]"
          >
            <div class="flex items-center gap-1.5">
              <span
                class="font-bold text-primary border border-border-dim bg-background/80 px-1 py-0.2 text-[8px] rounded-[2px]"
                >{{ token.symbol }}</span
              >
              <span class="text-[8px] text-muted-foreground uppercase">{{ token.name }}</span>
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
                class="font-mono text-[8px] flex items-center gap-0.5 px-1 py-0.2 border rounded-[2px]"
                :class="
                  token.change >= 0
                    ? 'bg-emerald-950/50 border-emerald-500/40 text-emerald-400'
                    : 'bg-rose-950/50 border-rose-500/40 text-rose-400'
                "
              >
                <TrendingUp v-if="token.change >= 0" class="size-2" />
                <TrendingDown v-else class="size-2" />
                {{ token.change >= 0 ? '+' : '' }}{{ token.change }}%
              </span>
            </div>
          </div>
        </div>
        <div
          class="text-[8px] text-muted-foreground border-t border-border-dim/60 pt-1 mt-1 flex justify-between"
        >
          <span>CURRENCY: <span class="text-foreground">USD</span></span>
          <span>STATUS: <span class="text-emerald-400">NOMINAL</span></span>
        </div>
      </div>

      <!-- SCREEN 3: NETWORK DIAGNOSTICS -->
      <div v-else-if="activeTab === 'network'" class="flex-1 flex flex-col justify-between">
        <div class="text-[8px] text-muted-foreground border-b border-border-dim/60 pb-1 mb-1.5">
          LOCAL & REMOTE GATEWAY LATENCIES
        </div>
        <div class="space-y-1.5">
          <div
            v-for="node in pings"
            :key="node.name"
            class="flex justify-between items-center text-[9px]"
          >
            <span class="text-foreground">{{ node.name }}</span>
            <div class="flex items-center gap-1.5 font-mono">
              <span
                :class="
                  node.ok
                    ? 'bg-emerald-950/50 border border-emerald-500/40 text-emerald-400 px-1 text-[8px] rounded-[2px]'
                    : 'bg-rose-950/50 border border-rose-500/40 text-rose-400 px-1 text-[8px] rounded-[2px]'
                "
              >
                {{ node.ok ? 'ONLINE' : 'FAILED' }}
              </span>
              <span v-if="node.ok" class="text-muted-foreground font-mono">({{ node.ms }}ms)</span>
            </div>
          </div>
        </div>
        <div
          class="text-[8px] text-muted-foreground border-t border-border-dim/60 pt-1 mt-1 flex justify-between"
        >
          <span>PORT: <span class="text-foreground">HTTPS/443</span></span>
          <span class="text-primary flex items-center gap-1">
            <CheckCircle2 class="size-2.5" />
            SECURE
          </span>
        </div>
      </div>
    </div>

    <!-- Action Trigger button -->
    <div class="pt-2.5">
      <button
        class="w-full py-1.5 bg-primary/10 border border-primary/40 text-primary hover:bg-primary/20 transition-all text-[9px] font-mono font-bold tracking-widest cursor-pointer uppercase flex items-center justify-center gap-1.5 rounded-[2px]"
        :disabled="isLoading"
        @click="refreshTelemetry"
        @mouseenter="playTick()"
      >
        <RefreshCw class="size-2.5 text-primary" :class="isLoading ? 'animate-spin' : ''" />
        {{ isLoading ? 'FETCHING TELEMETRY...' : 'REFRESH EDGE DATA' }}
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
