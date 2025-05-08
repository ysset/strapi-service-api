import type { Attribute, Schema } from '@strapi/strapi';

export interface BotsPaymentsPayments extends Schema.Component {
    collectionName: 'components_bots_payments_payments';
    info: {
        displayName: 'payments';
        icon: 'money-bill-alt';
    };
    attributes: {
        paymentDate: Attribute.String;
        price: Attribute.BigInteger;
    };
}

export interface ServiceService extends Schema.Component {
    collectionName: 'components_service_services';
    info: {
        description: '';
        displayName: 'service';
        icon: 'hand-holding-usd';
    };
    attributes: {
        comingSoon: Attribute.Boolean & Attribute.Required & Attribute.DefaultTo<false>;
        image: Attribute.Media<'images'>;
        name: Attribute.String & Attribute.Required;
        needPayment: Attribute.Boolean & Attribute.Required & Attribute.DefaultTo<false>;
        needRegistrationOnDate: Attribute.Boolean & Attribute.Required;
        price: Attribute.BigInteger;
        remark: Attribute.Text &
            Attribute.SetMinMaxLength<{
                maxLength: 2000;
            }>;
    };
}

declare module '@strapi/types' {
    export module Shared {
        export interface Components {
            'bots-payments.payments': BotsPaymentsPayments;
            'service.service': ServiceService;
        }
    }
}
