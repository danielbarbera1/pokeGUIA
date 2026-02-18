// Safe fetch wrapper with simple retry/backoff for 5xx errors
export async function safeFetch(url, options = {}, retries = 2, backoff = 300) {
  try {
    const res = await fetch(url, options)
    if (res.ok) {
      const data = await res.json()
      return { ok: true, data }
    }
    // If server error, retry with exponential backoff
    if (res.status >= 500 && retries > 0) {
      await new Promise(resolve => setTimeout(resolve, backoff))
      return safeFetch(url, options, retries - 1, backoff * 2)
    }
    // For other errors, return the status text
    const text = await res.text()
    return { ok: false, error: `HTTP ${res.status}: ${text}` }
  } catch (err) {
    if (retries > 0) {
      await new Promise(resolve => setTimeout(resolve, backoff))
      return safeFetch(url, options, retries - 1, backoff * 2)
    }
    return { ok: false, error: err.message }
  }
}
