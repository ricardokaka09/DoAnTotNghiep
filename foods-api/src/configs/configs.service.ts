import * as dotenv from 'dotenv';
import * as Joi from 'joi';
import * as fs from 'fs';
import { join } from 'path/posix';

export interface EnvConfig {
  [key: string]: string;
}

export class ConfigService {
  private readonly envConfig: EnvConfig;
  constructor() {
    const nodeEnv = process?.env?.NODE_ENV || 'local';
    const configFilePath = `environments/.${nodeEnv.toLocaleLowerCase()}.env`;

    const hasEnvFile = fs.existsSync(configFilePath);
    if (!hasEnvFile) {
      throw Error(`environment <${nodeEnv}> file not exists!`);
    }

    const config = dotenv.parse(fs.readFileSync(configFilePath));

    this.envConfig = this.validateInput({
      ...config,
      NODE_ENV: nodeEnv,
    });
  }

  private validateInput(envConfig: EnvConfig): EnvConfig {
    const envVarsSchema: Joi.ObjectSchema = Joi.object({
      NODE_ENV: Joi.string(),

      INTERNAL_HOST: Joi.string().required(),
      INTERNAL_POST: Joi.number().required(),

      TYPEORM_CONNECTION: Joi.string().required(),
      TYPEORM_HOST: Joi.string().required(),
      TYPEORM_USERNAME: Joi.string().required(),
      TYPEORM_PASSWORD: Joi.string().required(),
      TYPEORM_DATABASE: Joi.string().required(),
      TYPEORM_PORT: Joi.number().required(),
      TYPEORM_SYNCHRONIZE: Joi.string().valid('true', 'false'),
      TYPEORM_SCHEMA: Joi.string().valid('true', 'false'),
      TYPEORM_MIGRATIONS: Joi.string().required(),
      TYPEORM_MIGRATIONS_RUN: Joi.string().valid('true', 'false'),
      TYPEORM_MIGRATIONS_DIR: Joi.string().required(),
      TYPEORM_ENTITIES: Joi.string().required(),
      TYPEORM_LOGGING: Joi.string().valid('true', 'false'),

      // salt
      BCRYPT_SALT: Joi.number().required(),

      // secret
      JWT_SECRET: Joi.string().required(),
      JWT_VERIFY_EMAIL_SECRET: Joi.string().required(),

      SENDGRID_SENDER_DEFAULT: Joi.string().required(),
      SENDGRID_API_KEY: Joi.string().required(),

      FRONTEND_HOST: Joi.string().required(),
    });
    const { error, value: validatedEnvConfig } =
      envVarsSchema.validate(envConfig);

    return validatedEnvConfig;
  }
  get databaseConfig() {
    const dbConfig = {
      type: String(this.envConfig.TYPEORM_CONNECTION),
      host: String(this.envConfig.TYPEORM_HOST),
      port: String(this.envConfig.TYPEORM_PORT),
      username: String(this.envConfig.TYPEORM_USERNAME),
      password: String(this.envConfig.TYPEORM_PASSWORD),
      database: String(this.envConfig.TYPEORM_DATABASE),
      entities: [String(this.envConfig.TYPEORM_ENTITIES)],
      autoSchemaSync: String(this.envConfig.TYPEORM_SCHEMA) === 'true',
      synchronize: String(this.envConfig.TYPEORM_SYNCHRONIZE) === 'true',
      migrations: [String(this.envConfig.TYPEORM_MIGRATIONS)],
      migrationsRun: String(this.envConfig.TYPEORM_MIGRATIONS_RUN) === 'true',
      logging: String(this.envConfig.TYPEORM_LOGGING) === 'true',
      cli: {
        migrationsDir: String(this.envConfig.TYPEORM_MIGRATIONS_DIR),
      },
    };

    return Object(dbConfig);
  }

  get internalHost(): string {
    return String(this.envConfig.INTERNAL_HOST);
  }

  get internalPort(): number {
    return Number(this.envConfig.INTERNAL_POST);
  }

  get bcryptSalt(): number {
    return Number(this.envConfig.BCRYPT_SALT);
  }

  get sendGridApi(): string {
    return String(this.envConfig.SENDGRID_API_KEY);
  }

  get sendGridSenderDefault(): string {
    return String(this.envConfig.SENDGRID_SENDER_DEFAULT);
  }

  get jwtSecret(): string {
    return String(this.envConfig.JWT_SECRET);
  }
  get jwtVerifyEmailSecret(): string {
    return String(this.envConfig.JWT_VERIFY_EMAIL_SECRET);
  }

  get frontEndHost(): string {
    return String(this.envConfig.FRONTEND_HOST);
  }
}
