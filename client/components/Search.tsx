import React, { useState } from 'react';
import { AutoComplete, Input } from 'antd';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';

import { SupportedLanguageName } from '../../types/Language';
import PokemonSpeciesSearchResult from '../../types/PokemonSpeciesSearchResult';

interface Query {
  speciesSearch: PokemonSpeciesSearchResult[];
}

const SEARCH_QUERY = gql`
  query($lang: String!, $searchTerm: String!) {
    speciesSearch(lang: $lang, searchTerm: $searchTerm) {
      speciesId
      name
    }
  }
`;

interface Props {
  selectedLanguage: SupportedLanguageName;
  setSelectedPokemon: React.Dispatch<React.SetStateAction<number>>;
}

const Search: React.FC<Props> = ({ selectedLanguage, setSelectedPokemon }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const { loading, error, data } = useQuery<Query>(SEARCH_QUERY, {
    variables: { lang: selectedLanguage, searchTerm },
    skip: !searchTerm,
  });

  if (error) {
    return <h1>ERROR</h1>;
  }

  return (
    <AutoComplete
      style={{ width: '50%', maxWidth: '400px' }}
      options={data?.speciesSearch.map((s) => ({ value: s.name, id: s.speciesId })) || []}
      onChange={(v) => setSearchTerm(v)}
      onSelect={(_, opt) => setSelectedPokemon(opt.id)}
    >
      <Input.Search placeholder="Search for Pokemon..." loading={loading} allowClear />
    </AutoComplete>
  );
};

export default Search;
