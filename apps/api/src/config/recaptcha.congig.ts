import { isDev } from '@/common/utils';
import { ConfigService } from '@nestjs/config';
import { GoogleRecaptchaModuleOptions } from '@nestlab/google-recaptcha';

export const getRecaptchaConfig = async (configService: ConfigService): Promise<GoogleRecaptchaModuleOptions> => {
    const secretKey = configService.get<string>('GOOGLE_RECAPTHCA_SECRET_KEY');
    if (!secretKey) {
        throw new Error('RECAPTCHA_SECRET_KEY is not defined');
    }
    return {
        secretKey,
        response: (req) => req.body.recaptcha,
        skipIf: () => isDev(configService),
    };
};