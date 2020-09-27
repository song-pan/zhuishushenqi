// pages/rank/rank.js
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		gender: ['male', 'female'],
		// 获取tabBar的index唯一索引
		getIndex: 0,
		//获取所有排行榜
		rank: []
	},
	getRank() {
		wx.request({
			url: 'https://api.zhuishushenqi.com/ranking/gender',
			method: 'GET',
			success: res => {
				if (this.data.getIndex == 0) {
					this.setData({
						rank:res.data.male
					})
					console.log(this.data.rank)
				}else {
					this.setData({
						rank:res.data.female
					})
					console.log(this.data.rank)
				}
			}
		})
	},
	switchTab(e) {
		let index = e.target.dataset.index
		let getIndex = this.data.getIndex
		if (!(index == getIndex)) {
		if (index == 0) {
			this.setData({
				getIndex: 0
			})
			this.getRank()
		} else {
			this.setData({
				getIndex: 1
			})
			this.getRank()
		}
	}
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (params) {
		wx.setNavigationBarTitle({
			title: params.text
		})
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