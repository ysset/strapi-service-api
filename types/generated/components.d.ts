import type { Schema, Attribute } from '@strapi/strapi';

export interface BotsPaymentsPayments extends Schema.Component {
    collectionName: 'components_bots_payments_payments';
    info: {
        displayName: 'payments';
        icon: 'money-bill-alt';
    };
    attributes: {
        price: Attribute.BigInteger;
        paymentDate: Attribute.String;
    };
}

export interface ServiceService extends Schema.Component {
    collectionName: 'components_service_services';
    info: {
        displayName: 'service';
        icon: 'hand-holding-usd';
        description: '';
    };
    attributes: {
        name: Attribute.String & Attribute.Required;
        price: Attribute.BigInteger & Attribute.Required;
        remark: Attribute.Text &
            Attribute.SetMinMaxLength<{
                maxLength: 100;
            }>;
        comingSoon: Attribute.Boolean & Attribute.Required & Attribute.DefaultTo<false>;
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
