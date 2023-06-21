import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {RouterModule} from '@angular/router'

import {PaginationComponent} from 'src/app/shared/modules/pagination/components/pagination/pagination.component'
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {UtilsService} from "./services/utils.service";

@NgModule({
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
  declarations: [PaginationComponent],
  exports: [PaginationComponent],
  providers: [UtilsService]
})
export class PaginationModule {}
