import { Component, inject } from '@angular/core';
import { TranslateService} from '@ngx-translate/core';
import { CommonService } from 'src/services/common.service';

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.scss']
})
export class TopMenuComponent {
  private _commonService = inject(CommonService);
  private _translate = inject(TranslateService);
  isDarkTheme:boolean=false;
  languageList: any;
  selectedLang: any = this._commonService.getLocalLanguage() != null ? this._commonService.getLocalLanguage()! : 'en';

 
  constructor(){
    this._commonService.getChangeEvent().subscribe(() => {
      this.languageList = this._commonService.getLanguage();
      this.selectedLang = this._commonService.getLocalLanguage() != null ? this._commonService.getLocalLanguage()! : 'en';
    })
  }

  ngOnInit() {
    this.languageList = this._commonService.getLanguage();
    this.selectedLang = this._commonService.getLocalLanguage() != null ? this._commonService.getLocalLanguage()! : 'en';
    this._translate.setDefaultLang(this.selectedLang);
    this.currentTheme();
  }

  onChange(event: any) {
    this.selectedLang = event?.value;
    this._commonService.setLocalLanguage(event?.value);
    this._translate.setDefaultLang(event?.value);
  }

  currentTheme(){
    let currentTheme = localStorage.getItem('THEME') || 'light';

    this.isDarkTheme = currentTheme == 'dark';
    document.documentElement.setAttribute('data-theme',currentTheme)
  }

  changeTheme(){
    let theme = localStorage.getItem('THEME') || 'light';
    if(theme == 'dark'){
      this.isDarkTheme = false;
      localStorage.setItem('THEME','light')
      document.documentElement.setAttribute('data-theme','light')
    }else{
      this.isDarkTheme = true;
      localStorage.setItem('THEME','dark')
      document.documentElement.setAttribute('data-theme','dark')
    }
  }

}
