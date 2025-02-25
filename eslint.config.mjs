import js from "@eslint/js";
import plugin from "./plugin.js";

export default [
    js.configs.recommended,
    {
        // Using the eslint-plugin-example plugin defined locally
        plugins: {
            "example": plugin
        },
        rules: {
            "example/useNullish": "error",
        },
    }
]
