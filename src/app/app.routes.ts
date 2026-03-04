import { Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { AcademicComponent } from './academic/academic.component';
import { FaqsComponent } from './faqs/faqs.component';
import { UpdatesComponent } from './updates/updates.component';

export const routes: Routes = [
    { path: '', component: LandingPageComponent },
    { path: 'about', component: AboutUsComponent },
    { path: 'academics', component: AcademicComponent },
    { path: 'faqs', component: FaqsComponent },
    { path: 'updates', component: UpdatesComponent },


];

