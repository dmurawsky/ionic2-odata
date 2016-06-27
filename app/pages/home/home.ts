import {Component} from "@angular/core";
import {NavController} from 'ionic-angular';
import { ODataService, ODataServiceFactory } from "../../providers/odata/index";
import { XmlParse } from '../../providers/xml-parse/xml-parse';
import {CollectionPage} from '../collection/collection';

@Component({
  templateUrl: 'build/pages/home/home.html',
  providers: [XmlParse]
})
export class HomePage {
  collections: any;
  private odata: ODataService<any>;
  constructor(private nav: NavController,private odataFactory: ODataServiceFactory, private parser: XmlParse) {
    this.odata = this.odataFactory.CreateService<any>("");
    this.getStuff();
  }

  getStuff(){
    this.odata
      .Query().Exec()
      .subscribe(
        collections => {
          this.collections = this.parser.xmlParse(collections);
        },
        error => {
          console.log('error');
        }
      );
  }

  openPage(collection){
    this.nav.push(CollectionPage, {
      collection: collection["@attributes"]["href"]
    });
  }
  
  title(val) {
    if(val){
      return val.service.workspace["atom:title"]["#text"];
    }else{
      return null;
    }
  }
  
  hack(val) {
    if(val){
      return val.service.workspace.collection;
    }else{
      return null;
    }
  }
}
