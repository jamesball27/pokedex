import React from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import { Select, Row } from 'antd';

import Language, { SupportedLanguageName } from '../../types/Language';

// Native names sourced from https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes
const labels = {
  'ja-Hrkt': '🇯🇵日本語',
  ko: '🇰🇷 한국어',
  en: '🇺🇸 English',
  fr: '🇫🇷 Français',
  de: '🇩🇪 Deutsch',
  es: '🇪🇸 Español',
  it: '🇮🇹 Italiano',
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
        <Select.Option value={l.name}>{labels[l.name]}</Select.Option>
      ))}
    </Select>
  );
};

export default LanguageSelect;
