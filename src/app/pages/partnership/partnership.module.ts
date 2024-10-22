import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PartnershipComponent } from './partnership.component';
import { RouterModule } from '@angular/router';
import { HorizontalScrollDirective } from 'src/app/shared/directives/horizontal-scroll.directive';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalComponent } from 'src/app/shared/modal/modal.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: PartnershipComponent }
    ]),
    HorizontalScrollDirective,
    ReactiveFormsModule,
    ModalComponent
  ],
  declarations: [PartnershipComponent]
})
export class PartnershipModule { }
