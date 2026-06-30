import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, HostListener, ViewChild, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  imports: [CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements AfterViewInit {
  protected readonly title = signal('voices-freed');

  @ViewChild('consultSection') consultSection?: ElementRef<HTMLElement>;

  certOpen = false;
  showMobileConsultButton = true;

  ngAfterViewInit() {
    this.updateMobileConsultButton();
  }

  @HostListener('document:keydown.escape')
  onEscape() {
    this.certOpen = false;
  }

  @HostListener('window:scroll')
  @HostListener('window:resize')
  updateMobileConsultButton() {
    const consultTop = this.consultSection?.nativeElement.getBoundingClientRect().top;

    if (consultTop === undefined) {
      return;
    }

    this.showMobileConsultButton = consultTop > window.innerHeight * 0.35;
  }

  handleConsultSubmit(event: SubmitEvent) {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);

    const name = String(formData.get('name') || '');
    const phone = String(formData.get('phone') || '');
    const email = String(formData.get('email') || '');
    const message = String(formData.get('message') || '');

    const subject = encodeURIComponent('Consult Request - Voices Freed');
    const body = encodeURIComponent(
      `Name: ${name}\nPhone: ${phone}\nEmail: ${email}\n\nMessage:\n${message}`
    );

    window.location.href = `mailto:jenniferfreed@yahoo.com?subject=${subject}&body=${body}`;

    form.reset();
  }
}