import { BaseService } from "../../shared/services/base.service";
import { Bus } from "../model/bus.entite";

export class BusesService extends BaseService<Bus> {
  constructor() {
    super();
    this.resourceEndpoint = '/buses';
  }
}
