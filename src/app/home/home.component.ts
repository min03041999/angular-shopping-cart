import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private auth: AuthService) {}
  productArray = [
    {
      prodId: 1,
      img: '../../assets/P1.jpg',
      amt: 400,
      qnt: 1,
    },
    {
      prodId: 2,
      img: '../../assets/P2.jpg',
      amt: 600,
      qnt: 1,
    },
    {
      prodId: 3,
      img: '../../assets/P3.jpg',
      amt: 800,
      qnt: 1,
    },
    {
      prodId: 4,
      img: '../../assets/P4.jpg',
      amt: 1000,
      qnt: 1,
    },
  ];

  ngOnInit(): void {}

  inc(prod: any) {
    if (prod.qnt != 5) {
      prod.qnt += 1;
    }
  }

  dec(prod: any) {
    if (prod.qnt != 1) {
      prod.qnt -= 1;
    }
  }

  itemsCart: any = [];
  addCart(category: any) {
    console.log(category);
    let cartDataNull = localStorage.getItem('localCart');
    if (cartDataNull == null) {
      let storeDataget: any = [];
      storeDataget.push(category);
      localStorage.setItem('localCart', JSON.stringify(storeDataget));
    } else {
      var id = category.prodId;
      let index: number = -1;
      this.itemsCart = JSON.parse(localStorage.getItem('localCart') || '{}');
      console.log(this.itemsCart);
      for (let i = 0; i < this.itemsCart.length; i++) {
        if (parseInt(id) === parseInt(this.itemsCart[i].prodId)) {
          this.itemsCart[i].qnt = category.qnt;
          index = i;
          break;
        }
      }
      if (index == -1) {
        this.itemsCart.push(category);
        localStorage.setItem('localCart', JSON.stringify(this.itemsCart));
      } else {
        localStorage.setItem('localCart', JSON.stringify(this.itemsCart));
      }
    }
    this.cartNumberFunc();
  }

  cartNumber: number = 0;
  cartNumberFunc() {
    var cartValue = JSON.parse(localStorage.getItem('localCart') || '{}');
    this.cartNumber = cartValue.length;
    this.auth.cartSubject.next(this.cartNumber);
    console.log(this.cartNumber);
  }
}
