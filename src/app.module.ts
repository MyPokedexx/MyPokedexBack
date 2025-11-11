import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const explicit = config.get<string>('MONGODB_URI');
        const dbName = config.get<string>('DB_NAME') || 'BD_Online';
        if (explicit) {
          return { uri: explicit, dbName, useNewUrlParser: true, useUnifiedTopology: true };
        }
        const host = config.get<string>('DB_HOST') || 'cluster0.8xajmlw.mongodb.net';
        const user = config.get<string>('DB_USER') || config.get<string>('DB_USERNAME') || '';
        const pass = config.get<string>('DB_PASS') || config.get<string>('DB_PASSWORD') || '';
        const auth = user && pass ? `${encodeURIComponent(user)}:${encodeURIComponent(pass)}@` : '';
        // Utilise le format mongodb+srv pour Atlas ; si vous utilisez un host local, ajustez le préfixe.
        const uri = `mongodb+srv://${auth}${host}/${dbName}?retryWrites=true&w=majority`;
        return { uri, dbName, useNewUrlParser: true, useUnifiedTopology: true };
      },
    }),
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
