export module Flags {
    export enum PostageType {
        // Стандарт
        STANDARD = 10001,

        // Приоритет
        PRIORITY = 10002,

        // Стандарт НП
        STANDARD_NP = 10003,

        // Приоритет НП
        PRIORITY_NP = 10004
    }

    export enum GettingType {
        // вызов курьера
        COURIER = 101,

        // в окне приема СЦ
        WINDOW_SC = 102,

        // в окне приема ПТ валом
        WINDOW_PT = 103,

        // в окне приема ПТ (самостоятельный развоз в нужный ПТ + при создании отправления у ПТ - С2С)
        WINDOW_PT_DIFF = 104
    }
}