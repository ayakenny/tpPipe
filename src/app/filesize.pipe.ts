import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filesize'
})
export class FilesizePipe implements PipeTransform {

  transform(value: any, format?: string): any {

    // Définition des différentes valeurs utilisées et leur valeur entière calculée
    let sizeKo = 1024;
    let sizeMo = 1024 * 1024;
    let sizeGo = 1024 * 1024 * 1024;
    let sizeO = 0;
    let o = ((value % sizeGo)%sizeMo)%sizeKo;
    let ko = Math.trunc(((value % sizeGo)%sizeMo)/sizeKo);
    let mo = Math.trunc((value%sizeGo)/sizeMo);
    let go = Math.trunc(value/sizeGo);

    // Pour le format 'complet'
    if(format=='allDisplay' && format) {
      return (
        (go > 0 ? go + ' Go ' : '')+
        (mo > 0 ? mo + ' Mo ' : '')+
        (ko > 0 ? ko + ' Ko ' : '')+
        o + ' o '
      );
    }

    // Pour chaque unité 'Go', 'Mo', 'Ko', 'o'
    if(format && format.toLocaleLowerCase() == 'go'){
      return go + ' Go ';
    }

    if(format && format.toLocaleLowerCase() == 'mo'){
      return Math.trunc(value / sizeMo)+' Mo ';
    }

    if(format && format.toLocaleLowerCase() == 'ko'){
      return Math.trunc(value / sizeKo)+' Ko ';
    }

    if(format && format.toLocaleLowerCase() == 'o'){
      return value+' o ';
    }

    if(go > 0){
      return go+' Go ';
    }

    if(mo > 0){
      return mo+' Mo ';
    }

    if(ko > 0){
      return ko+' Ko ';
    }

    return 0+' 0 ';
  }
}