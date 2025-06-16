import type { Attribute, Schema } from '@strapi/strapi';

export interface AdminApiToken extends Schema.CollectionType {
    collectionName: 'strapi_api_tokens';
    info: {
        description: '';
        displayName: 'Api Token';
        name: 'Api Token';
        pluralName: 'api-tokens';
        singularName: 'api-token';
    };
    pluginOptions: {
        'content-manager': {
            visible: false;
        };
        'content-type-builder': {
            visible: false;
        };
    };
    attributes: {
        accessKey: Attribute.String &
            Attribute.Required &
            Attribute.SetMinMaxLength<{
                minLength: 1;
            }>;
        createdAt: Attribute.DateTime;
        createdBy: Attribute.Relation<'admin::api-token', 'oneToOne', 'admin::user'> & Attribute.Private;
        description: Attribute.String &
            Attribute.SetMinMaxLength<{
                minLength: 1;
            }> &
            Attribute.DefaultTo<''>;
        expiresAt: Attribute.DateTime;
        lastUsedAt: Attribute.DateTime;
        lifespan: Attribute.BigInteger;
        name: Attribute.String &
            Attribute.Required &
            Attribute.Unique &
            Attribute.SetMinMaxLength<{
                minLength: 1;
            }>;
        permissions: Attribute.Relation<'admin::api-token', 'oneToMany', 'admin::api-token-permission'>;
        type: Attribute.Enumeration<['read-only', 'full-access', 'custom']> &
            Attribute.Required &
            Attribute.DefaultTo<'read-only'>;
        updatedAt: Attribute.DateTime;
        updatedBy: Attribute.Relation<'admin::api-token', 'oneToOne', 'admin::user'> & Attribute.Private;
    };
}

export interface AdminApiTokenPermission extends Schema.CollectionType {
    collectionName: 'strapi_api_token_permissions';
    info: {
        description: '';
        displayName: 'API Token Permission';
        name: 'API Token Permission';
        pluralName: 'api-token-permissions';
        singularName: 'api-token-permission';
    };
    pluginOptions: {
        'content-manager': {
            visible: false;
        };
        'content-type-builder': {
            visible: false;
        };
    };
    attributes: {
        action: Attribute.String &
            Attribute.Required &
            Attribute.SetMinMaxLength<{
                minLength: 1;
            }>;
        createdAt: Attribute.DateTime;
        createdBy: Attribute.Relation<'admin::api-token-permission', 'oneToOne', 'admin::user'> &
            Attribute.Private;
        token: Attribute.Relation<'admin::api-token-permission', 'manyToOne', 'admin::api-token'>;
        updatedAt: Attribute.DateTime;
        updatedBy: Attribute.Relation<'admin::api-token-permission', 'oneToOne', 'admin::user'> &
            Attribute.Private;
    };
}

export interface AdminPermission extends Schema.CollectionType {
    collectionName: 'admin_permissions';
    info: {
        description: '';
        displayName: 'Permission';
        name: 'Permission';
        pluralName: 'permissions';
        singularName: 'permission';
    };
    pluginOptions: {
        'content-manager': {
            visible: false;
        };
        'content-type-builder': {
            visible: false;
        };
    };
    attributes: {
        action: Attribute.String &
            Attribute.Required &
            Attribute.SetMinMaxLength<{
                minLength: 1;
            }>;
        actionParameters: Attribute.JSON & Attribute.DefaultTo<{}>;
        conditions: Attribute.JSON & Attribute.DefaultTo<[]>;
        createdAt: Attribute.DateTime;
        createdBy: Attribute.Relation<'admin::permission', 'oneToOne', 'admin::user'> & Attribute.Private;
        properties: Attribute.JSON & Attribute.DefaultTo<{}>;
        role: Attribute.Relation<'admin::permission', 'manyToOne', 'admin::role'>;
        subject: Attribute.String &
            Attribute.SetMinMaxLength<{
                minLength: 1;
            }>;
        updatedAt: Attribute.DateTime;
        updatedBy: Attribute.Relation<'admin::permission', 'oneToOne', 'admin::user'> & Attribute.Private;
    };
}

