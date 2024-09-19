import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

var createGoogleEvent: any;

@Component({
  selector: "app-calendario",
  standalone: true,
  imports: [],
  templateUrl: "./calendario.component.html",
  styleUrls: ["./calendario.component.css"]
})
export class CalendarioComponent implements OnInit {

  constructor(private fb: FormBuilder) { }

  appointmentForm!: FormGroup;

  ngOnInit() {

    this.appointmentForm = this.fb.group({
      appointmentTime: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });

  }

  scheludedMeeting() {

    createGoogleEvent()

  }

}
