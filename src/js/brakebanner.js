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
		this.loader.add('brake_bike.png', 'images/brake_bike.png');
		this.loader.add('brake_handlerbar.png', 'images/brake_handlerbar.png');
		this.loader.add('brake_lever.png', 'images/brake_lever.png');
		this.loader.load();

		this.stage = this.app.stage

		this.loader.onComplete.add(() => {
			this.show()
		});
	}
	show() {


		// 创建自行车图层
		const bikeContainer = new PIXI.Container();
		this.stage.addChild(bikeContainer);

		bikeContainer.scale.x = bikeContainer.scale.y = 0.3

		const brakeBikeImage = new PIXI.Sprite(this.loader.resources['brake_bike.png'].texture);
		const brakeLeverImage = new PIXI.Sprite(this.loader.resources['brake_lever.png'].texture);
		const brakeHandlerbarImage = new PIXI.Sprite(this.loader.resources['brake_handlerbar.png'].texture);

		bikeContainer.addChild(brakeBikeImage);
		bikeContainer.addChild(brakeLeverImage);
		bikeContainer.addChild(brakeHandlerbarImage);

		// 调整车闸的位置
		brakeLeverImage.pivot.x = 455
		brakeLeverImage.pivot.y = 455
		brakeLeverImage.x = 722
		brakeLeverImage.y = 900

		// 按钮图层
		let actionButton = this.createActionButton()
		actionButton.x = actionButton.y = 400;

		// 按钮与车闸的交互
		actionButton.interactive = true
		actionButton.buttonMode = true
		actionButton.on("mousedown", () => {
			// brakeLeverImage.rotation = Math.PI / 180 * -30
			gsap.to(brakeLeverImage, { duration: .8, rotation: Math.PI / 180 * -30 })
		})
		actionButton.on("mouseup", () => {
			gsap.to(brakeLeverImage, { duration: .6, rotation: 0 })
		})

	}
	createActionButton() {
		// 创建按钮图层
		const actionButton = new PIXI.Container();
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


		// 使用gsap实现动画效果
		btnCircleImage.scale.x = btnCircleImage.scale.y = 0.8
		gsap.to(btnCircleImage.scale, { duration: 1, x: 1.2, y: 1.2, repeat: -1 })
		gsap.to(btnCircleImage.scale, { duration: 1, alpha: 0, repeat: -1 })
		return actionButton
	}
}