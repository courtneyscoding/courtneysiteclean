const CLAUDE_API_URL = "https://api.anthropic.com/v1/messages";
const DEFAULT_MODEL = "claude-3-5-sonnet-latest";

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return json(405, { error: "Method not allowed" });
  }

  const apiKey = process.env.CLAUDE_API_KEY || process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return json(500, {
      error: "Missing Claude API key. Set CLAUDE_API_KEY in Netlify environment variables."
    });
  }

  let body;
  try {
    body = JSON.parse(event.body || "{}");
  } catch {
    return json(400, { error: "Invalid JSON body" });
  }

  const { messages, system } = body;
  if (!Array.isArray(messages) || messages.length === 0) {
    return json(400, { error: "Messages array is required" });
  }

  try {
    const response = await fetch(CLAUDE_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01"
      },
      body: JSON.stringify({
        model: process.env.CLAUDE_MODEL || DEFAULT_MODEL,
        max_tokens: 1024,
        system: system || "",
        messages
      })
    });

    const data = await response.json();

    if (!response.ok) {
      const message = data?.error?.message || data?.error || "Claude request failed";
      return json(response.status, { error: message });
    }

    return json(200, { content: data.content });
  } catch (error) {
    return json(500, { error: "The spirits are unavailable right now." });
  }
};

function json(statusCode, payload) {
  return {
    statusCode,
    headers: {
      "Content-Type": "application/json; charset=utf-8"
    },
    body: JSON.stringify(payload)
  };
}
