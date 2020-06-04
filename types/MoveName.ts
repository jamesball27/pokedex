import { ObjectType } from 'type-graphql';
import { Entity, ManyToOne } from 'typeorm';

import Name from './base/Name';
import Move from './Move';

@ObjectType()
@Entity('movename')
class MoveName extends Name {
  @ManyToOne(() => Move, 'names')
  move: Move;
}

export default MoveName;
