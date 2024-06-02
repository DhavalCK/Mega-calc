import { InterestTypeEnum } from "../../enums/feature-fields.enum";

export interface InterestTypeOption {
    name: string;
    value: InterestTypeEnum,
}

export type InterestTypeOptions = InterestTypeOption[];