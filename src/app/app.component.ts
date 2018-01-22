import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';

import { Socket } from 'ng-socket-io';
import { LocalNotifications } from '@ionic-native/local-notifications';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;
 
  constructor(private localNotifications: LocalNotifications,private socket: Socket,platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
    this.socket.on('notification', (data) => {
      
      console.log(data.data );
      this.localNotifications.schedule([ { 
        at: new Date(new Date().getTime() + 3600),
        title: data.data.title,
        text: data.data.body,
        icon:'https://www.cryptopia.co.nz/Content/Images/Coins/'+data.data.symbol+'-large.png'
     }]);
    });
  }
}

