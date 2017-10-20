import { Component } from '@angular/core';
import { NavController, NavParams,  AlertController } from 'ionic-angular';

import { ContactDataProvider, Contact } from '../../providers/contact-data/contact-data' ;

import { FormBuilder, FormGroup, Validators } from  '@angular/forms' ;
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ActionSheetController } from 'ionic-angular';
/**
 * Generated class for the ContactEditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-contact-edit',
  templateUrl: 'contact-edit.html',
})
export class ContactEditPage {

  contactDetail: Contact ;
  picture: string ;

  contactForm : FormGroup ;

  constructor(public navCtrl: NavController, 
  	          public navParams: NavParams, 
  	          public contactData: ContactDataProvider,
  	          public formBuilder: FormBuilder,
              public alertCtrl: AlertController, private camera: Camera, public actionSheetCtrl: ActionSheetController) {
  	this.contactDetail = this.navParams.get('contact') ;
  	this.picture=this.contactData.getContactUrl()+'contacts/img/'+this.contactDetail.firstname.toLowerCase()+'.jpeg' ;
  	this.contactForm = this.formBuilder.group({
  		prefix: [this.contactDetail.prefix],
  		firstname: [this.contactDetail.firstname,Validators.required],
  		lastname: [this.contactDetail.lastname,Validators.required],
  		email: [this.contactDetail.email,Validators.compose([Validators.required,Validators.email])],
  		phone: [this.contactDetail.phone,Validators.compose([Validators.required,Validators.pattern('^[0-9-]*')])]
    })
  }

  validate(): boolean {

  	let errorMsg : string ;

  	if (this.contactForm.valid){
  		return true ;
  	}

  	let control = this.contactForm.controls['firstname'] ;
  	if (control.invalid){
  		if (control.errors['required']){
  			errorMsg = 'Please provide a firstname.' ;
  		} 
  	}

  	let alert = this.alertCtrl.create({
      title: 'Error!',
      subTitle: errorMsg || 'Empty error message!',
      buttons: ['OK']
    });
    // show alert with error message
    alert.present();

    return false ;  	
  }

  saveContact() {
  	if(this.validate()){
  		this.contactDetail = this.contactForm.value ;
  		this.navCtrl.pop() ;
	  }
  }

  presentActionSheet() {
    const actionSheet = this.actionSheetCtrl.create({
      buttons: [
        {
          text: 'Take Photo',
          handler: () => {
            const options: CameraOptions = {
              quality: 100,
              destinationType: this.camera.DestinationType.DATA_URL,
              encodingType: this.camera.EncodingType.JPEG,
              mediaType: this.camera.MediaType.PICTURE
            }

            this.camera.getPicture(options).then((imageData) => {
              // imageData is either a base64 encoded string or a file URI
              // If it's base64:
              let picture = 'data:image/jpeg;base64,' + imageData;
            }, (err) => {
              // Handle error
            });
          }
        },
        {
          text: 'Choose Photo',
          handler: () => {
            console.log('Archive clicked');
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });

    actionSheet.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactEditPage');
  }

}
