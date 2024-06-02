export interface InterestRowData {
    time: number;
    interest: number | null;
    accuredInterest: number | null;
    amount: number;
}

export type InterestTableData = InterestRowData[];