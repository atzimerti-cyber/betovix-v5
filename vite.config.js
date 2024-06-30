import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
// import fs from 'fs';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), svgr()],
    server: {
        host: '0.0.0.0',
        port: 3000,
        // https: {
        //     key: fs.readFileSync('C:/Windows/System32/localhost+2-key.pem'),
        //     cert: fs.readFileSync('C:/Windows/System32/localhost+2.pem'),
        // },
    },
});
