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
  activeIndex = 3;
  dataAsSent = false;
  gratitude = false;
  dataRequest = {personalData: null, medicallData: null, sniffData: null, coughData: null};

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
        label: 'Sniff Step',
        command: (event: any) => {
          this.activeIndex = 2;
        }
      },
      {
        label: 'Cough Step',
        command: (event: any) => {
          this.activeIndex = 3;
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

  sniffData(value) {
    this.activeIndex = 3;
    this.dataRequest.sniffData = value;
  }

  medicalBack(value) {
    this.activeIndex = 0;
    this.dataRequest.medicallData = value;
  }

  gratitudeHome() {
    this.gratitude = false;
    this.activeIndex = 0;
  }

  coughData(value) {
    this.dataAsSent = true;
    this.activeIndex = 4;
    console.log(value);
    this.dataRequest.coughData = value;
    this.coronavirusService.getIPAddress().subscribe(ip => {
      const dataFile: FormData = new FormData();
      this.dataRequest.coughData.blobUrlsData.map(item => dataFile.append('cough', item, item.name));
      try {
        const patient = this.dataRequest.personalData.value;
        patient.ip = ip.ip;
        patient.medicalQuestion = this.dataRequest.medicallData.value;
        patient.sniffTest = this.dataRequest.sniffData.value;
        dataFile.append('patient', new Blob([ JSON.stringify(patient) ], {type: 'application/json'}));
        this.coronavirusService.savePatient(dataFile).subscribe(res => {
          this.dataAsSent = false;
          this.gratitude = true;
          this.dataRequest = {personalData: null, medicallData: null, sniffData: null, coughData: null};
        });
      } catch (e) {
        this.activeIndex = 3;
        this.dataAsSent = false;
      }
    });
  }

  coughBack(value) {
    this.activeIndex = 2;
    this.dataRequest.coughData = value;
  }

  sniffBack(value) {
    this.activeIndex = 1;
    this.dataRequest.sniffData = value;
  }

}
