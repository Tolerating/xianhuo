export interface Complain {
  id?: string,
  /**
   * 投诉人id
   *
   * @type {string}
   * @memberof Complain
   */
  complainantId: string,
  /**
   * 投诉原因
   *
   * @type {string}
   * @memberof Complain
   */
  complainantCause: string,
  /**
   * 被投诉的商品或帖子
   *
   * @type {string}
   * @memberof Complain
   */
  complainantSubject: string,
  /**
   * 卖家id
   *
   * @type {string}
   * @memberof Complain
   */
  sellerId: string,
  /**
   * 1: 商品投诉 0:帖子投诉
   *
   * @type {(1|0)}
   * @memberof Complain
   */
  type?: 1|0,
  /**
   * 处理人
   *
   * @type {string}
   * @memberof Complain
   */
  dealUser?: string,
  /**
   * 处理方法
   *
   * @type {string}
   * @memberof Complain
   */
  dealMethod?: string,
  /**
   * 创建时间
   *
   * @type {string}
   * @memberof Complain
   */
  createTime?: string,
  /**
   * 处理时间
   *
   * @type {string}
   * @memberof Complain
   */
  dealTime?: string
}
