import { TimePeriondEnum } from "../../enums/feature-fields.enum";

export interface TimePeriodOption {
        name: string;
        value: TimePeriondEnum,
        interestName?: string;
}

export type TimePeriodOptions = TimePeriodOption[];