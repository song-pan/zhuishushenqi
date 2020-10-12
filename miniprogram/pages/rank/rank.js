// pages/rank/rank.js
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		gender: ['male', 'female'],
		// 获取tabBar的index唯一索引
		getIndex: 0,
		// 获取侧边栏的data-id
		getId:'54d42d92321052167dfb75e3',
		//获取所有排行榜
		rank: [],
		// 书籍信息
		books:[],
	},
	// 获取总排行榜
	getRank() {
		wx.request({
			url: 'https://api.zhuishushenqi.com/ranking/gender',
			method: 'GET',
			success: res => {
				if (this.data.getIndex == 0) {
					this.setData({
						rank:res.data.male,
					})
					// console.log(res.data)
				}else {
					this.setData({
						rank:res.data.female,
					})
					// console.log(this.data.getId)
				}
			}
		})
	},

	// 获取单一排行榜
	getSingalRank(){
		wx.request({
			url: 'https://api.zhuishushenqi.com/ranking/'+this.data.getId,
			method:'GET',
			success:res=>{
				let book=res.data.ranking.books
				// console.log(book)
				this.setData({
					books:book
				})
			}
		})
	},

	// 切换男频女频事件
	switchTab(e) {
		let index = e.target.dataset.index
		let getIndex = this.data.getIndex
		if (!(index == getIndex)) {
		if (index == 0) {
			this.setData({
				books:[],
				getIndex: 0,
				getId:'54d42d92321052167dfb75e3'
			})
			this.getRank()
			this.getSingalRank()
		} else {
			this.setData({
				books:[],
				getIndex: 1,
				getId:'54d43437d47d13ff21cad58b'
			})
			this.getRank()
			this.getSingalRank()
		}
	}
	},
	changeSlider(e){
		let id=e.target.dataset.id
		let getId=this.data.getId
		if(!(id==getId)){
			this.setData({
				getId:id
			})
			wx.request({
				url: 'https://api.zhuishushenqi.com/ranking/'+id,
				method:'GET',
				success:res=>{
					let book=res.data.ranking.books
					// console.log(book)
					this.setData({
						books:book
					})
				}
			})
		}
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (params) {
		wx.setNavigationBarTitle({
			title: params.text
		})
		this.getSingalRank()
		this.getRank()
	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () {

	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function () {

	},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide: function () {

	},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload: function () {

	},

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh: function () {

	},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom: function () {

	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function () {

	}
})