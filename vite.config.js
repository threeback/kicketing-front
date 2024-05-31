import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import basicSsl from '@vitejs/plugin-basic-ssl'

export default defineConfig({
	server: {
		proxy: {}
	},
	plugins: [basicSsl(), sveltekit()]
	// ,
	// server: {
	// 	port: 5000 // 원하는 포트 번호로 변경
	// }
});
