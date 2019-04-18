module.exports = {
    fields: ['target'],
    validate: (tx, ts, legitUser, cb) => {
        if (!validate.string(tx.data.target, config.accountMaxLength, config.accountMinLength, config.allowedUsernameChars, config.allowedUsernameCharsOnlyMiddle)) {
            cb(false, 'invalid tx data.target'); return
        }

        cache.findOne('accounts', {name: tx.sender}, function(err, acc) {
            if (err) throw err
            if (!acc.approves) acc.approves = []
            if (acc.approves.indexOf(tx.data.target) === -1) {
                cb(false, 'invalid tx already unvoted'); return
            }
            cache.findOne('accounts', {name: tx.data.target}, function(err, account) {
                if (!account) 
                    cb(false, 'invalid tx target does not exist')
                else 
                    cb(true)
                
            })
        })
    },
    execute: (tx, ts, cb) => {

    }
}