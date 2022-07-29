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
		this.loader.add('btn_circle.png', 'images/btn_circle.png');
		this.loader.load();

		this.stage = this.app.stage

		this.loader.onComplete.add(() => {
			this.show()
		});
	}
	show() {
		let actionButton = new PIXI.Container();
		this.stage.addChild(actionButton);
		let btnImage = new PIXI.Sprite(this.loader.resources['btn.png'].texture);
		let btnCircleImage = new PIXI.Sprite(this.loader.resources['btn_circle.png'].texture);
		let btnCircleImage2 = new PIXI.Sprite(this.loader.resources['btn_circle.png'].texture);

		actionButton.addChild(btnImage);
		actionButton.addChild(btnCircleImage);
		actionButton.addChild(btnCircleImage2);

		// 更改按钮位置
		const btnImageWidth = btnImage.width
		btnImage.pivot.x = btnImageWidth / 2
		btnImage.pivot.y = btnImageWidth / 2
		const btnCircleImageWidth = btnCircleImage.width
		btnCircleImage.pivot.x = btnCircleImageWidth / 2
		btnCircleImage.pivot.y = btnCircleImageWidth / 2
		const btnCircleImageWidth2 = btnCircleImage2.width
		btnCircleImage2.pivot.x = btnCircleImageWidth2 / 2
		btnCircleImage2.pivot.y = btnCircleImageWidth2 / 2
		actionButton.x = actionButton.y = 200;

		// 使用gsap实现动画效果
		btnCircleImage.scale.x = btnCircleImage.scale.y = 0.8
		gsap.to(btnCircleImage.scale, { duration: 1, x: 1.2, y: 1.2, repeat: -1 })
		gsap.to(btnCircleImage.scale, { duration: 1, alpha: 0, repeat: -1 })
	}
}