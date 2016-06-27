import { Injectable } from '@angular/core';
import { RequestOptions, Headers } from '@angular/http';


@Injectable()
export class ODataConfiguration{
    baseUrl:string  = "http://services.odata.org/V3/OData/OData.svc";
    
    handleError(err:any, caught:any):void{
        console.warn("OData error: ", err,caught);
    };
    
    get requestOptions(): RequestOptions{
        let headers = new Headers({ 'Content-Type': 'application/xml' });
        return new RequestOptions({ headers: headers });
    };
 }