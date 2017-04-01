const Controller = (Repository) => class ControllerClass {
  static create (req, res, next) {
    return Repository.create(req.body)
      .then(entity => {
        const url = `${req.baseUrl}/${entity.id}`
        return res.status(201).location(url).json(entity)
      })
      .catch(next)
  }

  static getOne (req, res, next) {
    Repository.getOne(req.params.id)
      .then(entity =>
        entity ? res.status(200).json(entity) : res.sendStatus(404)
      )
      .catch(next)
  }

  static getAll (req, res, next, options = {}) {
    return Repository.getAll()
      .then(entities => res.status(200).json(entities))
      .catch(next)
  }

  static merge (req, res, next, options = {}) {
    return Repository.merge(req.params.id, req.body)
      .then(entity =>
        entity ? res.status(200).json(entity) : res.sendStatus(404)
      )
      .catch(next)
  }

  static update (req, res, next, options = {}) {
    return Repository.update(req.params.id, req.body)
      .then(entity =>
        entity ? res.status(200).json(entity) : res.sendStatus(404)
      )
      .catch(next)
  }

  static destroy (req, res, next, options = {}) {
    return Repository.destroy(req.params.id)
      .then(success => success ? res.sendStatus(204) : res.sendStatus(404))
      .catch(next)
  }
}

module.exports = Controller
