import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { ContactDataProvider,Contact } from '../../providers/contact-data/contact-data' ;
import { ContactDetailPage } from '../contact-detail/contact-detail' ;

/**
 * Generated class for the ContactsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-contacts',
  templateUrl: 'contacts.html',
})
export class ContactsPage {
  contacts: Contact[] ;
  picture: string ;

  constructor(public navCtrl: NavController, 
  			  public navParams: NavParams,
  			  public contactData: ContactDataProvider) {
  	this.contactData.loadContacts()
  	 				.subscribe(data => { this.contacts = data ;
                                 console.dir(this.contacts) ;}) ;
    console.log('Constructor > Contacts') ;
  }

  showContact(contactDetail: Contact){
  	this.navCtrl.push(ContactDetailPage,{contact: contactDetail}) ;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactsPage');
  }

}
