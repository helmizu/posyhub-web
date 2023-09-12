import { useCallback } from 'react';

export const useYupValidationResolver = (validationSchema: any) =>
  useCallback(
    async (data: any) => {
      try {
        let schema = validationSchema;
        if (typeof validationSchema === 'function' ) schema = validationSchema(data);
        const values = await schema.validate(data, {
          abortEarly: false,
        });

        return {
          values,
          errors: {},
        };
      } catch (errors: any) {
        return {
          values: {},
          errors: errors.inner.reduce(
            (allErrors: any, currentError: any) => ({
              ...allErrors,
              [currentError.path]: {
                type: currentError.type ?? 'validation',
                message: currentError.message,
              },
            }),
            {}
          ),
        };
      }
    },
    [validationSchema]
  );