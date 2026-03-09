import { IsString } from 'class-validator';

export class UpdateShipmentDto {

  @IsString()
  status: string;
}