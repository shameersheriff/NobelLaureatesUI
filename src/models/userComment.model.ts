export class UserComment {
  LaureateId!: number;
  UserId!: number;
  Content!: string;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(data: any) {
    this.LaureateId = data.laureateId;
    this.UserId = data.userId;
    this.Content = data.content;
  }
}
