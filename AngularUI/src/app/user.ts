export class User {
    constructor(
        public Name: string,
        public Username: string,
        public EmailAddress: string,
        public HomePhone: string,
        private Password?: string,
        public WorkPhone?: string
      ) {  }

      setPassword(test :string) {
        this.Password = test
        ;
      }
}
