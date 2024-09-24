import { Controller, Get } from '@nestjs/common';

import { Auth } from 'src/auth/decorators/auth.decorator';
import { SeedService } from './seed.service';
import { validRoles } from 'src/auth/interfaces/roles.interfaces';

@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @Get()
  @Auth(validRoles.superUser)
  executeSeed() {
    return this.seedService.runSeed();
  }


}
