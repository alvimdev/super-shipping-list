export async function fetchWrapper(url: string, options?: RequestInit) {
  const res = await fetch(process.env.NEXT_PUBLIC_HOST + url, {
    ...options,
    credentials: "include",
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error);
  }
  return res.json();
}