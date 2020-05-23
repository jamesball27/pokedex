import { Resolver } from 'type-graphql';

import TypeName from '../../types/TypeName';

@Resolver(() => TypeName)
class TypeNameResolver {}

export default TypeNameResolver;
