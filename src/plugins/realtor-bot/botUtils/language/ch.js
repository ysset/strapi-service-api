module.exports = {
    lang: 'ch',
    WELCOME: '由您选择，所有新建筑都直接来自开发商。 为了舒适的搜索，请使用过滤器！',
    MENU_BUTTON: '菜单',
    CONTROL_PANEL: {
        text: '控制面板',
    },
    START: {
        text: '/开始',
        regex: /\/start/,
    },
    NO_FLATS: '不幸的是公寓已经结束了（',
    NO_CARS: '不幸的是，汽车都结束了（',
    SERVER_ERROR: '对不起，发生错误，请重试或稍后再试！',
    SAVED: '添加到收藏夹',
    FAVORITE: {
        text: '已保存❤️',
    },
    SELECT_SUBGROUP: {
        text: '选择子组',
    },
    FAVORITE_HOUSINGS: {
        text: '物业❤️',
    },
    SEARCH: {
        text: '搜索🔍',
    },
    SEARCH_FLATS: {
        text: '房产🔍',
    },
    REPEAT_SEARCH_FLATS: {
        text: '再次搜索属性',
    },
    NO_FAVORITE_NOW: '您还没有保存任何不动产！',
    UN_AUTHORIZE: '我们似乎找不到特色公寓，请重启机器人！',
    WRITE_AGENT_INLINE: {
        text: '联系人',
    },
    WRITE_AGENT: {
        userText: (username, agentUsername) =>
            `${username} 这里是房地产经纪人 https://t.me/${agentUsername} 的链接。 \n请给他发短信 =) `,
        realtorText: (username, agentUsername) =>
            `${agentUsername} 用户 https://t.me/${username} 对您的公寓感兴趣。 `,
        orderInfo: ({ id, name, cost, city, district, locationUrl, paymentMethod }) =>
            `公寓：\nid：${id} \n名称：${name} \n价格：${cost} \n地址：${city} ${district}${
                locationUrl ? ` \n位置：${locationUrl}` : ''
            } \n${paymentMethod}`,
    },
    CHOOSE_THE_ACTION: {
        text: (flatId) => `公寓号：${flatId} \n选择操作：`,
    },
    HOUSING_FULL_DESCRIPTION: ({
        title,
        cost,
        city,
        housingArea,
        rooms,
        locationUrl,
        caption,
        metersFromTheSea,
        constructionCompletionDate,
    }) =>
        `${title} \nPrice: ${cost} | City: ${city} ${housingArea ? `\nArea ${housingArea} m2 |` : ''} ${
            rooms ? `Rooms: ${rooms}` : ''
        } \nLocation: ${locationUrl} ${metersFromTheSea ? `\nTo sea: ${metersFromTheSea} m` : ''} ${
            constructionCompletionDate ? `\nCompletion Date: ${constructionCompletionDate}` : ''
        } \n\n${caption}`,
    GO_BACK_ACTION: {
        text: '<<返回',
    },
    DELETE_ACTION: {
        text: '从收藏夹中删除',
    },
    DELETED: {
        text: '该公寓已从收藏夹中删除。',
    },
    FULL_DESCRIPTION: {
        text: '详细说明',
    },
    SAVE_INLINE: {
        text: '保存',
    },
    NEXT_INLINE: {
        text: '下一个',
    },
};
