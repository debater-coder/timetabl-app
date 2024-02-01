import { DataProvider, DataProviderQuery } from "../../interfaces/DataProvider";
import { queryOptions } from "@tanstack/react-query";

export class DataAmalgamator {
  dataProviders: DataProvider[];

  constructor() {
    this.dataProviders = [];
  }

  addDataProvider = (dataProvider: DataProvider) => {
    this.dataProviders.push(dataProvider);
  };

  getDataProviders = () => {
    return this.dataProviders;
  };

  generateQueryOptions = <T>(
    queryType: DataProviderQuery,
    queryFnGenerator: (dataProvider: DataProvider) => () => T
  ) =>
    this.dataProviders
      .filter((dataProvider) => dataProvider[queryType])
      .map((dataProvider) =>
        queryOptions({
          queryKey: [queryType, dataProvider.id, dataProvider[queryType]?.id],
          queryFn: queryFnGenerator(dataProvider),
          gcTime: dataProvider[queryType]?.gcTime,
        })
      );

  barcodeQueries = () =>
    this.generateQueryOptions(
      "barcode",
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      (dataProvider) => dataProvider.barcode!.queryFn
    );

  dttQueries = (date: string) =>
    this.generateQueryOptions(
      "dtt",
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      (dataProvider) => () => dataProvider.dtt!.queryFn(date)
    );

  cycleQueries = () =>
    this.generateQueryOptions(
      "cycle",
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      (dataProvider) => dataProvider.cycle!.queryFn
    );

  noticesQueries = () =>
    this.generateQueryOptions(
      "notices",
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      (dataProvider) => dataProvider.notices!.queryFn
    );

  nextSchoolDayQueries = () =>
    this.generateQueryOptions(
      "nextSchoolDay",
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      (dataProvider) => dataProvider.nextSchoolDay!.queryFn
    );
}
