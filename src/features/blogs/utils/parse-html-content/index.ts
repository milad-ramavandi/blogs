const parseHtmlContent = (html: string): { images: string[]; text: string } => {
  const imageRegex = /<img[^>]*src="([^"]+)"[^>]*>/g;
  const matches = [...html.matchAll(imageRegex)];
  const images = matches.map((match) => match[1]);
  const text = html.replace(/<[^>]*>?/gm, '').trim();

  return {
    images,
    text,
  };
}

export default parseHtmlContent