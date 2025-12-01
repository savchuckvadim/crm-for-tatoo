import { DocumentBuilder } from '@nestjs/swagger'

export function getSwaggerConfig() {
	return new DocumentBuilder()
		.setTitle('Sociopath. network API')
		.setDescription('API for Sociopath. network')
		.setVersion('1.0.0')
		.setTermsOfService('https://sociopath.network/docs/agreement')
		.setContact(
			'Sociopath. network Support',
			'https://sociopath.network',
			'support@crm.network'
		)
		.setLicense(
			'AGPLv3',
			'https://github.com/sociopath-network/backend/blob/main/LICENSE'
		)
		.build()
}
