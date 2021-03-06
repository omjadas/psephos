declare module "caritat" {
  interface ElectionOptions {
    candidates?: string[],
    allowTies?: boolean,
    minSeats?: number,
    maxSeats?: number,
  }

  export class Election {
    public constructor(options: ElectionOptions);
    public addBallot(ballot: string[]): boolean;
  }

  export const stv = {
    meek: (election: Election, options: { seats: number }): string[] => {},
  };
}
