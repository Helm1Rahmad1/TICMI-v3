'use client';

import { useEffect, useState } from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';

interface LatexProps {
  math: string;
  block?: boolean;
}

export default function Latex({ math, block = false }: LatexProps) {
  const [html, setHtml] = useState('');

  useEffect(() => {
    try {
      const rendered = katex.renderToString(math, {
        displayMode: block,
        throwOnError: false,
      });
      setHtml(rendered);
    } catch (err) {
      console.error('KaTeX rendering error:', err);
      setHtml(math);
    }
  }, [math, block]);

  if (!html) {
    return <span>{math}</span>;
  }

  return <span dangerouslySetInnerHTML={{ __html: html }} />;
}
