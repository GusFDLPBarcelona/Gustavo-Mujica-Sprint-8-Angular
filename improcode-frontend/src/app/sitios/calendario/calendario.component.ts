import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { EventosService } from '../../servicios/eventos.service';
import { Evento } from '../../interfaces/eventos';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

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
      endDateTime: ['', Validators.required]
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
        // Convertir las fechas a formato ISO si es necesario
        this.eventos = eventos.map(evento => ({
          ...evento,
          startDateTime: evento.startDateTime ? new Date(evento.startDateTime).toISOString() : null,
          endDateTime: evento.endDateTime ? new Date(evento.endDateTime).toISOString() : null,
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
    const evento = this.eventos.find(e => e.id === clickInfo.event.id);
    if (evento) {
      this.editarEventoFormulario(evento);
    }
  }

  handleDateClick(arg: any) {
    this.mostrarFormulario = true;

    // Convertimos la fecha al formato esperado por el input datetime-local
    const dateStr = this.formatDateForInput(arg.dateStr);

    this.appointmentForm.patchValue({
      startDateTime: dateStr
    });

    this.submitButtonText = 'Crear Evento';
    this.eventoEditando = null;
  }

  // Función para formatear la fecha al formato esperado por el input datetime-local
  formatDateForInput(dateStr: string): string {
    const date = new Date(dateStr);
    // Convertimos la fecha al formato yyyy-MM-ddThh:mm
    return date.toISOString().slice(0, 16);
  }


  onSubmit(): void {
    if (this.appointmentForm.valid) {
      const nuevoEvento: Evento = {
        id: this.eventoEditando ? this.eventoEditando.id : '',
        summary: this.appointmentForm.get('summary')?.value,
        startDateTime: this.formatDateToISO(this.appointmentForm.get('startDateTime')?.value),
        endDateTime: this.formatDateToISO(this.appointmentForm.get('endDateTime')?.value),
        description: '',
        location: 'Oficina central'
      };

      if (this.eventoEditando) {
        this.editarEvento(nuevoEvento.id, nuevoEvento);
      } else {
        this.addEvento(nuevoEvento);
      }

      this.appointmentForm.reset();
      this.submitButtonText = 'Crear Evento';
      this.mostrarFormulario = false;
      this.eventoEditando = null;
    }
  }

  addEvento(nuevoEvento: Evento) {
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
    return date.toISOString().slice(0, 16);  // 'yyyy-MM-ddThh:mm'
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
    this.mostrarFormulario = true;
    this.appointmentForm.patchValue({
      summary: evento.summary,
      startDateTime: evento.startDateTime,
      endDateTime: evento.endDateTime
    });
    this.submitButtonText = 'Actualizar Evento';
    this.eventoEditando = evento;
  }

  eliminarEvento(id: string) {
    this.eventosService.deleteEvento(id).subscribe({
      next: () => {
        this.eventos = this.eventos.filter(evento => evento.id !== id);
        this.calendarOptions.events = this.mapEventosToCalendarEvents(this.eventos);
      },
      error: (error) => {
        console.error('Error al eliminar el evento', error);
      }
    });
  }

  verTodosLosEventos() {
    console.log('Eventos actuales:', this.eventos);
  }
}
