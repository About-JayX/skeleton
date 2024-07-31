/// <reference types="vite/client" />

declare interface Window extends window {
  ethereum: any
  solana: any
}

declare let window: Window & typeof globalThis & typeof any
