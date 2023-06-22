export function escapeHtml(value: string): string {
  const entities: { [key: string]: string } = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
    '/': '&#x2F;',
  };

  return value.replace(/[&<>"'/]/g, (entity) => entities[entity] || entity);
}

export function unescapeHtml(str: string): string {
  if (!str) return '';
  const replacements: { [key: string]: string } = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#39;': "'",
    '&#x2F;': '/',
  };

  let result = str;
  // eslint-disable-next-line no-restricted-syntax
  for (const key in replacements) {
    if (replacements[key]) {
      result = result.replace(new RegExp(key, 'g'), replacements[key]);
    }
  }

  return result;
}
