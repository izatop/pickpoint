/// <reference path="../../typings/tsd.d.ts" />

export module Messages {
    export interface Message {
        ErrorCode?:string;
        ErrorMessage?:string;
    }

    export interface LogoutMessage extends Message {
        Success?:boolean;
    }

    export interface CityListMessage extends Message {
        [index:number]:{
            Id:number;
            Owner_Id:number;
            Name:string;
            RegionName:string;
        }
    }

    interface ParcelResultMessage {
        EDTN:string;
        InvoiceNumber?:string;
        Barcode?:string;
    }

    export interface ParcelsRegistryMessage extends Message {
        CreatedSendings:ParcelResultMessage[];
        RejectedSendings:ParcelResultMessage[];
    }

    interface ParcelMultiResultMessage extends Message {
        EDTN:string;
        InvoiceNumber?:string;
        Places?:{
            gcBarCode:string;
            Barcode:string;
        }[];
    }

    export interface ParcelsRegistryMultiMessage extends Message {
        CreatedSendings:ParcelMultiResultMessage[];
        RejectedSendings:ParcelMultiResultMessage[];
    }

    export interface ReturnParcelMessage extends Message {
        [index:number]: {
            Error?:string;
            ReturnCode:string;
        }[];
    }

    interface ReturnInvoiceMessage {
        InvoiceNumber:string;
        Barcode:string;
        ConsultantNumber:string;
        DateOfCreate:string;
        PhoneNumber:string;
        ReturnReason:string;
    }

    interface ReturnInvoiceMessage {
        SenderInvoiceNumber:string;
    }

    export interface ReturnInvoiceListMessage extends Message {
        SendingsInfo:ReturnInvoiceMessage[];
        Error:string;
    }

    export interface ParcelHistoryMessage extends Message {
        [index:number]:{
            State:string;
            ChangeDT:string;
            StateMessage:string;
        }
    }

    export interface ParcelMessage extends Message {
        [index:number]:{
            InvoiceNumber?:string;
            SenderInvoiceNumber?:string;
            Sum:number;
            CreateDate:string;
            FIO:string;
            StorageDate:string;
            Prolonged:boolean;
            Barcodes:{
                [index:number]:string;
            };
            RefundInfo?:{
                RefundDate:string;
                RefundNumber:string;
                PaymentNumber:string;
                Sum:number;
                AgencyFee:number;
            };
            ReturnInfo?:{
                ReturnDocumentDate:string;
                ReturnDocumentNumber:string;
                ReturnInvoiceNumber:string;
                ReturnDeliveryDate:string;
                ReturnFromCity:string;
                ReturnAddress:string;
            };
            ClientReturnAddress:{
                CityName:string;
                RegionName:string;
                Address:string;
                FIO:string;
                PostCode:string;
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
            ChequeNumber:string;
            PayType:string;
        }
    }

    export interface ParcelDeliveryCostMessage extends Message {
        [index:number]:{
            InvoiceNumber:string;
            SenderInvoiceNumber:string;
            NDS:number;
            Tariff:number;
        };
    }

    export interface RegisteredCourierMessage extends Message {
        CourierRequestRegistred:boolean;
        OrderNumber:string;
    }

    export interface CancelledCourierMessage extends Message {
        OrderNumber:string;
        Canceled:boolean;
    }

    export interface FileMessage extends Message {
        buffer:Buffer;
    }

    export interface FileMessage extends Message {
        error:string;
    }

    export interface RegistryMessage extends Message {
        Numbers:Array<string>;
    }

    export interface RegistryNumberMessage extends Message {
        Number:string;
    }

    export interface PostamatListMessage extends Message {
        [index:number]:{
            Id:number;
            OwnerId:number;
            CitiId:number;
            CitiOwnerId:number;
            CitiName:string;
            Region:string;
            CountryName:string;
            Number:string;
            Metro:string;
            IndoorPlace:string;
            Address:string;
            House:string;
            PostCode:number;
            Name:string;
            WorkTime:string;
            Latitude:number;
            Longitude:number;
            Status:string;
            TypeTitle:string;
            Cash:number;
            Card:number;
            InDescription:string;
            OutDescription:string;
            MaxSize:string;
            MaxWeight:string;
            WorkHourly:boolean;
            Opening:boolean;
            Returning:boolean;
            Fitting:boolean;
            LocationType:number;
        }
    }

    export interface ZonesMessage extends Message {
        Zones:{
            FromCity:string;
            ToCity:string;
            ToPT:string;
            Zone:string;
            DeliveryMin:string;
            DeliveryMax:string;
            Koeff:number;
        }[];
        Error:string;
    }

    export interface ReturnDocumentsMessage extends Message {
        SessionId:string;
        ReturnInvoices:{
            InvoiceNumber:string;
            ReturnInvoiceNumber:number;
            ReturnDocumentNumber:number;
            ReturnBarcodes:Array<string>;
        }[];
    }

    export interface MoneybackMessage extends Message {
        [index:number]:{
            DocumentNumber:string;
            Date:string;
            PayOrderNumber:string;
            Invoices:{
                InvoiceNumber:string;
                GCInvoiceNumber:string;
                NPSum:number;
                RetSum:number;
                Encloses:{
                    Barcode:string;
                    GCBarcode:string;
                }[];
            }[];
            TotalNPSum:number;
            TotalRetSum:number;
            Error:string;
        }
    }

    export interface CalculateMessage extends Message {
        SessionId: string;
        Services: {
            Name: string;
            Tariff: number;
            NDS: number;
        }[];
    }
}