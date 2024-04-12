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

  newsletters = () =>
    this.dataProviders
      .filter((dataProvider) => dataProvider.isActivated)
      .filter((dataProvider) => dataProvider.newsletter)
      .map((dataProvider) => dataProvider.newsletter);

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
    this.dataProviders
      .filter((dataProvider) => dataProvider.isActivated)
      .filter((dataProvider) => dataProvider.dtt)
      .map((dataProvider) =>
        queryOptions({
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          queryKey: ["dtt", dataProvider.id, dataProvider.dtt!.id],
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          queryFn: () => dataProvider.dtt!.queryFn(date),
          gcTime: dataProvider.dtt?.gcTime,
        })
      );

  cycleQueries = () =>
    this.dataProviders
      .filter((dataProvider) => dataProvider.isActivated)
      .filter((dataProvider) => dataProvider.cycle)
      .map((dataProvider) =>
        queryOptions({
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          queryKey: ["cycle", dataProvider.id, dataProvider.cycle!.id],
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          queryFn: dataProvider.cycle!.queryFn,
          gcTime: dataProvider.cycle?.gcTime,
        })
      );

  noticesQueries = () =>
    this.dataProviders
      .filter((dataProvider) => dataProvider.isActivated)
      .filter((dataProvider) => dataProvider.notices)
      .map((dataProvider) =>
        queryOptions({
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          queryKey: ["notices", dataProvider.id, dataProvider.notices!.id],
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          queryFn: dataProvider.notices!.queryFn,
          gcTime: dataProvider.notices?.gcTime,
        })
      );

  nextSchoolDayQueries = () =>
    this.dataProviders
      .filter((dataProvider) => dataProvider.isActivated)
      .filter((dataProvider) => dataProvider.nextSchoolDay)
      .map((dataProvider) =>
        queryOptions({
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          queryKey: [
            "nextSchoolDay",
            dataProvider.id,
            dataProvider.nextSchoolDay!.id,
          ],
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          queryFn: dataProvider.nextSchoolDay!.queryFn,
          gcTime: dataProvider.nextSchoolDay?.gcTime,
        })
      );
}
