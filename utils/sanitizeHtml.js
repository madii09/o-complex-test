import DOMPurify from 'dompurify';

export function sanitizeHtml(dirtyHtml) {
  if (typeof window !== 'undefined') {
    return DOMPurify.sanitize(dirtyHtml);
  }

  return dirtyHtml;
}