export interface AdminRole extends Schema.CollectionType {
    collectionName: 'admin_roles';
    info: {
        description: '';
        displayName: 'Role';
        name: 'Role';
        pluralName: 'roles';
        singularName: 'role';
    };
    pluginOptions: {
        'content-manager': {
            visible: false;
        };
        'content-type-builder': {
            visible: false;
        };
    };
    attributes: {
        code: Attribute.String &
            Attribute.Required &
            Attribute.Unique &
            Attribute.SetMinMaxLength<{
                minLength: 1;
            }>;
        createdAt: Attribute.DateTime;
        createdBy: Attribute.Relation<'admin::role', 'oneToOne', 'admin::user'> & Attribute.Private;
        description: Attribute.String;
        name: Attribute.String &
            Attribute.Required &
            Attribute.Unique &
            Attribute.SetMinMaxLength<{
                minLength: 1;
            }>;
        permissions: Attribute.Relation<'admin::role', 'oneToMany', 'admin::permission'>;
        updatedAt: Attribute.DateTime;
        updatedBy: Attribute.Relation<'admin::role', 'oneToOne', 'admin::user'> & Attribute.Private;
        users: Attribute.Relation<'admin::role', 'manyToMany', 'admin::user'>;
    };
}

export interface AdminTransferToken extends Schema.CollectionType {
    collectionName: 'strapi_transfer_tokens';
    info: {
        description: '';
        displayName: 'Transfer Token';
        name: 'Transfer Token';
        pluralName: 'transfer-tokens';
        singularName: 'transfer-token';
    };
    pluginOptions: {
        'content-manager': {
            visible: false;
        };
        'content-type-builder': {
            visible: false;
        };
    };
    attributes: {
        accessKey: Attribute.String &
            Attribute.Required &
            Attribute.SetMinMaxLength<{
                minLength: 1;
            }>;
        createdAt: Attribute.DateTime;
        createdBy: Attribute.Relation<'admin::transfer-token', 'oneToOne', 'admin::user'> & Attribute.Private;
        description: Attribute.String &
            Attribute.SetMinMaxLength<{
                minLength: 1;
            }> &
            Attribute.DefaultTo<''>;
        expiresAt: Attribute.DateTime;
        lastUsedAt: Attribute.DateTime;
        lifespan: Attribute.BigInteger;
        name: Attribute.String &
            Attribute.Required &
            Attribute.Unique &
            Attribute.SetMinMaxLength<{
                minLength: 1;
            }>;
        permissions: Attribute.Relation<
            'admin::transfer-token',
            'oneToMany',
            'admin::transfer-token-permission'
        >;
        updatedAt: Attribute.DateTime;
        updatedBy: Attribute.Relation<'admin::transfer-token', 'oneToOne', 'admin::user'> & Attribute.Private;
    };
}

export interface AdminTransferTokenPermission extends Schema.CollectionType {
    collectionName: 'strapi_transfer_token_permissions';
    info: {
        description: '';
        displayName: 'Transfer Token Permission';
        name: 'Transfer Token Permission';
        pluralName: 'transfer-token-permissions';
        singularName: 'transfer-token-permission';
    };
    pluginOptions: {
        'content-manager': {
            visible: false;
        };
        'content-type-builder': {
            visible: false;
        };
    };
    attributes: {
        action: Attribute.String &
            Attribute.Required &
            Attribute.SetMinMaxLength<{
                minLength: 1;
            }>;
        createdAt: Attribute.DateTime;
        createdBy: Attribute.Relation<'admin::transfer-token-permission', 'oneToOne', 'admin::user'> &
            Attribute.Private;
        token: Attribute.Relation<'admin::transfer-token-permission', 'manyToOne', 'admin::transfer-token'>;
        updatedAt: Attribute.DateTime;
        updatedBy: Attribute.Relation<'admin::transfer-token-permission', 'oneToOne', 'admin::user'> &
            Attribute.Private;
    };
}

