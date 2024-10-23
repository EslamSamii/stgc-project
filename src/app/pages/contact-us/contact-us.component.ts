import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AppService } from 'src/app/shared/services/app.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent {

  public isMessageModalOpen: boolean = false;
  public contactForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    message: new FormControl('', Validators.required),
  });
  @ViewChild('contactFormRef') contactFormRef!: ElementRef;

  constructor(private _AppService: AppService){}

  ngOnInit(): void {
    scrollTo({left:0, top:0})
  }

  public getFromControl(controlName: string): FormControl{
    return this.contactForm.get(controlName) as FormControl
  }

  public submit(): void{
    if(this.contactForm.invalid){
      this.contactForm.markAllAsTouched();
      this.contactFormRef.nativeElement.reportValidity();
      return;
    }
    this._AppService.contactUs(this.contactForm.value).subscribe({
      next: ()=>{
        this.isMessageModalOpen = true;;
      },
      error: (error)=>{
        console.log(error)
      }
    })
  }

}
