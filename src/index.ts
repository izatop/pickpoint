/// <reference path="./request.ts" />

import {Client} from './request';
import * as DataType from './datatype';

interface Credentials {
    login:string;
    password:string;
}

export default class API {
    client:Client;
    credentials:Credentials;
    session:string;

    constructor(login:string, password:string, options:any = {}) {
        this.client = new Client();
        this.credentials = {login, password};
        this.client.setSessionHandler(() => { return this.login() });
    }

    /**
     * Команда предназначена для начала сеанса работы. В запросе отправляемся логин и пароль,
     * в случае правильности, возвращается уникальный номер сессии, который действителен в течении установленного времени.
     * Вся дальнейшая работа ведется на основании номера сессии.
     *
     * @returns {Promise<string>}
     */
    private login():Promise<string> {
        return new Promise((resolve, reject) => {
            if (this.session) {
                resolve(this.session);
            } else {
                this.client.call<{ErrorMessage?:string, SessionId?:string}>({
                    method: 'POST',
                    url: 'login',
                    data: {
                        Login: this.credentials.login,
                        Password: this.credentials.password
                    }
                })
                .then(result => {
                    if (result.ErrorMessage) {
                        reject(new Error(result.ErrorMessage));
                    } else if (result.SessionId) {
                        this.session = result.SessionId;
                        resolve(result.SessionId);
                    } else {
                        reject(new Error("Unknown error"));
                    }
                })
                .catch(error => reject(error));
            }
        });
    }

    /**
     * Команда предназначена для завершения сеанса работы.
     * В запросе отправляется идентификатор сессии. В ответ возвращается признак успешности выполнения.
     *
     * @returns {Promise<T>}
     */
    logout():Promise<DataType.Response.Logout> {
        return this.client.post(DataType.Response.Logout, 'logout');
    }

    /**
     * Команда предназначена для регистрации отправлений. На вход принимается структура,
     * содержащая номер сессии и список описаний отправлений, которые требуется зарегистрировать.
     *
     * Внимание! В случае если вид отправления (наложенное/предоплаченное) не соответствует значению в поле Sum,
     * приоритет отдается значению в Sum. То есть, если указана не нулевая положительная сумма, отправление будет
     * зарегистрировано как наложенных платеж и наоборот.
     *
     * @param parameters
     * @returns {Promise<T>}
     */
    createParcelsRegistry(parameters:DataType.Request.ParcelsRegistry):Promise<DataType.Response.ParcelsRegistry> {
        return this.client.post(DataType.Response.ParcelsRegistry, 'createsending', parameters);
    }

    /**
     * Команда предназначена для регистрации отправлений. На вход принимается структура,
     * содержащая номер сессии и список описаний отправлений, которые требуется зарегистрировать.
     *
     * Внимание! В случае если вид отправления (наложенное/предоплаченное) не соответствует значению в поле Sum,
     * приоритет отдается значению в Sum. То есть, если указана не нулевая положительная сумма, отправление будет
     * зарегистрировано как наложенных платеж и наоборот.
     *
     * @param parameters
     * @returns {Promise<T>}
     */
    createParcelsRegistryMulti(parameters:DataType.Request.ParcelsRegistryMulti):Promise<DataType.Response.ParcelsRegistryMulti> {
        return this.client.post(DataType.Response.ParcelsRegistryMulti, 'CreateShipment', parameters);
    }

    /**
     * Команда предназначена для создания отправления клиентского возврата на основе обычного отправления.
     *
     * @param parameters
     * @returns {Promise<T>}
     */
    createParcelReturn(parameters:DataType.Request.ReturnParcel):Promise<DataType.Response.ReturnParcel> {
        return this.client.post(DataType.Response.ReturnParcel, 'makereturn', parameters);
    }

    /**
     * Команда предназначена для получения списка возвратных отправлений, которые ранее не проходили через PickPoint.
     * В запросе отправляется идентификатор сессии и интервал дат, за которые необходимо получить список.
     * В ответ возвращается список отправлений с параметрами, либо ошибка.
     *
     * @param parameters
     * @returns {Promise<T>}
     */
    getReturnInvoiceList(parameters:DataType.Request.ReturnInvoiceList):Promise<DataType.Response.ReturnInvoiceList> {
        return this.client.post(DataType.Response.ReturnInvoiceList, 'getreturninvoiceslist', parameters);
    }

    /**
     * Команда предназначена для получения истории изменения статуса отправления. В запросе отправляется идентификатор
     * сессии и номер отправления. В ответ возвращается история статусов отправления.
     *
     * @param parameters
     * @returns {Promise<T>}
     */
    getParcelHistory(parameters:DataType.Request.ParcelInvoiceHistory):Promise<DataType.Response.ParcelHistory> {
        return this.client.post(DataType.Response.ParcelHistory, 'tracksending', parameters);
    }

    /**
     * Команда предназначена для получения информации по отправлению отправления. В запросе отправляется идентификатор
     * сессии и номер отправления. В ответ возвращается признак успешности выполнения.
     *
     * @param parameters
     * @returns {Promise<T>}
     */
    getParcel(parameters:DataType.Request.ParcelInvoice):Promise<DataType.Response.Parcel> {
        return this.client.post(DataType.Response.Parcel, 'sendinginfo', parameters);
    }

