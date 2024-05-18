import { TimePeriondEnum } from "../enums/feature-fields.enum";

export const ConvertTimePeriod = {
    [TimePeriondEnum.DAY] : {
        [TimePeriondEnum.DAY]: 1,
        [TimePeriondEnum.WEEK]: 1 / 7,
        [TimePeriondEnum.MONTH]: 1 / 30,
        [TimePeriondEnum.QUARTER]: 1 / 90,
        [TimePeriondEnum.YEAR]: 1 / 365,
    },
    [TimePeriondEnum.WEEK] : {
        [TimePeriondEnum.DAY]: 7,
        [TimePeriondEnum.WEEK]: 1,
        [TimePeriondEnum.MONTH]: 1 / 4,
        [TimePeriondEnum.QUARTER]: 1 / 12,
        [TimePeriondEnum.YEAR]: 1 / 52,
    },
    [TimePeriondEnum.MONTH] : {
        [TimePeriondEnum.DAY]:  30,
        [TimePeriondEnum.WEEK]: 4,
        [TimePeriondEnum.MONTH]: 1,
        [TimePeriondEnum.QUARTER]: 1 / 3,
        [TimePeriondEnum.YEAR]: 1 / 12,
    },
    [TimePeriondEnum.QUARTER] : {
        [TimePeriondEnum.DAY]: 90,
        [TimePeriondEnum.WEEK]: 12,
        [TimePeriondEnum.MONTH]: 3,
        [TimePeriondEnum.QUARTER]: 1,
        [TimePeriondEnum.YEAR]: 1 / 4,   
    },
    [TimePeriondEnum.YEAR] : {
        [TimePeriondEnum.DAY]: 365,
        [TimePeriondEnum.WEEK]: 52,
        [TimePeriondEnum.MONTH]: 12,
        [TimePeriondEnum.QUARTER]: 4,
        [TimePeriondEnum.YEAR]: 1,   
    }
}