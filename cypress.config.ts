import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:5173/',
    experimentalModifyObstructiveThirdPartyCode: true,
  },
})
