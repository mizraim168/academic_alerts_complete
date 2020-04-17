import { Component, OnInit } from '@angular/core';
import {FilesService} from '../../services/files.service';
import {AlertService} from '../../services/alert.service';
import {UserService} from '../../services/user.service';
import {CommentsService} from '../../services/comments.service';
import {Comments} from '../../models/comments';
import {User} from '../../models/user'; 
import { NgForm } from '@angular/forms';
import {Alert} from '../../models/alert';
import { stringify } from 'querystring';
declare let M: any;



@Component({
  selector: 'app-my-follow-up',
  templateUrl: './my-follow-up.component.html',
  styleUrls: ['./my-follow-up.component.css'],
  providers: [AlertService, UserService, CommentsService]
 
})



export class MyFollowUpComponent implements OnInit {
  
  listAlerts: Array<any> = [];
  listComments: Array<any> = [];
  listFiles: Array<string> = [];
  check: boolean;
  userId:string;
  alertId:string;
  constructor(public commentService: CommentsService, public fileService:FilesService, public alertService: AlertService, public userService: UserService ) { }

  ngOnInit(): void {
    this.fileService.uploadForm = this.fileService.formBuilder.group({
      profile: ['']
    });
    this.getAlerts();
    this.getUser();
    // this.alertId = this.alertService.selectedAlert._id;
  }

  // getUser(){
  //   this.userService.getUser()
  //   .subscribe(res =>{
  //     console.log(res);
  //     this.userId = res['UserId'];
  //     this.userService.getdataUser(this.userId)
  //     .subscribe(res =>{
  //       console.log('si se trajo las alertas');
  //       this.userService.getAlertsData(res['_id'])
  //       .subscribe(res =>{
  //         console.log('Aqui empiezan las alertas');
  //         console.log(res);
  //         this.listAlerts.push(res);
  //         console.log('aqui termian las alertas');
          
  //       })
        
  //       console.log('los values del user: ');
        
  //       console.log(res);
        
        
  //     });
  //   });
  // }

  comment(comment:NgForm){
    this.commentService.postComment(comment.value)
    .subscribe(res=>{
      console.log('las response es:');
      console.log(res);
      
    });
  }


  getUser(){
    this.userService.getUser()
    .subscribe(res =>{
      console.log('el user id es:');
      
      console.log(res);
      this.userId = res['UserId'];
      this.alertService.getAlerts()
      .subscribe(res=>{
        console.log('esto solo se ve aqui');
        console.log(typeof res);
        const json = JSON.stringify(res)
        const datajson = JSON.parse(json);
        console.log(' mi json es');
        console.log(datajson);
        
        for (let index = 0; index < datajson.length; index++) {
          // const element = array[index];
          if (datajson[index].id_user === this.userId) {
            console.log('*************************');
            console.log(datajson[index]);
            this.listAlerts.push(datajson[index])
            console.log('asi quedan las alertas');
            
            console.log(this.listAlerts);
            if(datajson[index].comment.length === 0 ){
              console.log('si existe el campo');
              console.log(datajson[index].comment);
              
            }
            
          }else{
            console.log('NO ENTRE AL MALDITO IF');
            
          }
        }
        // const index = datajson.findIndex(item => item.id_user === this.userId);
         
        // console.log('********** esto saca index *********');
        
        // console.log(index)
        // console.log(datajson[index])
      })
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
