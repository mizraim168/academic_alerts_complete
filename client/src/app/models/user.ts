export class User {
    constructor (_id = '', name = '', lastname = '', motherlastname = '',email = '', password = '', role = ''){
        this._id = _id;
        this.name = name;
        this.lastname = lastname;
        this.motherlastname = motherlastname
        this.email = email;
        this.password = password;
        this.role = role;
    }
    _id: string;
    name: string;
    lastname: string;
    motherlastname:string;
    email:string;
    password:string;
    role:string;

}
