/**
 * ConditionalExecutionDecorator checks hasError before continuing validation value.
 * @author NhatNHH
 * @created 2024-07-29
 */
export const ConditionalExecutionDecorator = (
  target: Object,
  propertyKey: string | symbol,
  descriptor: any,
) => {
  const originalMethod = descriptor.value;
  descriptor.value = function (...args: any[]) {
    if (!this?.hasError) {
      return originalMethod.apply(this, args);
    }
    return this;
  };

  return descriptor;
};
