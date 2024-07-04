// src/components/MentionParser.tsx

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { getEmailByPseudo } from '@/lib/data/user';

interface MentionParserProps {
  content: string;
}

const MentionParser: React.FC<MentionParserProps> = ({ content }) => {
  const [emailMap, setEmailMap] = useState<Record<string, string | null>>({});

  useEffect(() => {
    const fetchEmails = async () => {
      const mentionRegex = /@(\w+)/g;
      let match;
      const mentions: string[] = [];

      while ((match = mentionRegex.exec(content)) !== null) {
        mentions.push(match[1]);
      }

      const emails: Record<string, string | null> = {};

      await Promise.all(mentions.map(async (mention) => {
        if (!emailMap[mention]) {
          emails[mention] = await getEmailByPseudo(mention);
        }
      }));

      setEmailMap(prevEmailMap => ({ ...prevEmailMap, ...emails }));
    };

    fetchEmails();
  }, [content]);

  const parseContent = (content: string) => {
    const regex = /(@\w+|#\w+|\*\*[^*]+\*\*|\*[^*]+\*|[^@#*]+)/g;
    let match;
    const parts: React.ReactNode[] = [];

    while ((match = regex.exec(content)) !== null) {
      if (match[0].startsWith('@')) {
        // Handle mentions
        const mention = match[0].substring(1);
        const email = emailMap[mention];
        if (email) {
          parts.push(
            <Link key={match.index} href={`/${email}`}>
              <span className="text-blue-500">@{mention}</span>
            </Link>
          );
        } else {
          parts.push(<span key={match.index}>@{mention}</span>);
        }
      } else if (match[0].startsWith('#')) {
        // Handle hashtags
        const hashtag = match[0].substring(1);
        parts.push(
          <Link key={match.index} href={`/hashtag/${hashtag}`}>
            <span className="text-green-500">#{hashtag}</span>
          </Link>
        );
      } else if (match[0].startsWith('**') && match[0].endsWith('**')) {
        // Handle bold text
        const boldText = match[0].substring(2, match[0].length - 2);
        parts.push(<strong key={match.index}>{boldText}</strong>);
      } else if (match[0].startsWith('*') && match[0].endsWith('*')) {
        // Handle italic text
        const italicText = match[0].substring(1, match[0].length - 1);
        parts.push(<em key={match.index}>{italicText}</em>);
      } else {
        // Handle regular text
        parts.push(<span key={match.index}>{match[0]}</span>);
      }
    }

    return parts;
  };

  return <>{parseContent(content)}</>;
};

export default MentionParser;
