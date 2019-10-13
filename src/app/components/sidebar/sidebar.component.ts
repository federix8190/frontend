import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { SidebarService } from './sidebar.service';
import * as $ from 'jquery';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  animations: [
    trigger('slide', [
      state('up', style({ height: 0 })),
      state('down', style({ height: '*' })),
      transition('up <=> down', animate(200))
    ])
  ]
})
export class SidebarComponent implements OnInit {

    menus = [];
    stateMenu:any = true;
    ruta = '';
  
    constructor(public router:Router, public sidebarservice: SidebarService) {

        this.menus = sidebarservice.getMenuList();
        this.ruta = router.url;
    }

    ngOnInit() {
    }

    toggleSidebar() {
        this.stateMenu=this.sidebarservice.getSidebarState();
        this.sidebarservice.setSidebarState(!this.sidebarservice.getSidebarState());
    }

    toggleBackgroundImage() {
        this.sidebarservice.hasBackgroundImage = !this.sidebarservice.hasBackgroundImage;
    }

    getSideBarState() {
        return this.sidebarservice.getSidebarState();
    }

    hideSidebar() {
        this.sidebarservice.setSidebarState(true);
    }

    toggle(currentMenu) {
        if (currentMenu.type === 'dropdown') {
            this.menus.forEach(element => {
            if (element === currentMenu) {
                currentMenu.active = !currentMenu.active;
            } else {
                element.active = false;
            }
          });
        }
    }

  stateLayout(state){
      if (state) {
          $('.footer-content').attr('style','padding-left:260px');
          $('.page-content').attr('style','height:calc(100vh - 231px)');  
      } else {
          $('.footer-content').attr('style','padding-left:70px');
          $('.page-content').attr('style','height:calc(100vh - 249px)'); 
      }
  }
  
    hasToggled() {
        return !$( "#mydiv" ).hasClass( "toggled" );
    }

    getState(currentMenu) {
        if (currentMenu.active) {
          return 'down';
        } else {
          return 'up';
        }
    }

    hasBackgroundImage() {
        return this.sidebarservice.hasBackgroundImage;
    }

}
