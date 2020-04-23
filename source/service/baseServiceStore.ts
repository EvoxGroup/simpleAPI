import ServiceStoreAdapter from '../adapter/service/serviceStoreAdapter';
import BaseServiceDefault from './baseServiceDefault';
import ServiceSimpleModel from '../model/serviceSimpleModel';
import ServiceModel from '../model/serviceModel';
import { Event, Operation, Handler } from 'flexiblepersistence';
import { settings } from 'ts-mixer';
import { Journaly } from 'journaly';
settings.initFunction = 'init';
/* eslint-disable @typescript-eslint/ban-ts-ignore */
// @ts-ignore
export default class BaseServiceStore extends BaseServiceDefault
  implements ServiceStoreAdapter {
  protected init(handler: Handler, journaly: Journaly<any>): void {
    super.init(handler, journaly);
    this.journaly = journaly;
    this.handler = handler;
    console.log('store MF:', this.element);
    console.log('store MF:', this.handler);
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const _self = this;
    // if (this.journaly) {
    console.log(this.element + '.' + 'store', _self.store);
    this.journaly.subscribe(this.element + '.' + 'store', _self.store);
    this.journaly.subscribe(
      this.element + '.' + 'storeElement',
      _self.storeElement
    );
    // }
  }
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  protected abstract async storeElement(
    content: ServiceSimpleModel
  ): Promise<ServiceModel>;

  public async store(content: ServiceSimpleModel): Promise<ServiceModel> {
    console.log('this:', this);
    // console.log('this.handler:', this.handler);
    console.log('super.handler:', super.handler);

    // Event Sourcing
    const event = await this.handler.addEvent(
      new Event({
        operation: Operation.create,
        name: this.element,
        content,
      })
    );

    console.log('store');
    const result = await this.storeElement({
      ...content,
      id: event.receivedItem._id.toString(),
    });
    return result;
  }
}