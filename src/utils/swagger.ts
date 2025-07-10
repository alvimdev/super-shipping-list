import swaggerJSDoc from "swagger-jsdoc";

export const getApiDocs = () => {
  const options: swaggerJSDoc.Options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "SUPER Shopping List API",
        version: "1.0.0",
      },
      components: {
        securitySchemes: {
          BearerAuth: {
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT",
          },
        },
      },
      security: [],
    },
    apis: ["./app/api/**/*.ts"],
  };

  const swaggerSpec = swaggerJSDoc(options);
  return swaggerSpec;
};