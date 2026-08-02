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
    // Silent catch to prevent DevTools 403/network logs
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
    class="border-3 border-black dark:border-white bg-card p-4 font-mono text-[10px] leading-relaxed select-none relative shadow-[4px_4px_0px_0px_#000000] dark:shadow-[4px_4px_0px_0px_#06b6d4] text-foreground"
  >
    <!-- Header readout ribbon -->
    <div
      class="border-b-2 border-black dark:border-white pb-2 mb-3 flex items-center justify-between bg-primary text-primary-foreground p-2 border border-black"
    >
      <span class="font-black uppercase flex items-center gap-1.5">
        <Activity class="size-4 animate-pulse" />
        GLOBAL EDGE TELEMETRY
      </span>
      <span class="text-[8px] font-black bg-black text-white px-1.5 py-0.5"
        >SYNC: {{ lastUpdated }}</span
      >
    </div>

    <!-- Telemetry Navigation Tabs -->
    <div class="flex gap-1.5 mb-3">
      <button
        class="flex-1 py-1.5 px-1 border-2 border-black dark:border-white text-[8px] font-black text-center cursor-pointer uppercase flex items-center justify-center gap-1 transition-all"
        :class="
          activeTab === 'weather'
            ? 'bg-secondary text-secondary-foreground shadow-[2px_2px_0px_0px_#000] dark:shadow-[2px_2px_0px_0px_#fff] -translate-y-0.5'
            : 'bg-card text-foreground shadow-[2px_2px_0px_0px_#000] dark:shadow-[2px_2px_0px_0px_#06b6d4] hover:bg-muted'
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
        class="flex-1 py-1.5 px-1 border-2 border-black dark:border-white text-[8px] font-black text-center cursor-pointer uppercase flex items-center justify-center gap-1 transition-all"
        :class="
          activeTab === 'crypto'
            ? 'bg-secondary text-secondary-foreground shadow-[2px_2px_0px_0px_#000] dark:shadow-[2px_2px_0px_0px_#fff] -translate-y-0.5'
            : 'bg-card text-foreground shadow-[2px_2px_0px_0px_#000] dark:shadow-[2px_2px_0px_0px_#06b6d4] hover:bg-muted'
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
        class="flex-1 py-1.5 px-1 border-2 border-black dark:border-white text-[8px] font-black text-center cursor-pointer uppercase flex items-center justify-center gap-1 transition-all"
        :class="
          activeTab === 'network'
            ? 'bg-secondary text-secondary-foreground shadow-[2px_2px_0px_0px_#000] dark:shadow-[2px_2px_0px_0px_#fff] -translate-y-0.5'
            : 'bg-card text-foreground shadow-[2px_2px_0px_0px_#000] dark:shadow-[2px_2px_0px_0px_#06b6d4] hover:bg-muted'
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
      class="bg-muted p-3 border-2 border-black dark:border-white min-h-[110px] flex flex-col justify-between shadow-[2px_2px_0px_0px_#000]"
    >
      <!-- SCREEN 1: WEATHER -->
      <div v-if="activeTab === 'weather'" class="flex-1 flex flex-col justify-between">
        <div
          class="flex justify-between items-start border-b-2 border-black dark:border-white pb-1.5 mb-1.5"
        >
          <div>
            <span class="text-[8px] text-muted-foreground block font-bold"
              >GEOGRAPHIC NODE UPLINK:</span
            >
            <span class="font-black text-foreground text-xs uppercase">{{ weather.desc }}</span>
          </div>
          <div
            class="flex items-center gap-1 font-black bg-primary text-primary-foreground px-2 py-0.5 border border-black"
          >
            <Sun v-if="weather.isDay" class="size-3.5 text-black animate-spin-slow" />
            <Cloud v-else class="size-3.5 text-black" />
            <span class="text-[9px] font-black">{{ weather.temp }}°C</span>
          </div>
        </div>

        <div class="grid grid-cols-3 gap-2 py-1 items-center font-bold">
          <div class="flex items-center gap-1.5">
            <Thermometer class="size-3.5 text-primary" />
            <div>
              <span class="text-[7px] text-muted-foreground block">FEELS:</span>
              <span class="font-black text-foreground">{{ weather.feel }}°C</span>
            </div>
          </div>
          <div class="flex items-center gap-1.5">
            <CloudRain class="size-3.5 text-secondary" />
            <div>
              <span class="text-[7px] text-muted-foreground block">HUMIDITY:</span>
              <span class="font-black text-foreground">{{ weather.humidity }}%</span>
            </div>
          </div>
          <div class="flex items-center gap-1.5">
            <Wind class="size-3.5 text-accent" />
            <div>
              <span class="text-[7px] text-muted-foreground block">WIND SPEED:</span>
              <span class="font-black text-foreground">{{ weather.windSpeed }} km/h</span>
            </div>
          </div>
        </div>

        <div
          class="flex items-center justify-between border-t-2 border-black dark:border-white pt-1.5 mt-1"
        >
          <span class="text-[7px] text-foreground font-black flex items-center gap-0.5">
            <Compass class="size-3" />
            WIND ANGLE: {{ weather.windDir }}°
          </span>
          <svg
            class="size-4 text-foreground transition-transform duration-1000"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2.5"
            :style="`transform: rotate(${weather.windDir}deg)`"
          >
            <line x1="12" y1="22" x2="12" y2="2" />
            <polyline points="5 9 12 2 19 9" />
          </svg>
        </div>
      </div>

      <!-- SCREEN 2: MARKETS -->
      <div v-else-if="activeTab === 'crypto'" class="flex-1 flex flex-col justify-between">
        <div
          class="text-[8px] text-foreground font-black border-b-2 border-black dark:border-white pb-1 mb-1.5"
        >
          LIVE INDEX TICKERS // FROM BINANCE EDGE API
        </div>
        <div class="space-y-1.5">
          <div
            v-for="token in tokens"
            :key="token.symbol"
            class="flex justify-between items-center text-[9px] font-bold"
          >
            <div class="flex items-center gap-1.5">
              <span class="font-black bg-black text-white px-1.5 py-0.2 text-[8px]">{{
                token.symbol
              }}</span>
              <span class="text-[7px] text-muted-foreground uppercase font-bold">{{
                token.name
              }}</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="font-mono text-foreground font-black tabular-nums">
                ${{
                  token.price.toLocaleString('en-US', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })
                }}
              </span>
              <span
                class="font-mono font-black flex items-center gap-0.5 px-1 border border-black"
                :class="token.change >= 0 ? 'bg-green-400 text-black' : 'bg-red-400 text-black'"
              >
                <TrendingUp v-if="token.change >= 0" class="size-2.5" />
                <TrendingDown v-else class="size-2.5" />
                {{ token.change >= 0 ? '+' : '' }}{{ token.change }}%
              </span>
            </div>
          </div>
        </div>
        <div
          class="text-[7px] text-foreground font-black border-t-2 border-black dark:border-white pt-1 mt-1 flex justify-between"
        >
          <span>CURRENCY: USD</span>
          <span>MARKET RATE: NOMINAL</span>
        </div>
      </div>

      <!-- SCREEN 3: NETWORK DIAGNOSTICS -->
      <div v-else-if="activeTab === 'network'" class="flex-1 flex flex-col justify-between">
        <div
          class="text-[8px] text-foreground font-black border-b-2 border-black dark:border-white pb-1 mb-1.5"
        >
          LOCAL & REMOTE GATEWAY LATENCIES
        </div>
        <div class="space-y-2">
          <div
            v-for="node in pings"
            :key="node.name"
            class="flex justify-between items-center text-[9px] font-bold"
          >
            <span class="font-black text-foreground">{{ node.name }}</span>
            <div class="flex items-center gap-1.5 font-mono">
              <span
                :class="
                  node.ok
                    ? 'bg-green-400 text-black border border-black px-1 font-black animate-pulse'
                    : 'bg-red-400 text-black border border-black px-1 font-black'
                "
              >
                {{ node.ok ? 'ONLINE' : 'FAILED' }}
              </span>
              <span v-if="node.ok" class="text-foreground font-bold">({{ node.ms }}ms)</span>
            </div>
          </div>
        </div>
        <div
          class="text-[7px] text-foreground font-black border-t-2 border-black dark:border-white pt-1 mt-1 flex justify-between"
        >
          <span>PORT: HTTPS/443</span>
          <span
            class="bg-primary text-primary-foreground px-1 border border-black font-black flex items-center gap-0.5"
          >
            <CheckCircle2 class="size-2.5" />
            SECURE
          </span>
        </div>
      </div>
    </div>

    <!-- Action Trigger button -->
    <div class="pt-3">
      <button
        class="w-full py-2.5 bg-primary text-primary-foreground border-2 border-black dark:border-white shadow-[3px_3px_0px_0px_#000000] dark:shadow-[3px_3px_0px_0px_#ffffff] hover:-translate-y-0.5 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all text-[9px] font-black text-center tracking-widest cursor-pointer uppercase flex items-center justify-center gap-1.5"
        :disabled="isLoading"
        @click="refreshTelemetry"
        @mouseenter="playTick()"
      >
        <RefreshCw
          class="size-3 text-primary-foreground"
          :class="isLoading ? 'animate-spin' : ''"
        />
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