export interface AdminUser extends Schema.CollectionType {
    collectionName: 'admin_users';
    info: {
        description: '';
        displayName: 'User';
        name: 'User';
        pluralName: 'users';
        singularName: 'user';
    };
    pluginOptions: {
        'content-manager': {
            visible: false;
        };
        'content-type-builder': {
            visible: false;
        };
    };
    attributes: {
        blocked: Attribute.Boolean & Attribute.Private & Attribute.DefaultTo<false>;
        createdAt: Attribute.DateTime;
        createdBy: Attribute.Relation<'admin::user', 'oneToOne', 'admin::user'> & Attribute.Private;
        email: Attribute.Email &
            Attribute.Required &
            Attribute.Private &
            Attribute.Unique &
            Attribute.SetMinMaxLength<{
                minLength: 6;
            }>;
        firstname: Attribute.String &
            Attribute.SetMinMaxLength<{
                minLength: 1;
            }>;
        isActive: Attribute.Boolean & Attribute.Private & Attribute.DefaultTo<false>;
        lastname: Attribute.String &
            Attribute.SetMinMaxLength<{
                minLength: 1;
            }>;
        password: Attribute.Password &
            Attribute.Private &
            Attribute.SetMinMaxLength<{
                minLength: 6;
            }>;
        preferedLanguage: Attribute.String;
        registrationToken: Attribute.String & Attribute.Private;
        resetPasswordToken: Attribute.String & Attribute.Private;
        roles: Attribute.Relation<'admin::user', 'manyToMany', 'admin::role'> & Attribute.Private;
        updatedAt: Attribute.DateTime;
        updatedBy: Attribute.Relation<'admin::user', 'oneToOne', 'admin::user'> & Attribute.Private;
        username: Attribute.String;
    };
}

export interface ApiBotBot extends Schema.CollectionType {
    collectionName: 'bots';
    info: {
        description: '';
        displayName: 'Bot';
        pluralName: 'bots';
        singularName: 'bot';
    };
    options: {
        draftAndPublish: false;
    };
    attributes: {
        createdAt: Attribute.DateTime;
        createdBy: Attribute.Relation<'api::bot.bot', 'oneToOne', 'admin::user'> & Attribute.Private;
        isActive: Attribute.Boolean;
        language: Attribute.Enumeration<['ru', 'en', 'ch']>;
        name: Attribute.String & Attribute.Required;
        owner: Attribute.Relation<'api::bot.bot', 'oneToOne', 'admin::user'>;
        paymentToken: Attribute.String;
        token: Attribute.String & Attribute.Required & Attribute.Unique;
        type: Attribute.Enumeration<['showcase']>;
        updatedAt: Attribute.DateTime;
        updatedBy: Attribute.Relation<'api::bot.bot', 'oneToOne', 'admin::user'> & Attribute.Private;
    };
}

export interface ApiInvoiceInvoice extends Schema.CollectionType {
    collectionName: 'invoices';
    info: {
        displayName: 'invoices';
        pluralName: 'invoices';
        singularName: 'invoice';
    };
    options: {
        draftAndPublish: true;
    };
    attributes: {
        createdAt: Attribute.DateTime;
        createdBy: Attribute.Relation<'api::invoice.invoice', 'oneToOne', 'admin::user'> & Attribute.Private;
        currency: Attribute.String;
        invoicePayload: Attribute.String;
        paymentId: Attribute.String;
        publishedAt: Attribute.DateTime;
        totalAmount: Attribute.Integer;
        updatedAt: Attribute.DateTime;
        updatedBy: Attribute.Relation<'api::invoice.invoice', 'oneToOne', 'admin::user'> & Attribute.Private;
        user: Attribute.Relation<'api::invoice.invoice', 'manyToOne', 'api::telegram-user.telegram-user'>;
    };
}

