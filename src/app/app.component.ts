import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';


export class Book {
  constructor(
    public id: number,
    public title: string,
    public image: string,
    public price: number,
    public thumbImage: string,
    public genre: Genre,
    public author: Author

  ) {

  }
}

export class Genre {
  constructor(public id: number, public name: string) {
  }
}

export class Author {
  constructor(public id: number, public name: string) {
  }
}





@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {



  title = 'books';

  bookUrl = "http://localhost:8081/books";
  genreUrl = "http://localhost:8081/genres";

  books: Book[] = [];
  genres: Genre[] = [];
  booksByGenre: Book[][] = [];
  genreAmount: number = 0;
  genreCounter: number = 0;
  bookIterator: number = 0;
  currentGenre: number = 0;
  imageArray: any[][] = [];


  constructor(private httpClient: HttpClient) {

  }

  ngOnInit(): void {
    this.getAllGenres();
    this.getAllBooksByGenre();
  }



  getAllGenres() {
    this.httpClient.get<any>(this.genreUrl + "/all-genres").subscribe(response => {
      this.genres = response;
    })
  }



  getAllBooksByGenre() {
    console.log(this.booksByGenre);
    this.httpClient.get<any>(this.genreUrl + "/all-genres").subscribe(response => {

      this.genres = response;

      this.genres.forEach(genre => {
        this.genreCounter++;

        this.httpClient.get<any>(this.bookUrl + "/findByGenre/" + this.genreCounter).subscribe(response => {
          this.imageArray[this.bookIterator] = response;
          this.bookIterator++;
        })

      });

    })

  }
}
