import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactUsComponent } from './contact-us.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalComponent } from 'src/app/shared/modal/modal.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: ContactUsComponent }
    ]),
    ReactiveFormsModule,
    ModalComponent
  ],
  declarations: [ContactUsComponent]
})
export class ContactUsModule { }