export interface ApiServiceTypeServiceType extends Schema.CollectionType {
    collectionName: 'service_types';
    info: {
        description: '';
        displayName: 'Services';
        pluralName: 'service-types';
        singularName: 'service-type';
    };
    options: {
        draftAndPublish: true;
    };
    attributes: {
        adminUser: Attribute.Relation<'api::service-type.service-type', 'oneToOne', 'admin::user'> &
            Attribute.Private;
        bots: Attribute.Relation<'api::service-type.service-type', 'oneToMany', 'api::bot.bot'>;
        createdAt: Attribute.DateTime;
        createdBy: Attribute.Relation<'api::service-type.service-type', 'oneToOne', 'admin::user'> &
            Attribute.Private;
        expandInWebApp: Attribute.Boolean & Attribute.Required & Attribute.DefaultTo<false>;
        name: Attribute.String & Attribute.Required;
        publishedAt: Attribute.DateTime;
        services: Attribute.Component<'service.service', true> & Attribute.Required;
        type: Attribute.Enumeration<['services', 'goods']> & Attribute.Required;
        updatedAt: Attribute.DateTime;
        updatedBy: Attribute.Relation<'api::service-type.service-type', 'oneToOne', 'admin::user'> &
            Attribute.Private;
    };
}

export interface ApiTelegramUserTelegramUser extends Schema.CollectionType {
    collectionName: 'telegram_users';
    info: {
        displayName: 'Telegram \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u0438';
        pluralName: 'telegram-users';
        singularName: 'telegram-user';
    };
    options: {
        draftAndPublish: false;
    };
    attributes: {
        createdAt: Attribute.DateTime;
        createdBy: Attribute.Relation<'api::telegram-user.telegram-user', 'oneToOne', 'admin::user'> &
            Attribute.Private;
        firstName: Attribute.String & Attribute.Required;
        invoices: Attribute.Relation<'api::telegram-user.telegram-user', 'oneToMany', 'api::invoice.invoice'>;
        isBot: Attribute.Boolean & Attribute.Required & Attribute.DefaultTo<false>;
        language: Attribute.String;
        lastName: Attribute.String;
        telegramId: Attribute.Integer & Attribute.Required;
        updatedAt: Attribute.DateTime;
        updatedBy: Attribute.Relation<'api::telegram-user.telegram-user', 'oneToOne', 'admin::user'> &
            Attribute.Private;
        username: Attribute.String;
    };
}

export interface ApiTypesOfSubscriptionTypesOfSubscription extends Schema.CollectionType {
    collectionName: 'types_of_subscriptions';
    info: {
        description: '';
        displayName: 'types of subscriptions';
        pluralName: 'types-of-subscriptions';
        singularName: 'types-of-subscription';
    };
    options: {
        draftAndPublish: false;
    };
    attributes: {
        createdAt: Attribute.DateTime;
        createdBy: Attribute.Relation<
            'api::types-of-subscription.types-of-subscription',
            'oneToOne',
            'admin::user'
        > &
            Attribute.Private;
        description: Attribute.Text;
        name: Attribute.String;
        price: Attribute.Integer;
        updatedAt: Attribute.DateTime;
        updatedBy: Attribute.Relation<
            'api::types-of-subscription.types-of-subscription',
            'oneToOne',
            'admin::user'
        > &
            Attribute.Private;
    };
}

export interface PluginContentReleasesRelease extends Schema.CollectionType {
    collectionName: 'strapi_releases';
    info: {
        displayName: 'Release';
        pluralName: 'releases';
        singularName: 'release';
    };
    options: {
        draftAndPublish: false;
    };
    pluginOptions: {
        'content-manager': {
            visible: false;
        };
        'content-type-builder': {
            visible: false;
        };
    };
    attributes: {
        actions: Attribute.Relation<
            'plugin::content-releases.release',
            'oneToMany',
            'plugin::content-releases.release-action'
        >;
        createdAt: Attribute.DateTime;
        createdBy: Attribute.Relation<'plugin::content-releases.release', 'oneToOne', 'admin::user'> &
            Attribute.Private;
        name: Attribute.String & Attribute.Required;
        releasedAt: Attribute.DateTime;
        scheduledAt: Attribute.DateTime;
        status: Attribute.Enumeration<['ready', 'blocked', 'failed', 'done', 'empty']> & Attribute.Required;
        timezone: Attribute.String;
        updatedAt: Attribute.DateTime;
        updatedBy: Attribute.Relation<'plugin::content-releases.release', 'oneToOne', 'admin::user'> &
            Attribute.Private;
    };
}

