import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { PlaceholderComponent } from './placeholder.component';
import { TopComponent } from './top.component';

@NgModule({
  declarations: [AppComponent, PlaceholderComponent, TopComponent],
  imports: [BrowserModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
