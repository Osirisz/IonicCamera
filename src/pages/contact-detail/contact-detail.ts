import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';

import { ContactDataProvider, Contact } from '../../providers/contact-data/contact-data' ;

import { ContactEditPage } from '../contact-edit/contact-edit' ;
import { CallNumber } from '@ionic-native/call-number';
/**
 * Generated class for the ContactDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-contact-detail',
  templateUrl: 'contact-detail.html',
})
export class ContactDetailPage {
  contactDetail: Contact ;
  picture: string ;

  constructor(public navCtrl: NavController, 
  	          public navParams: NavParams,
  	          public contactData: ContactDataProvider,
              public alertCtrl: AlertController,
              private callNumber: CallNumber ) {
  	this.contactDetail=this.navParams.get('contact') ;
    this.picture=this.contactData.getContactUrl()+'contacts/img/'+this.contactDetail.firstname.toLowerCase()+'.jpeg' ;
  }
  callPhone(contact: Contact){
    this.callNumber.callNumber(contact.phone, true)
      .then(() => console.log('Launched dialer!'))
      .catch(() => console.log('Error launching dialer'));
    let callTime: Date = new Date();
    this.contactData.addRecentCall({
      firstname: contact.firstname,
      lastname: contact.lastname,
      phone: contact.phone,
      time: callTime.toTimeString().substr(0, 5)
    });
    this.navCtrl.pop();
    // let call = this.alertCtrl.create({
    //     title: 'Call?',
    //     message: contact.firstname+' '+contact.phone,
    //     buttons: [{text:'Call', handler: () => { 
    //                 this.contactData.addRecentCall({firstname:contact.firstname,
    //                                                 lastname:contact.lastname,
    //                                                 phone:contact.phone,
    //                                                 time: callTime.toTimeString().substr(0,5)}) ;
    //                 this.navCtrl.pop() ;
    //               } },
    //               {text: 'Cancel', handler: () => {console.log('Cancel calling.') ;}}]
    // });
    // call.present() ;
  }

  editContact(){
    this.navCtrl.push(ContactEditPage,{contact:this.contactDetail}) ;
  }

  addFavorite(favContact: Contact){
    this.contactData.addFavorite({firstname:favContact.firstname,
                                  lastname:favContact.lastname,
                                  phone:favContact.phone,
                                  time:''}) ;
    this.navCtrl.pop() ;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactDetailPage');
  }

}
