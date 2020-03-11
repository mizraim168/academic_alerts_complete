export class User {
    constructor (_id = '', name = '', lastname = '', motherlastname = '', password = '', role = ''){
        this._id = _id;
        this.name = name;
        this.lastname = lastname;
        this.motherlastname = motherlastname;
        this.password = password;

        this.role = role;
    }
    _id: string;
    name: string;
    lastname: string;
    motherlastname:string;
    password:string;

    role:string;

}
