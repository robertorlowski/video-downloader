module.exports = {
    pluginOptions: {
      electronBuilder: {
        chainWebpackRendererProcess: config => {
          config.plugin('define').tap(args => {
            args[0]['process.env.FLUENTFFMPEG_COV'] = false
            return args
          })
        },        
        builderOptions: {
            appId: "pl.lt.videodownloader",
            productName : "Video Downloader",
            copyright: "Copyright © 2018 Robert Orłowski",
            win : {
              icon : "public/assets/app.png",
              publisherName :"Robert Orłowski"
            }
        }
      }
    }
  }