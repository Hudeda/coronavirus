import {Component} from '@angular/core';
import * as RecordRTC from 'recordrtc';
import {DomSanitizer} from '@angular/platform-browser';
import {CoronavirusService} from './coronavirus.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  private record;
  private recording = false;
  private url;
  private error;
  private arrayURL = [];
  private color = 'blue';
  private duplicate = false;
  private hasFinish = false;
  private coronaForm: FormGroup;
  private haveDiagnosedOption;
  private cityOption;
  private countryOption = [];
  private diagnosedOption = [];
  private diagnosed = false;
  constructor(private domSanitizer: DomSanitizer, private coronavirusService: CoronavirusService, private fb: FormBuilder) {
    coronavirusService.getToken().subscribe( res => {
      coronavirusService.setToken(res) ;
      coronavirusService.getCountries().subscribe( contries => {
        contries.forEach(contry => this.countryOption.push({ label: contry.country_name, value: contry.country_name}));
      });
    });

    this.haveDiagnosedOption = [
      { label: 'No', value: 'No'},
      { label: 'Yes', value: 'Yes' }
    ];

    this.diagnosedOption = [
      { label: 'Not showing any symptoms at all', value: 'No'},
      { label: 'Lightly infected', value: 'Lightly' },
      { label: 'Serious condition', value: 'Serious' },
      { label: 'Critical condition', value: 'Critical' },
      { label: 'On a respirator', value: 'Respirator' }
    ];

    this.coronaForm = this.fb.group({
      fullName: [, Validators.required],
      age: [, Validators.required],
      gender: [, Validators.required],
      city: [, Validators.required],
      country: [, Validators.required],
      symptoms: ['', Validators.required]
    });
  }

  sanitize(url: string) {
    return this.domSanitizer.bypassSecurityTrustUrl(url);
  }

  /**
   * Start recording.
   */


  initiateRecording() {
    this.duplicate = false;
    const mediaConstraints = {video: false, audio: true};
    navigator.mediaDevices.getUserMedia(mediaConstraints).then(this.successCallback.bind(this), this.errorCallback.bind(this));
  }

  /**
   * Will be called automatically.
   */
  successCallback(stream) {
    const options = {
      mimeType: 'audio/wav',
      numberOfAudioChannels: 1
    };
    const StereoAudioRecorder = RecordRTC.StereoAudioRecorder;
    this.record = new StereoAudioRecorder(stream, options);
    this.record.record();
    this.color = 'mediumseagreen';
    this.recording = true;
    setTimeout(() => {
      this.stopRecording();
      this.duplicate = true;
    }, 3200);

  }

  /**
   * Stop recording.
   */
  stopRecording() {
    if (!this.duplicate) {
      this.color = 'blue';
      this.recording = false;
      this.record.stop(this.processRecording.bind(this));
      this.cleanRecording();
    }

  }

  cleanRecording() {
    this.hasFinish = this.arrayURL.length === 3;
    this.url = null;
    this.recording = false;
  }

  /**
   * processRecording Do what ever you want with blob
   * @param  {any} blob Blog
   */
  processRecording(blob) {
    this.arrayURL.push(URL.createObjectURL(blob));
    this.url = this.arrayURL[this.arrayURL.length - 1];
  }

  /**
   * Process Error.
   */
  errorCallback(error) {
    this.error = 'Can not play audio in your browser';
  }



  onSubmit() {
     this.coronavirusService.getIPAddress().subscribe(ip => {
       const value = this.coronaForm.value;
       value.ip = ip.ip;
       debugger;
       this.coronavirusService.savePatient(value).subscribe(res => {
       });
     });
  }

  onDiagnosedChange(event) {
    this.diagnosed = event.value === 'Yes';
  }

  loadCity(event) {
    this.cityOption = [];
    this.coronavirusService.getCities(event.value).subscribe( cities => {
      cities.forEach(city => this.cityOption.push({ label: city.state_name, value: city.state_name}));

    });
  }
}
