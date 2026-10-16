/**
 * Absolute base URL for share images and other metadata links.
 * Set NEXT_PUBLIC_SITE_URL once a custom domain exists; on Vercel the production
 * domain is used automatically; local builds fall back to localhost.
 */
export function siteUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) return new URL(process.env.NEXT_PUBLIC_SITE_URL);
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return new URL(`https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`);
  }
  return new URL(`http://localhost:${process.env.PORT ?? 3000}`);
}
