import { OrderService } from './../../services/order/order.service';
import { FirebaseUserModel } from './../../models/user.model';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user/user.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Flower } from 'src/app/models/flower.modal';
import { NotificationService } from 'src/app/services/notification/notification.service';
import swal from 'sweetalert';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user: FirebaseUserModel = new FirebaseUserModel();
  profileForm: FormGroup;
  Flowers: Flower[] = [];
  Orders: Order[] = [];
  myOrders: Order[] = [];
  Ordernula: Order[] = [];
  email;
  arreglo:any=[];
  selection: Order[] = [];

  load = true;
  constructor(
    // tslint:disable-next-line:variable-name
    private _authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    // tslint:disable-next-line:variable-name
    private _userService: UserService,
    private fb: FormBuilder,
    private afs: AngularFirestore,
    // tslint:disable-next-line:variable-name
    private _orderService: OrderService,
    // tslint:disable-next-line:variable-name
    private _notificationsService: NotificationService
  ) {
    afs
      .collection('usuarios')
      .valueChanges()
      .subscribe((data: Flower[]) => {
        this.Flowers = data;
        const a = this.Flowers.find(u => {
          return u.email === this.user.email;
        });
        console.log('a: ', a);
        if (!a) {
          this.doLogout();
          swal(
            'Ops!',
            'No tienes permiso para acceder a este panel',
            'error'
          );
        }
      });
  }

  ngOnInit() {
   
    this.route.data.subscribe(routeData => {
      const data = routeData.data;
      if (data) {
        this.user = data;
        console.log(this.user);
        this.createForm(this.user.name);
      }
    });
    // this.getmyOrders();
    this.afs
      .collection('orders')
      .valueChanges()
      .subscribe((data: Order[]) => {
        // this.myOrders = this.Ordernula;
        // this.Orders = this.Ordernula;
        this.myOrders.length = 0;
        this.Orders.length = 0;
        this.Orders = data;

        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < this.Orders.length; i++) {
          if (this.Orders[i][3] === this.user.email) {
            this.myOrders = this.Ordernula;
            this.myOrders.push(this.Orders[i]);
          
          

            
    
                
              
             
            
            
          }
          
         
          
          
        }
       
        
        
        this.load = false;
        console.log('My order', this.myOrders);
      });
  }

  getmyOrders() {
    // tslint:disable-next-line:no-unused-expression
    this.myOrders = this.Ordernula;
    this.afs
      .collection('orders')
      .valueChanges()
      .subscribe((data: Order[]) => {
        this.Orders = data;
        // tslint:disable-next-line:prefer-for-of
        this.myOrders.length = 0;
        for (let i = 0; i < this.Orders.length; i++) {
          if (this.Orders[i][3] === this.user.email) {
            this.myOrders.push(this.Orders[i]);
          }
        }
        this.load = false;
        console.log('My order', this.myOrders);
      });
  }

  doLogout() {
    this._authService
      .doLogout()
      .then(data => {
        console.log('Exito');
        this.router.navigateByUrl('/login');
        window.location.reload();
      })
      .catch(err => {
        console.log(err);
      });
  }

  createForm(name) {
    this.profileForm = this.fb.group({
      name: [name, Validators.required]
    });
  }

  save(value) {
    this._userService.updateCurrentUser(value).then(
      res => {
        console.log('EXITO');
        console.log(res);
        window.location.href="/home";
      },
      err => console.log(err)
    );
  }
  orderAcepted(id, value, idNoti) {
    const obj = {
      confirmFlower: true,
      delivered: false,
      lat: value.lat,
      lng: value.lng
    };
    this._orderService.updateOrderAcepted(id, obj);

    const body = JSON.stringify({
      app_id: '8b6afc8b-af50-482a-8f8f-9c589caf50ac',
      data: { foo: 'bar' },
      headings: { en: 'Envio en proceso de la florería: ' + this.user.name },
      contents: { en: 'Numero guia: ' + id },
      include_player_ids: [idNoti]
    });
    this._notificationsService.sendNotification(body).subscribe(
      data => {
        console.log(data);
        // window.location.reload();
      },
      err => {
        console.log(err);
      }
    );
  }

  orderDelivered(id, value, idNoti) {

    console.log(id, value, idNoti);
    const obj = {
      confirmFlower: true,
      delivered: true,
      lat: value.lat,
      lng: value.lng
    };
    this._orderService.updateOrderDelivered(id, obj);

    const body = JSON.stringify({
      app_id: '8b6afc8b-af50-482a-8f8f-9c589caf50ac',
      data: { foo: 'bar' },
      headings: {
        en: '¡Orden Entregada!'
      },
      contents: {
        en: 'Hemos entregado tu compra, ¡Gracias por tu preferencia!'
      },
      include_player_ids: [idNoti]
    });
    this._notificationsService.sendNotification(body).subscribe(
      data => {
        console.log(data);
        // window.location.reload();
      },
      err => {
        console.log(err);
      }
    );
  }

  orderRechazed(idOrder, value: []) {
    console.log('el valor es' + value);
    const myarray = value;
    const array2 = [];
    myarray.forEach((element: Order) => {
      if (element.id === this.user.email) {
        console.log('No posible ', element);
      } else {
        array2.push(element);
      }
    });
    console.log('arrat', array2);
    const a = array2.reduce(
      (min, p) => (p.distance < min ? p.distance : min),
      array2[0].distance
    );
    console.log(a);
    array2.forEach(element => {
      if (element.distance === a && element.distance !== 0) {
        this.email = element.id;
        return;
      }
    });
    this._orderService.updateOrderRechazed(idOrder, array2, this.email);
  }
}
