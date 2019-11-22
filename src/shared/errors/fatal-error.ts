import BaseError from "./base-error";


export default class FatalError extends BaseError {
  /**
   * An internal error that happened in the node process
   * @param name Name of the error
   * @param message A descriptive message of the error
   * @param stack The stack of the error
   */
  constructor(name: string, message: string, stack?: string) {
    super(name, message, stack);
    this.report();
  }

  /**
   * Report the error to Sentry
   */
  protected report(): void {
   
  }
}
