import path from 'node:path'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  resolve: {
    alias: {
      '@payload-config': path.resolve(__dirname, 'src/payload.config.ts'),
      '@': path.resolve(__dirname, 'src'),
      // `server-only` throws outside React Server Components; tests import server modules directly.
      'server-only': path.resolve(__dirname, 'tests/unit/empty.ts'),
    },
  },
  test: {
    include: ['tests/unit/**/*.test.ts'],
    environment: 'node',
    env: {
      PAYLOAD_SECRET: 'test-secret',
      NEXT_PUBLIC_SERVER_URL: 'https://example.com',
      DATABASE_URL: 'postgres://unused:unused@127.0.0.1:1/none',
    },
    testTimeout: 60_000,
  },
})
