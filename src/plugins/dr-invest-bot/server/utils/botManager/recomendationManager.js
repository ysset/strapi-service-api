module.exports = class infinityQueue {
  constructor() {
    this.endlessQueue = new Map();
    this.shown = new Map();
  }

  async get(user) {
    const randomValue = ({queue = Array}) => {
      const randomIndex = Math.floor(Math.random() * queue.length);
      const show = queue[randomIndex];
      if (this.shown.has(user.telegramID)) {
        this.shown.set(user.telegramID, [...this.shown.get(user.telegramID), show]);
      } else {
        this.shown.set(user.telegramID, [show]);
      }
      this.endlessQueue.set(user.telegramID, queue.filter(el => el.id !== show.id));
      return show;
    }

    let rec = null;
    if (!this.endlessQueue.has(user.telegramID)) {
      rec = await strapi.db.query("api::product.product").findMany({
        where: {
          id: {
            $ne: user.favorite.map(el => el.id)
          }
        },
        populate: true
      });
      this.endlessQueue.set(user.telegramID, rec);
      return randomValue({queue: this.endlessQueue.get(user.telegramID)});
    } else {
      if (this.endlessQueue.get(user.telegramID).length === 0) {
        this.endlessQueue.set(user.telegramID, this.shown.get(user.telegramID));
        this.shown.set(user.telegramID, []);
      }
      return randomValue({queue: this.endlessQueue.get(user.telegramID)});
    }
  }

  async save({from, data}) {
    const user = await strapi.db.query("api::telegram-user.telegram-user").findOne({
      where: {
        telegramID: from.id
      },
      populate: true
    });

    await strapi.db.query("api::telegram-user.telegram-user").update({
      where: {
        telegramID: from.id
      },
      data: {
        favorite: [
          ...user.favorite,
          data.recId
        ]
      },
      populate: true
    })
      .catch(e => {
        console.log(e)
      })
  }
}
