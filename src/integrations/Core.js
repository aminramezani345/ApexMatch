
/**
 * Integrations/Core.js
 * Stub implementations so your app compiles locally.
 * Replace with real implementations when you connect your backend.
 */

export async function InvokeLLM({ prompt, system, temperature = 0.2 }) {
  // Return a deterministic stubbed response
  return {
    text: `LLM Response (stub): ${String(prompt).slice(0, 120)}`,
    usage: { tokens: 0 }
  };
}

export async function UploadFile(file) {
  // Return a local object URL so previews work in dev
  try {
    const url = URL.createObjectURL(file);
    return { url, name: file.name, size: file.size, type: file.type };
  } catch (e) {
    return { url: '', error: String(e) };
  }
}
