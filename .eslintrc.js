module.exports = {
    extends: [
        "react-app",
        "airbnb",
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended"
    ],
    parser: "@typescript-eslint/parser",
    parserOptions: { "project": ["./tsconfig.json"] },
    plugins: [
        "@typescript-eslint",
        "react",
        "import"
    ],
    
    rules: {
        "jsx-a11y/label-has-associated-control": "off",
        "jsx-a11y/label-has-for":"off",
        "no-param-reassign": 0,
        "no-console": "off",
        "arrow-parens": ["error", "as-needed"],
        "block-spacing": "error",
        "brace-style": "error",
        "import/order": ["error", {
            "groups": ["builtin", "external", "parent", "index", "sibling"]
        }],
        "react/function-component-definition": [
            "error",
            {
              "namedComponents": ["function-declaration", "arrow-function"],
              "unnamedComponents": "arrow-function"
            }
          ],
          "react/require-default-props": 0,
        "quotes": ["error", "single", {"avoidEscape": true}],
        "indent": ["error", 4],
        "react/jsx-indent": ["error", 4],
        "react/jsx-indent-props": ["error", 4],
        "linebreak-style": ["error", (process.platform === "win32" ? "windows" : "unix")], // https://stackoverflow.com/q/39114446/2771889
        "react/jsx-filename-extension": [1, {"extensions": ["js",".jsx", ".tsx"]}],
        "react/jsx-one-expression-per-line": "off",
        "import/prefer-default-export": "off" | "warn" | "error",
        "import/extensions": [
            "error",
            "ignorePackages",
            {
                "js": "never",
                "jsx": "never",
                "ts": "never",
                "tsx": "never",
            }
        ],
        "max-len": ["error", {"code": 500}],
        'jsx-a11y/no-static-element-interactions': [
            'error',
            {
              handlers: [
                'onClick',
                'onMouseDown',
                'onMouseUp',
                'onKeyPress',
                'onKeyDown',
                'onKeyUp',
              ],
              allowExpressionValues: true,
            },
          ]
    },
    settings: {
        "import/resolver": {
            node: {
                paths: ["./src"],
                extensions: [".js", ".jsx", ".ts", ".tsx",".json"]
            }
        }
    },
    "ignorePatterns": ["src/**/*.test.ts", "src/frontend/generated/*"],
    
  

}