export interface PluginContentReleasesReleaseAction extends Schema.CollectionType {
    collectionName: 'strapi_release_actions';
    info: {
        displayName: 'Release Action';
        pluralName: 'release-actions';
        singularName: 'release-action';
    };
    options: {
        draftAndPublish: false;
    };
    pluginOptions: {
        'content-manager': {
            visible: false;
        };
        'content-type-builder': {
            visible: false;
        };
    };
    attributes: {
        contentType: Attribute.String & Attribute.Required;
        createdAt: Attribute.DateTime;
        createdBy: Attribute.Relation<'plugin::content-releases.release-action', 'oneToOne', 'admin::user'> &
            Attribute.Private;
        entry: Attribute.Relation<'plugin::content-releases.release-action', 'morphToOne'>;
        isEntryValid: Attribute.Boolean;
        locale: Attribute.String;
        release: Attribute.Relation<
            'plugin::content-releases.release-action',
            'manyToOne',
            'plugin::content-releases.release'
        >;
        type: Attribute.Enumeration<['publish', 'unpublish']> & Attribute.Required;
        updatedAt: Attribute.DateTime;
        updatedBy: Attribute.Relation<'plugin::content-releases.release-action', 'oneToOne', 'admin::user'> &
            Attribute.Private;
    };
}

export interface PluginI18NLocale extends Schema.CollectionType {
    collectionName: 'i18n_locale';
    info: {
        collectionName: 'locales';
        description: '';
        displayName: 'Locale';
        pluralName: 'locales';
        singularName: 'locale';
    };
    options: {
        draftAndPublish: false;
    };
    pluginOptions: {
        'content-manager': {
            visible: false;
        };
        'content-type-builder': {
            visible: false;
        };
    };
    attributes: {
        code: Attribute.String & Attribute.Unique;
        createdAt: Attribute.DateTime;
        createdBy: Attribute.Relation<'plugin::i18n.locale', 'oneToOne', 'admin::user'> & Attribute.Private;
        name: Attribute.String &
            Attribute.SetMinMax<
                {
                    max: 50;
                    min: 1;
                },
                number
            >;
        updatedAt: Attribute.DateTime;
        updatedBy: Attribute.Relation<'plugin::i18n.locale', 'oneToOne', 'admin::user'> & Attribute.Private;
    };
}

export interface PluginStorageStorage extends Schema.CollectionType {
    collectionName: 'storages';
    info: {
        displayName: 'storage';
        pluralName: 'storages';
        singularName: 'storage';
    };
    options: {
        comment: '';
        draftAndPublish: true;
    };
    attributes: {
        createdAt: Attribute.DateTime;
        createdBy: Attribute.Relation<'plugin::storage.storage', 'oneToOne', 'admin::user'> &
            Attribute.Private;
        data: Attribute.JSON;
        publishedAt: Attribute.DateTime;
        updatedAt: Attribute.DateTime;
        updatedBy: Attribute.Relation<'plugin::storage.storage', 'oneToOne', 'admin::user'> &
            Attribute.Private;
        user: Attribute.Relation<'plugin::storage.storage', 'oneToOne', 'admin::user'>;
    };
}

