import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EventosService } from '../../servicios/eventos.service';
import { Agenda } from '../../interfaces/agenda';

@Component({
  selector: 'app-calendario',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css']
})
export class CalendarioComponent implements OnInit {

  appointmentForm!: FormGroup;
  events: any[] = [];
  isEditing: boolean = false;
  currentEventId: string | null = null;

  constructor(private fb: FormBuilder, private eventosService: EventosService) { }

  ngOnInit() {
    this.appointmentForm = this.fb.group({

      summary: ['', Validators.required],
      location: [''],
      description: [''],
      startDateTime: ['', Validators.required],
      endDateTime: ['', Validators.required]
    });
    this.loadEvents();
  }

  get submitButtonText(): string {
    return this.isEditing ? 'Actualizar Evento' : 'Crear Evento';
  }

  onSubmit() {
    if (this.appointmentForm.valid) {
      if (this.isEditing && this.currentEventId) {
        this.eventosService.updateEvent(this.currentEventId, this.appointmentForm.value).subscribe({
          next: (response) => {
            alert('Evento actualizado con éxito');
            this.isEditing = false;
            this.currentEventId = null;
            this.appointmentForm.reset();
            this.loadEvents();
          },
          error: () => {
            alert('Error al actualizar el evento');
          }
        });
      } else {
        this.eventosService.createEvent(this.appointmentForm.value).subscribe({
          next: (response) => {
            alert('Evento creado con éxito');
            this.appointmentForm.reset();
            this.loadEvents();
          },
          error: () => {
            alert('Error al crear el evento');
          }
        });
      }
    }
  }

  loadEvents() {
    this.eventosService.getEvents().subscribe({
      next: (events: Agenda[]) => {
        this.events = events;
      },
      error: (error) => {
        alert('Error al cargar los eventos');
      }
    });
  }

  deleteEvent(eventId: string) {
    this.eventosService.deleteEvent(eventId).subscribe({
      next: () => {
        alert('Evento eliminado con éxito');
        this.loadEvents();
      },
      error: (error) => {
        alert('Error al eliminar el evento');
      }
    });
  }

  editEvent(event: any) {
    this.isEditing = true;
    this.currentEventId = event.id;
    this.appointmentForm.patchValue({
      summary: event.summary,
      location: event.location,
      description: event.description,
      startDateTime: event.start?.dateTime,
      endDateTime: event.end?.dateTime
    });
  }
}
