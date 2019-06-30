module.exports = {
    configureWebpack: {
        devServer: {
            before(app){
                app.get('/api/goods', function(req,res){
                    res.json({
                        code: 0,
                        list: [{name:"xiao", price:"100", id:1},{name:"pp", price:"200", id:2}]
                    })
                })
            }
        }
    }
}