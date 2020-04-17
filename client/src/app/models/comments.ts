export class Comments {
    constructor(_id = '', comment = '', alert=""){
        this._id = _id;
        this.comment = comment;
        this.alert = alert="";
    }   
    _id:string;
    comment:string;
    alert:string;
}
