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

  // Usage:
  // ```
  //  const [_, loginError] = dataAmalgamator.login();
  // ```
  login = () => {
    const identityProvider = this.dataProviders.find(
      (dataProvider) => dataProvider.id === this.identityProviderId
    );

    if (identityProvider) {
      identityProvider.activate();
      return [null, null];
    }

    return [null, new Error("Identity provider not found")];
  };

  logout = () => {
    const identityProvider = this.dataProviders.find(
      (dataProvider) => dataProvider.id === this.identityProviderId
    );

    if (identityProvider) {
      identityProvider.deactivate();
    }
  };

  isLoggedIn = () =>
    this.dataProviders
      .find((dataProvider) => dataProvider.id === this.identityProviderId)
      ?.isActivated() ?? false;

  identityProviderId: string | null = null;

  setIdentityProvider = (identityProviderId: string) => {
    this.identityProviderId = identityProviderId;
  };

  generateQueryOptions = <T>(
    queryType: DataProviderQuery,
    queryFnGenerator: (dataProvider: DataProvider) => () => T
  ) =>
    this.dataProviders
      .filter((dataProvider) => dataProvider.isActivated)
      .filter((dataProvider) => dataProvider[queryType])
      .map((dataProvider) =>
        queryOptions({
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          queryKey: [queryType, dataProvider.id, dataProvider[queryType]!.id],
          queryFn: queryFnGenerator(dataProvider),
          gcTime: dataProvider[queryType]?.gcTime,
        })
      );

  barcodeQueries = () =>
    this.dataProviders
      .filter((dataProvider) => dataProvider.isActivated)
      .filter((dataProvider) => dataProvider.barcode)
      .map((dataProvider) =>
        queryOptions({
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          queryKey: ["barcode", dataProvider.id, dataProvider.barcode!.id],
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          queryFn: dataProvider.barcode!.queryFn,
          gcTime: dataProvider.barcode?.gcTime,
        })
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
