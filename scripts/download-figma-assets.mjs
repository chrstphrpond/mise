// Downloads all unique Figma MCP image assets to public/figma-assets.
// URLs collected by traversing 25+ frames in the Mise Figma file via the MCP server.
// Skips files that already exist on disk with non-zero size.

import { existsSync, statSync, createWriteStream } from "node:fs";
import { mkdir } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { request } from "node:https";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = join(__dirname, "..", "public", "figma-assets");

const ASSETS = [
  // --- DESKTOP HERO (2125:19792) ---
  { url: "https://www.figma.com/api/mcp/asset/84064d9c-07d9-488d-973b-38bbca8a25ff", filename: "hero-ipad-screen.png" },
  { url: "https://www.figma.com/api/mcp/asset/452044cc-d8ad-40fa-b946-b27f4b0b8f2b", filename: "icon-bolt.png" },
  { url: "https://www.figma.com/api/mcp/asset/f3234c1a-1e9d-4ebb-ad1d-f9fdd6b2994a", filename: "logo-placeholder-1.png" },
  { url: "https://www.figma.com/api/mcp/asset/02542a80-3c90-4c60-8653-54f0ed53d28c", filename: "logo-placeholder-6.png" },
  { url: "https://www.figma.com/api/mcp/asset/d14a7303-a7ae-437d-b4c1-3c408039031d", filename: "logo-placeholder-2.png" },
  { url: "https://www.figma.com/api/mcp/asset/6be18101-10f4-48e7-a161-cd84dc4fc7fd", filename: "logo-placeholder-3.png" },
  { url: "https://www.figma.com/api/mcp/asset/fd931657-dc85-4c21-9222-e2f8739b7a54", filename: "logo-placeholder-4.png" },
  { url: "https://www.figma.com/api/mcp/asset/1a8ac0c1-e0d8-4512-9c98-e5b0465def6f", filename: "logo-placeholder-5.png" },
  { url: "https://www.figma.com/api/mcp/asset/d5fb9253-eba0-4031-a0bb-4b333edc136f", filename: "logo-placeholder-7.png" },
  { url: "https://www.figma.com/api/mcp/asset/59330647-ab4e-4ef4-8201-a164d25ae401", filename: "logo-placeholder-8.png" },

  // --- DESKTOP SOLUTION (2125:19917) ---
  { url: "https://www.figma.com/api/mcp/asset/75a51c44-cb8f-483b-b5a1-9ea9b620dfee", filename: "icon-ellipse-check-bg.png" },
  { url: "https://www.figma.com/api/mcp/asset/dd9980b8-4dfd-4bae-98c3-1487023a321f", filename: "icon-check.png" },
  { url: "https://www.figma.com/api/mcp/asset/56ecfc4d-1ba4-4824-b6d2-c26f45263a2a", filename: "solution-cafe.png" },

  // --- DESKTOP FEATURES (2125:20271) — already present, but include URLs for completeness ---
  { url: "https://www.figma.com/api/mcp/asset/b38450f1-4f54-4b88-b713-0befe373e292", filename: "feature-sales.png" },
  { url: "https://www.figma.com/api/mcp/asset/3bf4454a-9d7d-475d-83fe-5c5d06568ae3", filename: "feature-tables.png" },
  { url: "https://www.figma.com/api/mcp/asset/cda975d6-53e5-491c-ae07-3dd0b76439fc", filename: "feature-settings.png" },
  { url: "https://www.figma.com/api/mcp/asset/72ee0573-f44a-4f89-8718-24c9bd382ff8", filename: "feature-kds.png" },
  { url: "https://www.figma.com/api/mcp/asset/269457ef-4779-4c73-87e1-1546ff04e5ec", filename: "feature-inventory.png" },

  // --- DESKTOP PRICING (2125:20842) ---
  { url: "https://www.figma.com/api/mcp/asset/2aeeae4a-03af-444d-a8a4-b1162808efb5", filename: "pricing-clicker.png" },
  { url: "https://www.figma.com/api/mcp/asset/1ec56da8-c1b0-4d95-8eb5-b74637873f7f", filename: "pricing-divider.png" },
  { url: "https://www.figma.com/api/mcp/asset/16e9ef74-4c68-43ba-a1af-463da8d2e8f5", filename: "icon-check-circle.png" },
  { url: "https://www.figma.com/api/mcp/asset/8c00c1da-1d3e-4a42-a651-ebb5380a02a7", filename: "icon-crown-alt.png" },
  { url: "https://www.figma.com/api/mcp/asset/4ec9d3dc-b791-44f7-9189-e7b8e8965ade", filename: "icon-check-circle-light.png" },

  // --- DESKTOP TESTIMONIAL (2125:20967) ---
  { url: "https://www.figma.com/api/mcp/asset/66190fe6-7db4-497e-ae53-b4e2f7e80dc3", filename: "testimonial-photo-1.png" },
  { url: "https://www.figma.com/api/mcp/asset/dc463846-efaf-4ecf-9e33-b5cb7a4289a1", filename: "testimonial-photo-2.png" },
  { url: "https://www.figma.com/api/mcp/asset/01af5a24-267a-4d6d-80a2-190a9397a3fa", filename: "testimonial-photo-3.png" },
  { url: "https://www.figma.com/api/mcp/asset/e1d3701e-2cc1-4dff-a5c2-42df6a06fdc1", filename: "testimonial-avatar-4.png" },
  { url: "https://www.figma.com/api/mcp/asset/01fe8304-27b9-4977-bff8-e3838fa8ab04", filename: "testimonial-avatar-5.png" },
  { url: "https://www.figma.com/api/mcp/asset/83d1730f-8b7d-4c34-bc51-331bc2c5abd0", filename: "testimonial-logo-1.png" },
  { url: "https://www.figma.com/api/mcp/asset/2940df69-c7b4-40b6-89be-ffe6015b9eb5", filename: "testimonial-logo-2.png" },
  { url: "https://www.figma.com/api/mcp/asset/39df1e7c-6b82-400d-849b-dceafadac362", filename: "testimonial-logo-3.png" },
  { url: "https://www.figma.com/api/mcp/asset/2212e2db-9a84-4933-8f93-b2a4db3950bb", filename: "testimonial-logo-4.png" },
  { url: "https://www.figma.com/api/mcp/asset/fe0b4f0d-2042-4aab-8eb0-e660e174a474", filename: "testimonial-logo-5.png" },
  { url: "https://www.figma.com/api/mcp/asset/fad8b5b0-4126-4473-96e2-7f27af7e3a58", filename: "slider-dots.png" },
  { url: "https://www.figma.com/api/mcp/asset/abe268f1-5981-4cb2-aa1f-1a75ae1f5786", filename: "icon-arrow-left.png" },
  { url: "https://www.figma.com/api/mcp/asset/3d944986-4c79-4eea-9d43-5f17ec6eff39", filename: "icon-arrow-right.png" },

  // --- DESKTOP FAQ + CTA (2289:15318) — also present in mobile FAQ ---
  { url: "https://www.figma.com/api/mcp/asset/616cfe0e-448a-4c68-8e10-5804f5fd2f5b", filename: "cta-bg.png" },
  { url: "https://www.figma.com/api/mcp/asset/809c74fc-0a4c-4009-ad7e-1a0c138aa128", filename: "cta-ipad-shadow.png" },
  { url: "https://www.figma.com/api/mcp/asset/a0cd3472-ba83-47d4-af22-acb40b160805", filename: "cta-ipad.png" },
  { url: "https://www.figma.com/api/mcp/asset/d5bcaa94-4e6b-4370-9191-1ce8d9aa5d90", filename: "cta-ipad-screen.png" },
  { url: "https://www.figma.com/api/mcp/asset/9c1f73db-960f-4096-a15b-6bbea779a36c", filename: "icon-plus.png" },
  { url: "https://www.figma.com/api/mcp/asset/eb2b87e8-7959-4b70-a87a-cc04065df9d4", filename: "icon-times.png" },
  { url: "https://www.figma.com/api/mcp/asset/f32f2756-a51c-4e44-80aa-699e8e6c8e0a", filename: "icon-angle-right.png" },

  // --- DESKTOP FOOTER (2289:15229) ---
  { url: "https://www.figma.com/api/mcp/asset/c0dfd92e-31e9-4fce-a1f0-f9b2c38feab8", filename: "footer-bg-blur.png" },
  { url: "https://www.figma.com/api/mcp/asset/cef835d6-b68a-4014-b4c1-ef271bbad0ee", filename: "icon-facebook.png" },
  { url: "https://www.figma.com/api/mcp/asset/3099427b-051d-4a24-8b83-20abbcbb9a54", filename: "icon-instagram.png" },
  { url: "https://www.figma.com/api/mcp/asset/633397e0-9188-4e2e-b996-611f2b6a58ec", filename: "icon-x.png" },
  { url: "https://www.figma.com/api/mcp/asset/dc57c2c3-b2f4-48cd-b8bc-5851c087fad9", filename: "icon-linkedin.png" },
  { url: "https://www.figma.com/api/mcp/asset/f752fe3a-1f9f-4119-85aa-8b240597c8c4", filename: "icon-youtube.png" },
  { url: "https://www.figma.com/api/mcp/asset/708b13d4-68bb-466c-858c-33a694ac3fae", filename: "footer-divider.png" },

  // --- DESKTOP CONTACT SECTION (2125:19268) ---
  { url: "https://www.figma.com/api/mcp/asset/c11e283e-3822-4d4d-9802-cda642fa73aa", filename: "icon-angle-down.png" },
  { url: "https://www.figma.com/api/mcp/asset/5851fa57-4f02-4a74-be44-47eddfeee189", filename: "icon-location-pin.png" },
  { url: "https://www.figma.com/api/mcp/asset/ee7a29af-cb4f-4d79-a838-c25d2bc480a8", filename: "icon-phone.png" },
  { url: "https://www.figma.com/api/mcp/asset/7103e3d9-b357-4af6-8ab0-961c55ad1c6c", filename: "icon-envelope.png" },

  // --- MOBILE HERO (2244:6050) ---
  { url: "https://www.figma.com/api/mcp/asset/b3476847-4bfb-41c3-ab0b-399ec341ea9e", filename: "mobile-hero-ipad-screen.png" },
  { url: "https://www.figma.com/api/mcp/asset/7c2b721a-d0ec-41e4-870c-9fb985827799", filename: "mobile-icon-bolt.png" },
  { url: "https://www.figma.com/api/mcp/asset/a1c4831f-9d84-4580-a503-a223b77853db", filename: "mobile-logo-placeholder-1.png" },
  { url: "https://www.figma.com/api/mcp/asset/9462722c-b8b3-4618-8a64-9b2ee913a2a0", filename: "mobile-logo-placeholder-6.png" },
  { url: "https://www.figma.com/api/mcp/asset/9bcdd0ca-dc78-45d8-a52d-d0beb684401d", filename: "mobile-logo-placeholder-2.png" },
  { url: "https://www.figma.com/api/mcp/asset/9804a756-0ae1-4cdc-ad31-49703027a1fd", filename: "mobile-logo-placeholder-3.png" },
  { url: "https://www.figma.com/api/mcp/asset/37566949-ac74-4d7c-9108-7193c4ee0444", filename: "mobile-logo-placeholder-4.png" },
  { url: "https://www.figma.com/api/mcp/asset/ad8d2923-2c7e-464d-8516-eb0478298201", filename: "mobile-logo-placeholder-5.png" },
  { url: "https://www.figma.com/api/mcp/asset/b841bd7c-d477-439f-a50b-09a9f08ad136", filename: "mobile-logo-placeholder-7.png" },
  { url: "https://www.figma.com/api/mcp/asset/053112f6-fb35-422d-b3c2-3ce61ff64415", filename: "mobile-logo-placeholder-8.png" },

  // --- MOBILE SOLUTION (2244:6175) ---
  { url: "https://www.figma.com/api/mcp/asset/ec416e70-fbcc-448c-be17-2dbaedbb31e1", filename: "mobile-icon-ellipse-check-bg.png" },
  { url: "https://www.figma.com/api/mcp/asset/6d9e4799-b394-4cdf-ae73-ea2775783fd2", filename: "mobile-icon-check.png" },
  { url: "https://www.figma.com/api/mcp/asset/816d4c09-3018-47fe-acde-767a56cf6c3b", filename: "mobile-solution-cafe.png" },

  // --- MOBILE FEATURES (2244:6529) — single shared image-key-features-1 ---
  { url: "https://www.figma.com/api/mcp/asset/2cf540e2-0599-4ac5-951e-a56a97243b8e", filename: "mobile-feature-image.png" },

  // --- MOBILE TESTIMONIAL (2244:7225) ---
  { url: "https://www.figma.com/api/mcp/asset/8b088d0d-0a19-4932-81f5-1c076b8f68cf", filename: "mobile-testimonial-photo-1.png" },
  { url: "https://www.figma.com/api/mcp/asset/e3d46145-abbf-4964-9619-ed7369438790", filename: "mobile-testimonial-photo-2.png" },
  { url: "https://www.figma.com/api/mcp/asset/5003cc63-dc89-4203-821a-e387a4ea679a", filename: "mobile-testimonial-photo-3.png" },
  { url: "https://www.figma.com/api/mcp/asset/550dd45c-b810-472d-81f6-280ec386e4da", filename: "mobile-testimonial-avatar-4.png" },
  { url: "https://www.figma.com/api/mcp/asset/d32bfb46-17f5-41e2-86bd-5b8843d0d9fe", filename: "mobile-testimonial-avatar-5.png" },
  { url: "https://www.figma.com/api/mcp/asset/ceec9b3e-2464-483e-a423-fc71cfd8727c", filename: "mobile-testimonial-logo-1.png" },
  { url: "https://www.figma.com/api/mcp/asset/aa1b2ea7-1c22-407f-839a-99a9af8d0fdf", filename: "mobile-testimonial-logo-2.png" },
  { url: "https://www.figma.com/api/mcp/asset/5f1c29d8-b2ac-4146-99f1-5fa59651f4d9", filename: "mobile-testimonial-logo-3.png" },
  { url: "https://www.figma.com/api/mcp/asset/1c04ca70-e307-4339-953f-bd3389a633a6", filename: "mobile-testimonial-logo-4.png" },
  { url: "https://www.figma.com/api/mcp/asset/3cf930a1-baff-45e1-800c-9ba2f14d1ff4", filename: "mobile-testimonial-logo-5.png" },
  { url: "https://www.figma.com/api/mcp/asset/9f9a38aa-3928-490e-a01f-f0820a8aa9b8", filename: "mobile-slider-dots.png" },
  { url: "https://www.figma.com/api/mcp/asset/24bc8fd2-35dc-4ad6-89dd-babef4b3eeea", filename: "mobile-icon-arrow-left.png" },
  { url: "https://www.figma.com/api/mcp/asset/cdb6463e-b9fb-479f-8be0-1d8ae47aae6c", filename: "mobile-icon-arrow-right.png" },

  // --- MOBILE PRICING (2244:7100) ---
  { url: "https://www.figma.com/api/mcp/asset/6b5d58a2-b8a8-495b-8350-221bb15c7f43", filename: "mobile-pricing-divider.png" },
  { url: "https://www.figma.com/api/mcp/asset/c5008203-c7c0-43f1-9ee8-43428d921ee9", filename: "mobile-icon-check-circle.png" },
  { url: "https://www.figma.com/api/mcp/asset/917a3eb5-8500-4688-af56-efe14204a685", filename: "mobile-icon-crown-alt.png" },
  { url: "https://www.figma.com/api/mcp/asset/c3eb744c-5a39-4d35-8adb-193543a718df", filename: "mobile-icon-check-circle-light.png" },

  // --- MOBILE FAQ + CTA (2290:15713) ---
  { url: "https://www.figma.com/api/mcp/asset/22f31b0c-77ae-4c9f-8777-c7ef29a65c48", filename: "mobile-cta-bg.png" },
  { url: "https://www.figma.com/api/mcp/asset/363612b4-60df-478a-82bd-84cfcc5d597b", filename: "mobile-cta-ipad-shadow.png" },
  { url: "https://www.figma.com/api/mcp/asset/f341c3e5-f162-458e-8ad3-a2208633fb7f", filename: "mobile-cta-ipad.png" },
  { url: "https://www.figma.com/api/mcp/asset/4f435b3c-1011-40b4-9be5-1158889687ef", filename: "mobile-cta-ipad-screen.png" },
  { url: "https://www.figma.com/api/mcp/asset/c99008dd-8c69-41db-a105-cb649abb7def", filename: "mobile-icon-plus.png" },
  { url: "https://www.figma.com/api/mcp/asset/5252a1a7-0480-4caf-91e0-275f67b812b0", filename: "mobile-icon-times.png" },
  { url: "https://www.figma.com/api/mcp/asset/9ded9949-7160-4170-86d8-830d33ba3246", filename: "mobile-icon-angle-right.png" },

  // --- MOBILE FOOTER (2290:15599) ---
  { url: "https://www.figma.com/api/mcp/asset/46f5b1a8-2bb4-4f6e-abd5-acd3d86563f9", filename: "mobile-footer-bg-blur.png" },
  { url: "https://www.figma.com/api/mcp/asset/7836a29c-11ad-414c-9bc1-10c3bb714451", filename: "mobile-icon-facebook.png" },
  { url: "https://www.figma.com/api/mcp/asset/79a4a111-b556-4004-87d5-6e78ef54a9e9", filename: "mobile-icon-instagram.png" },
  { url: "https://www.figma.com/api/mcp/asset/c5c65395-801d-4db4-8b90-8278d1114794", filename: "mobile-icon-x.png" },
  { url: "https://www.figma.com/api/mcp/asset/7c43c083-90e2-4c14-ac56-97de2984f1e7", filename: "mobile-icon-linkedin.png" },
  { url: "https://www.figma.com/api/mcp/asset/c75811bf-fe1d-4949-a71d-36c75288cf32", filename: "mobile-icon-youtube.png" },
  { url: "https://www.figma.com/api/mcp/asset/d76df0a9-8b65-4c32-90a7-d58cf2f5457b", filename: "mobile-footer-divider.png" },

  // --- MOBILE CONTACT (2292:8025) ---
  { url: "https://www.figma.com/api/mcp/asset/e5617f3c-5bd2-436e-8896-253501eabaea", filename: "mobile-icon-angle-down.png" },
  { url: "https://www.figma.com/api/mcp/asset/2bcd4f6e-3a35-43fe-922e-2d796ca5147a", filename: "mobile-icon-location-pin.png" },
  { url: "https://www.figma.com/api/mcp/asset/d4f03fd6-c78f-4488-a372-3fc89366bb20", filename: "mobile-icon-phone.png" },
  { url: "https://www.figma.com/api/mcp/asset/cb4e89b2-77e6-4bb9-a405-d852f3404557", filename: "mobile-icon-envelope.png" },
];

