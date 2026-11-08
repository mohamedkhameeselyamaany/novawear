'use client';

export default function imageLoader({
  src,
}: {
  src: string;
  width?: number;
  quality?: number;
}): string {
  if (!src) return '';
  if (src.startsWith('http://') || src.startsWith('https://') || src.startsWith('data:')) {
    return src;
  }

  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  if (basePath && src.startsWith(basePath)) {
    return src;
  }

  const cleanSrc = src.startsWith('/') ? src : `/${src}`;
  return `${basePath}${cleanSrc}`;
}

export function getAssetPath(src: string): string {
  if (!src) return '';
  if (src.startsWith('http://') || src.startsWith('https://') || src.startsWith('data:')) {
    return src;
  }

  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  if (basePath && src.startsWith(basePath)) {
    return src;
  }

  const cleanSrc = src.startsWith('/') ? src : `/${src}`;
  return `${basePath}${cleanSrc}`;
}
