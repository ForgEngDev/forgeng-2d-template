import { defineConfig } from "vite";
import path from "node:path";

const vendor = path.resolve(import.meta.dirname, "src/vendor/forgeng");

export default defineConfig({
  resolve: {
    alias: {
      "forgeng/presets/2d": path.join(vendor, "presets/2d/forge-2d.package.js"),
      "forgeng/2d/runtime": path.join(vendor, "2d/runtime/forge-2d-runtime.package.js"),
      "forgeng/2d": path.join(vendor, "2d/forge-2d.package.js"),
      "forgeng/contracts/actions": path.join(
        vendor,
        "contracts/actions/input-actions-contract.esm.js",
      ),
      "@forgeng/ui-dom": path.join(vendor, "ui-dom.esm.js"),
    },
  },
  server: {
    port: 3001,
    open: true,
  },
});
