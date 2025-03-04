import { Routes } from '@angular/router';
import { ParentComponentComponent } from './components/parent-component/parent-component.component';
import { CourseDetailsComponent } from './components/course-details/course-details.component';


export const routes: Routes = [

    {path:'',redirectTo:'/CareerCourses',pathMatch:'full'},
    {path:'CareerCourses',component:ParentComponentComponent,title:'CareerCourses'},
   {path:'courseDetails/:CourseId',component:CourseDetailsComponent,title:'CourseDetalis'},
  
];
