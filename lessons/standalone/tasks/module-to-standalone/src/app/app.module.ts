import { MainShellModule } from '@angular-challenges/module-to-standalone/shell';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, MainShellModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
