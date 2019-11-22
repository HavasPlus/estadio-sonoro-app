import IError from "./error.interface";

/**
 * General logging interface for logging services
 */
export default interface ILogger {
  /**
   * Initialize the logging service
   */
  init(): void;
  /**
   * Logs the the error to the logging service
   * @param error An error that implements the error interface
   */
  log(error: IError): void;
}
