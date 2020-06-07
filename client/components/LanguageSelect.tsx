import React from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import { Select } from 'antd';

import Language, { SupportedLanguageName } from '../../types/Language';

const flags = {
  'ja-Hrkt': '🇯🇵',
  ko: '🇰🇷',
  en: '🇺🇸',
  fr: '🇫🇷',
  de: '🇩🇪',
  es: '🇪🇸',
  it: '🇮🇹',
};

interface Query {
  languages: Language[];
}

const LANGUAGE_QUERY = gql`
  query {
    languages {
      name
      iso639
    }
  }
`;

interface Props {
  selectedLanguage: string;
  setSelectedLanguage: React.Dispatch<React.SetStateAction<SupportedLanguageName>>;
}

const LanguageSelect: React.FC<Props> = ({ selectedLanguage, setSelectedLanguage }) => {
  const { loading, error, data } = useQuery<Query>(LANGUAGE_QUERY);
  if (loading) {
    return <h1>loading</h1>;
  }
  if (error) {
    return <h1>error</h1>;
  }

  return (
    <Select
      defaultValue={selectedLanguage}
      onSelect={(v) => setSelectedLanguage(v as SupportedLanguageName)}
    >
      {data?.languages.map((l) => (
        <Select.Option value={l.name}>
          {flags[l.name]}
          {l.iso639.toUpperCase()}
        </Select.Option>
      ))}
    </Select>
  );
};

export default LanguageSelect;
