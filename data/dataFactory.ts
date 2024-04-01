import { UserInformation } from '../model/user';
import { faker } from '@faker-js/faker';

export class DataFactory {
  public static getUserInformation(): UserInformation {
    return {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      emailAddress: faker.internet.email(),
      password: faker.internet.password(),
      gender: faker.name.sex(),
    };
  }
}
