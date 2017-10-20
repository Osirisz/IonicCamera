import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { ContactDataProvider,ContactCall } from '../../providers/contact-data/contact-data' ;

/**
 * Generated class for the FavoritesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-favorites',
  templateUrl: 'favorites.html',
})
export class FavoritesPage {
  favorites: ContactCall[] ;
  constructor(public navCtrl: NavController, 
  			  public navParams: NavParams,
  			  public contactData: ContactDataProvider) {
  	this.favorites = this.contactData.getFavorites() ;
    console.log('Constructor > Favorites') ;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FavoritesPage');
  }

}
