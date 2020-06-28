import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImagenPipe } from './imagen.pipe';
import { ImgpreviewanuPipe } from './imgpreviewanu.pipe';



@NgModule({
  declarations: [
    ImagenPipe,
    ImgpreviewanuPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
      ImagenPipe,
      ImgpreviewanuPipe
  ]
})
export class PipesModule { }
