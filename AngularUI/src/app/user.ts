export class User {
  public userID:number;
  public email:string;
  public name:string;
  public password:string;
  public homePhone:string;
  public workPhone:string;
  public userLevel:string;
  
  constructor(pemail:string, 
    ppassword:string
    ,pworkPhone?:string
    ,phomePhone?:string
    ,pname?:string
    ) {  

      this.password = ppassword;
      this.email = pemail;
      this.workPhone = pworkPhone;
      this.homePhone = phomePhone;
      this.name = pname;
    }
  enterInfo(puserID:number, phomePhone:string, pname:string, pworkPhone?:string ) {
    this.userID = puserID;
    this.homePhone = phomePhone;
    this.name = pname;
    if (pworkPhone != null) {
      this.workPhone = pworkPhone;
    }
  }

  toString():string[] {
    return [this.userID + "", this.name, this.email, this.homePhone, this.workPhone, "***********".substr(this.password.length)]
  }
}