export interface PluginUploadFile extends Schema.CollectionType {
    collectionName: 'files';
    info: {
        description: '';
        displayName: 'File';
        pluralName: 'files';
        singularName: 'file';
    };
    pluginOptions: {
        'content-manager': {
            visible: false;
        };
        'content-type-builder': {
            visible: false;
        };
    };
    attributes: {
        alternativeText: Attribute.String;
        caption: Attribute.String;
        createdAt: Attribute.DateTime;
        createdBy: Attribute.Relation<'plugin::upload.file', 'oneToOne', 'admin::user'> & Attribute.Private;
        ext: Attribute.String;
        folder: Attribute.Relation<'plugin::upload.file', 'manyToOne', 'plugin::upload.folder'> &
            Attribute.Private;
        folderPath: Attribute.String &
            Attribute.Required &
            Attribute.Private &
            Attribute.SetMinMax<
                {
                    min: 1;
                },
                number
            >;
        formats: Attribute.JSON;
        hash: Attribute.String & Attribute.Required;
        height: Attribute.Integer;
        mime: Attribute.String & Attribute.Required;
        name: Attribute.String & Attribute.Required;
        previewUrl: Attribute.String;
        provider: Attribute.String & Attribute.Required;
        provider_metadata: Attribute.JSON;
        related: Attribute.Relation<'plugin::upload.file', 'morphToMany'>;
        size: Attribute.Decimal & Attribute.Required;
        updatedAt: Attribute.DateTime;
        updatedBy: Attribute.Relation<'plugin::upload.file', 'oneToOne', 'admin::user'> & Attribute.Private;
        url: Attribute.String & Attribute.Required;
        width: Attribute.Integer;
    };
}

export interface PluginUploadFolder extends Schema.CollectionType {
    collectionName: 'upload_folders';
    info: {
        displayName: 'Folder';
        pluralName: 'folders';
        singularName: 'folder';
    };
    pluginOptions: {
        'content-manager': {
            visible: false;
        };
        'content-type-builder': {
            visible: false;
        };
    };
    attributes: {
        children: Attribute.Relation<'plugin::upload.folder', 'oneToMany', 'plugin::upload.folder'>;
        createdAt: Attribute.DateTime;
        createdBy: Attribute.Relation<'plugin::upload.folder', 'oneToOne', 'admin::user'> & Attribute.Private;
        files: Attribute.Relation<'plugin::upload.folder', 'oneToMany', 'plugin::upload.file'>;
        name: Attribute.String &
            Attribute.Required &
            Attribute.SetMinMax<
                {
                    min: 1;
                },
                number
            >;
        parent: Attribute.Relation<'plugin::upload.folder', 'manyToOne', 'plugin::upload.folder'>;
        path: Attribute.String &
            Attribute.Required &
            Attribute.SetMinMax<
                {
                    min: 1;
                },
                number
            >;
        pathId: Attribute.Integer & Attribute.Required & Attribute.Unique;
        updatedAt: Attribute.DateTime;
        updatedBy: Attribute.Relation<'plugin::upload.folder', 'oneToOne', 'admin::user'> & Attribute.Private;
    };
}

export interface PluginUsersPermissionsPermission extends Schema.CollectionType {
    collectionName: 'up_permissions';
    info: {
        description: '';
        displayName: 'Permission';
        name: 'permission';
        pluralName: 'permissions';
        singularName: 'permission';
    };
    pluginOptions: {
        'content-manager': {
            visible: false;
        };
        'content-type-builder': {
            visible: false;
        };
    };
    attributes: {
        action: Attribute.String & Attribute.Required;
        createdAt: Attribute.DateTime;
        createdBy: Attribute.Relation<'plugin::users-permissions.permission', 'oneToOne', 'admin::user'> &
            Attribute.Private;
        role: Attribute.Relation<
            'plugin::users-permissions.permission',
            'manyToOne',
            'plugin::users-permissions.role'
        >;
        updatedAt: Attribute.DateTime;
        updatedBy: Attribute.Relation<'plugin::users-permissions.permission', 'oneToOne', 'admin::user'> &
            Attribute.Private;
    };
}

