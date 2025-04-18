import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID, Renderer2, RendererFactory2 } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class MytranslateService {
  private readonly _TranslateService=inject(TranslateService);
  private readonly _platId=inject(PLATFORM_ID);
  private readonly _Renderer2=inject(RendererFactory2).createRenderer(null,null); //creat instance mn render 2
  constructor() {

    if(isPlatformBrowser(this._platId))
    {
    //logic
    //1- get lang from local stroage
    let savedLang=localStorage.getItem('lang'); //return lang selected (ar,en)

    //2- set default lang
    this._TranslateService.setDefaultLang('en');

    //3- use lang el mawgoda fl storage

      this.setLang();

    //4-change dir (amaltohom gowa ba3d 3ahsn opt.)

    }


   }
   setLang():void{
    let savedLang=localStorage.getItem('lang');
    if(savedLang!==null)
      {
        this._TranslateService.use(savedLang!)
      }
    if(savedLang==='en') //dir ltr
    {
      // document.documentElement.dir='ltr'; msh sah net3amel m3ah direct
      this._Renderer2.setAttribute(document.documentElement,'dir','ltr');
      this._Renderer2.setAttribute(document.documentElement,'lang','en');

    }
    else if(savedLang==='ar') //dir rtl
    {
      this._Renderer2.setAttribute(document.documentElement,'dir','rtl');
      this._Renderer2.setAttribute(document.documentElement,'lang','ar');

    }
   }
   changeLang(lang:string):void{
    if(isPlatformBrowser(this._platId))
    {
      localStorage.setItem('lang',lang);
      this.setLang();

    }

   }
}
