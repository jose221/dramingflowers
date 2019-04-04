export class FirebaseUserModel {
  id:string;
  image: string;
  name: string;
  provider: string;
  email: string;

  constructor() {
    this.image = '';
    this.name = '';
    this.provider = '';
    this.email = '';
  }
}
