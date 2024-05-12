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
        title: 'Return percent',
        imgUrl: 'Return-percent.jpg',
        route: RouteConfig.RETURN_PERCENT,
        order: 2,
      }
  ];