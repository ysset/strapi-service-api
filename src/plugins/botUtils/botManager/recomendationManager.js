module.exports = class infinityQueue {
  constructor() {
    this.endlessQueue = new Map();
    this.shown = new Map();
  }

  async get({ user, filter = {
    type: String,
    api: String
  }}) {

    const { type, api } = filter;
    const id = `${user.telegramID}::${type}`;

    const randomValue = ({queue = Array}) => {
      const randomIndex = Math.floor(Math.random() * queue.length);
      const show = queue[randomIndex];
      if (this.shown.has(id)) {
        this.shown.set(id, [...this.shown.get(id), show]);
      } else {
        this.shown.set(id, [show]);
      }
      this.endlessQueue.set(id, queue.filter(el => el.id !== show.id));
      return show;
    }

    /**
     * TODO Infinity Queue
     * @type {null}
     */
    let rec = null;
    if (!this.endlessQueue.has(id)) {
      console.log(user[type.toLowerCase()].map(el => el.id))
      rec = await strapi.db.query(api).findMany({
        populate: true
      });
      rec = rec.filter(recEl => user[type.toLowerCase()].some(el => recEl.id === el.id))
      console.log(rec)
      this.endlessQueue.set(id, rec);
      return randomValue({queue: this.endlessQueue.get(id)});
    } else {
      const isQueryHasNonLikedEntity = user[type.toLowerCase()].some(userEl => !this.shown.get(id).some(showEl => userEl.id === showEl.id))
      if (this.endlessQueue.get(id).length === 0 && isQueryHasNonLikedEntity) {
        this.endlessQueue.set(id, this.shown.get(id));
        this.shown.set(user.telegramID, []);
      } else {
        return []
      }
      return randomValue({queue: this.endlessQueue.get(id)});
    }
  }

  /**
   *
   * @param filter
   * @param data
   * @returns {Promise<void>}
   */
  async save({
               filter = {
                 where: {
                   key: String,
                   value: Any,
                 },
                 apiKey: String
               }, data
             }) {
    const {where: {key, value}, apiKey} = filter;
    const user = await strapi.db.query(apiKey).findOne({
      where: {
        [key]: value
      },
      populate: true
    });

    await strapi.db.query(apiKey).update({
      where: {
        [key]: value
      },
      data: {
        [data.type.toLowerCase()]: [
          ...user[data.type.toLowerCase()],
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