function fetchToFile(url, dest) {
  return new Promise((resolve, reject) => {
    const doRequest = (u, redirectsLeft) => {
      const req = request(u, (res) => {
        if (res.statusCode && res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          if (redirectsLeft <= 0) return reject(new Error(`Too many redirects for ${url}`));
          res.resume();
          return doRequest(new URL(res.headers.location, u).toString(), redirectsLeft - 1);
        }
        if (res.statusCode !== 200) {
          res.resume();
          return reject(new Error(`HTTP ${res.statusCode} for ${url}`));
        }
        const out = createWriteStream(dest);
        res.pipe(out);
        out.on("finish", () => out.close(() => resolve()));
        out.on("error", reject);
      });
      req.on("error", reject);
      req.end();
    };
    doRequest(url, 5);
  });
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });

  // Dedupe by URL (keep first filename mapping).
  const seen = new Map();
  for (const item of ASSETS) if (!seen.has(item.url)) seen.set(item.url, item.filename);
  const unique = [...seen.entries()].map(([url, filename]) => ({ url, filename }));

  let downloaded = 0;
  let skipped = 0;
  let totalBytes = 0;
  const failures = [];

  for (const { url, filename } of unique) {
    const dest = join(OUT_DIR, filename);
    if (existsSync(dest) && statSync(dest).size > 0) {
      skipped++;
      totalBytes += statSync(dest).size;
      console.log(`  - skip ${filename} (already exists, ${statSync(dest).size} bytes)`);
      continue;
    }
    try {
      await fetchToFile(url, dest);
      const size = statSync(dest).size;
      totalBytes += size;
      downloaded++;
      console.log(`  + ${filename} (${size} bytes)`);
    } catch (err) {
      failures.push({ url, filename, error: err.message });
      console.error(`  ! FAIL ${filename}: ${err.message}`);
    }
  }

  console.log(`\nUnique URLs: ${unique.length}`);
  console.log(`Downloaded:  ${downloaded}`);
  console.log(`Skipped:     ${skipped}`);
  console.log(`Total bytes: ${totalBytes}`);
  if (failures.length) {
    console.log(`\nFailures (${failures.length}):`);
    for (const f of failures) console.log(`  ${f.filename}: ${f.error}`);
  }
}

main().catch((err) => {
  console.error("Download failed:", err);
  process.exit(1);
});
