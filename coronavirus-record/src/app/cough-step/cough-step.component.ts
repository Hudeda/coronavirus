import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import * as RecordRTC from 'recordrtc';
import {AudioRecordingService} from '../audio-recording.service';


@Component({
  selector: 'app-cough-step',
  templateUrl: './cough-step.component.html',
  styleUrls: ['./cough-step.component.scss']
})
export class CoughStepComponent implements OnDestroy {

  isRecording = false;
  recordedTime;
  blobUrls = [];
  blobUrlsData = [];
  image = 'mic.gif';
  @Output() coughData = new EventEmitter();
  @Output() onBackEvent = new EventEmitter();

  @Input() set data(value) {
    if (value) {
      this.blobUrlsData = value.blobUrlsData;
      this.blobUrls = value.blobUrls;
    }
  }
  constructor(private audioRecordingService: AudioRecordingService, private sanitizer: DomSanitizer) {

    this.audioRecordingService.recordingFailed().subscribe(() => {
      this.isRecording = false;
      this.image = 'mic.gif';
    });

    this.audioRecordingService.getRecordedTime().subscribe((time) => {
      if (time === '00:02') {
        this.stopRecording();
      }
      this.recordedTime = time;
    });

    this.audioRecordingService.getRecordedBlob().subscribe((data) => {
      this.blobUrlsData.push(data.blob);
      this.blobUrls.push(this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(data.blob)));
    });
  }

  startRecording() {
    if (!this.isRecording) {
      this.isRecording = true;
      this.image = 'record.gif';
      this.audioRecordingService.startRecording();
    }
  }

  abortRecording() {
    if (this.isRecording) {
      this.isRecording = false;
      this.image = 'mic.gif';
      this.audioRecordingService.abortRecording();
    }
  }

  stopRecording() {
    if (this.isRecording) {
      this.audioRecordingService.stopRecording();
      this.isRecording = false;
      this.image = 'mic.gif';

    }
  }

  clearRecordedData(index) {
    this.blobUrls.splice(index, 1);
    this.blobUrlsData.splice(index, 1);
  }

  ngOnDestroy(): void {
    this.abortRecording();
    this.audioRecordingService.clearRecordedBlob();

  }

  onSubmit() {
    this.coughData.emit({blobUrlsData: this.blobUrlsData, blobUrls: this.blobUrls});
  }

  onBack() {
    this.onBackEvent.emit({blobUrlsData: this.blobUrlsData, blobUrls: this.blobUrls});
  }
}
