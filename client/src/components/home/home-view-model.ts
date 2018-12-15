import { IHomeModel, HomeModel } from "./home-model";

export class HomeViewModel {
  private model: IHomeModel;

  constructor() {
    this.model = new HomeModel();
  }
}
