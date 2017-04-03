class BaseController (Entity) => class BaseControllerClass {
  /**
   * Load entity and append to the req object
   */
  static retrieveEntity(req, res, next, id) {
    Entity.get(id)
      .then(entity => {
        req.entity = entity
        return next()
      })
      .catch(e => next(e))
  }

  /**
   * Abstract method
   * Prepare the entity's data object and append to the req object
   */
  static retrieveData(req, res, next) { }

  /**
   * Abstract method
   * Prepare the entity's options object and append to the req object
   */
  static retrieveOptions(req, res, next) { }

  /**
   * Create new entity
   * @returns {Entity}
   */
  static create (req, res, next) {
    (new Entity(req.data)).save()
      .then(entity => {
        const url = `${req.baseUrl}/${entity.id}`
        return res.status(201).location(url).json(entity)
      })
      .catch(e => next(e))
  }

  /**
   * Get entity
   * @returns {Entity}
   */
  static get () {
    return res.status(200).json(req.entity)
  }

  /**
    * Get entity list
    * @returns {Entity[]}
    */
  static list (req, res, next) {
    return Entity.list(req.options)
      .then(entities => res.status(200).json(entities))
      .catch(e => next(e))
  }

  /**
   * Merge existing entity
   * @returns {Entity}
   */
  static merge (data) {
    entity.merge(req.data)
    entity.save()
      .then(entity => res.status(200).json(entity))
      .catch(e => next(e))
  }

  /**
   * Update existing entity
   * @returns {Entity}
   */
  static update (data) {
    entity.update(req.data)
    entity.save()
      .then(entity => res.status(200).json(entity))
      .catch(e => next(e))
  }

  /**
   * Remove existing entity
   */
  static remove (req, res, next) {
    req.entity.remove()
      .then(() => res.sendStatus(204))
      .catch(e => next(e))
  }
}

module.exports = BaseController
