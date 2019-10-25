import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { MaskDirective } from './cpf-cnpj-mask.directive';


@NgModule({
  imports:      [ BrowserModule, FormsModule, ReactiveFormsModule ],
  declarations: [ AppComponent, MaskDirective ],
   exports: [
    MaskDirective
  ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { 

}
