import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { ContactDataProvider,ContactCall } from '../../providers/contact-data/contact-data' ;

/**
 * Generated class for the RecentsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-recents',
  templateUrl: 'recents.html',
})
export class RecentsPage {
  recents: ContactCall[] = [] ; 
  constructor(public navCtrl: NavController, 
  			  public navParams: NavParams,
  			  public contactData: ContactDataProvider) {
  	this.recents=this.contactData.getRecentCalls();
  	console.log('Constructor > Recents') ;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RecentsPage');
  }

}
