import IError from "./error.interface";
import ILogger from "./logger.interface";

/**
 * Every specific custom error will extend this class
 * This class defines the basics that every error can do
 */
export default class BaseError implements IError {
  private name: string;
  private message: string;
  private stack: string;

  /**
   * Creating a new BaseError instance
   * @param name Name of the error
   * @param message Optional descriptive message about why this error is thrown
   * @param stack Optional stack of the error
   */
  constructor(name: string, message?: string, stack?: string) {
    this.name = name;
    this.message = message as string;
    this.stack = stack as string;
  }

  /**
   * Retrieve the name of the error
   */
  public getName(): string {
    return this.name;
  }

  /**
   * Retrieve the optional descriptive name of the error
   */
  public getMessage(): string | undefined {
    return this.message;
  }

  /**
   * Retrieve the optional stack of the error
   */
  public getStack(): string | undefined {
    return this.stack;
  }

  /**
   * Report the error using some sort of logger
   * @param logger A logger service that handles some sort of logging
   */
  protected report(logger: ILogger): void {
    logger.init();
    logger.log(this);
  }
}
