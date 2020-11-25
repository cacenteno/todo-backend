const User = require("../../model/User.js")

module.exports = {
    getTodos: () => {
        return async (req, res, next) => {
            try {
                let user = await User.findOne({ _id: req.decoded.data._id }).exec((err, res) => {
                    req.todos = res.todos
                    next(null, req)
                })
            } catch (error) {
                throw error;
            }
        }
    },
    AddTodo: () => {
        return async (req, res, next) => {
            try {
                let todo = {
                    title: req.body.title,
                    description: req.body.description,
                    date: Date.now()
                }
                var user = User.findOne({ _id: req.decoded.data._id }, function (err, res) {
                    res.todos.push(todo)
                    req.todos = res.todos
                    res.save()
                    next(null, req)
                });
            } catch (error) {
                throw error;
            }
        }
    },
    removeTodo: () => {
        return async (req, res, next) => {
            try {
                var user = User.findOneAndUpdate({ _id: req.decoded.data._id }, { $pull: { todos: { _id: req.body._id } } }, { new: true }, function (err, res) {
                    req.todos = res.todos
                    next(null, req)
                })
            } catch (error) {
                error = "Cannot find todo"
                next(error)
            }
        }
    },
    updateTodo: () => {
        return async (req, res, next) => {
            if (req.body._id) {
                var user = await User.findOneAndUpdate({ _id: req.decoded.data._id, "todos._id": req.body._id }, { $set: { "todos.$": { _id: req.body._id, title: req.body.title, description: req.body.description, date: req.body.date } } }, { new: true },
                    (err, data) => {
                        if (!data) return false
                        req.todos = data.todos
                        next(null, req)
                    })
                if (!user) {
                    let err = new Error("Cannot process request")
                    next(err)
                }
            }
            else {
                let err = new Error("Cannot process request")
                next(err)
            }
        }
    },
    updateOrder: () => {
        return async (req, res, next) => {

            if (req.body.todos) {
                var user = await User.findOne({ _id: req.decoded.data._id }, (err, data) => {
                    if (!data) return false
                    data.todos = req.body.todos;
                    data.save()
                    req.todos = data.todos
                    next(null, req)
                })
                if (!user) {
                    next(err)
                }
            }
            else {
                let err = new Error("Cannot process request")
                next(err)
            }
        }
    }
}