export class userDetailsVO {
  constructor(
    private firstname: string,
    private lastname: string,
    private gender: string,
    private contactno: string,
    private role: string,
    private id: string,
    private address: string,
    private dob: { day: number; month: number; year: number },
    private email: string,
    private password: string
  ) {}
}