export interface PluginUsersPermissionsRole extends Schema.CollectionType {
    collectionName: 'up_roles';
    info: {
        description: '';
        displayName: 'Role';
        name: 'role';
        pluralName: 'roles';
        singularName: 'role';
    };
    pluginOptions: {
        'content-manager': {
            visible: false;
        };
        'content-type-builder': {
            visible: false;
        };
    };
    attributes: {
        createdAt: Attribute.DateTime;
        createdBy: Attribute.Relation<'plugin::users-permissions.role', 'oneToOne', 'admin::user'> &
            Attribute.Private;
        description: Attribute.String;
        name: Attribute.String &
            Attribute.Required &
            Attribute.SetMinMaxLength<{
                minLength: 3;
            }>;
        permissions: Attribute.Relation<
            'plugin::users-permissions.role',
            'oneToMany',
            'plugin::users-permissions.permission'
        >;
        type: Attribute.String & Attribute.Unique;
        updatedAt: Attribute.DateTime;
        updatedBy: Attribute.Relation<'plugin::users-permissions.role', 'oneToOne', 'admin::user'> &
            Attribute.Private;
        users: Attribute.Relation<
            'plugin::users-permissions.role',
            'oneToMany',
            'plugin::users-permissions.user'
        >;
    };
}

export interface PluginUsersPermissionsUser extends Schema.CollectionType {
    collectionName: 'up_users';
    info: {
        description: '';
        displayName: 'User';
        name: 'user';
        pluralName: 'users';
        singularName: 'user';
    };
    options: {
        draftAndPublish: false;
    };
    attributes: {
        blocked: Attribute.Boolean & Attribute.DefaultTo<false>;
        confirmationToken: Attribute.String & Attribute.Private;
        confirmed: Attribute.Boolean & Attribute.DefaultTo<false>;
        createdAt: Attribute.DateTime;
        createdBy: Attribute.Relation<'plugin::users-permissions.user', 'oneToOne', 'admin::user'> &
            Attribute.Private;
        email: Attribute.Email &
            Attribute.Required &
            Attribute.SetMinMaxLength<{
                minLength: 6;
            }>;
        language: Attribute.String;
        password: Attribute.Password &
            Attribute.Private &
            Attribute.SetMinMaxLength<{
                minLength: 6;
            }>;
        payments: Attribute.Component<'bots-payments.payments', true>;
        provider: Attribute.String;
        resetPasswordToken: Attribute.String & Attribute.Private;
        role: Attribute.Relation<
            'plugin::users-permissions.user',
            'manyToOne',
            'plugin::users-permissions.role'
        >;
        telegramID: Attribute.BigInteger;
        telegramUsername: Attribute.String;
        updatedAt: Attribute.DateTime;
        updatedBy: Attribute.Relation<'plugin::users-permissions.user', 'oneToOne', 'admin::user'> &
            Attribute.Private;
        username: Attribute.String &
            Attribute.Required &
            Attribute.Unique &
            Attribute.SetMinMaxLength<{
                minLength: 3;
            }>;
    };
}

declare module '@strapi/types' {
    export module Shared {
        export interface ContentTypes {
            'admin::api-token': AdminApiToken;
            'admin::api-token-permission': AdminApiTokenPermission;
            'admin::permission': AdminPermission;
            'admin::role': AdminRole;
            'admin::transfer-token': AdminTransferToken;
            'admin::transfer-token-permission': AdminTransferTokenPermission;
            'admin::user': AdminUser;
            'api::bot.bot': ApiBotBot;
            'api::invoice.invoice': ApiInvoiceInvoice;
            'api::service-type.service-type': ApiServiceTypeServiceType;
            'api::telegram-user.telegram-user': ApiTelegramUserTelegramUser;
            'api::types-of-subscription.types-of-subscription': ApiTypesOfSubscriptionTypesOfSubscription;
            'plugin::content-releases.release': PluginContentReleasesRelease;
            'plugin::content-releases.release-action': PluginContentReleasesReleaseAction;
            'plugin::i18n.locale': PluginI18NLocale;
            'plugin::storage.storage': PluginStorageStorage;
            'plugin::upload.file': PluginUploadFile;
            'plugin::upload.folder': PluginUploadFolder;
            'plugin::users-permissions.permission': PluginUsersPermissionsPermission;
            'plugin::users-permissions.role': PluginUsersPermissionsRole;
            'plugin::users-permissions.user': PluginUsersPermissionsUser;
        }
    }
}
