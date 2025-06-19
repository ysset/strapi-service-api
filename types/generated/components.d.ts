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

export interface BotsPaymentsSubscriptions extends Schema.Component {
    collectionName: 'components_bots_payments_subscriptions';
    info: {
        displayName: 'subscriptions';
    };
    attributes: {
        end: Attribute.Date;
        price: Attribute.String;
        start: Attribute.Date;
        types_of_subscription: Attribute.Relation<
            'bots-payments.subscriptions',
            'oneToOne',
            'api::types-of-subscription.types-of-subscription'
        >;
    };
}

export interface ServicePayment extends Schema.Component {
    collectionName: 'components_service_payments';
    info: {
        description: '';
        displayName: 'payment';
        icon: 'database';
    };
    attributes: {
        description: Attribute.Text &
            Attribute.Required &
            Attribute.SetMinMaxLength<{
                maxLength: 50;
            }>;
        price: Attribute.String & Attribute.Required;
        priceFrom: Attribute.Boolean & Attribute.Required & Attribute.DefaultTo<false>;
        title: Attribute.String & Attribute.Required;
        volute: Attribute.Enumeration<['RUB', 'USD']> & Attribute.Required;
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
        needRegistrationOnDate: Attribute.Boolean & Attribute.Required & Attribute.DefaultTo<false>;
        payment: Attribute.Component<'service.payment'>;
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
            'bots-payments.subscriptions': BotsPaymentsSubscriptions;
            'service.payment': ServicePayment;
            'service.service': ServiceService;
        }
    }
}
