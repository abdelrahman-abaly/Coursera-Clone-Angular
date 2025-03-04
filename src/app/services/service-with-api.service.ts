import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { ICareerCourses } from '../models/ICareerCourses';
import { Observable } from 'rxjs';
import { CoursesCategories } from '../models/CoursesCategories';
import { CareerResourses } from '../models/career-resourses';
import { CareerResoursesCategory } from '../models/career-resourses-category';
import { SucessStories } from '../models/sucess-stories';

@Injectable({
  providedIn: 'root'
})
export class ServiceWithApiService {
  httpheaders={};
  constructor(public httpclient:HttpClient) {

   
    this.httpheaders={
      Headers:new HttpHeaders({'content-type':'application/json'})    }
   }

  
  baseURLCareerCourse:string=`${environment.baseUrl}/CareerCourses`;
  baseURLCareerCourseCategory:string=`${environment.baseUrl}/CareerCourseCategories`;
  baseURLcareerResources:string=`${environment.baseUrl}/careerResources`;
  baseURLcareerResourceCategories:string=`${environment.baseUrl}/careerResourceCategories`;
  baseURLsuccessStories:string=`${environment.baseUrl}/successStories`;


  // /get all career courses
  GetAllCareerCourses(): Observable<ICareerCourses[]> {
    return this.httpclient.get<ICareerCourses[]>(this.baseURLCareerCourse);
  }
// get course by id
getCarerrCourseById(CourseId: string): Observable<ICareerCourses> {
    return this.httpclient.get<ICareerCourses>(`${this.baseURLCareerCourse}/${CourseId}`);
  }

// get all catgories of career courses
  getCareerCourseCategory(): Observable<CoursesCategories[]> {
    return this.httpclient.get<CoursesCategories[]>(this.baseURLCareerCourseCategory);
  }
  
  // query string to search by cat Id

  getCourseByCatId(catValu:number):Observable<ICareerCourses[]> {
    return this.httpclient.get<ICareerCourses[]>(`${this.baseURLCareerCourse}?categoryID=${catValu}`);
  }

  GetAllCareerResourses(): Observable<CareerResourses[]> {
    return this.httpclient.get<CareerResourses[]>(this.baseURLcareerResources);
  }

  // Get categories for career resources
  getCareerResoursesCategory(): Observable<CareerResoursesCategory[]> {
    return this.httpclient.get<CareerResoursesCategory[]>(`${environment.baseUrl}/careerResourceCategories`);
  }

  // Get career resources filtered by category
  getCareerResoursesByCategory(categoryID: string): Observable<CareerResourses[]> {
    return this.httpclient.get<CareerResourses[]>(`${this.baseURLcareerResources}?categoryID=${categoryID}`);
  }

  // get all success stories 
   GetAllSuccessStories():Observable<SucessStories[]>{
    return this.httpclient.get<SucessStories[]>(`${this.baseURLsuccessStories}`)
   }



 
  
 
}
