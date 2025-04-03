import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [
        react({
            include: "**/*.tsx",
        }),
    ],
    build: {
        outDir: "dist",
        emptyOutDir: true,
        sourcemap: true,
    },
});

