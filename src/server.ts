import { fileURLToPath } from "node:url";
import path from "node:path";
import express, { type Request, type Response } from "express";
import { reverseString } from "./reverse.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
// Static assets live at the repo's public/ directory, one level above dist/ or src/.
const publicDir = path.resolve(__dirname, "..", "public");

export function createApp() {
  const app = express();
  app.use(express.json());

  app.get("/api/health", (_req: Request, res: Response) => {
    res.json({ status: "ok" });
  });

  app.get("/api/reverse", (req: Request, res: Response) => {
    const text = req.query.text;
    if (typeof text !== "string") {
      res.status(400).json({ error: "Query parameter 'text' is required." });
      return;
    }
    res.json({ input: text, reversed: reverseString(text) });
  });

  app.post("/api/reverse", (req: Request, res: Response) => {
    const text = (req.body as { text?: unknown } | undefined)?.text;
    if (typeof text !== "string") {
      res.status(400).json({ error: "Body field 'text' (string) is required." });
      return;
    }
    res.json({ input: text, reversed: reverseString(text) });
  });

  app.use(express.static(publicDir));

  return app;
}

// Start the server only when run directly, not when imported by tests.
const isMain = process.argv[1] === fileURLToPath(import.meta.url);
if (isMain) {
  const port = Number(process.env.PORT ?? 3000);
  const app = createApp();
  app.listen(port, () => {
    console.log(`reverse-string server listening on http://localhost:${port}`);
  });
}
