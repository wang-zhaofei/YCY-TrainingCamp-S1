class BrakeBanner {
	constructor(selector) {
		// 初始化画布
		this.app = new PIXI.Application({
			width: window.innerWidth,
			height: window.innerHeight,
			backgroundColor: 0x0000ff,
			resizeTo: window
		})

		document.querySelector(selector).appendChild(this.app.view);

		// 创建资源加载器
		this.loader = new PIXI.Loader();
		this.loader.add('btn.png', 'images/btn.png');
		this.loader.load();

		this.stage = this.app.stage

		this.loader.onComplete.add(() => {
			this.show()
		});
	}
	show() {
		let actionButton = new PIXI.Container();
		this.stage.addChild(actionButton);
		const btnImage = new PIXI.Sprite(this.loader.resources['btn.png'].texture);
		this.stage.addChild(btnImage);
	}
}