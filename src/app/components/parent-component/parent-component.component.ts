import { Component, OnInit } from '@angular/core';
import { careerComponent } from '../career/career.component';
import { ServiceWithApiService } from '../../services/service-with-api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CoursesCategories } from '../../models/CoursesCategories';
import { CareerResoursesCategory } from '../../models/career-resourses-category';
import { CareerResourses } from '../../models/career-resourses';
import { SucessStories } from '../../models/sucess-stories';

@Component({
  selector: 'app-parent-component',
  standalone: true,
  imports: [careerComponent, FormsModule, CommonModule],
  templateUrl: './parent-component.component.html',
  styleUrl: './parent-component.component.scss'
})
export class ParentComponentComponent implements OnInit {
  sendedValueFromParent: string = ''; 
  CareerResourses: CareerResourses[] = [];
  CareerCoursescategories: CoursesCategories[] = [];
  CareerResourseCategory: CareerResoursesCategory[] = [];
  selectedCategory: string = ''; 
  visibleCoursesCount: number = 4;
  SuccessStories: SucessStories[] = [];
  
  constructor(private courseServiceWithApi: ServiceWithApiService) {}

  ngOnInit(): void {
    this.fetchCareerCoursesCategories();
    this.fetchCareerResoursesCategories();

    if (this.CareerResourseCategory.length > 0) {
      this.selectedCategory = this.CareerResourseCategory[0].categoryID;
      this.fetchCareerResoureses(this.selectedCategory);
    }

    this.fetchAllSuccessStories();
  }

  fetchCareerCoursesCategories() {
    this.courseServiceWithApi.getCareerCourseCategory().subscribe({
      next: (data) => {
        this.CareerCoursescategories = data;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  fetchCareerResoursesCategories() {
    this.courseServiceWithApi.getCareerResoursesCategory().subscribe({
      next: (data) => {
        this.CareerResourseCategory = data;
        if (this.CareerResourseCategory.length > 0) {
          this.selectedCategory = this.CareerResourseCategory[0].categoryID;
          this.fetchCareerResoureses(this.selectedCategory);
        }
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  fetchCareerResoureses(categoryId: string = '') {
    if (categoryId === '') {
      this.courseServiceWithApi.GetAllCareerResourses().subscribe({
        next: (data) => {
          this.CareerResourses = data;
        },
        error: (err) => {
          console.log(err);
        }
      });
    } else {
      this.courseServiceWithApi.getCareerResoursesByCategory(categoryId).subscribe({
        next: (data) => {
          this.CareerResourses = data;
        },
        error: (err) => {
          console.log(err);
        }
      });
    }
  }

  selectResours(selectValue: string) {
    this.selectedCategory = selectValue;
    this.fetchCareerResoureses(selectValue);
  }

  
  toggleShowMore() {
    if (this.visibleCoursesCount > 4) {
      this.visibleCoursesCount = 4;
    } else {
      this.visibleCoursesCount += 6;
    }
  }

  fetchAllSuccessStories() {
    this.courseServiceWithApi.GetAllSuccessStories().subscribe({
      next: (data) => {
        this.SuccessStories = data;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}

