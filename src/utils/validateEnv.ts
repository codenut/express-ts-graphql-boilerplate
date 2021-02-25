import { cleanEnv, str } from "envalid";

const validateEnv = () => {
  cleanEnv(process.env, {
    DB_NAME: str(),
    DB_HOST: str(),
    DB_PASSWORD: str(),
    DB_USER: str()
  });
};

export default validateEnv;
