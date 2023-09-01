import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { ModuleMapLoaderModule } from '@nguniversal/module-map-ngfactory-loader';
import { AppComponent } from './app.component';
import { AppModule } from './app.module';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [AppModule, ServerModule,FormsModule],
    bootstrap: [AppComponent]
})
export class AppServerModule { }
