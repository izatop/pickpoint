import {Messages} from './messages';

export module Response {
    export class Type<M extends Messages.Message> {
        message:M;
        constructor(message:M) {
            if (message.ErrorMessage) {
                throw new Error(message.ErrorMessage);
            }

            this.apply(message);
        }

        apply(message:M):void {
            this.message = message;
        }
    }

    export class Logout extends Type<Messages.LogoutMessage> {
        success:boolean;

        apply(message:Messages.LogoutMessage):void {
            this.success = message.Success;
        }
    }

    export class ParcelsRegistry extends Type<Messages.ParcelsRegistryMessage> {}

    export class ParcelsRegistryMulti extends Type<Messages.ParcelsRegistryMultiMessage> {}

    export class ReturnParcel extends Type<Messages.ReturnParcelMessage> {}

    export class ReturnInvoiceList extends Type<Messages.ReturnInvoiceListMessage> {}

    export class ParcelHistory extends Type<Messages.ParcelHistoryMessage> {}

    export class Parcel extends Type<Messages.ParcelMessage> {}

    export class ParcelDeliveryCost extends Type<Messages.ParcelDeliveryCostMessage> {}

    export class RegisteredCourier extends Type<Messages.RegisteredCourierMessage> {}

    export class CancelledCourier extends Type<Messages.CancelledCourierMessage> {}

    export class File extends Type<Messages.FileMessage> {}

    export class Registry extends Type<Messages.RegistryMessage> {}

    export class RegistryNumber extends Type<Messages.RegistryNumberMessage> {}

    export class CityList extends Type<Messages.CityListMessage> {}

    export class PostamatList extends Type<Messages.PostamatListMessage> {}

    export class Zones extends Type<Messages.ZonesMessage> {}

    export class ReturnDocuments extends Type<Messages.ReturnDocumentsMessage> {}

    export class Calculate extends Type<Messages.CalculateMessage> {}
}