import swaggerAutoGen from "swagger-autogen";

const doc = {
  info: {
    title: "ch88r",
    description: "API documentation for ch88r application",
  },
  host: "localhost:8000",
  basePath: "/api/v1/",
};

const outputFile = "./swagger.json";
const routes = ["./routes/auth.routes.ts", "./routes/folder.routes.ts"];

swaggerAutoGen()(outputFile, routes, doc);
