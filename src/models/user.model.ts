export class User {
  Id!: number;
  Username!: string;
  FirstName?: string;
  LastName?: string;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(data: any) {
    this.Id = data.Id || data.id;
    this.Username = data.Username || data.username;
    this.FirstName = data.FirstName || data.firstName;
    this.LastName = data.LastName || data.lastName;
  }
}
