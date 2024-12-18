export function calculateReadTime(text: string, wordsPerMinute: number = 200): number {
  const cleanText = text.replace(/<[^>]*>/g, '');
  const wordCount = cleanText.trim().split(/\s+/).length;

  const readTimeMinutes = Math.ceil(wordCount / wordsPerMinute);
  
  return readTimeMinutes;
}
