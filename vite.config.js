<<<<<<< HEAD
import { defineConfig } from 'vite'
=======
import {
  defineConfig
} from 'vite'
>>>>>>> 85e693d325ac80180b5a0cb1b031beadf1d22dce
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  server: {
<<<<<<< HEAD
    // Proxy removed for standalone frontend mode
  },
})
=======
    // Dev proxy to avoid CORS when calling local backend
   
  },
})
>>>>>>> 85e693d325ac80180b5a0cb1b031beadf1d22dce
