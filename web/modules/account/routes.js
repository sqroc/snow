module.exports = function(router, master, authorize) {
    return router
    .add(/^$/, function() {
        router.go('account', true)
    })
    .add(/^account$/, function() {
        router.go('account/funds', true)
    })
    .add(/^account\/funds$/, function() {
        if (!authorize.user()) return
        master(require('./funds')(), 'account')
    })
    .add(/^account\/vouchers$/, function() {
        if (!authorize.user()) return
        master(require('./vouchers')(), 'account')
    })
    .add(/^account\/activity$/, function() {
        if (!authorize.user()) return
        master(require('./activity')(), 'account')
    })
    .add(/^account\/bankaccounts$/, function() {
        if (!authorize.user(3)) return
        master(require('./bankaccounts')(), 'account')
    })
    .add(/^account\/bankaccounts\/add$/, function() {
        if (!authorize.user(3)) return

        if (api.user.country == 'NO') {
            master(require('./bankaccounts/addnorway')(), 'account')
        } else {
            master(require('./bankaccounts/add')(), 'account')
        }
    })
    .add(/^account\/changepassword$/, function() {
        if (!authorize.user()) return
        master(require('./changepassword')(), 'account')
    })
    .add(/^account\/apikeys$/, function() {
        if (!authorize.user()) return
        master(require('./apikeys')(), 'account')
    })
}
