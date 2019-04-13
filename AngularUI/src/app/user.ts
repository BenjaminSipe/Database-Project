export class User {
  public userID:number;
  public email:string;
  public password:string;
  public homePhone:string;
  public workPhone:string;
  public name:string;
  
  constructor(email:string, 
    password:string
    ,workPhone?:string
    ,homePhone?:string
    ,name?:string
    ) {  
      this.email = email;
      this.password = password;
      this.workPhone = workPhone;
      this.homePhone = homePhone;
      this.name = name;
    }
  enterInfo(userID:number, homePhone:string, name:string, workPhone?:string ) {
    this.userID = userID;
    this.homePhone = homePhone;
    this.name = name;
    if (workPhone != null) {
      this.workPhone = workPhone;
    }
  }

}
