import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

interface NewsArticle {
  image: string;
  category: string;
  author: string;
  date: string;
  title: string;
  excerpt: string;
  url: string;
}

export interface SocialPost {
  id: string;
  message?: string;
  full_picture?: string;
  created_time: string;
  permalink_url: string;
  attachments?: {
    data: Array<{
      media?: { image?: { src: string } };
      subattachments?: { data: Array<{ media: { image: { src: string } } }> };
    }>;
  };
}

@Component({
  selector: 'app-updates',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './updates.component.html',
  styleUrl: './updates.component.scss'
})
export class UpdatesComponent {

  // ─── CONFIG ──────────────────────────────────────────────────────────────
  // Replace these with your actual values from Meta Developer Console:
  // 1. Go to https://developers.facebook.com/
  // 2. Create an App → Add "Facebook Login" product
  // 3. Generate a Page Access Token for your Page
  // 4. Replace PAGE_ID and PAGE_ACCESS_TOKEN below
  private PAGE_ID = 'YOUR_PAGE_ID';           // e.g. '123456789012345'
  private ACCESS_TOKEN = 'YOUR_PAGE_ACCESS_TOKEN';
  // ─────────────────────────────────────────────────────────────────────────



  featuredPost: SocialPost | null = null;
  sidePosts: SocialPost[] = [];
  loading = true;
  error = false;
  usingFallback = false;

  searchQuery = '';


    // Fallback static data matching the screenshot
  private fallbackFeatured: SocialPost = {
    id: '1',

    message: `Yesterday the College was buzzing with excitement during a colourful and successful event of Commissioning of Solar power to Lukenya College by #SolarPowerGroup ! 😊 🌿 ... See more`,
    full_picture: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&auto=format&fit=crop',
    created_time: '2025-03-20T07:48:00+0000',
    permalink_url: 'https://facebook.com',
  };

  private fallbackSide: SocialPost[] = [
    {
      id: '2',
      message: `Lukenya University 4th Edition 10 Million Trees\n\nLet's do this\n#LU10MillionTreesMarathon\n#RunningForGreenerFuture`,
      full_picture: 'https://images.unsplash.com/photo-1542601906897-ecd4b7e3b21a?w=400&auto=format&fit=crop',
      created_time: '2025-03-18T10:00:00+0000',
      permalink_url: 'https://facebook.com',
    },
    {
      id: '3',
      message: `Eid Mubarak!\n\nWishing you and your loved ones peace, joy, and countless blessings this beautiful season.\n#LukenyaCollege #EidMubarak #Community`,
      full_picture: 'https://images.unsplash.com/photo-1604079628040-94301bb21b91?w=400&auto=format&fit=crop',
      created_time: '2025-03-15T08:00:00+0000',
      permalink_url: 'https://facebook.com',
    },
    {
      id: '4',
      message: `Join Lukenya College – Emali Campus!\n\nApril & September 2026 Intake Ongoing. Build your future with our market-driven Certificate and Diploma programmes in...`,
      full_picture: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&auto=format&fit=crop',
      created_time: '2025-03-10T09:00:00+0000',
      permalink_url: 'https://facebook.com',
    },
  ];
 
  constructor(private http: HttpClient) {}
 
  ngOnInit() {
    if (this.PAGE_ID === 'YOUR_PAGE_ID') {
      this.loadFallback();
      return;
    }
    this.fetchFacebookPosts();
  }
 
  fetchFacebookPosts() {
    const fields = 'id,message,full_picture,created_time,permalink_url,attachments';
    const url = `https://graph.facebook.com/v19.0/${this.PAGE_ID}/posts?fields=${fields}&limit=4&access_token=${this.ACCESS_TOKEN}`;
 
    this.http.get<{ data: SocialPost[] }>(url).subscribe({
      next: (res) => {
        const posts = res.data || [];
        this.featuredPost = posts[0] || null;
        this.sidePosts = posts.slice(1, 4);
        this.loading = false;
      },
      error: () => {
        this.loadFallback();
      },
    });
  }
 
  loadFallback() {
    this.usingFallback = true;
    this.featuredPost = this.fallbackFeatured;
    this.sidePosts = this.fallbackSide;
    this.loading = false;
  }
 
  formatDate(dateStr: string): string {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long' }) +
      ' at ' +
      date.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
  }
 
  truncate(text: string, limit: number): string {
    if (!text) return '';
    return text.length > limit ? text.substring(0, limit) + '...' : text;
  }
 
  getPostTitle(post: SocialPost): string {
    if (!post.message) return 'Lukenya College';
    const firstLine = post.message.split('\n')[0];
    return this.truncate(firstLine, 60);
  }
 
  getPostExcerpt(post: SocialPost): string {
    if (!post.message) return '';
    const lines = post.message.split('\n').filter(l => l.trim());
    const body = lines.slice(1).join(' ');
    return this.truncate(body || lines[0], 100);
  }


  onSearch() {
    console.log('Searching:', this.searchQuery);
  }


  latestNews: NewsArticle[] = [
    {
      image: '../../.././public/examinatin-image.jpg',
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