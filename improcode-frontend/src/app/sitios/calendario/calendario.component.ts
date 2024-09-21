import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventosService } from '../../servicios/eventos.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpHeaders } from '@angular/common/http';

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
  accessToken: string | null = null;

  constructor(private fb: FormBuilder, private eventosService: EventosService) { }

  ngOnInit() {
    this.appointmentForm = this.fb.group({
      summary: ['', Validators.required],
      location: [''],
      description: [''],
      startDateTime: ['', Validators.required],
      endDateTime: ['', Validators.required]
    });

    this.checkAuthenticationAndLoadEvents();
  }

  checkAuthenticationAndLoadEvents() {
    // Verificar si el token está en localStorage
    this.accessToken = localStorage.getItem('access_token');

    if (this.accessToken) {
      // Si hay token, cargamos los eventos
      this.loadEvents();
    } else {
      // Si no hay token, redirigir a la autenticación
      this.redirectToLogin();
    }
  }

  redirectToLogin() {
    window.location.href = 'http://localhost:4000/api/calendario/auth';
  }

  loadEvents() {
    if (!this.accessToken) {
      console.error('Token de acceso no encontrado.');
      this.redirectToLogin();
      return;
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.accessToken}`
    });

    this.eventosService.getEvents(headers).subscribe({
      next: (events) => {
        this.events = events;
      },
      error: (err) => {
        console.error('Error al cargar los eventos', err);
      }
    });
  }

  onSubmit() {
    if (this.appointmentForm.valid) {
      const eventData = this.appointmentForm.value;

      if (this.isEditing && this.currentEventId) {
        this.eventosService.updateEvent(this.currentEventId, eventData).subscribe({
          next: () => {
            alert('Evento actualizado con éxito');
            this.isEditing = false;
            this.currentEventId = null;
            this.appointmentForm.reset();
            this.loadEvents();
          },
          error: (err) => {
            alert('Error al actualizar el evento');
            console.error(err);
          }
        });
      } else {
        this.eventosService.createEvent(eventData).subscribe({
          next: () => {
            alert('Evento creado con éxito');
            this.appointmentForm.reset();
            this.loadEvents();
          },
          error: (err) => {
            alert('Error al crear el evento');
            console.error(err);
          }
        });
      }
    }
  }

  get submitButtonText(): string {
    return this.isEditing ? 'Actualizar Evento' : 'Crear Evento';
  }

  deleteEvent(eventId: string) {
    this.eventosService.deleteEvent(eventId).subscribe({
      next: () => {
        alert('Evento eliminado con éxito');
        this.loadEvents();
      },
      error: (err) => {
        alert('Error al eliminar el evento');
        console.error(err);
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
      startDateTime: event.start.dateTime,
      endDateTime: event.end.dateTime
    });
  }
}
