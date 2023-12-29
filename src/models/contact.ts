export interface Contact {
  emailaddress: string;
  phonenumber: string;
  address:string;
  sociallinks:{
    fb_link: string;
    fb_icon_name:string;
    twitter_icon_name:string;
    instagram_icon_name:string;
    whatsapp_icon_name:string;
    twitter_link:string;
    whatsapp_link:string;
    instagram_link: string;
  }
}

export interface ContactForm {
  name:string;
  email:string;
  subject:string;
  message:string;
}
