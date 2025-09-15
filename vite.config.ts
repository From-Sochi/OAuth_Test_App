// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// export default defineConfig({
//   plugins: [react()],
//   base: '/OAuth_Test_App/',
// })





import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/OAuth_Test_App/', // ← УБЕДИТЕСЬ ЧТО ПУТЬ ПРАВИЛЬНЫЙ
})