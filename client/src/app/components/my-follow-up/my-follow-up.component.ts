import { Component, OnInit } from '@angular/core';
import {FilesService} from '../../services/files.service';
import {AlertService} from '../../services/alert.service';
import {UserService} from '../../services/user.service';
import {User} from '../../models/user'; 
import { NgForm } from '@angular/forms';
import {Alert} from '../../models/alert';
declare let M: any;



@Component({
  selector: 'app-my-follow-up',
  templateUrl: './my-follow-up.component.html',
  styleUrls: ['./my-follow-up.component.css'],
  providers: [AlertService, UserService]
 
})



export class MyFollowUpComponent implements OnInit {
  
  listAlerts: Array<any> = [];
  listFiles: Array<string> = [];
  check: boolean;
  userId:string;
  constructor(public fileService:FilesService, public alertService: AlertService, public userService: UserService ) { }

  ngOnInit(): void {
    this.fileService.uploadForm = this.fileService.formBuilder.group({
      profile: ['']
    });
    this.getAlerts();
    this.getUser();
  }

  getUser(){
    this.userService.getUser()
    .subscribe(res =>{
      console.log(res);
      this.userId = res['UserId'];
      this.userService.getdataUser(this.userId)
      .subscribe(res =>{
        console.log('si se trajo las alertas');
        this.userService.getAlertsData(res['_id'])
        .subscribe(res =>{
          console.log('Aqui empiezan las alertas');
          console.log(res);
          this.listAlerts.push(res);
          console.log('aqui termian las alertas');
          
        })
        
        console.log('los values del user: ');
        
        console.log(res);
        
        
      });
    });
  }

  onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      // console.log(event.target.files);
      
      this.fileService.uploadForm.get('profile').setValue(file);
    }
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('file', this.fileService.uploadForm.get('profile').value);
    this.fileService.uploadFiles(formData)
    .subscribe(res =>{
      console.log(res);
      this.listFiles = [];
      this.listFiles.push(res['fileName']);
      console.log(this.listFiles);
    })

    // this.http.post<any>(this.SERVER_URL, formData).subscribe(
      
    //   res => {console.log(res);this.listFiles = []; this.listFiles.push(res['fileName']); console.log(this.listFiles);
    //   },
    //   (err) => console.log(err)
    // );
  }

  cambio(event){
    console.log(event.explicitOriginalTarget.checked);
    this.check = event.explicitOriginalTarget.checked
  }

  getAlerts(){
    this.alertService.getAlerts()
    .subscribe(res =>{
      this.alertService.alerts = res as Alert[];
      console.log(res);
    
    })
  }




 


}
