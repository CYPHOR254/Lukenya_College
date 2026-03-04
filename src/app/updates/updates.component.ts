import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface NewsArticle {
  image: string;
  category: string;
  author: string;
  date: string;
  title: string;
  excerpt: string;
  url: string;
}

@Component({
  selector: 'app-updates',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './updates.component.html',
  styleUrl: './updates.component.scss'
})
export class UpdatesComponent {

  searchQuery = '';

  onSearch() {
    console.log('Searching:', this.searchQuery);
  }


  latestNews: NewsArticle[] = [
    {
      image: 'assets/images/news/news-1.jpg',
      category: 'Examinations',
      author: 'Admin',
      date: 'November 23th 2020',
      title: 'Short Discussions About Business In Pandemic Covid 19',
      excerpt: 'Lorem ipsum dolor sit amet...',
      url: '#',
    },
    {
      image: 'assets/images/news/news-2.jpg',
      category: 'Sports',
      author: 'Admin',
      date: 'November 23th 2020',
      title: "Spend Weekend Time With All Elmna's Team Members",
      excerpt: 'Lorem ipsum dolor sit amet...',
      url: '#',
    },
  ];

  allNews: NewsArticle[] = [
    {
      image: 'assets/images/news/news-1.jpg',
      category: 'Examinations',
      author: 'Admin',
      date: 'November 23th 2020',
      title: 'Short Discussions About Business In Pandemic Covid 19',
      excerpt: 'Lorem ipsum dolor sit amet...',
      url: '#',
    },
    {
      image: 'assets/images/news/news-2.jpg',
      category: 'Sports',
      author: 'Admin',
      date: 'November 23th 2020',
      title: "Spend Weekend Time With All Elmna's Team Members",
      excerpt: 'Lorem ipsum dolor sit amet...',
      url: '#',
    },
    {
      image: 'assets/images/news/news-3.jpg',
      category: 'Admissions',
      author: 'Admin',
      date: 'November 23th 2020',
      title: 'Learn How To Increase Business Network In Pandemic',
      excerpt: 'Lorem ipsum dolor sit amet...',
      url: '#',
    },
  ];

  currentPage = 1;
  totalPages = 4;
  pages = [1, 2, 3, 4];

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  prevPage() { this.goToPage(this.currentPage - 1); }
  nextPage() { this.goToPage(this.currentPage + 1); }
}