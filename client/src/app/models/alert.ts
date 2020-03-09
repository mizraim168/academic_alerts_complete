export class Alert {
    constructor(_id = '', matricula = '', student_name ='', educational_program='',incidence='',tracing=''){
        this._id = _id;
        this.matricula = matricula;
        this.student_name = student_name;
        this.educational_program = educational_program;
        this.incidence = incidence;
        this.tracing = tracing;

    }
    _id:string;
    matricula:string;
    student_name:string;
    educational_program:string;
    incidence:string;
    tracing:string;
}
