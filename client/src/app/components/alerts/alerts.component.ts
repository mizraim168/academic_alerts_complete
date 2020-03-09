import { Component, OnInit } from '@angular/core';
import {AlertService} from '../../services/alert.service';
import {Alert} from '../../models/alert';
import { NgForm } from '@angular/forms';

declare let M: any;
@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.css'],
  providers: [AlertService]
})
export class AlertsComponent implements OnInit {

  constructor(public alertService: AlertService) { }

  ngOnInit(): void {
    this.getAlerts();
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
