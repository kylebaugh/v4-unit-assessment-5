const bcrypt = require('bcryptjs')

module.exports = {
    register: async (req, res) =>{
        const db = req.app.get('db')
        const {username, password} = req.body
        const [existingUser] = await db.user.find_user_by_username(username)
        if(existingUser){
           return res.status(409).send('Username taken')
        }
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)
        const [registerUser] = await db.user.create_user([username, hash, `https://robohash.org/${username}.png`])
        delete registerUser.password
        req.session.user = registerUser
        console.log(req.session.user)
        return res.status(200).send(req.session.user)
    },

    login: async (req, res) => {
        const db = req.app.get('db')
        const {username, password} = req.body
        // {user} = req.session
        const [existingUser] = await db.user.find_user_by_username(username)
        if(!existingUser){
            return res.status(401).send('User not found')
        }
        const isAuthenticated = bcrypt.compareSync(password, existingUser.password)
        if(!isAuthenticated){
            return res.status(403).send('Incorrect Password')
        }
        delete existingUser.password
        req.session.user = existingUser
        return res.status(200).send(req.session.user)
    },

    logout: async (req, res) => {
        req.session.destroy()
        return res.status(200).send('Logout Complete')
    },

    getUser: async (req, res) => {
        if(!req.session.user){
            return res.status(401).send('User not found')
        }
        return res.status(200).send(req.session.user)
    }
}