import { Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { AcademicComponent } from './academic/academic.component';
import { FaqsComponent } from './faqs/faqs.component';
import { UpdatesComponent } from './updates/updates.component';
import { PrincipalComponent } from './staff-remarks/principal/principal.component';
import { DeputyPrincipalComponent } from './staff-remarks/deputy-principal/deputy-principal.component';
import { EngineeringRemarksComponent } from './staff-remarks/engineering-remarks/engineering-remarks.component';
import { HodEducationComponent } from './staff-remarks/hod-education/hod-education.component';
import { RegistrarComponent } from './staff-remarks/registrar/registrar.component';
import { SchoolOfEducationComponent } from './school-of-education/school-of-education.component';
import { SchoolOfEngineeringComponent } from './school-of-engineering/school-of-engineering.component';
import { SchoolOfBusinessComponent } from './school-of-business/school-of-business.component';
import { GalleryComponent } from './gallery/gallery.component';

export const routes: Routes = [
    { path: '', component: LandingPageComponent },
    { path: 'about', component: AboutUsComponent },
    { path: 'academics', component: AcademicComponent },
    { path: 'faqs', component: FaqsComponent },
    { path: 'updates', component: UpdatesComponent },
    { path: 'principal', component: PrincipalComponent },
    { path: 'deputy-principal', component: DeputyPrincipalComponent },
    { path: 'engineering-remarks', component: EngineeringRemarksComponent },
    { path: 'education-remarks', component: HodEducationComponent },
    { path: 'registrar', component: RegistrarComponent },
    { path: 'school-of-education', component: SchoolOfEducationComponent },
    { path: 'school-of-engineering', component: SchoolOfEngineeringComponent },
    { path: 'school-of-business', component: SchoolOfBusinessComponent },
    { path: 'gallery', component: GalleryComponent },



];

