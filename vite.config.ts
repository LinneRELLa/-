import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import commonjs from "rollup-plugin-commonjs";
import externalGlobals from "rollup-plugin-external-globals";
import path from 'path'
// https://vitejs.dev/config/
export default defineConfig({
 base: "./",
 resolve: {
        alias: {
            "@": path.resolve(__dirname, "/"),
            "view": path.resolve(__dirname, "src/view"),
            "components": path.resolve(__dirname, "src/components"),
            "assets": path.resolve(__dirname, "src/assets"),
            "store": path.resolve(__dirname, "src/store"),
            "mixins": path.resolve(__dirname, "src/mixins"),
        },
    },
  plugins: [vue()],
/*  server:{
  proxy:{
  	'/api':{
  		target:"https://c.m.163.com",
  		changeOrigin:true,
  		rewrite:(path)=>{return path.replace(/^\/api/,'')}
  	}
  },

   },*/
    build: {
    rollupOptions: {
      external: ["echarts"],
      plugins: [
        commonjs(),
        externalGlobals({
          "echarts": "echarts"
        }),
      ],
    },
  }
})


