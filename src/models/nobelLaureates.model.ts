export class NobelLaureate {
  Id!: number;
  FullName!: string;
  Gender: string;
  NobelPrizes!: NobelPrizes[];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(data: any) {
    this.Id = data.Id || data.id;
    this.FullName = data.fullName.en;
    this.Gender = data.Gender || data.gender;
    if (data.nobelPrizes?.length > 0) {
      this.NobelPrizes = [];
      data.nobelPrizes.forEach((prizes: unknown) => {
        this.NobelPrizes.push(new NobelPrizes(prizes));
      });
    }
  }
}

export class NobelPrizes {
  AwardYear?: string;
  CategoryFullName?: any[];
  DateAwarded?: string;
  Motivation?: any[];
  Portion?: string;
  PrizeAmount?: number;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(data: any) {
    this.AwardYear = data?.awardYear;
    this.CategoryFullName = data.categoryFullName.en;
    this.DateAwarded = data.dateAwarded;
    this.Motivation = data.motivation.en;
    this.Portion = data.portion;
    this.PrizeAmount = data.prizeAmount;
  }
}
