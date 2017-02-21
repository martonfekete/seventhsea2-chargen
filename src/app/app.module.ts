import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';

import { AppComponent } from './app.component';
import 'hammerjs';
import * as _ from 'lodash';

import { CharGenOptions } from './app-usedata';
import { CharacterSheetComponent } from './character-sheet/character-sheet.component';
import { SorceryPartComponent } from './sorcery-part/sorcery-part.component';

@NgModule({
  declarations: [
    AppComponent,
    CharacterSheetComponent,
    SorceryPartComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot()
  ],
  providers: [CharGenOptions],
  bootstrap: [AppComponent]
})
export class AppModule { }
