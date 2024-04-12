import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()]
	// ,
	// server: {
	// 	port: 5000 // 원하는 포트 번호로 변경
	// }
});
