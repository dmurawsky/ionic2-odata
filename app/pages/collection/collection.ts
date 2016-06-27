import {Component} from "@angular/core";
import {NavController,NavParams} from 'ionic-angular';
import { ODataService, ODataServiceFactory } from "../../providers/odata/index";
import { XmlParse } from '../../providers/xml-parse/xml-parse';
import {EntryPage} from '../entry/entry';

@Component({
  templateUrl: 'build/pages/collection/collection.html',
  providers: [XmlParse]
})
export class CollectionPage {
  collection:any;
  output:any;
  private odata: ODataService<any>;
  constructor(private nav:NavController, private navParams:NavParams ,private odataFactory: ODataServiceFactory, private parser: XmlParse) {
    this.nav = nav;
    this.collection = navParams.get('collection');
    this.odata = this.odataFactory.CreateService<any>(this.collection);
    this.getStuff();
  }

  getStuff(){
    this.odata
      .Query().Exec()
      .subscribe(
        collections => {
          this.output = this.parser.xmlParse(collections);
        },
        error => {
          console.log('error');
        }
      );
  }

  openPage(entry){
    this.nav.push(EntryPage, {
      entry: entry.link[0]["@attributes"]["href"]
    });
  }
  
  title(val) {
    if(val){
      return val.feed.title["#text"];
    }else{
      return null;
    }
  }
  
  hack(val) {
    if(val){
      return val.feed.entry;
    }else{
      return null;
    }
  }
}
