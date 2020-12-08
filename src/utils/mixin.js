module.exports = {
	data() {
		return {}
  },
	methods: {
		// 查询节点信息
		$sGetRect(selector, all) {
			return new Promise(resolve => {
				uni.createSelectorQuery().
				in(this)[all ? 'selectAll' : 'select'](selector)
					.boundingClientRect(rect => {
						if (all && Array.isArray(rect) && rect.length) {
							resolve(rect)
						}
						if (!all && rect) {
							resolve(rect)
						}
					})
					.exec()
			})
		},
		// 阻止事件冒泡
		preventEvent(e) {
			e && e.stopPropagation && e.stopPropagation()
		}
	}
}
