import { RouteConfig } from "../enums/route-config.enum";

export const FeatureList: any = [
    {
        id: 1,
        title: 'Age',
        imgUrl: 'age-crop.jpg',
        route: RouteConfig.AGE,
        order: 1,
    },
    {
        id: 2,
        title: 'Return percentage',
        imgUrl: 'Return-percent.jpg',
        route: RouteConfig.RETURN_PERCENTAGE,
        order: 2,
    },
    {
        id: 3,
        title: 'Interest',
        imgUrl: 'interest.jpg',
        route: RouteConfig.INTEREST,
        order: 3,
    },
  ];