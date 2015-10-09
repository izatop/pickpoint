export module Request {
    export interface Request {
        SessionId:string;
    }

    export interface ParcelsRegistry extends Request {
        Sendings:{
            EDTN:string;
            IKN:string;
            Invoice:{
                SenderCode:string;
                BarCode:string;
                GCBarCode:string;
                Description:string;
                RecipientName:string;
                PostamatNumber:string;
                MobilePhone:string;
                Email:string;
                PostageType:number;
                GettingType:number;
                PayType:number;
                Sum:number;
                InsuareValue:number;
                Width:number;
                Height:number;
                Depth:number;
            };
            ClientReturnAddress:{
                CityName:string;
                RegionName:string;
                Address:string;
                FIO:string;
                PostCode:number;
                Organisation?:string;
                PhoneNumber:string;
                Comment:string;
            };
            UnclaimedReturnAddress:{
                CityName:string;
                RegionName:string;
                Address:string;
                FIO:string;
                PostCode:string;
                Organisation?:string;
                PhoneNumber:string;
                Comment:string;
            };
            SubEncloses:{
                Line:number;
                ProductCode:string;
                GoodsCode:string;
                Name:string;
                Price:number;
            }[];
        }[];
    }

    export interface ParcelsRegistryMulti extends Request {
        Sendings:{
            EDTN:string;
            IKN:string;
            Invoice:{
                SenderCode:string;
                BarCode:string;
                GCBarCode:string;
                Description:string;
                RecipientName:string;
                PostamatNumber:string;
                MobilePhone:string;
                Email:string;
                PostageType:number;
                GettingType:number;
                PayType:number;
                Sum:number;
                InsuareValue:number;
            };
            ClientReturnAddress:{
                CityName:string;
                RegionName:string;
                Address:string;
                FIO:string;
                PostCode:number;
                Organisation?:string;
                PhoneNumber:string;
                Comment:string;
            };
            UnclaimedReturnAddress:{
                CityName:string;
                RegionName:string;
                Address:string;
                FIO:string;
                PostCode:string;
                Organisation?:string;
                PhoneNumber:string;
                Comment:string;
            };
            Places:{
                BarCode:string;
                gcBarCode:string;
                Width:string;
                Height:string;
                Depth:string;
                SubEncloses?:{
                    Line:number;
                    ProductCode:string;
                    GoodsCode:string;
                    Name:string;
                    Price:number;
                }[];
            }[];
        }[];
    }

    export interface ReturnParcel extends Request {
        InvoiceNumber:string;
    }

    export interface ReturnParcel extends Request {
        GCInvoiceNumber:string;
    }

    export interface ReturnInvoiceList extends Request {
        DateFrom:string;
        DateTo:string;
    }

    export interface ParcelInvoiceHistory extends Request {
        InvoiceNumber:string;
    }

    export interface ParcelInvoiceHistory extends Request {
        SenderInvoiceNumber:string;
    }

    export interface ParcelInvoice extends Request {
        InvoiceNumber:string;
    }

    export interface ParcelInvoice extends Request {
        SenderInvoiceNumber:string;
    }

    export interface ParcelDeliveryCost extends Request {
        Sendings:{
            InvoiceNumber?:string;
            SenderInvoiceNumber?:string;
        }[];
    }

    export interface CallCourier extends Request {
        IKN:string;
        SenderCode:string;
        City:string;
        City_id?:number;
        City_owner_id?:number;
        Address:number;
        FIO:string;
        Phone:string;
        Date:string;
        TimeStart:string;
        TimeEnd:string;
        Number:string;
        Weight:string;
        Comment:string;
    }

    export interface CancelCourier extends Request {
        OrderNumber:string;
    }

    export interface CreateRegistry extends Request {
        CityName:string;
        RegionName:string;
        Invoices:Array<string>;
    }

    export interface Registry extends Request {
        InvoiceNumber:string;
        ReestrNumber:string;
    }

    export interface CretaeLabels extends Request {
        Invoices:Array<string>;
    }

    export interface ZonesQuery extends Request {
        FromCity:string;
        ToPT?:string;
    }

    export interface ReturnInvoices extends Request {
        Invoices:Array<string>;
    }

    export interface MoneybackDocument extends Request {
        IKN:string;
        DocumentNumber:string;
        DateFrom:string;
        DateEnd:string;
    }

    export interface CalculateQuery extends Request {
        IKN:string;
        InvoiceNumber?:string;
        FromCity:string;
        FromRegion:string;
        PTNumber:string;
        EncloseCount?:number;
        Length:number;
        Depth:number;
        Width:number;
        Weight?:number;
    }
}
