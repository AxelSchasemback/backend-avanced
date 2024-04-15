export class UserDto {
    constructor(user){
        this._id = user._id;
        this.name= user.name;
        this.email= user.email;
        this.sex= user.sex;
        this.date= user.date;
        this.description= user.description;
        this.rol= user.rol;
        this.cartId= user.cartId;
        this.orders= user.orders;
        this.documents= user.documents;
    }
  }