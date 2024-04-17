import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PrimeConfig } from '../prime.config';
import { PageHeaders } from '../Models/PageHeaders';
import { Pages } from '../Models/Pages';

@Component({
  selector: 'app-common-layout',
  standalone: true,
  imports: [RouterOutlet, CommonModule, PrimeConfig],
  templateUrl: './common-layout.component.html',
  styleUrl: './common-layout.component.scss'
})
export class CommonLayoutComponent {

  constructor(
    private renderer: Renderer2,
    private router: Router,
    private elementRef: ElementRef
  ) { }


  mainMenues: PageHeaders[] = [];
  subMenues: Pages[] = [];

  mainTitle: string = "";
  username: string = ''

  isShownMenu : boolean = false;

  ngAfterViewInit(): void {
    this.username = 'Gayan';
    //this.username = sessionStorage.getItem("userName")!;
  }

  ngOnInit() {
    var demoSubMenu: Pages[] = []
    demoSubMenu.push({
      pageName: "Sub menu 1",
      path: "",
      class: "",
      fontsize: "",
      selected: false
    }, {
      pageName: "Sub menu 2",
      path: "",
      class: "",
      fontsize: "",
      selected: false
    }, {
      pageName: "Sub menu 3",
      path: "",
      class: "",
      fontsize: "",
      selected: false
    })

    var demoSubMenu2: Pages[] = []
    demoSubMenu2.push({
      pageName: "Sub menu 1",
      path: "",
      class: "",
      fontsize: "",
      selected: false
    }, {
      pageName: "Sub menu 2",
      path: "",
      class: "",
      fontsize: "",
      selected: false
    }, {
      pageName: "Sub menu 3",
      path: "",
      class: "",
      fontsize: "",
      selected: false
    })

    this.mainMenues.push({
      pageName: "Home",
      pages: demoSubMenu,
      expanded: true,
      icon: 'pi pi-home'
    }, {
      pageName: "Booking",
      pages: demoSubMenu2,
      expanded: true,
      icon: 'pi pi-key'
    }, {
      pageName: "Payment",
      pages: demoSubMenu2,
      expanded: true,
      icon: 'pi pi-dollar'
    }, {
      pageName: "Users",
      pages: demoSubMenu2,
      expanded: true,
      icon: 'pi pi-user'
    }, {
      pageName: "References",
      pages: demoSubMenu2,
      expanded: true,
      icon: 'pi pi-tags'
    }, {
      pageName: "Reports",
      pages: demoSubMenu2,
      expanded: true,
      icon: 'pi pi-server'
    })
    this.mainTitle = this.mainMenues[0].pageName + " | " + this.mainMenues[0].pages![0].pageName
  };


  showHideMenu() {
    const menu = this.elementRef.nativeElement.querySelector('.nav-bar-container');
    const body = this.elementRef.nativeElement.querySelector('.body-layout');
    if(!this.isShownMenu){
      menu.style.marginLeft = '0em';
      body.style.width = `calc(100vw - 11em)`;
      this.isShownMenu = true;
    }else{
      menu.style.marginLeft = '-11em';
      body.style.width = `calc(100vw)`;
      this.isShownMenu = false;
    }

  }

  goToPage(pageIndex: number, headerIndex: number) {
    this.mainTitle = this.mainMenues[headerIndex].pageName + " | " + this.mainMenues[headerIndex].pages![pageIndex].pageName;
    this.mainMenues[headerIndex].pages![pageIndex].selected = true;
    this.mainMenues[headerIndex].pages!.forEach((submenu, index) => {
      if(index!==pageIndex){
        submenu.selected = false;
      }
    });

    // Set other mainMenu's pages' selected to false
    this.mainMenues.forEach((menu, index) => {
      if (index !== headerIndex) {
        menu.pages!.forEach(submenu => {
          submenu.selected = false;
        });
      }
    });
  }
}
