import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core';
import { EventosService } from '../../servicios/eventos.service';
import { Evento } from '../../interfaces/eventos';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

@Component({

  selector: 'app-calendario',
  standalone: true,
  imports: [FullCalendarModule, CommonModule, ReactiveFormsModule],
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css']
})
export class CalendarioComponent implements OnInit {

  appointmentForm!: FormGroup;
  submitButtonText: string = 'Crear Evento';
  eventos: Evento[] = [];
  eventoEditando: Evento | null = null;
  mostrarFormulario: boolean = false;

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, interactionPlugin],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,dayGridWeek'
    },
    editable: true,
    selectable: true,
    events: [],

    eventClick: this.handleEventClick.bind(this),
    dateClick: this.handleDateClick.bind(this),

  };

  constructor(private fb: FormBuilder, private eventosService: EventosService, private http: HttpClient) { }

  ngOnInit() {

    this.appointmentForm = this.fb.group({
      summary: ['', Validators.required],
      startDateTime: ['', Validators.required],
      endDateTime: ['', Validators.required],
      location: ['', Validators.required],
      description: [''],
    });

    this.cargarEventos();
  }

  private formatDateToISO(dateString: string): string {

    const date = new Date(dateString);
    return date.toISOString();
  }

  cargarEventos() {

    this.eventosService.getEventos().subscribe({
      next: (eventos: Evento[]) => {
        console.log('eventos recibidos', eventos);
        this.eventos = eventos.map(evento => ({
          ...evento,
          id: evento.id,
          title: evento.summary,
          startDateTime: evento.startDateTime ? new Date(evento.startDateTime).toISOString().slice(0, 16) : null,
          endDateTime: evento.endDateTime ? new Date(evento.endDateTime).toISOString().slice(0, 16) : null,
          description: evento.description,
          location: evento.location
        }));

        this.calendarOptions.events = this.mapEventosToCalendarEvents(this.eventos);
      },
      error: (error) => {
        console.error('Error al cargar los eventos', error);
      }
    });
  }

  private mapEventosToCalendarEvents(eventos: Evento[]): any[] {

    return eventos.map(evento => ({
      id: evento.id,
      title: evento.summary,
      start: evento.startDateTime,
      end: evento.endDateTime || evento.startDateTime,
      description: evento.description,
      location: evento.location

    }));
  }

  handleEventClick(clickInfo: any) {
    console.log('Info del click en editar evento:', clickInfo);
    const evento = this.eventos.find(e => e.id === clickInfo.event.id);
    console.log('Evento encontrado para editar:', evento);
    if (!evento) {
      console.error('No se encontró el evento con id:', clickInfo.event.id);
    } else {
      console.error('No se encontró el evento para editar', evento);
      this.editarEventoFormulario(evento);
    }
  }

  handleDateClick(arg: any) {

    this.mostrarFormulario = true;
    const dateStr = this.formatDateForInput(arg.dateStr);
    this.appointmentForm.patchValue({
      startDateTime: dateStr
    });

    this.submitButtonText = 'Crear Evento';
    this.eventoEditando = null;
  }

  formatDateForInput(dateStr: string): string {

    const date = new Date(dateStr);
    return date.toISOString().slice(0, 16);
  }


  onSubmit() {
    if (this.appointmentForm.valid) {
      const formValues = this.appointmentForm.value;

      const nuevoEvento: Evento = {
        summary: formValues.summary,
        location: formValues.location || 'Oficina central',
        description: formValues.description || '',
        startDateTime: new Date(formValues.startDateTime).toISOString(),
        endDateTime: new Date(formValues.endDateTime).toISOString(),
        id: this.eventoEditando ? this.eventoEditando.id : '',
      };

      if (this.eventoEditando) {

        this.eventosService.updateEvento(nuevoEvento).subscribe({
          next: () => {
            alert('Evento editado con éxito');
            this.cargarEventos();
          },
          error: (error) => console.error('Error al editar el evento', error),
        });
      } else {

        this.eventosService.createEvento(nuevoEvento).subscribe({
          next: () => {
            alert('Evento creado con éxito');
            this.cargarEventos();
          },
          error: (error: any) => console.error('Error al crear el evento', error),
        });
      }


      this.mostrarFormulario = false;
      this.appointmentForm.reset();
      this.submitButtonText = 'Crear Evento';
      this.eventoEditando = null;
    }
  }


  createEvento(nuevoEvento: Evento) {

    const evento = {
      ...this.appointmentForm.value,
      startDateTime: this.formatDateForApi(this.appointmentForm.value.startDateTime),
      endDateTime: this.formatDateForApi(this.appointmentForm.value.endDateTime),
    };

    this.http.post('http://localhost:4000/api/calendario/eventos', evento).subscribe(
      (response: any) => {
        console.log('Evento creado exitosamente', response);
      },
      (error: any) => {
        console.error('Error al añadir el evento', error);
      }
    );
  }

  formatDateForApi(dateStr: string): string {
    const date = new Date(dateStr);
    return date.toISOString().slice(0, 16);
  }

  editarEvento(id: string, cambios: Partial<Evento>) {
    this.eventosService.updateEvento({ id, ...cambios }).subscribe({
      next: (eventoActualizado: Evento) => {
        const index = this.eventos.findIndex(e => e.id === id);
        if (index !== -1) {
          this.eventos[index] = { ...this.eventos[index], ...cambios };
          this.calendarOptions.events = this.mapEventosToCalendarEvents(this.eventos);
        }
      },
      error: (error) => {
        console.error('Error al editar el evento', error);
      }
    });
  }

  editarEventoFormulario(evento: Evento) {
    console.log('Evento recibido para editar:', evento);
    console.log('Propiedades del evento:', {
      id: evento?.id,
      summary: evento?.summary,
      startDateTime: evento?.startDateTime,
      endDateTime: evento?.endDateTime,
      location: evento.location,
      description: evento.description

    });
    if (!evento || !evento.startDateTime || !evento.endDateTime || !evento.location || !evento.summary || !evento.description) {
      console.error('El evento no tiene una propiedad startDateTime válida');
      console.log(evento);
      console.log('startDateTime:', evento.startDateTime);
      console.log('endDateTime:', evento.endDateTime);
      return;
    }

    this.mostrarFormulario = true;
    this.submitButtonText = 'Actualizar Evento';
    this.eventoEditando = evento;
    const normalizeDate = (fecha: string) => {
      return fecha ? new Date(fecha).toISOString().slice(0, 16) : '';
    };

    this.appointmentForm.patchValue({
      summary: evento.summary || '',
      location: evento.location || 'Sin ubicación.',
      description: evento.description || 'Sin descripción.',
      startDateTime: normalizeDate(evento.startDateTime),
      endDateTime: normalizeDate(evento.endDateTime),
    });
  }


  verTodosLosEventos() {
    console.log('Eventos actuales:', this.eventos);
  }
}
