import { ObjectType, Field, Int } from 'type-graphql';
import { Entity, Column, PrimaryColumn, OneToMany, ManyToOne } from 'typeorm';

import GrowthRate from './GrowthRate';
import Description from './base/Description';

@ObjectType()
@Entity('growthratedescription')
class GrowthRateDescription extends Description {
  @ManyToOne(() => GrowthRate, 'growthRate')
  growthRate: GrowthRate;
}

export default GrowthRateDescription;
