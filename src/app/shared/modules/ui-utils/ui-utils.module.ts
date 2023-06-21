import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './loader/loader.component';
import { RouterModule } from '@angular/router';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { AccordionComponent } from './accordion/accordion.component';
import { AccordionGroupComponent } from './accordion/accordion-group/accordion-group.component';
import { FullLoaderComponent } from './full-loader/full-loader.component';
import { SmallLoaderComponent } from './small-loader/small-loader.component';
import { CloseButtonComponent } from './close-button/close-button.component';
import { FileUploaderComponent } from './file-uploader/file-uploader.component';
import { InputErrorsComponent } from './input-errors/input-errors.component';
import { InputErrorComponent } from './input-error/input-error.component';
import { LogoComponent } from './logo/logo.component';

@NgModule({
  declarations: [
    LoaderComponent,
    BreadcrumbsComponent,
    AccordionComponent,
    AccordionGroupComponent,
    FullLoaderComponent,
    SmallLoaderComponent,
    CloseButtonComponent,
    FileUploaderComponent,
		InputErrorsComponent,
		InputErrorComponent,
  LogoComponent,
  ],
  imports: [
    CommonModule,
	  RouterModule,
  ],
	exports: [
		LoaderComponent,
		BreadcrumbsComponent,
		AccordionComponent,
		AccordionGroupComponent,
		FullLoaderComponent,
		SmallLoaderComponent,
		CloseButtonComponent,
		FileUploaderComponent,
		InputErrorsComponent,
		InputErrorComponent,
		LogoComponent,
	]
})
export class UiUtilsModule { }
