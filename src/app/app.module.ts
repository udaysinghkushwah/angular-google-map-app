import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AgmCoreModule,GoogleMapsAPIWrapper } from '@agm/core';
import { AgmDirectionModule } from 'agm-direction';
import { PoiSearchComponent } from './poi-search/poi-search.component';

@NgModule({
  declarations: [
    AppComponent,
    PoiSearchComponent
  ],
  imports: [
    BrowserModule,
    AgmCoreModule.forRoot({
      // please get your own API key here:
      // https://developers.google.com/maps/documentation/javascript/get-api-key?hl=en
      apiKey: 'AIzaSyA3Cr0c6G7FDybQqh4QJQ8mXukeALu9QBI',
      libraries: ['geometry']
    }),
    AgmDirectionModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [GoogleMapsAPIWrapper],
  bootstrap: [AppComponent]
})
export class AppModule { }
