import { ObjectType } from 'type-graphql';
import { Entity, ManyToOne } from 'typeorm';

import Move from './Move';
import VersionGroup from './VersionGroup';
import FlavorText from './base/FlavorText';

@ObjectType()
@Entity('moveflavortext')
class MoveFlavorText extends FlavorText {
  @ManyToOne(() => Move, 'flavorTextEntries')
  move: Move;

  @ManyToOne(() => VersionGroup, 'flavorText')
  versionGroup: VersionGroup;
}

export default MoveFlavorText;
