import { Config } from "@remotion/cli/config";

Config.setVideoImageFormat("jpeg");
Config.setEntryPoint("remotion/index.ts");
Config.setPublicDir("remotion/public");
Config.setOutputLocation("remotion/out");
Config.setConcurrency(1);
