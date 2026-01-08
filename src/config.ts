/**
 * Configuration for Todoist CLI
 */

import {
  readFileSync,
  writeFileSync,
  existsSync,
  mkdirSync,
  unlinkSync,
} from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";
import { printError, style } from "./output.js";

const CONFIG_DIR = join(homedir(), ".config", "todoist-cli");
const CONFIG_FILE = join(CONFIG_DIR, "config.json");
const ENV_VAR = "TODOIST_API_TOKEN";

interface Config {
  api_token: string;
}

/**
 * Exit codes following CLI conventions
 */
export const ExitCode = {
  Success: 0,
  Failure: 1,
  InvalidUsage: 2,
  AuthFailure: 3,
} as const;

/**
 * Get the config file path
 */
export function getConfigPath(): string {
  return CONFIG_FILE;
}

/**
 * Get token from env var or config file
 */
export function getToken(): string | null {
  // Check environment variable first
  const envToken = process.env[ENV_VAR];
  if (envToken) {
    return envToken;
  }

  // Then check config file
  if (existsSync(CONFIG_FILE)) {
    try {
      const data = readFileSync(CONFIG_FILE, "utf-8");
      const config = JSON.parse(data) as Config;
      return config.api_token || null;
    } catch {
      return null;
    }
  }

  return null;
}

/**
 * Save token to config file
 */
export function saveToken(token: string): void {
  if (!existsSync(CONFIG_DIR)) {
    mkdirSync(CONFIG_DIR, { recursive: true });
  }
  writeFileSync(CONFIG_FILE, JSON.stringify({ api_token: token }, null, 2), {
    mode: 0o600,
  });
}

/**
 * Clear stored token
 */
export function clearToken(): void {
  if (existsSync(CONFIG_FILE)) {
    unlinkSync(CONFIG_FILE);
  }
}

/**
 * Require token or exit with helpful message
 */
export function requireToken(): string {
  const token = getToken();
  if (!token) {
    printError("Not authenticated.");
    console.error("");
    console.error("Options:");
    console.error("  1. Run: todoist auth <your-api-token>");
    console.error(`  2. Set: export ${ENV_VAR}=<your-token>`);
    console.error("");
    console.error(
      `Get your token at: ${style.cyan("https://todoist.com/app/settings/integrations/developer")}`
    );
    process.exit(ExitCode.AuthFailure);
  }
  return token;
}
