let myaddress='mytesting'
let util={}
var env=window.location.href
if(env.includes('github'))
{
    console.log('running in -prod- github io')
    myaddress='apiv1.n2r.online'

    util.BASE=location.protocol + '//' + myaddress
    util.backendstring='/uwsgi_api'
}else{
    console.log('running in self testing env')

    myaddress=window.location.hostname

    util.BASE=location.protocol + '//' + myaddress + ':9999'
    util.backendstring='/uwsgi_api'
}




export default {
    util
}