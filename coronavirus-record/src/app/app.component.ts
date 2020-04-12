import {Component} from '@angular/core';
import {MenuItem} from 'primeng/api';
import {CoronavirusService} from './coronavirus.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  items: MenuItem[];
  activeIndex = 0;
  dataAsSent = false;
  dataRequest = {personalData: null, medicallData: null, coughData: null};

  constructor(private coronavirusService: CoronavirusService) {
    this.items = [{
      label: 'Personal',
      command: (event: any) => {
        this.activeIndex = 0;
      }
    },
      {
        label: 'Medical Question',
        command: (event: any) => {
          this.activeIndex = 1;
        }
      },
      {
        label: 'Cough Step',
        command: (event: any) => {
          this.activeIndex = 2;
        }
      },
    ];
  }


  personalData(value) {
    this.activeIndex = 1;
    this.dataRequest.personalData = value;
  }

  medicalData(value) {
    this.activeIndex = 2;
    this.dataRequest.medicallData = value;
  }

  medicalBack(value) {
    this.activeIndex = 0;
    this.dataRequest.medicallData = value;
  }

  coughData(value) {
    this.dataAsSent = true;
    this.activeIndex = 3;
    console.log(value);
    this.dataRequest.coughData = value;
    this.coronavirusService.getIPAddress().subscribe(ip => {
      const dataFile: FormData = new FormData();
      this.dataRequest.coughData.blobUrlsData.map(item => dataFile.append('cough', item, item.name));

      const patient = this.dataRequest.personalData.value;
      patient.ip = ip.ip;
      patient.diagnosed = patient.symptoms !== '';
      dataFile.append('patient', new Blob([ JSON.stringify(patient) ], {type: 'application/json'}));
      this.coronavirusService.savePatient(dataFile).subscribe(res => {
        this.dataAsSent = false;
        this.activeIndex = 0;
        this.dataRequest = {personalData: null, medicallData: null, coughData: null};

      });
    });
  }

  coughBack(value) {
    this.activeIndex = 1;
    this.dataRequest.coughData = value;
  }

}
