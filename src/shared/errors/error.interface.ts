/**
 * IError is an interface that every "custom" error should implement
 * It defines the standard error attributes and their getters
 */
export default interface IError {
  getName(): string;
  getMessage?(): string | undefined;
  getStack?(): string | undefined;
}
