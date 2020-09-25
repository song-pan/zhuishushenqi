//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    recommend:[{
      headline:"男生热门",
      books:[],
    },
    {
      headline:"男生完本",
      books:[],
    },
    {
      headline:"男生大神",
      books:[],
    }
  ]
  },
  tosearch() {
    wx.navigateTo({
      url: '/pages/search/search',
    })
  },
  onLoad: function () {
    // 获取全部榜单
    wx.request({
      url: 'https://api.zhuishushenqi.com/ranking/gender',
      method: 'GET',
      success: res => {
        // console.log(res.data.male)
        // 获取女生畅销榜单的id
        let id = res.data.male[0]._id
        let id2 =res.data.male[5]._id
        // 通过榜单id获取女生畅销榜单书籍
        wx.request({
          url: 'https://api.zhuishushenqi.com/ranking/' + id,
          method: 'GET',
          success: res => {
            // console.log(res.data.ranking.books)
            let data = res.data.ranking.books;
            let books=[];
            let id =[];
            for (let i = 0; i <= 7; i++) {
               id.push(data[i]._id);                  
                         }   
            wx.request({
              url: 'https://api.zhuishushenqi.com/book/'+id,
              method:'GET',
              success:res=>{
                console.log(res.data)
                books.push(res.data)    
              }
            })                  
            // 获取男生畅销榜前8本，4本给男生热门，4本给大神区
            let book1=books.splice(0,4)
            let book2=books.splice(0,4)
            //更改data中recommend数组中的books数组
            this.setData({
              'recommend[0].books':book1,
              'recommend[2].books':book2
            })
    console.log(this.data.recommend)
          }
        })
        wx.request({
          url: 'https://api.zhuishushenqi.com/ranking/' + id2,
          method:'GET',
          success:res=>{
            let data = res.data.ranking.books
            let books=[]
            for (let i = 0; i <= 3; i++) {
              books.push(data[i])
            }
            this.setData({
              'recommend[1].books':books
            })
          }
        })
      }
    })

  }
})