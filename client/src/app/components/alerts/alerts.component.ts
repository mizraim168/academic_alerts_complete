import { Component, OnInit, ElementRef ,ViewChild } from '@angular/core';
import {AlertService} from '../../services/alert.service';
import {Alert} from '../../models/alert';
import { NgForm } from '@angular/forms';
import * as jspdf from 'jspdf';  
import html2canvas from 'html2canvas';  

declare let M: any;
// declare let jspdf: any; 



@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.css'],
  providers: [AlertService]
})
export class AlertsComponent implements OnInit {
  valueCategory = '';
  val:string
  arr = {
    value: this.val
  }
  constructor(public alertService: AlertService) { }


  ngOnInit(){
      // this.valueCategory = "academic";
      
      var elems = document.querySelectorAll('select');
      var instances = M.FormSelect.init(elems);
    
      this.getAlerts();
    
      
  }


  paver(){
    console.log(this.arr);
  }

  optionChanged(event){
    console.log(event.target.value);
    this.valueCategory = event.target.value;
    
    
  }
 

  createReport()  
  {  
    let data = document.getElementById('report');  
    html2canvas(data).then(canvas => {  
      // Few necessary setting options  
      let imgWidth = 208;   
      let pageHeight = 295;    
      let imgHeight = canvas.height * imgWidth / canvas.width;  
      let heightLeft = imgHeight;  
  
      const contentDataURL = canvas.toDataURL('image/png')  
      let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF  
      let position = 0;  
      pdf.addImage(contentDataURL, 'JPEG', 0, position, imgWidth, imgHeight)  
      pdf.save('Report.pdf'); // Generated PDF 
    });  

  }  

 

  addAlert(form: NgForm){
    if (form.value._id) {
      this.alertService.putAlert(form.value)
      .subscribe(res => {
        console.log(res);
        this.resetForm(form);
        M.toast({html: 'Updated Successfuly'})
        this.getAlerts();
        
      });
    }else{
      this.alertService.postAlert(form.value)
      .subscribe(res => {
        console.log(res);
        this.resetForm(form);
        M.toast({html: 'Saved Successfuly'})
        this.getAlerts();
      });
    }
   
  }

  getAlerts(){
    this.alertService.getAlerts()
    .subscribe(res =>{
      this.alertService.alerts = res as Alert[];
      console.log(res);
   
    })
  }
  editAlert(alert : Alert){
    this.alertService.selectedAlert = alert;
    // this.userService.putUser()
  }
  deleteAlert(_id:string){
    if (confirm('Are you sure you want to delete it?')) {
      this.alertService.deleteAlert(_id)
      .subscribe(res => {
        console.log(res);
        this.getAlerts();
        M.toast({html: 'Deleted successfuly'})
      });
     

    }

  }


  //clean form after submit
  resetForm(form?: NgForm){
    if (form) {
      form.reset();
      this.alertService.selectedAlert = new Alert();
    }
  }

}
