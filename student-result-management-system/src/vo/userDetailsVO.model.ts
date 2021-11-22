export class UserDetailsVO {
  constructor(
    private name: string,
    private gender: string,
    private contactno: string,
    private role: string,
    private extId: string,
    private address: string,
    private dob: string,
    private email: string,
    private password: string
  ) {}

  getName(){
    return this.name;
  }

  getGender(){
    return this.gender;
  }

  getContactNo(){
    return this.contactno;
  }

  getExtId(){
    return this.extId;
  }

  getRole(){
    return this.role;
  }

  getAddress(){
    return this.address;
  }

  getDob(){
    return this.dob;
  }

  getEmail(){
    return this.email;
  }
}
