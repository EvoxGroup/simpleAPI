/* eslint-disable @typescript-eslint/ban-ts-ignore */
import Default from '../default/default';
import { settings } from 'ts-mixer';
settings.initFunction = 'init';
export default class BaseControllerDefault extends Default {
  protected errorStatus: {
    [error: string]: number;
  } = { Error: 400, error: 403, TypeError: 403, RemoveError: 400 };
  // @ts-ignore
  protected abstract elements: string;

  protected nameService: string | undefined;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  protected async service(method: string, ...args: any): Promise<any[]> {
    if (!this.nameService)
      this.nameService = this.element.replace('Controller', 'Service');
    return this.journaly.publish(this.nameService + '.' + method, ...args);
  }
}
