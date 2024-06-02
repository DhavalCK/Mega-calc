import { InterestTypeEnum, TimePeriondEnum } from "../../enums/feature-fields.enum";

export interface DropdownOption {
    name: string;
    value: string;
}

export type DropdownOptions = DropdownOption[];