    /**
     * Команда предназначена для получения стоимости доставки отправления. В запросе отправляется идентификатор сессии
     * и список номеров отправлений. В ответ возвращается список номеров отправлений со стоимостями доставок.
     * Стоимость доставки становится доступна на следующий день после регистрации отправления.
     *
     * @param parameters
     * @returns {Promise<T>}
     */
    getParcelDeliveryCost(parameters:DataType.Request.ParcelDeliveryCost):Promise<DataType.Response.ParcelDeliveryCost> {
        return this.client.post(DataType.Response.ParcelDeliveryCost, 'getdeliverycost', parameters);
    }

    /**
     * Команда предназначена для создания вызова курьера. На вход принимается структура, содержащая номер сессии
     * и описания адреса забора, времени забора, количества мест и общий вес.
     *
     * @param parameters
     * @returns {Promise<T>}
     */
    callCourier(parameters:DataType.Request.CallCourier):Promise<DataType.Response.RegisteredCourier> {
        return this.client.post(DataType.Response.RegisteredCourier, 'courier', parameters);
    }

    /**
     * Команда предназначена для отмены вызова курьера. На вход принимается структура, содержащая номер сессии
     * и номер вызова курьера.
     *
     * @param parameters
     * @returns {Promise<T>}
     */
    cancelCourier(parameters:DataType.Request.CancelCourier):Promise<DataType.Response.CancelledCourier> {
        return this.client.post(DataType.Response.CancelledCourier, 'couriercancel', parameters);
    }

    /**
     * Команда предназначена для получения реестра в формате pdf.
     * На вход принимается структура, содержащая идентификатор сессии и список номеров отправлений.
     *
     * @param parameters
     * @returns {Promise<T>}
     */
    createRegistryPDF(parameters:DataType.Request.CreateRegistry):Promise<DataType.Response.File> {
        return this.client.post(DataType.Response.File, 'makereestr', parameters);
    }

    /**
     * Команда предназначена для создания реестра и получения номера реестра.
     * На вход принимается структура, содержащая идентификатор сессии и список номеров отправлений.
     * На выход выдается список номеров созданных реестров или сообщение об ошибке.
     *
     * @param parameters
     * @returns {Promise<T>}
     */
    createRegistry(parameters:DataType.Request.CreateRegistry):Promise<DataType.Response.Registry> {
        return this.client.post(DataType.Response.Registry, 'makereestrnumber', parameters);
    }

    /**
     * Команда предназначена для получения реестра в формате pdf. На вход принимается структура,
     * содержащая идентификатор сессии и номер отправления или номер реестра. Если указанное отправление
     * не содержится ни в одном реестре или нет реестра с указанным номером, вернется соответствующее сообщение.
     *
     * @param parameters
     * @returns {Promise<T>}
     */
    getRegistry(parameters:DataType.Request.Registry):Promise<DataType.Response.File> {
        return this.client.post(DataType.Response.File, 'getreestr', parameters);
    }

    /**
     * Команда предназначена для получения номера реестра. На вход принимается структура, содержащая идентификатор сессии
     * и номер отправления. Если указанное отправление не содержится ни в одном реестре или нет реестра с указанным номером,
     * вернется соответствующее сообщение.
     *
     * @param parameters
     * @returns {Promise<T>}
     */
    getRegistryByParcelNumber(parameters:DataType.Request.ParcelInvoice):Promise<DataType.Response.RegistryNumber> {
        return this.client.post(DataType.Response.RegistryNumber, 'getreestrnumber', parameters);
    }

    /**
     * Команда предназначена для получения этикеток отправлений в формате pdf. На вход принимается структура, содержащая
     * идентификатор сессии и список номеров отправлений.
     *
     * @param parameters
     * @returns {Promise<T>}
     */
    createLabels(parameters:DataType.Request.CretaeLabels):Promise<DataType.Response.File> {
        return this.client.post(DataType.Response.File, 'makelabel', parameters);
    }

    /**
     * Команда предназначена для получения списка городов.
     *
     * @returns {Promise<T>}
     */
    getCities():Promise<DataType.Response.CityList> {
        return this.client.get(DataType.Response.CityList, 'citylist');
    }

    /**
     * Команда предназначена для получения списка постаматов.
     *
     * @returns {Promise<T>}
     */
    getPostamatList():Promise<DataType.Response.PostamatList> {
        return this.client.get(DataType.Response.PostamatList, 'postamatlist');
    }

    /**
     * Команда предназначена для получения списка зон.
     * Если поле ToPT не указано, возвращается список зон по всем пунктам выдачи.
     *
     * @param parameters
     * @returns {Promise<T>}
     */
    getZones(parameters:DataType.Request.ZonesQuery):Promise<DataType.Response.Zones> {
        return this.client.post(DataType.Response.Zones, 'getzone', parameters);
    }

    /**
     * Команда предназначена для получения номера возвратной накладной и, если есть, номера акта возврата.
     *
     * @param parameters
     * @returns {Promise<T>}
     */
    getReturnDocuments(parameters:DataType.Request.ReturnInvoices):Promise<DataType.Response.ReturnDocuments> {
        return this.client.post(DataType.Response.ReturnDocuments, 'getreturn', parameters);
    }
}