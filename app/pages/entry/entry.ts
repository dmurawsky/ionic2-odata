import {Component} from "@angular/core";
import {NavController,NavParams} from 'ionic-angular';
import { ODataService, ODataServiceFactory } from "../../providers/odata/index";
import { XmlParse } from '../../providers/xml-parse/xml-parse';

@Component({
  templateUrl: 'build/pages/entry/entry.html',
  providers: [XmlParse]
})
export class EntryPage {
  entry:any;
  output:any;
  private odata: ODataService<any>;
  constructor(private nav: NavController,private navParams: NavParams,private odataFactory: ODataServiceFactory, private parser: XmlParse) {
    this.entry = navParams.get('entry');
    this.odata = this.odataFactory.CreateService<any>(this.entry);
    this.getStuff();
  }

  getStuff(){
    this.odata
      .Query().Exec()
      .subscribe(
        entries => {
          this.output = this.parser.xmlParse(entries);
        },
        error => {
          console.log('error');
        }
      );
  }
  
  title(val) {
    if(val){
      return val.entry.title["#text"];
    }else{
      return null;
    }
  }
  
  hack(val) {
    if(val){
      if(val.entry.summary) return val.entry.summary["#text"];
    }else{
      return null;
    }
  }
}
