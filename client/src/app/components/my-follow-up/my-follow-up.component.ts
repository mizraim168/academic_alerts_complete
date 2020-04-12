import { Component, OnInit } from '@angular/core';
import {FilesService} from '../../services/files.service';

declare let M: any;



@Component({
  selector: 'app-my-follow-up',
  templateUrl: './my-follow-up.component.html',
  styleUrls: ['./my-follow-up.component.css']
 
})



export class MyFollowUpComponent implements OnInit {
  

  listFiles: Array<string> = [];
  constructor(public fileService:FilesService ) { }

  ngOnInit(): void {
    this.fileService.uploadForm = this.fileService.formBuilder.group({
      profile: ['']
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

 


}
