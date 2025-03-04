import { Component, Input, OnInit } from '@angular/core';
import { ICareerCourses } from '../../models/ICareerCourses';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ServiceWithApiService } from '../../services/service-with-api.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-career',
  standalone: true,
  imports: [CommonModule, FormsModule,RouterLink],
  templateUrl: './career.component.html',
  styleUrl: './career.component.scss'
})
export class careerComponent implements OnInit {
  filteredList: ICareerCourses[] = [];
  visibleCoursesCount: number = 8;

  constructor(public courseServiceWithApi: ServiceWithApiService) {}

  ngOnInit(): void {

    this.fetchAllCareerCourses();
  }

  fetchAllCareerCourses() {
    this.courseServiceWithApi.GetAllCareerCourses().subscribe({
      next: (data) => {
        this.filteredList = data;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  @Input() set filtervalue(categoryID: string) {
    if (categoryID === '')
    {
      this.fetchAllCareerCourses();
    } else {
     
      let parsedCategoryID = Number(categoryID);
      this.courseServiceWithApi.getCourseByCatId(parsedCategoryID).subscribe({
        next: (data) => {
          this.filteredList = data;
        },
        error: (err) => {
          console.log(err);
        }
      });
    }
  }

  showMore8() {
    this.visibleCoursesCount += 8;
  }
}
